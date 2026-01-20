import { useState } from 'react';
import logo from '../assets/malivelihood_kogi_logo.png';

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
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Malivelihood | Kogi State" className="navbar-logo" />
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {
        isOpen && (
          <div className="mobile-menu-overlay">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '1.5rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'white'
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
