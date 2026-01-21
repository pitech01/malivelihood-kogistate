

const FAQ = () => {
    const faqs = [
        {
            q: "Is the programme free? ",
            a: "Yes. The program is fully sponsored by Kogi state government"
        },
        {
            q: "Do I need prior experience?",
            a: "No prior experience is required. Commitment and willingness to learn are essential."
        },
        {
            q: "Will accommodation be provided?",
            a: "Programme logistics will be communicated to selected participants."
        }
    ];

    return (
        <section id="faq" className="section">
            <div className="container">
                <h2 className="title-md" style={{ marginBottom: '3rem' }}>Frequently Asked Questions</h2>
                <div style={{ maxWidth: '800px' }}>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>{faq.q}</h4>
                            <p style={{ color: '#aaa' }}>{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
