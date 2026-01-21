import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
    // User State
    const [user, setUser] = useState({
        name: '',
        email: ''
    });
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Load User Data
    useEffect(() => {
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser({ name: parsed.name, email: parsed.email });
        }
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingProfile(true);
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

        try {
            const response = await fetch(`${apiUrl}/user/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                showToast('Profile updated successfully', 'success');
                localStorage.setItem('adminUser', JSON.stringify(data.user));
            } else {
                showToast(data.message || 'Failed to update profile', 'error');
            }
        } catch (error) {
            showToast('An error occurred', 'error');
        } finally {
            setIsLoadingProfile(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.password !== passwordData.password_confirmation) {
            showToast('New passwords do not match', 'error');
            return;
        }

        setIsLoadingPassword(true);
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

        try {
            const response = await fetch(`${apiUrl}/user/password`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(passwordData)
            });

            const data = await response.json();

            if (response.ok) {
                showToast('Password updated successfully', 'success');
                setPasswordData({ current_password: '', password: '', password_confirmation: '' });
            } else {
                showToast(data.message || 'Failed to update password', 'error');
            }
        } catch (error) {
            showToast('An error occurred', 'error');
        } finally {
            setIsLoadingPassword(false);
        }
    };

    return (
        <div>
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        style={{
                            position: 'fixed',
                            top: '20px',
                            left: '50%',
                            background: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            zIndex: 1000,
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '⚠️' : 'ℹ️'}</span>
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '2rem' }}>Settings</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Profile Settings */}
                <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #222' }}>
                    <h2 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1.5rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>Profile Information</h2>
                    <form onSubmit={handleProfileUpdate}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
                            />
                        </div>
                        <button type="submit" disabled={isLoadingProfile} style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', opacity: isLoadingProfile ? 0.7 : 1 }}>
                            {isLoadingProfile ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>

                {/* Password Settings */}
                <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #222' }}>
                    <h2 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1.5rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>Update Password</h2>
                    <form onSubmit={handlePasswordUpdate}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Current Password</label>
                            <input
                                type="password"
                                value={passwordData.current_password}
                                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>New Password</label>
                            <input
                                type="password"
                                value={passwordData.password}
                                onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordData.password_confirmation}
                                onChange={(e) => setPasswordData({ ...passwordData, password_confirmation: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
                            />
                        </div>
                        <button type="submit" disabled={isLoadingPassword} style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', opacity: isLoadingPassword ? 0.7 : 1 }}>
                            {isLoadingPassword ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
