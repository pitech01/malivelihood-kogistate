

const AboutSnapshot = () => {
    return (
        <section id="about-snapshot" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                    <div>
                        <h2 className="title-md">About the Programme</h2>
                        <div style={{ width: '60px', height: '4px', background: 'white', marginBottom: '2rem' }}></div>

                        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#ddd' }}>
                            The Kogi State Youth Mining & Jewelry Craftsmanship Empowerment Programme is a
                            structured capacity-building initiative implemented by Malivelihood in partnership with the Kogi
                            State Government.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#ddd' }}>
                            The Programme is designed to equip selected Kogi State youths with practical, globally
                            competitive skills across the mining and jewelry value chain, from extraction and refinement to
                            craftsmanship, branding, and market access.
                        </p>
                    </div>

                    <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '4px' }}>
                        <h3 className="title-sm" style={{ marginBottom: '2rem' }}>Programme Highlights</h3>
                        <ul style={{ listStyle: 'none' }}>
                            {[
                                "Government-approved and supervised programme",
                                "Hands-on training delivered in phased cohorts",
                                "Training facilitated by local and international experts",
                                "Internship, employment, and global exposure opportunities for top performers",
                                "Focus on ethical mining, sustainability, and value addition"
                            ].map((item, index) => (
                                <li key={index} style={{
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'start',
                                    color: '#ccc'
                                }}>
                                    <span style={{ marginRight: '1rem', color: 'white' }}>•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSnapshot;
