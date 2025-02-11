import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'aos/dist/aos.css';
import '../styles/pages/about.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const statsRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    // GSAP Animation for stats counting
    const statsElements = statsRef.current.querySelectorAll('.stat-number');
    statsElements.forEach(stat => {
      const targetNumber = parseInt(stat.getAttribute('data-target'));
      let obj = { value: 0 };
      gsap.to(obj, {
        scrollTrigger: {
          trigger: stat,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        value: targetNumber,
        duration: 2,
        roundProps: 'value',
        onUpdate: () => {
          stat.innerHTML = Math.round(obj.value) + '+';
        }
      });
    });

    // Add hover animation for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
      tag.addEventListener('mousemove', (e) => {
        const rect = tag.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        tag.style.setProperty('--mouseX', `${x}px`);
        tag.style.setProperty('--mouseY', `${y}px`);
      });
    });

    // Add hover effect for stats items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          y: -10,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Image tilt effect
    const aboutImage = document.querySelector('.about-image');
    aboutImage.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = aboutImage.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      gsap.to(aboutImage, {
        rotationY: (x - 0.5) * 20,
        rotationX: (y - 0.5) * -20,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    aboutImage.addEventListener('mouseleave', () => {
      gsap.to(aboutImage, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

 

    // Split text animation for subtitle
    const subtitle = document.querySelector('.about-subtitle');
    if (subtitle) {
      const text = subtitle.textContent;
      subtitle.innerHTML = '';
      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        subtitle.appendChild(span);
        
        gsap.to(span, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.8 + i * 0.03,
          ease: 'power3.out'
        });
      });
    }
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">About Me</h2>
          <p className="about-subtitle">Crafting Digital Experiences</p>
        </div>
        
        <div className="about-grid">
          <div className="about-image tilt-effect" data-aos="fade-right">
            <img 
              src="/path-to-your-about-image.jpg" 
              alt="Professional Portrait" 
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="image-overlay"></div>
          </div>
          
          <div className="about-content" data-aos="fade-left">
            <p className="about-text">
              I'm a passionate web developer and designer with a keen eye for detail and a love for creating seamless user experiences. With expertise in modern web technologies, I bring ideas to life through clean code and stunning design.
            </p>
            
            <div className="skill-tags">
              {['React', 'Node.js', 'TypeScript', 'UI/UX Design', 'GSAP'].map((skill, index) => (
                <span key={index} className="skill-tag" data-aos="fade-up" data-aos-delay={index * 100}>
                  {skill}
                </span>
              ))}
            </div>

            <div className="stats-grid" ref={statsRef}>
              <div className="stat-item">
                <div className="stat-number" data-target="50">10+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="25">10+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="5">10+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
