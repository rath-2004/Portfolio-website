import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/pages/navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Animation for navbar items
    gsap.from('.nav-link', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Splash effect for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        link.style.setProperty('--mouseX', `${x}px`);
        link.style.setProperty('--mouseY', `${y}px`);
      });
    });

    // Close mobile menu on resize
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('menu-open');
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Control body scroll
    if (!mobileMenuOpen) {
      document.body.classList.add('menu-open');
      gsap.fromTo('.nav-link', 
        { x: 20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.3, 
          stagger: 0.1,
          delay: 0.2 
        }
      );
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      if (mobileMenuOpen) {
        toggleMobileMenu();
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo splash-effect">
          Portfolio
        </div>
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="menu-icon"></div>
        </button>
        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-link splash-link" onClick={(e) => handleNavClick(e, 'home')}>
            Home
          </a>
          <a href="#about" className="nav-link splash-link" onClick={(e) => handleNavClick(e, 'about')}>
            About
          </a>
          <a href="#projects" className="nav-link splash-link" onClick={(e) => handleNavClick(e, 'projects')}>
            Projects
          </a>
          <a href="#services" className="nav-link splash-link" onClick={(e) => handleNavClick(e, 'services')}>
            Services
          </a>
          <a href="#contact" className="contact-btn splash-effect" onClick={(e) => handleNavClick(e, 'contact')}>
            Contact Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
