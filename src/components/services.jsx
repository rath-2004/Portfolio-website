import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/pages/services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from('.services-header', {
        y: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate cards with stagger
      gsap.from('.service-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate features with stagger
      gsap.from('.feature-item', {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top center',
          toggleActions: 'play none none reverse'
        }
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (e) => {
    const card = e.currentTarget;
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    
    card.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  };

  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Creating responsive and dynamic web applications with modern technologies.',
      features: ['Custom Development', 'Responsive Design', 'Performance Optimization']
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Crafting beautiful and intuitive user interfaces for exceptional user experience.',
      features: ['User Research', 'Wireframing', 'Prototyping']
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Building cross-platform mobile applications that deliver results.',
      features: ['iOS Development', 'Android Development', 'React Native']
    }
  ];

  return (
    <section className="services-section" id="services" ref={servicesRef}>
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">My Services</h2>
          <p className="services-subtitle">Expert solutions for your digital needs</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card"
              onClick={handleCardClick}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  duration: 0.3,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.out'
                });
              }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="card-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i} className="feature-item">{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
