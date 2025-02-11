import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/pages/projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  const handleSplashEffect = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const splash = card.querySelector('::before');
    if (splash) {
      splash.style.left = `${x}px`;
      splash.style.top = `${y}px`;
      splash.classList.add('splash-effect');
      
      setTimeout(() => {
        splash.classList.remove('splash-effect');
      }, 800);
    }
  };

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
          }
        );
      });

      // Add hover animations
      cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
          gsap.to(card.querySelector('.project-content'), {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', (e) => {
          gsap.to(card.querySelector('.project-content'), {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('click', (e) => handleSplashEffect(e, card));
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with React and Node.js",
      image: "/path-to-project1-image.jpg",
      tags: ["React", "Node.js", "MongoDB"],
      liveLink: "https://project1.com",
      githubLink: "https://github.com/username/project1"
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio with modern animations",
      image: "/path-to-project2-image.jpg",
      tags: ["React", "GSAP", "Tailwind"],
      liveLink: "https://project2.com",
      githubLink: "https://github.com/username/project2"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard with real-time data",
      image: "/path-to-project3-image.jpg",
      tags: ["React", "Firebase", "D3.js"],
      liveLink: "https://project3.com",
      githubLink: "https://github.com/username/project3"
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container" ref={projectsRef}>
        <div className="projects-header" data-aos="fade-down">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">Explore my recent work</p>
        </div>

        <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="project-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
                data-aos-anchor-placement="top-bottom"
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-overlay-gradient"></div>
                </div>
                <div className="project-content">
                  <h3 className="project-title" data-aos="fade-up" data-aos-delay={index * 100 + 100}>
                    {project.title}
                  </h3>
                  <p className="project-description" data-aos="fade-up" data-aos-delay={index * 100 + 200}>
                    {project.description}
                  </p>
                  <div className="project-tags" data-aos="fade-up" data-aos-delay={index * 100 + 300}>
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-links" data-aos="fade-up" data-aos-delay={index * 100 + 400}>
                    <a href={project.liveLink} className="project-link live-link">
                      View Project
                    </a>
                    <a href={project.githubLink} className="project-link github-link">
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Projects;
