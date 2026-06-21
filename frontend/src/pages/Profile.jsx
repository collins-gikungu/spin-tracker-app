import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '../components/AppLayout';
import API from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const Profile = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
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
      setProfile(response.data.user);
      setUsername(response.data.user.username);
      setEmail(response.data.user.email);
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
        email
      });

      setProfile(response.data.user);
      setMessage('Profile updated successfully 🚴');
      
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error(error);
      setMessage('Update failed');
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  if (loading) {
    return (
      <AppLayout onLogout={onLogout} theme={theme}>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ color: theme.text }}>Loading profile...</h2>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout onLogout={onLogout} theme={theme}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ color: theme.text }}>My Profile 🚴</h1>
            <p style={{ color: theme.text }}>
              Manage your account details and preferences
            </p>
          </div>
          <button
            onClick={toggleTheme}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: theme.cardBackground,
              color: theme.primary,
              fontWeight: 'bold',
            }}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '30px',
            borderRadius: '12px',
            backgroundColor: theme.cardBackground,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.border || '#eee'}`,
          }}
        >
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
                color: message.includes('successfully') ? '#155724' : '#721c24',
                textAlign: 'center'
              }}
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: theme.text }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border || '#ddd'}`,
                  backgroundColor: theme.input || '#fff',
                  color: theme.text,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: theme.text }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border || '#ddd'}`,
                  backgroundColor: theme.input || '#fff',
                  color: theme.text,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: theme.text }}>
                <strong>Member Since:</strong>{' '}
                {new Date(profile?.created_at).toLocaleDateString()}
              </p>
            </div>

            <button
              type="submit"
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: theme.primary,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Save Changes
            </button>
          </form>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Profile;