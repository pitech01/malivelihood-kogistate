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

    if (isLoading) {
        return <Preloader onComplete={() => setIsLoading(false)} />;
    }

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <Icons.Dashboard /> },
        { name: 'Applicants', path: '/admin/applicants', icon: <Icons.Users /> },
        { name: 'Email Templates', path: '/admin/templates', icon: <Icons.Mail /> },
        { name: 'Settings', path: '/admin/settings', icon: <Icons.Settings /> },
    ];

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('adminAuth');
            navigate('/admin-login');
        }
    };

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
            `}</style>

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
                    <button onClick={handleLogout} style={{
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
                <header style={{
                    height: '70px',
                    background: '#0a0a0a',
                    borderBottom: '1px solid #222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 5
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                        <div style={{ position: 'relative', cursor: 'pointer', color: '#999' }}>
                            <Icons.Bell />
                            <span style={{
                                position: 'absolute', top: '-5px', right: '-5px',
                                background: 'white', color: 'black',
                                fontSize: '0.6rem', padding: '2px 5px', borderRadius: '10px',
                                fontWeight: 'bold'
                            }}>3</span>
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
