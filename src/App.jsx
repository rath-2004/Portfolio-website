import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';
import Hero from './components/home'
import Navbar from './components/navbar'
import About from './components/About'
import Services from './components/services'
import Projects from './components/projects'
import Contact from './components/contact'
import './App.css'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out',
      disable: 'mobile'
    });

    // Refresh AOS on route change
    AOS.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
    </>
  )
}

export default App
