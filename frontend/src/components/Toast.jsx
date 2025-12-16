import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        animation: 'slideIn 0.3s ease-out',
        background: type === 'error' ? '#ef4444' : '#10b981', // Red for error, Green for success
    };

    return (
        <div style={styles}>
            {message}
        </div>
    );
};

export default Toast;
