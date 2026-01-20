import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning';
    isVisible: boolean;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'error', isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const bgColor = type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#EF4444';
    const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠' : '✕';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)', // This will be handled by motion layout usually, but for fixed centering we need x: "-50%" in animate if not careful. 
                        // Actually, easier to center just with css.
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: '#111',
                        border: `1px solid ${bgColor}`,
                        borderLeft: `4px solid ${bgColor}`,
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                        zIndex: 10000,
                        fontFamily: 'inherit',
                        minWidth: '300px',
                        maxWidth: '90%'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: bgColor,
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}>
                        {icon}
                    </div>
                    <span style={{ fontSize: '0.95rem' }}>{message}</span>
                    <button
                        onClick={onClose}
                        style={{
                            marginLeft: 'auto',
                            background: 'transparent',
                            border: 'none',
                            color: '#666',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            padding: '0 4px'
                        }}
                    >
                        ×
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
