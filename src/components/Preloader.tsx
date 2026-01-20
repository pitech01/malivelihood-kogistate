import { useEffect, useState } from 'react';
import logo from '../assets/malivelihood_kogi_logo.png';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Wait for 1.2 seconds then fadeOut
        const timer = setTimeout(() => {
            setIsFading(true);
            // Wait for fade animation to finish before unmounting
            setTimeout(onComplete, 800);
        }, 1200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: '#000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.8s ease-in-out',
            opacity: isFading ? 0 : 1,
            pointerEvents: isFading ? 'none' : 'auto'
        }}>
            <div style={{
                marginBottom: '2rem',
                animation: 'pulse 2s infinite ease-in-out'
            }}>
                <img src={logo} alt="Loading..." style={{ width: '250px', height: 'auto' }} />
            </div>

            {/* Classic Thin Line Loader */}
            <div style={{
                width: '200px',
                height: '2px',
                background: '#333',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '50%',
                    background: '#fff',
                    animation: 'slide 1.5s infinite ease-in-out'
                }}></div>
            </div>

            <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(0.98); }
        }
        @keyframes slide {
          0% { left: -50%; }
          100% { left: 100%; }
        }
      `}</style>
        </div>
    );
};

export default Preloader;
