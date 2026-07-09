import React, { useState } from 'react';

interface FilePreviewProps {
    filename: string;
    label?: string;
    onClose?: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ filename, label, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.malivelihoodkogistateyouthprogram.com/api';
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');

    // Construct preview URL
    const previewUrl = `${cleanBaseUrl}/files/preview/${filename}`;

    const getFileType = (name: string) => {
        if (!name) return 'other';
        const ext = name.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
        if (['pdf'].includes(ext || '')) return 'pdf';
        return 'other';
    };

    const fileType = getFileType(filename);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    const handleDownload = () => {
        window.open(previewUrl, '_blank');
    };

    // Styles
    const styles = {
        container: {
            background: '#111',
            borderRadius: '12px',
            overflow: 'hidden',
            width: '100%', // Mobile first: full width
            maxWidth: '1000px', // Larger max width for desktop
            margin: '0 auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid #222',
            display: 'flex',
            flexDirection: 'column' as const,
            maxHeight: '90vh',
            minHeight: '400px',
        },
        header: {
            padding: '12px 16px',
            borderBottom: '1px solid #222',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(4px)',
            zIndex: 10,
        },
        headerTitle: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            overflow: 'hidden',
        },
        iconBox: {
            background: '#222',
            padding: '6px',
            borderRadius: '6px',
            color: '#888',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleText: {
            color: 'white',
            fontWeight: 500,
            fontSize: '1rem',
            whiteSpace: 'nowrap' as const,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        headerActions: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        downloadBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            background: 'transparent',
            color: '#888',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s',
        } as React.CSSProperties,
        closeBtn: {
            background: '#222',
            color: '#888',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginLeft: '8px',
        },
        contentArea: {
            background: '#000',
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative' as const,
            minHeight: '300px',
        },
        spinner: {
            border: '3px solid #333',
            borderTop: '3px solid #fff',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            animation: 'spin 1s linear infinite',
            marginBottom: '12px',
        },
        errorCard: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem',
            textAlign: 'center' as const,
            color: 'white',
        },
        bigButton: {
            background: 'white',
            color: 'black',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '24px',
            fontSize: '1rem',
            transition: 'background 0.2s',
        },
    };

    const renderSpinner = () => (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <div style={styles.spinner}></div>
            <span style={{ fontSize: '0.85rem' }}>Loading Preview...</span>
        </div>
    );

    const renderContent = () => {
        if (!filename) {
            return (
                <div style={styles.errorCard}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
                    <p style={{ color: '#888' }}>No file specified.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div style={styles.errorCard}>
                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.8 }}>📄</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Review Document</h3>
                    <p style={{ color: '#888', maxWidth: '300px', lineHeight: 1.5 }}>
                        This file cannot be previewed directly in the browser or failed to load.
                    </p>
                </div>
            );
        }

        switch (fileType) {
            case 'image':
                return (
                    <div style={{ ...styles.contentArea, overflow: 'hidden' }}>
                        {loading && renderSpinner()}
                        <img
                            src={previewUrl}
                            alt={label || 'Document Preview'}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                                opacity: loading ? 0 : 1,
                                transition: 'opacity 0.3s ease'
                            }}
                            onLoad={handleLoad}
                            onError={handleError}
                        />
                    </div>
                );
            case 'pdf':
                return (
                    <div style={{ ...styles.contentArea, height: '80vh', display: 'block' }}>
                        {loading && renderSpinner()}
                        <iframe
                            src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                            style={{ width: '100%', height: '100%', border: 'none', display: loading ? 'none' : 'block' }}
                            title={label || 'PDF Preview'}
                            onLoad={handleLoad}
                            onError={handleError}
                        />
                    </div>
                );
            default:
                // Effectively force error state to show download button content for default types
                return (
                    <div style={styles.errorCard}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#3b82f6', opacity: 0.8 }}>📎</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{label || 'File'} ({fileType.toUpperCase()})</h3>
                        <p style={{ color: '#888', maxWidth: '300px', lineHeight: 1.5 }}>
                            This file type is best viewed by downloading it directly to your device.
                        </p>
                        <button
                            onClick={handleDownload}
                            style={styles.bigButton}
                        >
                            <span>Download {fileType.toUpperCase()}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 13L12 16L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                );
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerTitle}>
                    <div style={styles.iconBox}>
                        {fileType === 'pdf' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        ) : fileType === 'image' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                        )}
                    </div>
                    <h3 style={styles.titleText}>
                        {label || 'Document Preview'}
                    </h3>
                </div>

                <div style={styles.headerActions}>
                    {onClose && (
                        <button
                            onClick={onClose}
                            style={styles.closeBtn}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = '#333'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; e.currentTarget.style.background = '#222'; }}
                            aria-label="Close Preview"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            {renderContent()}
        </div>
    );
};

export default FilePreview;
