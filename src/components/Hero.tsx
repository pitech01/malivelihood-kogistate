
import heroBg from '../assets/hero-luxury.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section id="hero" style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Center content for Activizm style
            paddingTop: '160px',
            overflow: 'hidden'
        }}>
            {/* Background Image with Slow Zoom (Ken Burns Effect) */}
            <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) contrast(1.1)',
                    zIndex: 0
                }}
            />

            {/* Luxurious Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(5,5,5,0.7) 0%, rgba(0,0,0,0.95) 100%)', // Vignette for focus
                zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '40%',
                background: 'linear-gradient(to top, #050505 0%, transparent 100%)', // Seamless blend with next section
                zIndex: 0
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.h5
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="title-sm"
                    style={{ color: '#fff' }}
                >
                    Malivelihood | Kogi State
                </motion.h5>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="title-lg"
                    style={{
                        maxWidth: '1200px', // Wider to prevent too many line breaks
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        letterSpacing: '-0.02em'
                    }}
                >
                    Empowering Kogi Youths Through <span style={{ color: '#aaa' }}>Craftsmanship</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lead"
                    style={{ margin: '0 auto 3rem auto', color: '#ddd' }}
                >
                    A government–approved programme delivering hands-on training in ethical mining,
                    jewelry craftsmanship, and luxury market integration.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="hero-buttons"
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <Link to="/application" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>
                        Apply Now
                    </Link>

                </motion.div>
            </div>
        </section >
    );
};

export default Hero;
