const test = require('node:test');
const assert = require('node:assert/strict');

const { formatStatsSnapshot } = require('../src/utils/socialUtils');

test('formats a stats snapshot into a friendly shareable summary', () => {
  const summary = formatStatsSnapshot({
    total_workouts: 12,
    total_distance_km: 84.5,
    total_calories: 14320,
    total_duration_seconds: 64800,
  });

  assert.equal(summary.workouts, 12);
  assert.equal(summary.distanceKm, 84.5);
  assert.equal(summary.calories, 14320);
  assert.equal(summary.hours, 18);
});
