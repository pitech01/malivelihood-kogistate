
import heroBg from '../assets/hero-luxury.png';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Center content for Activizm style
            paddingTop: '80px',
            overflow: 'hidden'
        }}>
            {/* Background Image with Filter */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%) contrast(1.2)',
                zIndex: 0
            }}></div>

            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.91)', // Strong dark overlay
                zIndex: 0
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.h5
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                        marginBottom: '1.5rem',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '1rem'
                    }}
                >
                    Malivelihood | Kogi State
                </motion.h5>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        marginBottom: '2rem',
                        textTransform: 'uppercase',
                        maxWidth: '1000px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
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
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
                >
                    <a href="#apply" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>
                        Apply Now
                    </a>
                    <a href="#" className="btn btn-outline" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>
                        Download Brochure
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
