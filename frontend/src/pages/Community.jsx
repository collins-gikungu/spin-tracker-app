import { useEffect, useMemo, useState } from 'react';
import AppLayout from '../components/AppLayout';
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const Community = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [shares, setShares] = useState({ received: [], sent: [] });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = darkMode ? darkTheme : lightTheme;

  const loadCommunityData = async () => {
    try {
      const [usersRes, friendsRes, groupsRes, sharesRes] = await Promise.all([
        API.get('/social/users', { params: { q: search || 'a' } }),
        API.get('/social/friends'),
        API.get('/social/groups'),
        API.get('/social/shares'),
      ]);

      setUsers(usersRes.data.users || []);
      setFriends(friendsRes.data.friends || []);
      setIncomingRequests(friendsRes.data.incomingRequests || []);
      setOutgoingRequests(friendsRes.data.outgoingRequests || []);
      setGroups(groupsRes.data.groups || []);
      setShares(sharesRes.data || { received: [], sent: [] });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCommunityData();
  }, [loadCommunityData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        loadCommunityData();
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [search, loadCommunityData]);

  const sendRequest = async (recipientId) => {
    try {
      await API.post('/social/friend-requests', { recipient_id: recipientId });
      setMessage('Friend request sent.');
      loadCommunityData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to send request.');
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await API.post(`/social/friend-requests/${requestId}/accept`);
      setMessage('Friend request accepted.');
      loadCommunityData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to accept request.');
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await API.post(`/social/friend-requests/${requestId}/decline`);
      setMessage('Friend request declined.');
      loadCommunityData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to decline request.');
    }
  };

  const createGroup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/social/groups', { name: groupName, description: groupDescription });
      setGroupName('');
      setGroupDescription('');
      setMessage('Group created.');
      loadCommunityData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to create group.');
    }
  };

  const shareStats = async (recipientId) => {
    try {
      await API.post('/social/share', { recipient_ids: [recipientId], message: 'Check out my latest ride stats!' });
      setMessage('Stats shared successfully.');
      loadCommunityData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to share stats.');
    }
  };

  const themeStyles = useMemo(() => ({
    container: {
      padding: '16px 16px 32px',
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      color: theme.text,
    },
    card: {
      backgroundColor: theme.cardBackground,
      border: `1px solid ${theme.border || '#e2e8f0'}`,
      borderRadius: '20px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
    },
    input: {
      width: '100%',
      borderRadius: '12px',
      border: `1px solid ${theme.border || '#ddd'}`,
      padding: '10px 12px',
      backgroundColor: theme.input || '#fff',
      color: theme.text,
      boxSizing: 'border-box',
      marginTop: '8px',
    },
    button: {
      border: 'none',
      borderRadius: '999px',
      padding: '8px 12px',
      background: theme.primary,
      color: 'white',
      cursor: 'pointer',
      fontWeight: 700,
    },
  }), [theme]);

  return (
    <AppLayout onLogout={onLogout} theme={theme} darkMode={darkMode} toggleTheme={() => {
      const next = !darkMode;
      setDarkMode(next);
      localStorage.setItem('darkMode', String(next));
    }}>
      <div style={themeStyles.container}>
        <h2 style={{ marginTop: 0 }}>Community</h2>
        <p style={{ color: theme.secondaryText, marginTop: '-6px' }}>Connect with friends, form groups, and share your latest stats.</p>

        {message ? <div style={{ marginBottom: '12px', color: theme.primary }}>{message}</div> : null}

        <div style={themeStyles.card}>
          <h3 style={{ marginTop: 0 }}>Find members</h3>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by username or email" style={themeStyles.input} />
          <div style={{ marginTop: '10px' }}>
            {loading ? <div>Loading...</div> : users.map((user) => (
              <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span>{user.username}</span>
                <button style={themeStyles.button} onClick={() => sendRequest(user.id)}>Add friend</button>
              </div>
            ))}
          </div>
        </div>

        <div style={themeStyles.card}>
          <h3 style={{ marginTop: 0 }}>Friend requests</h3>
          {incomingRequests.length === 0 && outgoingRequests.length === 0 && friends.length === 0 ? <p>No connections yet.</p> : null}
          {incomingRequests.map((request) => (
            <div key={request.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
              <span>{request.username} wants to connect</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={themeStyles.button} onClick={() => handleAccept(request.id)}>Accept</button>
                <button style={{ ...themeStyles.button, background: '#64748b' }} onClick={() => handleDecline(request.id)}>Decline</button>
              </div>
            </div>
          ))}
          {friends.map((friend) => (
            <div key={friend.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
              <span>{friend.username}</span>
              <button style={themeStyles.button} onClick={() => shareStats(friend.id)}>Share stats</button>
            </div>
          ))}
        </div>

        <div style={themeStyles.card}>
          <h3 style={{ marginTop: 0 }}>Create a group</h3>
          <form onSubmit={createGroup}>
            <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Group name" style={themeStyles.input} />
            <textarea value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} placeholder="What is this group for?" style={{ ...themeStyles.input, minHeight: '90px' }} />
            <button type="submit" style={{ ...themeStyles.button, marginTop: '8px' }}>Create group</button>
          </form>
          <div style={{ marginTop: '12px' }}>
            {groups.map((group) => (
              <div key={group.id} style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <strong>{group.name}</strong>
                <div style={{ color: theme.secondaryText }}>{group.description || 'A shared training circle.'}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={themeStyles.card}>
          <h3 style={{ marginTop: 0 }}>Shared stats</h3>
          {shares.received.map((share) => (
            <div key={share.id} style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
              <strong>{share.sender_name}</strong> shared a snapshot with {share.payload?.snapshot?.workouts || 0} workouts and {share.payload?.snapshot?.distanceKm || 0} km.
              {share.message ? <div style={{ color: theme.secondaryText }}>{share.message}</div> : null}
            </div>
          ))}
          {shares.sent.map((share) => (
            <div key={share.id} style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
              <strong>You</strong> sent stats to {share.recipient_name}.
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Community;
