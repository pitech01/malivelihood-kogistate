import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ApplicantsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    // Toast State
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };
    const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
    const [actionType, setActionType] = useState<string | null>(null); // 'Approve' | 'Reject' | null
    const [emailContent, setEmailContent] = useState('');
    const [applicants, setApplicants] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchApplicants = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

        try {
            let query = `${apiUrl}/admin/applications?page=1`;
            if (filterStatus !== 'All') {
                query += `&status=${filterStatus}`;
            }
            if (searchTerm) {
                query += `&search=${searchTerm}`;
            }

            const response = await fetch(query, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setApplicants(data.data);
            }
        } catch (error) {
            console.error('Error fetching applicants:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, [filterStatus]); // Re-fetch when filter changes

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchApplicants();
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);


    const [emailSubject, setEmailSubject] = useState('');

    const openActionModal = (type: string) => {
        setActionType(type);

        if (type === 'Approve') {
            setEmailSubject('Application Approved - Kogi State Youth Empowerment');
            setEmailContent(`Dear ${selectedApplicant.full_name},\n\nWe are pleased to inform you that your application for the Kogi State Youth Empowerment Programme has been APPROVED.\n\nNext steps will be communicated shortly.\n\nBest Regards,\nAdmin Team`);
        } else {
            setEmailSubject('Application Update - Kogi State Youth Empowerment');
            setEmailContent(`Dear ${selectedApplicant.full_name},\n\nThank you for your interest. After careful review, we regret to inform you that your application was not successful at this time.\n\nWe encourage you to apply for future opportunities.\n\nBest Regards,\nAdmin Team`);
        }
    };

    const handleSendAction = async () => {
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
        const newStatus = actionType === 'Approve' ? 'Approved' : 'Rejected';

        try {
            const response = await fetch(`${apiUrl}/admin/applications/${selectedApplicant.id}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    status: newStatus,
                    subject: emailSubject,
                    content: emailContent
                })
            });

            if (response.ok) {
                // Better UI feedback could be implemented (e.g., Toast), for now using a clearer alert message
                showToast(`SUCCESS: Applicant has been ${newStatus}. Email notification has been sent.`, 'success');
                setActionType(null);
                setSelectedApplicant(null);
                fetchApplicants(); // Refresh list
            } else {
                const errData = await response.json();
                showToast(`Error: ${errData.message || 'Failed to update status.'}`, 'error');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            showToast('A network error occurred. Please try again.', 'error');
        }
    };
    // View Document Helper
    const viewDocument = (path: string | null) => {
        if (!path) return;
        let baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
        baseUrl = baseUrl.replace(/\/api\/?$/, ''); // Remove '/api' or '/api/' from the end
        window.open(`${baseUrl}/storage/${path}`, '_blank');
    };


    const handleExportCSV = () => {
        if (!applicants.length) {
            showToast('No data to export', 'info');
            return;
        }

        const headers = ["Reference ID", "Full Name", "Email", "Phone", "Status", "LGA", "Created At"];
        const csvContent = [
            headers.join(","),
            ...applicants.map(app => [
                app.reference_id,
                `"${app.full_name}"`,
                app.email,
                app.phone,
                app.status,
                app.lga,
                new Date(app.created_at).toLocaleDateString()
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `applicants_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            {/* Custom Toast Notification */}
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
                    <button onClick={handleExportCSV} style={{ background: 'white', color: 'black', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Export CSV</button>
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
                        {isLoading ? (
                            <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading applicants...</td></tr>
                        ) : applicants.length === 0 ? (
                            <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No applicants found.</td></tr>
                        ) : (
                            applicants.map((app) => (
                                <tr key={app.id} style={{ borderBottom: '1px solid #222' }}>
                                    <td style={{ padding: '1rem', color: 'white', fontWeight: 500 }}>
                                        {app.full_name}
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>Ref: {app.reference_id}</div>
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
                            ))
                        )}
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
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '1px solid #333' }}>
                                        {selectedApplicant.passport_photo_path ? (
                                            <img src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/storage/${selectedApplicant.passport_photo_path}`} alt="Passport" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                        ) : '👤'}
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>{selectedApplicant.full_name}</h2>
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
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.dob} ({selectedApplicant.age} yrs)</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Gender</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.gender}</p>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Address</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.address}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>State of Origin</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.state_origin}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Nationality</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.nationality}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Indigene Status</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.is_indigene} ({selectedApplicant.indigene_lga})</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Verification Method</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.verification_method}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Education Level</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.education_level}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Graduation Year</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.graduation_year}</p>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Institution</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.institution}</p>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Field of Study</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.field_of_study}</p>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #222', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '1rem', color: 'white', marginBottom: '1rem' }}>Experience & Skills</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Has Experience?</p>
                                            <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.has_experience}</p>
                                        </div>
                                        <div>
                                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Skills</p>
                                            <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.skills}</p>
                                        </div>
                                        <div style={{ gridColumn: 'span 2' }}>
                                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Experience Description</p>
                                            <p style={{ color: 'white', fontWeight: 500, lineHeight: '1.5' }}>{selectedApplicant.experience_desc}</p>
                                        </div>
                                        <div style={{ gridColumn: 'span 2' }}>
                                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Vocational Training</p>
                                            <p style={{ color: 'white', fontWeight: 500, lineHeight: '1.5' }}>{selectedApplicant.vocational_training || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #222', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '1rem', color: 'white', marginBottom: '1rem' }}>Motivation Essay</h4>
                                    <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '4px', border: '1px solid #222', maxHeight: '200px', overflowY: 'auto' }}>
                                        <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{selectedApplicant.essay}</p>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #222', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '1rem', color: 'white', marginBottom: '1rem' }}>Declarations</h4>
                                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Available for Training?</p>
                                            <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.available}</p>
                                        </div>
                                        <div>
                                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Willing to Comply?</p>
                                            <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.comply}</p>
                                        </div>
                                        <div>
                                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Willing to Relocate?</p>
                                            <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.relocate}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Declarant Name & Date</p>
                                        <p style={{ color: 'white', fontWeight: 500 }}>{selectedApplicant.declaration_name} - {selectedApplicant.declaration_date}</p>
                                    </div>
                                </div>

                                <h4 style={{ fontSize: '1rem', color: 'white', borderBottom: '1px solid #222', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Uploaded Documents</h4>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                    {[
                                        { label: 'ID Card', path: selectedApplicant.id_card_path },
                                        { label: 'Indigene Cert', path: selectedApplicant.indigene_proof_path },
                                        { label: 'Resume', path: selectedApplicant.cv_path },
                                        { label: 'Video', path: selectedApplicant.video_path }
                                    ].map((doc) => (
                                        <div key={doc.label} style={{ border: '1px dashed #444', padding: '1rem', borderRadius: '4px', textAlign: 'center', flex: 1, minWidth: '100px', cursor: doc.path ? 'pointer' : 'default' }} onClick={() => viewDocument(doc.path)}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{doc.label === 'Video' ? '🎥' : '📄'}</div>
                                            <p style={{ fontSize: '0.85rem', color: '#888' }}>{doc.label}</p>
                                            {doc.path ? (
                                                <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>View</span>
                                            ) : (
                                                <span style={{ fontSize: '0.8rem', color: '#444' }}>Not Uploaded</span>
                                            )}
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
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
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
