import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilePreview from '../../components/FilePreview';

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
    const [previewFile, setPreviewFile] = useState<{ path: string, label: string } | null>(null);
    const [emailContent, setEmailContent] = useState('');
    const [applicants, setApplicants] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Broadcast Modal States
    const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
    const [broadcastSubject, setBroadcastSubject] = useState('');
    const [broadcastContent, setBroadcastContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSingleEmailModalOpen, setIsSingleEmailModalOpen] = useState(false);

    // Pagination State
    const [pagination, setPagination] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchApplicants = async (page = currentPage) => {
        setIsLoading(true);
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

        try {
            let query = `${apiUrl}/admin/applications?page=${page}`;
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
                setPagination({
                    current_page: data.current_page,
                    last_page: data.last_page,
                    total: data.total,
                    from: data.from,
                    to: data.to
                });
            }
        } catch (error) {
            console.error('Error fetching applicants:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchApplicants(1);
    }, [filterStatus]); // Re-fetch when filter changes

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setCurrentPage(1);
            fetchApplicants(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Handle page change
    useEffect(() => {
        fetchApplicants(currentPage);
    }, [currentPage]);


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

        setIsSending(true);
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
        } finally {
            setIsSending(false);
        }
    };

    const handleSendBroadcast = async () => {
        if (!broadcastSubject || !broadcastContent) {
            showToast('Please fill in both subject and content.', 'error');
            return;
        }

        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

        setIsSending(true);
        try {
            const response = await fetch(`${apiUrl}/admin/applications/broadcast-email`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    subject: broadcastSubject,
                    content: broadcastContent
                })
            });

            if (response.ok) {
                const result = await response.json();
                showToast(result.message || 'Broadcast email sent successfully.', 'success');
                setIsBroadcastModalOpen(false);
                setBroadcastSubject('');
                setBroadcastContent('');
            } else {
                const errData = await response.json();
                showToast(`Error: ${errData.message || 'Failed to send broadcast.'}`, 'error');
            }
        } catch (error) {
            console.error('Error sending broadcast:', error);
            showToast('A network error occurred. Please try again.', 'error');
        } finally {
            setIsSending(false);
        }
    };

    const handleSendSingleEmail = async () => {
        if (!emailSubject || !emailContent) {
            showToast('Please fill in both subject and content.', 'error');
            return;
        }

        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

        setIsSending(true);
        try {
            const response = await fetch(`${apiUrl}/admin/applications/${selectedApplicant.id}/send-email`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    subject: emailSubject,
                    content: emailContent
                })
            });

            if (response.ok) {
                showToast(`Email sent successfully to ${selectedApplicant.email}`, 'success');
                setIsSingleEmailModalOpen(false);
                setEmailSubject('');
                setEmailContent('');
            } else {
                const errData = await response.json();
                showToast(`Error: ${errData.message || 'Failed to send email.'}`, 'error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            showToast('A network error occurred. Please try again.', 'error');
        } finally {
            setIsSending(false);
        }
    };
    // View Document Helper
    // View Document Helper
    const viewDocument = (path: string | null, label: string = 'Document') => {
        if (!path) return;
        setPreviewFile({ path, label });
    };


    const handleExportCSV = async () => {
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

        showToast('Preparing export, please wait...', 'info');

        try {
            const response = await fetch(`${apiUrl}/admin/applications/export`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `applicants_export_${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                showToast('Export successful', 'success');
            } else {
                showToast('Export failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Export error:', error);
            showToast('A network error occurred during export.', 'error');
        }
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
            <div className="admin-toolbar" style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
                    <input
                        type="text"
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: '#000', color: 'white', padding: '0.6rem', border: '1px solid #333', borderRadius: '4px', flex: 1, minWidth: '150px', outline: 'none' }}
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ background: '#000', color: 'white', padding: '0.6rem', border: '1px solid #333', borderRadius: '4px', outline: 'none', minWidth: '120px' }}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setIsBroadcastModalOpen(true)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, flex: 1, whiteSpace: 'nowrap' }}>Broadcast Email</button>
                    <button onClick={handleExportCSV} style={{ background: 'white', color: 'black', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, flex: 1, whiteSpace: 'nowrap' }}>Export CSV</button>
                </div>
            </div>

            {/* Table */}
            <div className="admin-table-container">
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

            {/* Pagination Controls */}
            {pagination && pagination.last_page > 1 && (
                <div className="pagination-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222' }}>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                        Showing {pagination.from} to {pagination.to} of {pagination.total} applicants
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            style={{
                                background: '#000', color: currentPage === 1 ? '#444' : 'white', border: '1px solid #333',
                                padding: '0.5rem 1rem', borderRadius: '4px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Prev
                        </button>

                        {[...Array(pagination.last_page)].map((_, i) => {
                            const pageNum = i + 1;
                            // Show limited pages on mobile
                            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                            const showAlways = pageNum === 1 || pageNum === pagination.last_page;
                            const showNearCurrent = pageNum >= currentPage - 1 && pageNum <= currentPage + 1;

                            if (showAlways || showNearCurrent) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        style={{
                                            background: currentPage === pageNum ? 'white' : '#000',
                                            color: currentPage === pageNum ? 'black' : 'white',
                                            border: '1px solid #333',
                                            padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer',
                                            fontWeight: currentPage === pageNum ? 700 : 400
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                                if (!isMobile) return <span key={pageNum} style={{ color: '#444', alignSelf: 'center' }}>...</span>;
                            }
                            return null;
                        })}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(pagination.last_page, prev + 1))}
                            disabled={currentPage === pagination.last_page}
                            style={{
                                background: '#000', color: currentPage === pagination.last_page ? '#444' : 'white', border: '1px solid #333',
                                padding: '0.5rem 1rem', borderRadius: '4px', cursor: currentPage === pagination.last_page ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

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
                                    <div style={{ width: 'clamp(60px, 15vw, 80px)', height: 'clamp(60px, 15vw, 80px)', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '1px solid #333', flexShrink: 0 }}>
                                        {selectedApplicant.passport_photo_path ? (
                                            <img src={`${import.meta.env.VITE_API_BASE_URL || 'https://api.malivelihoodkogistateyouthprogram.com/api'}/files/preview/${selectedApplicant.passport_photo_path}`} alt="Passport" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                        ) : '👤'}
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', color: 'white' }}>{selectedApplicant.full_name}</h2>
                                        <p style={{ color: '#888', margin: '0.2rem 0', fontSize: '0.9rem' }}>{selectedApplicant.lga} State Indigene</p>
                                        <span style={{
                                            fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 500,
                                            background: selectedApplicant.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : selectedApplicant.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: selectedApplicant.status === 'Approved' ? '#10b981' : selectedApplicant.status === 'Pending' ? '#f59e0b' : '#ef4444'
                                        }}>
                                            {selectedApplicant.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="admin-grid" style={{ marginBottom: '2rem' }}>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Email</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem', wordBreak: 'break-all' }}>{selectedApplicant.email}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Phone</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.phone}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Date of Birth</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.dob} ({selectedApplicant.age} yrs)</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Gender</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.gender}</p>
                                    </div>
                                    <div style={{ gridColumn: 'span 1' }} className="full-width-on-mobile">
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Address</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.address}</p>
                                    </div>
                                    <div style={{ gridColumn: 'span 1' }} className="full-width-on-mobile">
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>State of Origin</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.state_origin}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Nationality</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.nationality}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Indigene Status</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.is_indigene} ({selectedApplicant.indigene_lga})</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Verification Method</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.verification_method}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Education Level</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.education_level}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Graduation Year</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.graduation_year}</p>
                                    </div>
                                    <div style={{ gridColumn: 'span 1' }} className="full-width-on-mobile">
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Institution</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.institution}</p>
                                    </div>
                                    <div style={{ gridColumn: 'span 1' }} className="full-width-on-mobile">
                                        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Field of Study</p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.field_of_study}</p>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #222', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '0.95rem', color: 'white', marginBottom: '1rem' }}>Experience & Skills</h4>
                                    <div className="admin-grid">
                                        <div>
                                            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Has Experience?</p>
                                            <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.has_experience}</p>
                                        </div>
                                        <div>
                                            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Skills</p>
                                            <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>{selectedApplicant.skills}</p>
                                        </div>
                                        <div style={{ gridColumn: 'span 1' }} className="full-width-on-mobile">
                                            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Experience Description</p>
                                            <p style={{ color: 'white', fontWeight: 500, lineHeight: '1.5', fontSize: '0.9rem' }}>{selectedApplicant.experience_desc}</p>
                                        </div>
                                        <div style={{ gridColumn: 'span 1' }} className="full-width-on-mobile">
                                            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Vocational Training</p>
                                            <p style={{ color: 'white', fontWeight: 500, lineHeight: '1.5', fontSize: '0.9rem' }}>{selectedApplicant.vocational_training || 'N/A'}</p>
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
                                        <div key={doc.label} style={{ border: '1px dashed #444', padding: '1rem', borderRadius: '4px', textAlign: 'center', flex: 1, minWidth: '100px', cursor: doc.path ? 'pointer' : 'default' }} onClick={() => viewDocument(doc.path, doc.label)}>
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

                                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #222', paddingTop: '1.5rem', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => {
                                            setEmailSubject('');
                                            setEmailContent(`Dear ${selectedApplicant.full_name},\n\n`);
                                            setIsSingleEmailModalOpen(true);
                                        }}
                                        style={{ flex: '1 1 100%', padding: '0.8rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginBottom: '0.5rem' }}
                                    >
                                        Send Custom Email
                                    </button>
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

            {/* Broadcast Email Modal */}
            <AnimatePresence>
                {isBroadcastModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => setIsBroadcastModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: '#111', width: '90%', maxWidth: '600px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ padding: '1.5rem', background: '#3b82f6', color: 'white' }}>
                                <h3 style={{ margin: 0 }}>Broadcast Email to All Applicants</h3>
                                <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>This will send an email to every registered user.</p>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#888' }}>Broadcast Subject</label>
                                    <input
                                        type="text"
                                        value={broadcastSubject}
                                        onChange={(e) => setBroadcastSubject(e.target.value)}
                                        placeholder="Enter subject..."
                                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #333', borderRadius: '4px', background: '#000', color: 'white' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#888' }}>Message Content</label>
                                    <textarea
                                        value={broadcastContent}
                                        onChange={(e) => setBroadcastContent(e.target.value)}
                                        placeholder="Enter your message here..."
                                        rows={10}
                                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #333', borderRadius: '4px', fontFamily: 'inherit', background: '#000', color: 'white' }}
                                    ></textarea>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                    <button onClick={() => setIsBroadcastModalOpen(false)} style={{ background: '#222', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                    <button
                                        onClick={handleSendBroadcast}
                                        disabled={isSending}
                                        style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, opacity: isSending ? 0.5 : 1 }}
                                    >
                                        {isSending ? 'Sending...' : 'Send Broadcast'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Single Custom Email Modal */}
            <AnimatePresence>
                {isSingleEmailModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => setIsSingleEmailModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: '#111', width: '90%', maxWidth: '600px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ padding: '1.5rem', background: '#3b82f6', color: 'white' }}>
                                <h3 style={{ margin: 0 }}>Send Custom Email</h3>
                                <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>To: {selectedApplicant?.email}</p>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#888' }}>Email Subject</label>
                                    <input
                                        type="text"
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        placeholder="Enter subject..."
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
                                    <button onClick={() => setIsSingleEmailModalOpen(false)} style={{ background: '#222', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                                    <button
                                        onClick={handleSendSingleEmail}
                                        disabled={isSending}
                                        style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, opacity: isSending ? 0.5 : 1 }}
                                    >
                                        {isSending ? 'Sending...' : 'Send Email'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Email Action Modal (for Status Changes) */}
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
                                    <button
                                        onClick={handleSendAction}
                                        disabled={isSending}
                                        style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, opacity: isSending ? 0.5 : 1 }}
                                    >
                                        {isSending ? 'Processing...' : 'Confirm & Send Email'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* File Preview Modal */}
            <AnimatePresence>
                {previewFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}
                        onClick={() => setPreviewFile(null)}
                    >
                        <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '900px' }}>
                            <FilePreview
                                filename={previewFile.path}
                                label={previewFile.label}
                                onClose={() => setPreviewFile(null)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ApplicantsList;
