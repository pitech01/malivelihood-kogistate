

const Eligibility = () => {
    return (
        <section id="eligibility" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="title-md">Eligibility Criteria</h2>
                <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
                    <ul style={{ listStyle: 'none' }}>
                        {[
                            "Be an indigene of Kogi State",
                            "Be between 18 and 35 years of age",
                            "Demonstrate interest in mining, jewelry, or craftsmanship",
                            "Be available for the full training duration",
                            "Be willing to comply with programme rules and standards"
                        ].map((item, index) => (
                            <li key={index} style={{
                                padding: '1rem',
                                borderBottom: '1px solid #333',
                                fontSize: '1.2rem'
                            }}>
                                <span style={{ marginRight: '1rem' }}>✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Eligibility;
