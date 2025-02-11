import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/pages/home.css';

const Hero = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    const text = heading.innerText;
    heading.innerText = '';

    // Typing animation
    let i = 0;
    const typeText = () => {
      if (i < text.length) {
        heading.innerText += text.charAt(i);
        i++;
        setTimeout(typeText, 100);
      }
    };
    
    typeText();

    // Splash effect setup
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouseX', `${x}px`);
        card.style.setProperty('--mouseY', `${y}px`);
      });
    });
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="hero-text" data-aos="fade-right" data-aos-delay="200">
          <h1 ref={headingRef} className="typing-text">Ratheesh. R. S</h1>
          <div className="cursor"></div>
          <p>Transforming ideas into exceptional digital experiences. Specialized in creating innovative web solutions with a perfect blend of functionality and aesthetic design.</p>
          <button className="cta-button">Explore My Work</button>
        </div>
        <div className="hero-cards" data-aos="fade-left" data-aos-delay="400">
          <div className="card splash-card">
            <div className="card-content">
              <h3>Web Development</h3>
              <p>Modern and responsive websites</p>
            </div>
            <div className="splash"></div>
          </div>
          <div className="card splash-card">
            <div className="card-content">
              <h3>UI/UX Design</h3>
              <p>Intuitive user experiences</p>
            </div>
            <div className="splash"></div>
          </div>
          <div className="card splash-card">
            <div className="card-content">
              <h3>Creative Solutions</h3>
              <p>Innovative digital solutions</p>
            </div>
            <div className="splash"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
