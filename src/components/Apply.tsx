
import { motion } from 'framer-motion';

const Apply = () => {
    return (
        <section id="apply" className="section" style={{ background: '#080808', padding: '100px 0' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h5
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666', marginBottom: '1rem' }}
                    >
                        Take Action
                    </motion.h5>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="title-md"
                    >
                        Start Your Journey Today
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lead"
                        style={{ margin: '0 auto', color: '#ccc' }}
                    >
                        Join the next generation of mining and jewelry experts in Kogi State.
                        Follow the steps below to apply.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', position: 'relative' }}>

                    {/* Connector Line (Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{
                            position: 'absolute',
                            top: '40px',
                            left: '10%',
                            right: '10%',
                            height: '2px',
                            background: '#333',
                            zIndex: 0,
                            display: 'block',
                            transformOrigin: 'left'
                        }}
                    ></motion.div>

                    {[
                        { step: "01", title: "Apply Online", text: "Complete the online eligibility form." },
                        { step: "02", title: "Upload Docs", text: "Submit identification and proof of indigene status." },
                        { step: "03", title: "Screening", text: "Shortlisted candidates invited for interviews." },
                        { step: "04", title: "Selection", text: "Final selection based on merit." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 + (i * 0.15) }}
                            style={{ position: 'relative', zIndex: 1, textAlign: 'center', background: '#080808', padding: '1rem' }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: '#000',
                                border: '2px solid white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem auto',
                                fontSize: '1.5rem',
                                fontWeight: 'bold'
                            }}>
                                {item.step}
                            </div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{item.title}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#888' }}>{item.text}</p>
                        </motion.div>
                    ))}

                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{ marginTop: '4rem', textAlign: 'center' }}
                >
                    <button className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.2rem' }}>
                        Launch Application Portal
                    </button>
                    <div style={{ marginTop: '1.5rem', opacity: 0.6 }}>
                        <span style={{ marginRight: '1rem' }}>📄 Requires: Valid ID</span>
                        <span>📍 Requires: Kogi Indigene Proof</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Apply;
