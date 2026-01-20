import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const MOCK_APPLICANTS = [
    { id: 1, name: 'Ibrahim Musa', email: 'ibrahim.m@example.com', phone: '08012345678', age: 24, lga: 'Lokoja', status: 'Pending', date: '2024-10-24', photo: null },
    { id: 2, name: 'Sarah Adebayo', email: 'sarah.a@example.com', phone: '08098765432', age: 22, lga: 'Okene', status: 'Approved', date: '2024-10-24', photo: null },
    { id: 3, name: 'Emmanuel Ojo', email: 'emmanuel.o@example.com', phone: '07011223344', age: 26, lga: 'Kabba', status: 'Rejected', date: '2024-10-23', photo: null },
    { id: 4, name: 'Fatima Yusuf', email: 'fatima.y@example.com', phone: '08123456789', age: 23, lga: 'Dekina', status: 'Pending', date: '2024-10-23', photo: null },
    { id: 5, name: 'John Doe', email: 'john.d@example.com', phone: '09087654321', age: 25, lga: 'Idah', status: 'Approved', date: '2024-10-22', photo: null },
    { id: 6, name: 'Amina Mohammed', email: 'amina.m@example.com', phone: '08055555555', age: 21, lga: 'Ankpa', status: 'Pending', date: '2024-10-21', photo: null },
];

const ApplicantsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
    const [actionType, setActionType] = useState<string | null>(null); // 'Approve' | 'Reject' | null
    const [emailContent, setEmailContent] = useState('');

    const filteredApplicants = MOCK_APPLICANTS.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const openActionModal = (type: string) => {
        setActionType(type);
        if (type === 'Approve') {
            setEmailContent(`Dear ${selectedApplicant.name},\n\nWe are pleased to inform you that your application for the Kogi State Youth Empowerment Programme has been APPROVED.\n\nNext steps will be communicated shortly.\n\nBest Regards,\nAdmin Team`);
        } else {
            setEmailContent(`Dear ${selectedApplicant.name},\n\nThank you for your interest. After careful review, we regret to inform you that your application was not successful at this time.\n\nWe encourage you to apply for future opportunities.\n\nBest Regards,\nAdmin Team`);
        }
    };

    const handleSendAction = () => {
        alert(`${actionType} email sent to ${selectedApplicant.name}!`);
        setActionType(null);
        setSelectedApplicant(null);
    };

    return (
        <div>
            {/* Toolbar */}
            <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                    <input
                        type="text"
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: '#000', color: 'white', padding: '0.6rem', border: '1px solid #333', borderRadius: '4px', width: '300px', outline: 'none' }}
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ background: '#000', color: 'white', padding: '0.6rem', border: '1px solid #333', borderRadius: '4px', outline: 'none' }}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div>
                    <button style={{ background: 'white', color: 'black', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Export CSV</button>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: '#111', borderRadius: '8px', border: '1px solid #222', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#0a0a0a' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#888', fontSize: '0.85rem', fontWeight: 600 }}>Full Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#888', fontSize: '0.85rem', fontWeight: 600 }}>Contact</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#888', fontSize: '0.85rem', fontWeight: 600 }}>LGA</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#888', fontSize: '0.85rem', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: '#888', fontSize: '0.85rem', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplicants.map((app) => (
                            <tr key={app.id} style={{ borderBottom: '1px solid #222' }}>
                                <td style={{ padding: '1rem', color: 'white', fontWeight: 500 }}>
                                    {app.name}
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Age: {app.age}</div>
                                </td>
                                <td style={{ padding: '1rem', color: '#888', fontSize: '0.9rem' }}>
                                    {app.email}<br />{app.phone}
                                </td>
                                <td style={{ padding: '1rem', color: '#888', fontSize: '0.9rem' }}>{app.lga}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 500,
                                        background: app.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : app.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: app.status === 'Approved' ? '#10b981' : app.status === 'Pending' ? '#f59e0b' : '#ef4444'
                                    }}>
                                        {app.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => setSelectedApplicant(app)}
                                        style={{ background: 'black', border: '1px solid #333', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', color: '#ccc' }}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Applicant Detail Modal */}
            <AnimatePresence>
                {selectedApplicant && !actionType && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => setSelectedApplicant(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            style={{ background: '#111', width: '90%', maxWidth: '700px', borderRadius: '8px', overflow: 'hidden', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #333' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, color: 'white' }}>Applicant Profile</h3>
                                <button onClick={() => setSelectedApplicant(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}>&times;</button>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '1px solid #333' }}>👤</div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>{selectedApplicant.name}</h2>
                                        <p style={{ color: '#888', margin: '0.2rem 0' }}>{selectedApplicant.lga} State Indigene</p>
                                        <span style={{
                                            fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 500,
                                            background: selectedApplicant.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : selectedApplicant.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: selectedApplicant.status === 'Approved' ? '#10b981' : selectedApplicant.status === 'Pending' ? '#f59e0b' : '#ef4444'
                                        }}>
                                            {selectedApplicant.status}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Email</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.email}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Phone</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.phone}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Date of Birth</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>1999-05-12 ({selectedApplicant.age} yrs)</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Applied On</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.date}</p>
                                    </div>
                                </div>

                                <h4 style={{ fontSize: '1rem', color: 'white', borderBottom: '1px solid #222', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Uploaded Documents</h4>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                    {['ID Card', 'Indigene Cert', 'Resume'].map((doc) => (
                                        <div key={doc} style={{ border: '1px dashed #444', padding: '1rem', borderRadius: '4px', textAlign: 'center', flex: 1 }}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📄</div>
                                            <p style={{ fontSize: '0.85rem', color: '#888' }}>{doc}</p>
                                            <a href="#" style={{ fontSize: '0.8rem', color: '#3b82f6', textDecoration: 'none' }}>View</a>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #222', paddingTop: '1.5rem' }}>
                                    <button
                                        onClick={() => openActionModal('Approve')}
                                        style={{ flex: 1, padding: '0.8rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                                    >
                                        Approve Applicant
                                    </button>
                                    <button
                                        onClick={() => openActionModal('Reject')}
                                        style={{ flex: 1, padding: '0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                                    >
                                        Reject Applicant
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Email Action Modal */}
            <AnimatePresence>
                {actionType && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => setActionType(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: '#111', width: '90%', maxWidth: '600px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ padding: '1.5rem', background: actionType === 'Approve' ? '#10b981' : '#ef4444', color: 'white' }}>
                                <h3 style={{ margin: 0 }}>{actionType} Applicant</h3>
                                <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Sending notification to {selectedApplicant?.email}</p>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#888' }}>Email Subject</label>
                                    <input
                                        type="text"
                                        defaultValue={actionType === 'Approve' ? 'Application Approved - Kogi State Empowerment' : 'Application Update - Kogi State Empowerment'}
                                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #333', borderRadius: '4px', background: '#000', color: 'white' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#888' }}>Message Content</label>
                                    <textarea
                                        value={emailContent}
                                        onChange={(e) => setEmailContent(e.target.value)}
                                        rows={8}
                                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #333', borderRadius: '4px', fontFamily: 'inherit', background: '#000', color: 'white' }}
                                    ></textarea>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                    <button onClick={() => setActionType(null)} style={{ background: '#222', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                    <button onClick={handleSendAction} style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                                        Confirm & Send Email
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ApplicantsList;
