const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const { formatStatsSnapshot } = require('../utils/socialUtils');

const getUserStatsSummary = async (userId) => {
  const statsResult = await pool.query(
    `
      SELECT
        COUNT(*) AS total_workouts,
        COALESCE(SUM(calories), 0) AS total_calories,
        COALESCE(SUM(distance_km), 0) AS total_distance_km,
        COALESCE(SUM(duration_seconds), 0) AS total_duration_seconds,
        COALESCE(AVG(rpm), 0) AS average_rpm,
        COALESCE(AVG(power), 0) AS average_power,
        MAX(distance_km) AS longest_distance,
        MAX(calories) AS highest_calories,
        MAX(rpm) AS highest_rpm,
        MAX(power) AS highest_power
      FROM workouts
      WHERE user_id = $1
    `,
    [userId]
  );

  const streakResult = await pool.query(
    `
      SELECT DISTINCT DATE(created_at) AS workout_day
      FROM workouts
      WHERE user_id = $1
      ORDER BY workout_day ASC
    `,
    [userId]
  );

  const workoutDays = streakResult.rows.map((row) => new Date(row.workout_day));
  let currentStreak = 0;
  let longestStreak = 0;

  if (workoutDays.length) {
    currentStreak = 1;
    longestStreak = 1;

    for (let index = 1; index < workoutDays.length; index += 1) {
      const previous = new Date(workoutDays[index - 1]);
      const current = new Date(workoutDays[index]);
      const diffDays = (current - previous) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak += 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
  }

  return {
    stats: statsResult.rows[0],
    streak: {
      currentStreak,
      longestStreak,
      activeDays: workoutDays.length,
    },
  };
};

const ensureSocialTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS friends (
        id SERIAL PRIMARY KEY,
        requester_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        addressee_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(requester_id, addressee_id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        creator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS group_members (
        id SERIAL PRIMARY KEY,
        group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        role TEXT NOT NULL DEFAULT 'member',
        joined_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(group_id, user_id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS stats_shares (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        recipient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        group_id INTEGER REFERENCES groups(id) ON DELETE SET NULL,
        payload JSONB NOT NULL,
        message TEXT,
        shared_at TIMESTAMP DEFAULT NOW()
      )
    `);
  } catch (error) {
    console.error('Could not ensure social tables exist:', error);
  }
};

ensureSocialTables();

router.get('/users', authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.json({ users: [] });
    }

    const search = `%${q.trim()}%`;
    const result = await pool.query(
      `
        SELECT id, username, email, avatar_url
        FROM users
        WHERE id != $1 AND (username ILIKE $2 OR email ILIKE $2)
        ORDER BY username ASC
        LIMIT 10
      `,
      [req.user.id, search, search]
    );

    res.json({ users: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile/:userId', authMiddleware, async (req, res) => {
  try {
    const targetId = Number(req.params.userId);
    if (!targetId) {
      return res.status(400).json({ message: 'A valid user id is required.' });
    }

    const userResult = await pool.query(
      `
        SELECT id, username, email, avatar_url, created_at
        FROM users
        WHERE id = $1
      `,
      [targetId]
    );

    if (!userResult.rows.length) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const summary = await getUserStatsSummary(targetId);
    res.json({ user: userResult.rows[0], summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/friends', authMiddleware, async (req, res) => {
  try {
    const acceptedResult = await pool.query(
      `
        SELECT f.id, f.requester_id, f.addressee_id, f.status, u.username, u.email, u.avatar_url
        FROM friends f
        JOIN users u ON u.id = CASE
          WHEN f.requester_id = $1 THEN f.addressee_id
          ELSE f.requester_id
        END
        WHERE (f.requester_id = $1 OR f.addressee_id = $1)
          AND f.status = 'accepted'
        ORDER BY u.username ASC
      `,
      [req.user.id]
    );

    const incomingResult = await pool.query(
      `
        SELECT f.id, f.requester_id, f.addressee_id, f.status, u.username, u.email, u.avatar_url
        FROM friends f
        JOIN users u ON u.id = f.requester_id
        WHERE f.addressee_id = $1 AND f.status = 'pending'
        ORDER BY f.created_at DESC
      `,
      [req.user.id]
    );

    const outgoingResult = await pool.query(
      `
        SELECT f.id, f.requester_id, f.addressee_id, f.status, u.username, u.email, u.avatar_url
        FROM friends f
        JOIN users u ON u.id = f.addressee_id
        WHERE f.requester_id = $1 AND f.status = 'pending'
        ORDER BY f.created_at DESC
      `,
      [req.user.id]
    );

    res.json({
      friends: acceptedResult.rows,
      incomingRequests: incomingResult.rows,
      outgoingRequests: outgoingResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/friend-requests', authMiddleware, async (req, res) => {
  try {
    const { recipient_id } = req.body;

    if (!recipient_id || Number(recipient_id) === req.user.id) {
      return res.status(400).json({ message: 'Please select a valid user to connect with.' });
    }

    const recipient = await pool.query('SELECT id FROM users WHERE id = $1', [recipient_id]);
    if (!recipient.rows.length) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const existing = await pool.query(
      `
        SELECT id, status FROM friends
        WHERE (requester_id = $1 AND addressee_id = $2)
           OR (requester_id = $2 AND addressee_id = $1)
      `,
      [req.user.id, recipient_id]
    );

    if (existing.rows.length) {
      const current = existing.rows[0];
      if (current.status === 'accepted') {
        return res.status(409).json({ message: 'You are already connected with this user.' });
      }
      return res.status(409).json({ message: 'A friend request already exists.' });
    }

    const result = await pool.query(
      `
        INSERT INTO friends (requester_id, addressee_id, status)
        VALUES ($1, $2, 'pending')
        RETURNING id, requester_id, addressee_id, status
      `,
      [req.user.id, recipient_id]
    );

    res.status(201).json({ message: 'Friend request sent.', request: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/friend-requests/:id/accept', authMiddleware, async (req, res) => {
  try {
    const requestId = req.params.id;
    const result = await pool.query(
      `
        UPDATE friends
        SET status = 'accepted'
        WHERE id = $1 AND addressee_id = $2 AND status = 'pending'
        RETURNING id, requester_id, addressee_id, status
      `,
      [requestId, req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    res.json({ message: 'Friend request accepted.', request: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/friend-requests/:id/decline', authMiddleware, async (req, res) => {
  try {
    const requestId = req.params.id;
    const result = await pool.query(
      `
        UPDATE friends
        SET status = 'declined'
        WHERE id = $1 AND addressee_id = $2 AND status = 'pending'
        RETURNING id, requester_id, addressee_id, status
      `,
      [requestId, req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    res.json({ message: 'Friend request declined.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/groups', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT g.id, g.name, g.description, g.creator_id, g.created_at, gm.role
        FROM groups g
        JOIN group_members gm ON gm.group_id = g.id
        WHERE gm.user_id = $1
        ORDER BY g.created_at DESC
      `,
      [req.user.id]
    );

    res.json({ groups: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/groups', authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'A group name is required.' });
    }

    const groupResult = await pool.query(
      `
        INSERT INTO groups (name, description, creator_id)
        VALUES ($1, $2, $3)
        RETURNING id, name, description, creator_id, created_at
      `,
      [name.trim(), description?.trim() || null, req.user.id]
    );

    const group = groupResult.rows[0];
    await pool.query(
      `
        INSERT INTO group_members (group_id, user_id, role)
        VALUES ($1, $2, 'admin')
      `,
      [group.id, req.user.id]
    );

    res.status(201).json({ message: 'Group created.', group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/groups/:groupId/members', authMiddleware, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'A user is required.' });
    }

    const access = await pool.query(
      `
        SELECT role FROM group_members
        WHERE group_id = $1 AND user_id = $2
      `,
      [groupId, req.user.id]
    );

    if (!access.rows.length || !['admin', 'member'].includes(access.rows[0].role)) {
      return res.status(403).json({ message: 'You do not have permission to add members.' });
    }

    const existing = await pool.query(
      `SELECT id FROM group_members WHERE group_id = $1 AND user_id = $2`,
      [groupId, user_id]
    );

    if (existing.rows.length) {
      return res.status(409).json({ message: 'That user is already part of the group.' });
    }

    await pool.query(
      `
        INSERT INTO group_members (group_id, user_id, role)
        VALUES ($1, $2, 'member')
      `,
      [groupId, user_id]
    );

    res.status(201).json({ message: 'Member added to the group.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/shares', authMiddleware, async (req, res) => {
  try {
    const received = await pool.query(
      `
        SELECT s.id, s.sender_id, s.recipient_id, s.message, s.shared_at, s.payload,
               u.username AS sender_name
        FROM stats_shares s
        JOIN users u ON u.id = s.sender_id
        WHERE s.recipient_id = $1
        ORDER BY s.shared_at DESC
      `,
      [req.user.id]
    );

    const sent = await pool.query(
      `
        SELECT s.id, s.sender_id, s.recipient_id, s.message, s.shared_at, s.payload,
               u.username AS recipient_name
        FROM stats_shares s
        JOIN users u ON u.id = s.recipient_id
        WHERE s.sender_id = $1
        ORDER BY s.shared_at DESC
      `,
      [req.user.id]
    );

    res.json({ received: received.rows, sent: sent.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/share', authMiddleware, async (req, res) => {
  try {
    const { recipient_ids = [], message = '' } = req.body;

    if (!recipient_ids.length) {
      return res.status(400).json({ message: 'Select at least one friend to share with.' });
    }

    const summary = await getUserStatsSummary(req.user.id);
    const snapshot = formatStatsSnapshot(summary.stats);
    snapshot.streak = summary.streak;
    snapshot.personalRecords = {
      longestDistanceKm: Number(summary.stats.longest_distance || 0),
      highestCalories: Number(summary.stats.highest_calories || 0),
      highestRpm: Number(summary.stats.highest_rpm || 0),
      highestPower: Number(summary.stats.highest_power || 0),
    };
    const inserted = [];

    for (const recipientId of recipient_ids) {
      const result = await pool.query(
        `
          INSERT INTO stats_shares (sender_id, recipient_id, payload, message)
          VALUES ($1, $2, $3, $4)
          RETURNING id, sender_id, recipient_id, payload, message, shared_at
        `,
        [req.user.id, recipientId, { snapshot }, message.trim()]
      );
      inserted.push(result.rows[0]);
    }

    res.status(201).json({ message: 'Stats shared successfully.', shares: inserted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
