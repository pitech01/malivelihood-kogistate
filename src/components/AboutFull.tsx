
import seminarImg from '../assets/seminar_lecture.png';
import { motion } from 'framer-motion';

const AboutFull = () => {
    return (
        <section id="about" className="section" style={{ padding: '0' }}> {/* No padding on section to allow full bleed */}

            {/* Split Section 1: Background & Image */}
            <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))' }}>

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ padding: '100px 50px', background: '#050505', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h5 style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888', marginBottom: '1rem' }}>The Programme</h5>
                        <h2 className="title-md">Building the Future of Kogi's Mining Sector</h2>
                        <div style={{ width: '80px', height: '4px', background: 'white', marginBottom: '2rem' }}></div>

                        <p className="text-lead">
                            The Kogi State Youth Mining & Jewelry Craftsmanship Empowerment Programme is a structured capacity-building initiative.
                        </p>
                        <p style={{ marginBottom: '1.5rem', color: '#bbb' }}>
                            This program was developed to empower Kogi State Youths with the technical knowledge,
                            practical skills, and market exposure required to operate competitively within Nigeria and globally.
                        </p>

                        <div style={{ marginTop: '2rem' }}>
                            <h3 className="title-sm">Why Malivelihood?</h3>
                            <p style={{ color: '#bbb' }}>
                                Malivelihood brings years of hands-on experience across luxury jewelry production and industrial consulting.
                                Uniquely positioned to translate raw talent into commercially viable skills.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        minHeight: '600px',
                        backgroundImage: `url(${seminarImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(100%) contrast(1.1)'
                    }}
                ></motion.div>
            </div>

            {/* Stats / Highlights Bar */}
            <div style={{ background: 'white', color: 'black', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                        {[
                            { num: "01", text: "Approved by Kogi State Govt" },
                            { num: "02", text: "Hands-on Practical Training" },
                            { num: "03", text: "International Expert Facilitators" },
                            { num: "04", text: "Global Internship Opportunities" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            >
                                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>{item.num}</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', textTransform: 'uppercase' }}>{item.text}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default AboutFull;
