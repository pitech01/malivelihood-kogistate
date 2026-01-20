
import careerBg from '../assets/career.png';
import { motion } from 'framer-motion';

const Career = () => {
    return (
        <section id="career" className="section" style={{ padding: '0', background: '#000' }}>

            <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))' }}>
                {/* Image Left */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        minHeight: '600px',
                        backgroundImage: `url(${careerBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(100%) contrast(1.1)'
                    }}
                ></motion.div>

                {/* Content Right */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <h2 className="title-md">Internship, Global Exposure & Career Pathway</h2>
                    <div style={{ width: '60px', height: '4px', background: 'white', marginBottom: '2rem' }}></div>

                    <p className="text-lead" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Upon successful completion of the Programme, outstanding participants will be selected based
                        on performance, discipline, and demonstrated potential.
                    </p>

                    <div style={{ marginTop: '3rem', display: 'grid', gap: '2rem' }}>
                        <div style={{ borderLeft: '4px solid white', paddingLeft: '2rem' }}>
                            <h4 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>Core Internships</h4>
                            <p style={{ color: '#aaa' }}>
                                Top-performing participants will be retained for structured internships and possible
                                employment within the Malivelihood ecosystem.
                            </p>
                        </div>

                        <div style={{ borderLeft: '4px solid white', paddingLeft: '2rem' }}>
                            <h4 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>Global Learning Trips</h4>
                            <p style={{ color: '#aaa' }}>
                                International trips to selected mining facilities and world-class
                                jewelry craftsmanship institutes abroad for advanced exposure.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Career;
