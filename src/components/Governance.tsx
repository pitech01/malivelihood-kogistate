

const Governance = () => {
    return (
        <section id="governance" className="section" style={{ backgroundColor: '#050505' }}>
            <div className="container">

                {/* Monitoring */}
                <div style={{ marginBottom: '5rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem auto' }}>
                    <h2 className="title-md">Monitoring, Transparency & Governance</h2>
                    <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        The Programme is implemented under the supervision of the Ministry of Special Duties &
                        Inter-Governmental Affairs, Kogi State, with structured monitoring and evaluation
                        mechanisms to ensure transparency, accountability, and quality delivery.
                    </p>
                </div>

                {/* Partners */}
                <div>
                    <h3 className="title-sm" style={{ textAlign: 'center', marginBottom: '3rem' }}>Partners & Stakeholders</h3>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '2rem',
                        textAlign: 'center'
                    }}>
                        {[
                            "Kogi State Government",
                            "Ministry of Special Duties & Inter-Governmental Affairs",
                            "Malivelihood Luxury & Industrial Consultancy Services",
                            "Local and international technical partners"
                        ].map((partner, i) => (
                            <div key={i} style={{
                                border: '1px solid #333',
                                padding: '2rem',
                                minWidth: '250px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontWeight: 'bold' }}>{partner}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Governance;
