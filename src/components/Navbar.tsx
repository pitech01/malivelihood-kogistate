import { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about-snapshot' },
    { name: 'Programme', href: '#background' },
    { name: 'Structure', href: '#structure' },
    { name: 'Career', href: '#career' },
    { name: 'Apply', href: '#apply' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #222',
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Malivelihood | Kogi State" style={{ height: '50px', objectFit: 'contain' }} />
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 600 }}>
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={toggleMenu} style={{ cursor: 'pointer', display: 'none' }}>
          <div style={{ width: '25px', height: '2px', background: 'white', marginBottom: '5px' }}></div>
          <div style={{ width: '25px', height: '2px', background: 'white', marginBottom: '5px' }}></div>
          <div style={{ width: '25px', height: '2px', background: 'white' }}></div>
        </div>
      </div>

      {/* Mobile Menu Styles would go here properly with media queries in CSS, 
          but for now we rely on the container max-width and clean layout */}
    </nav>
  );
};

export default Navbar;
