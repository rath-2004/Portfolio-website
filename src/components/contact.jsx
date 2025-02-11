import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/pages/contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);

  const handleRipple = (e) => {
    const element = e.currentTarget;
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    
    element.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.contact-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate form elements
      const formElements = formRef.current.querySelectorAll('input, textarea');
      const submitButton = formRef.current.querySelector('.submit-btn');

      gsap.from(formElements, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse'
        }
      });

      // Separate animation for submit button
      gsap.from(submitButton, {
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse'
        }
      });

      // Add hover animations for info cards
      gsap.utils.toArray('.info-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card.querySelector('.info-icon'), {
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card.querySelector('.info-icon'), {
            scale: 1,
            duration: 0.3,
            ease: 'back.out'
          });
        });
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={contactRef} className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card" onClick={handleRipple}>
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>hello@example.com</p>
            </div>
            <div className="info-card" onClick={handleRipple}>
              <div className="info-icon">📱</div>
              <h3>Phone</h3>
              <p>+1 234 567 890</p>
            </div>
            <div className="info-card" onClick={handleRipple}>
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>New York, USA</p>
            </div>
          </div>

          <form ref={formRef} className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="6" required></textarea>
            </div>
            <button 
              type="submit" 
              className="submit-btn"
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                handleRipple(e);
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3
                });
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;