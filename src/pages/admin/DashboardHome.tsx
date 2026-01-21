
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, change, color, icon }: any) => (
    <div style={{ background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 500 }}>{title}</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{value}</h3>
            {change && (
                <span style={{ fontSize: '0.75rem', color: change.includes('+') ? '#10b981' : '#f59e0b', background: change.includes('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    {change} from last week
                </span>
            )}
        </div>
        <div style={{ background: color, width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>
            {icon}
        </div>
    </div>
);

const DashboardHome = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });
    const [recentApplications, setRecentApplications] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('adminToken');
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

            try {
                // Fetch Stats
                const statsResponse = await fetch(`${apiUrl}/admin/stats`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (statsResponse.ok) {
                    const statsData = await statsResponse.json();
                    setStats(statsData);
                }

                // Fetch Recent Applications (Using index endpoint)
                const appsResponse = await fetch(`${apiUrl}/admin/applications?page=1`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (appsResponse.ok) {
                    const appsData = await appsResponse.json();
                    setRecentApplications(appsData.data.slice(0, 5));
                }

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Applicants" value={stats.total} color="#3b82f6" icon="👥" />
                <StatCard title="Pending Review" value={stats.pending} color="#f59e0b" icon="⏳" />
                <StatCard title="Approved" value={stats.approved} color="#10b981" icon="✅" />
                <StatCard title="Rejected" value={stats.rejected} color="#ef4444" icon="❌" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Recent Application Activity */}
                <div style={{ background: '#111', borderRadius: '8px', border: '1px solid #222', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>Recent Applications</h3>
                        <button onClick={() => navigate('/admin/applicants')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.9rem', cursor: 'pointer' }}>View All</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #222', textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem 0', color: '#666', fontSize: '0.85rem', fontWeight: 500 }}>Applicant</th>
                                <th style={{ padding: '0.75rem 0', color: '#666', fontSize: '0.85rem', fontWeight: 500 }}>LGA</th>
                                <th style={{ padding: '0.75rem 0', color: '#666', fontSize: '0.85rem', fontWeight: 500 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApplications.map((row: any, idx) => (
                                <tr key={idx} style={{ borderBottom: idx < 4 ? '1px solid #222' : 'none' }}>
                                    <td style={{ padding: '1rem 0', fontSize: '0.9rem', color: 'white', fontWeight: 500 }}>{row.full_name}</td>
                                    <td style={{ padding: '1rem 0', fontSize: '0.9rem', color: '#888' }}>{row.lga}</td>
                                    <td style={{ padding: '1rem 0' }}>
                                        <span style={{
                                            fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 500,
                                            background: row.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : row.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: row.status === 'Approved' ? '#10b981' : row.status === 'Pending' ? '#f59e0b' : '#ef4444'
                                        }}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Quick Actions / Notifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: '#1e293b', borderRadius: '8px', padding: '1.5rem', color: 'white' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Administrator Note</h3>
                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                            Please prioritize reviewing applications from the Lokoja district this week due to the upcoming site visit.
                        </p>
                    </div>

                    <div style={{ background: '#111', borderRadius: '8px', border: '1px solid #222', padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'white' }}>System Status</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                            <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></div>
                            <span style={{ fontSize: '0.9rem', color: '#888' }}>Application Portal Active</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></div>
                            <span style={{ fontSize: '0.9rem', color: '#888' }}>Email Service Operational</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardHome;
