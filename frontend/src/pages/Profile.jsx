import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const Profile = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFileName, setAvatarFileName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get('/auth/profile');
      const user = response.data.user;
      setProfile(user);
      setUsername(user.username || '');
      setEmail(user.email || '');
      setAvatarPreview(user.avatar_url || '');
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await API.put('/auth/profile', {
        username,
        email,
        avatar_url: avatarPreview || null,
      });

      const updatedUser = response.data.user;
      setProfile(updatedUser);
      setAvatarPreview(updatedUser.avatar_url || avatarPreview);
      setMessage('Profile updated successfully 🚴');
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error(error);
      setMessage('Update failed');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatarFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage('Please fill in all password fields.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('New passwords do not match.');
      return;
    }

    try {
      await API.put('/auth/password', {
        currentPassword,
        newPassword,
      });

      setPasswordMessage('Password updated successfully 🔐');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      setPasswordMessage(error.response?.data?.message || 'Password update failed');
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  const profileInitial = (profile?.username || username || 'U').charAt(0).toUpperCase();
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Recently joined';

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: `1px solid ${theme.border || '#ddd'}`,
    backgroundColor: theme.input || '#fff',
    color: theme.text,
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
  };

  if (loading) {
    return (
      <AppLayout onLogout={onLogout} theme={theme}>
        <div style={{ textAlign: 'center', marginTop: '48px', color: theme.text }}>
          <h2 style={{ margin: 0 }}>Loading profile...</h2>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout onLogout={onLogout} theme={theme}>
      <div style={{ padding: '16px 16px 32px', maxWidth: '960px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '20px',
            borderRadius: '24px',
            background: darkMode
              ? 'linear-gradient(135deg, #111827 0%, #1f2937 100%)'
              : 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
            border: `1px solid ${theme.border || '#e2e8f0'}`,
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.primary,
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  boxShadow: '0 10px 24px rgba(44, 119, 244, 0.25)',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  profileInitial
                )}
              </div>
              <div>
                <h1 style={{ margin: '0 0 4px', color: theme.text, fontSize: '1.35rem' }}>My Profile</h1>
                <p style={{ margin: 0, color: theme.secondaryText, fontSize: '0.95rem' }}>
                  Keep your account details fresh and your experience tailored.
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              style={{
                padding: '10px 14px',
                border: `1px solid ${theme.border || '#ddd'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                backgroundColor: theme.cardBackground,
                color: theme.primary,
                fontWeight: '700',
                fontSize: '0.95rem',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.05)',
              }}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
            <div style={{ padding: '10px 12px', borderRadius: '12px', backgroundColor: theme.cardBackground, color: theme.secondaryText, fontSize: '0.9rem', border: `1px solid ${theme.border || '#e2e8f0'}` }}>
              <strong style={{ color: theme.text }}>Member since</strong> {memberSince}
            </div>
            <div style={{ padding: '10px 12px', borderRadius: '12px', backgroundColor: theme.cardBackground, color: theme.secondaryText, fontSize: '0.9rem', border: `1px solid ${theme.border || '#e2e8f0'}` }}>
              <strong style={{ color: theme.text }}>Status</strong> Active & synced
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          style={{
            padding: '20px',
            borderRadius: '24px',
            backgroundColor: theme.cardBackground,
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
            border: `1px solid ${theme.border || '#e2e8f0'}`,
          }}
        >
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                marginBottom: '16px',
                backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
                color: message.includes('successfully') ? '#155724' : '#721c24',
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              {message}
            </motion.div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: darkMode ? '#111827' : '#f8fbff',
                border: `1px solid ${theme.border || '#e2e8f0'}`,
                flexShrink: 0,
              }}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: theme.primary, fontSize: '1.4rem', fontWeight: '700' }}>{profileInitial}</span>
              )}
            </div>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <p style={{ margin: '0 0 4px', color: theme.text, fontWeight: '700' }}>Profile photo</p>
              <p style={{ margin: '0 0 8px', color: theme.secondaryText, fontSize: '0.95rem' }}>
                Upload a clear photo to personalize your account.
              </p>
              <label style={{ display: 'inline-block', padding: '10px 14px', borderRadius: '999px', backgroundColor: theme.primary, color: 'white', fontWeight: '700', cursor: 'pointer' }}>
                Choose photo
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
              </label>
              {avatarFileName ? <p style={{ margin: '8px 0 0', color: theme.secondaryText, fontSize: '0.9rem' }}>{avatarFileName}</p> : null}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.text }}>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.text }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: '16px', padding: '14px', borderRadius: '14px', backgroundColor: darkMode ? '#111827' : '#f8fbff', border: `1px solid ${theme.border || '#e2e8f0'}` }}>
              <p style={{ margin: '0 0 6px', color: theme.text, fontWeight: '600' }}>Account overview</p>
              <p style={{ margin: 0, color: theme.secondaryText, fontSize: '0.95rem' }}>
                Your profile stays synced with your workouts, goals, and activity history.
              </p>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '16px',
                padding: '12px 18px',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                backgroundColor: theme.primary,
                color: 'white',
                fontWeight: '700',
                fontSize: '1rem',
                width: '100%',
                boxShadow: '0 10px 24px rgba(44, 119, 244, 0.2)',
              }}
            >
              Save Changes
            </button>
          </form>

          <div style={{ marginTop: '24px', padding: '16px', borderRadius: '16px', backgroundColor: darkMode ? '#111827' : '#f8fbff', border: `1px solid ${theme.border || '#e2e8f0'}` }}>
            <h3 style={{ margin: '0 0 8px', color: theme.text }}>Change password</h3>
            <p style={{ margin: '0 0 14px', color: theme.secondaryText, fontSize: '0.95rem' }}>
              Update your password to keep your account secure.
            </p>

            {passwordMessage && (
              <div style={{ padding: '10px 12px', borderRadius: '10px', marginBottom: '12px', backgroundColor: passwordMessage.includes('successfully') ? '#d4edda' : '#f8d7da', color: passwordMessage.includes('successfully') ? '#155724' : '#721c24', fontWeight: '600' }}>
                {passwordMessage}
              </div>
            )}

            <form onSubmit={handlePasswordChange}>
              <div style={{ display: 'grid', gap: '12px' }}>
                <input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={inputStyle}
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    backgroundColor: theme.primary,
                    color: 'white',
                    fontWeight: '700',
                  }}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Profile;