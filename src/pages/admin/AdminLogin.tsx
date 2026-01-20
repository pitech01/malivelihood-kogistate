import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/malivelihood_kogi_logo.png';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Mock authentication
        setTimeout(() => {
            if (credentials.email === 'admin@kogi.gov.ng' && credentials.password === 'admin123') {
                localStorage.setItem('adminAuth', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid credentials. Please try again.');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif"
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: '#111',
                    padding: '3rem',
                    borderRadius: '8px',
                    border: '1px solid #222',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <img src={logo} alt="Kogi State Logo" style={{ height: '50px', marginBottom: '1.5rem' }} />
                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>Admin Portal</h2>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>Sign in to manage the empowerment programme</p>

                {error && <div style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'left', border: '1px solid #ef4444' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.2rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#ccc', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            style={{
                                width: '100%', padding: '0.75rem',
                                border: '1px solid #333', borderRadius: '4px',
                                outline: 'none', transition: 'border 0.2s',
                                fontSize: '0.95rem',
                                background: '#0a0a0a',
                                color: 'white'
                            }}
                            placeholder="e.g. admin@kogi.gov.ng"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#ccc', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            style={{
                                width: '100%', padding: '0.75rem',
                                border: '1px solid #333', borderRadius: '4px',
                                outline: 'none', transition: 'border 0.2s',
                                fontSize: '0.95rem',
                                background: '#0a0a0a',
                                color: 'white'
                            }}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'white',
                            color: 'black',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 600,
                            cursor: isLoading ? 'wait' : 'pointer',
                            transition: 'background 0.2s'
                        }}
                    >
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#666' }}>
                    <p>Protected System. Authorized Personnel Only.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
