
import { Link } from 'react-router-dom';
import logo from '../assets/malivelihood_kogi_logo.png';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#000', color: 'white', borderTop: '1px solid #1a1a1a' }}>

            {/* Pre-Footer CTA */}
            <div className="container" style={{ padding: '80px 5%', borderBottom: '1px solid #1a1a1a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <h2 className="title-md" style={{ marginBottom: 0, fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}>
                        Ready to Shape the Future?
                    </h2>
                    <Link to="/application" className="btn btn-primary" style={{ background: 'white', color: 'black', border: 'none' }}>
                        Apply Now
                    </Link>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container" style={{ padding: '80px 5% 40px' }}>
                {/* 3-Column Grid for Info */}
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>

                    {/* Column 1: Brand & Mission */}
                    <div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <img src={logo} alt="Malivelihood | Kogi State" style={{ height: '90px', objectFit: 'contain' }} />
                        </div>
                        <p style={{ color: '#888', lineHeight: '1.8', marginBottom: '2rem' }}>
                            A pioneering partnership designed to transform the mining and jewelry sector through youth empowerment, ethical practices, and global craftsmanship standards.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {['FB', 'TW', 'IG', 'LN'].map(social => (
                                <a key={social} href="#" style={{
                                    width: '40px', height: '40px',
                                    border: '1px solid #333',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.8rem', color: '#666',
                                    transition: 'all 0.3s'
                                }}>
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                            Explore
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { name: 'Home', href: '#hero' },
                                { name: 'The Programme', href: '#about' },
                                { name: 'Structure', href: '#structure' },
                                { name: 'Success Stories', href: '#career' },
                                { name: 'Apply Now', href: '#apply' }
                            ].map(link => (
                                <li key={link.name} style={{ marginBottom: '1rem' }}>
                                    <a href={link.href} style={{ color: '#aaa', transition: 'color 0.3s' }} className="footer-link">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                            Contact
                        </h4>
                        <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>General Inquiries:</p>
                        <a href="mailto:info@malivelihoodkogistateyouthprogram.com" style={{ color: 'white', display: 'block', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            info@malivelihoodkogistateyouthprogram.com
                        </a>

                        <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Headquarters:</p>
                        <p style={{ color: 'white' }}>Plot 500, Gaborone Street,<br /> Wuse Zone 2, Abuja</p>
                    </div>

                </div>

                {/* Separated Newsletter Row */}
                <div style={{
                    borderTop: '1px solid #1a1a1a',
                    paddingTop: '4rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <div style={{ maxWidth: '500px' }}>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            Stay Connected
                        </h4>
                        <p style={{ color: '#888' }}>
                            Subscribe to our newsletter to get official announcements and training schedules delivered to your inbox.
                        </p>
                    </div>

                    <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px', display: 'flex', gap: '1rem' }}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            style={{
                                background: '#111', border: '1px solid #333', color: 'white',
                                padding: '1rem', outline: 'none', flex: 1, borderRadius: '2px'
                            }}
                        />
                        <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div style={{ borderTop: '1px solid #1a1a1a', padding: '2rem 5%' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', color: '#444', fontSize: '0.9rem', flexWrap: 'wrap', padding: 0 }}>
                    <p>© {new Date().getFullYear()} Malivelihood x Kogi State Govt. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
