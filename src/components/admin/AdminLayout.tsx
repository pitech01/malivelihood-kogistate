import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Preloader from '../Preloader';
import logo from '../../assets/malivelihood_kogi_logo.png';

// SVG Icons
const Icons = {
    Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
    Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    LogOut: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
    Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
};

const AdminLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    // Notifications state
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    // Fetch Notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('adminToken');
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
            try {
                const response = await fetch(`${apiUrl}/admin/notifications`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        };
        fetchNotifications();
    }, [location.pathname]);

    // Close notifications on outside click (simple version)
    useEffect(() => {
        const handleClickOutside = () => setIsNotificationsOpen(false);
        if (isNotificationsOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isNotificationsOpen]);



    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <Icons.Dashboard /> },
        { name: 'Applicants', path: '/admin/applicants', icon: <Icons.Users /> },
        { name: 'Settings', path: '/admin/settings', icon: <Icons.Settings /> },
    ];

    // Logout Modal State
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Import motion (assuming framer-motion is used elsewhere, if not we'll use inline styles/css transitions, 
    // but based on previous context, framer-motion is available. If not, I'll fallback to conditionally rendering with simple styles.)
    // Importing motion at the top: import { motion, AnimatePresence } from 'framer-motion'; 
    // NOTE for tool: I cannot change imports easily here without a multi-chunk replace. 
    // I will assume AnimatePresence/motion are available or I will add them if needed. 
    // Actually, looking at the file imports, they are NOT imported. 
    // I will use standard React conditional rendering with inline styles for simplicity and reliability if imports are tricky, 
    // OR I will fix imports in a separate call. 
    // Wait, the USER request asks to "make the ui better", so animations are good.
    // I will add the import in a separate block if I can, or use style injection.
    // Let's stick to inline styles with a simple transition class for now or assume I can add the import.
    // I will use a simple overlay system similar to the notifications or the existing sidebar overlay, but center aligned.

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = async () => {
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
        try {
            await fetch(`${apiUrl}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            localStorage.removeItem('adminAuth');
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            navigate('/admin-login');
        }
    };

    if (isLoading) {
        return <Preloader onComplete={() => setIsLoading(false)} />;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#050505', color: 'white', fontFamily: "'Inter', sans-serif" }}>

            <style>{`
                @media (max-width: 768px) {
                    .admin-sidebar {
                        transform: translateX(-100%);
                    }
                    .admin-sidebar.open {
                        transform: translateX(0);
                    }
                    .admin-main {
                        margin-left: 0 !important;
                    }
                    .mobile-menu-btn {
                        display: block !important;
                    }
                }
                .admin-sidebar {
                    transition: transform 0.3s ease-in-out;
                }
                .mobile-menu-btn {
                    display: none;
                }
                /* Modal Animation */
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>

            {/* Logout Modal */}
            {isLogoutModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'fadeIn 0.2s ease-out'
                }} onClick={() => setIsLogoutModalOpen(false)}>
                    <div style={{
                        background: '#111', border: '1px solid #222', borderRadius: '12px',
                        padding: '2rem', width: '90%', maxWidth: '400px',
                        textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        animation: 'scaleIn 0.2s ease-out'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{
                            width: '60px', height: '60px', background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem', color: '#ef4444'
                        }}>
                            <Icons.LogOut />
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem', color: 'white', fontSize: '1.25rem' }}>Log out?</h3>
                        <p style={{ margin: '0 0 1.5rem', color: '#888', lineHeight: '1.5' }}>
                            Are you sure you want to log out of the admin panel? You will need to sign in again to access the dashboard.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: '6px', border: '1px solid #333',
                                    background: 'transparent', color: 'white', fontWeight: 500, cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#222'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                style={{
                                    flex: 1, padding: '0.8rem', borderRadius: '6px', border: 'none',
                                    background: '#ef4444', color: 'white', fontWeight: 500, cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#dc2626'}
                                onMouseOut={(e) => e.currentTarget.style.background = '#ef4444'}
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 9 }}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}
                style={{
                    width: '260px',
                    background: '#0a0a0a',
                    borderRight: '1px solid #222',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    height: '100vh',
                    zIndex: 10,
                    top: 0,
                    left: 0
                }}>
                <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img src={logo} alt="Logo" style={{ height: '32px' }} />
                        <div>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0, color: 'white' }}>KOGI STATE</h3>
                            <p style={{ fontSize: '0.7rem', color: '#666', margin: 0 }}>Empowerment Admin</p>
                        </div>
                    </div>
                    {/* Close Button mobile */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <Icons.Close />
                    </button>
                </div>

                <nav style={{ padding: '1.5rem 1rem', flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {menuItems.map((item) => (
                            <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                                <Link to={item.path} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    padding: '0.8rem 1rem',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                    color: location.pathname === item.path ? 'black' : '#888',
                                    background: location.pathname === item.path ? 'white' : 'transparent',
                                    transition: 'all 0.2s',
                                    fontWeight: location.pathname === item.path ? 600 : 400
                                }}>
                                    <span style={{ display: 'flex' }}>{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #222' }}>
                    <button onClick={handleLogoutClick} style={{
                        display: 'flex', alignItems: 'center', gap: '0.8rem',
                        background: 'transparent', border: 'none', color: '#666',
                        cursor: 'pointer', width: '100%', padding: '0.5rem 0',
                        transition: 'color 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                        <Icons.LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main" style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

                {/* Topbar */}
                <header style={{ height: '70px', background: '#0a0a0a', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* ... mobile menu btn + title ... */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsSidebarOpen(true)}
                            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, display: 'flex' }}
                        >
                            <Icons.Menu />
                        </button>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', margin: 0 }}>
                            {menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                        </h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        {/* Notification Bell */}
                        <div
                            style={{ position: 'relative', cursor: 'pointer', color: '#999' }}
                            onClick={(e) => { e.stopPropagation(); setIsNotificationsOpen(!isNotificationsOpen); }}
                        >
                            <Icons.Bell />
                            {notifications.length > 0 && (
                                <span style={{
                                    position: 'absolute', top: '-5px', right: '-5px',
                                    background: 'white', color: 'black',
                                    fontSize: '0.6rem', padding: '2px 5px', borderRadius: '10px',
                                    fontWeight: 'bold'
                                }}>{notifications.length}</span>
                            )}

                            {/* Dropdown */}
                            {isNotificationsOpen && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        position: 'absolute', top: '140%', right: '-10px',
                                        width: '320px', background: '#0a0a0a', border: '1px solid #222',
                                        borderRadius: '8px', zIndex: 100,
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.8)', overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111' }}>
                                        <h4 style={{ margin: 0, color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>Notifications</h4>
                                    </div>
                                    <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                        {notifications.length === 0 ? (
                                            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                                <p style={{ margin: 0 }}>No new notifications</p>
                                            </div>
                                        ) : (
                                            notifications.map(notif => (
                                                <div key={notif.id} style={{
                                                    padding: '1rem', borderBottom: '1px solid #222',
                                                    cursor: 'default', transition: 'background 0.2s',
                                                    display: 'flex', gap: '10px'
                                                }}>
                                                    <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', marginTop: '6px' }}></div>
                                                    <div>
                                                        <p style={{ margin: '0 0 0.3rem', color: '#e5e5e5', fontSize: '0.85rem', lineHeight: '1.4' }}>
                                                            New application received from <strong>{notif.full_name}</strong>
                                                        </p>
                                                        <p style={{ margin: 0, color: '#666', fontSize: '0.75rem' }}>
                                                            {new Date(notif.created_at).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500, color: 'white', whiteSpace: 'nowrap', display: 'none' }}>Admin User</p>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#666', whiteSpace: 'nowrap', display: 'none' }}>Super Admin</p>
                            </div>
                            <div style={{ width: '35px', height: '35px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, border: '1px solid #333' }}>A</div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </div>

            </main>
        </div>
    );
};

export default AdminLayout;
