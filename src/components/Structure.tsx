
import workshopImg from '../assets/workshop.png';
import { motion } from 'framer-motion';

const Structure = () => {
    return (
        <section id="structure" style={{ position: 'relative', padding: '100px 0', background: '#111' }}>

            {/* Background Parallax-ish */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '60%', // only top half has image
                backgroundImage: `url(${workshopImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%) brightness(0.3)',
                zIndex: 0
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="title-md"
                        style={{ color: 'white' }}
                    >
                        Programme Structure
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lead"
                        style={{ margin: '0 auto', color: '#ccc' }}
                    >
                        Structured training cohorts ensuring quality instruction, personalized mentorship, and practical exposure.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {[
                        {
                            month: "Month 01",
                            title: "Mining Operations",
                            desc: "Fundamentals, safety, equipment handling, and site management."
                        },
                        {
                            month: "Month 02",
                            title: "Jewelry Craftsmanship",
                            desc: "Refining basics, design production, quality control and finishing."
                        },
                        {
                            month: "Month 03",
                            title: "Luxury Market",
                            desc: "Branding, product positioning, luxury markets, and export basics."
                        }
                    ].map((phase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                            style={{
                                background: 'black',
                                padding: '3rem',
                                border: '1px solid #333',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '300px'
                            }}
                        >
                            <div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    background: 'white',
                                    display: 'inline-block',
                                    padding: '2px 8px',
                                    marginBottom: '1rem'
                                }}>
                                    {phase.month}
                                </div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '700' }}>{phase.title}</h3>
                                <p style={{ color: '#aaa', lineHeight: '1.6' }}>{phase.desc}</p>
                            </div>

                            <div style={{ marginTop: '2rem', fontSize: '2rem', opacity: 0.2 }}>
                                ➔
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
};


export default Structure;
