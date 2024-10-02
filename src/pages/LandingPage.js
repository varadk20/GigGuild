import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [text, setText] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const fullText = 'A Guild To Hone Your Abilities And Find Your Quest';
  const navigate = useNavigate(); // Initialize navigate

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(fullText.substring(0, index + 1));
      index += 1;
      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the typing speed here (100ms per character)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [fullText]);

  // Scroll animation effect for dimming/brightening the background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Calculate opacity based on scroll position
      const scrollFactor = 1 - (scrollTop / (docHeight - windowHeight));
      const adjustedOpacity = Math.max(0.3, scrollFactor); // Ensure it doesn't go too dim

      // Apply the opacity to the background
      document.body.style.backgroundColor = `rgba(255, 255, 255, ${adjustedOpacity})`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation to HomePage
  // const handleNavigateToHome = () => {
  //   navigate('/role-selection'); // Redirect to HomePage
  // };

    const handleNavigateToHome = () => {
    navigate('/loginsignup'); // Redirect to HomePage
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">THE GIG GUILD</h1>
      <p className="landing-description">{text}</p>
      <button className="get-started-btn" onClick={handleNavigateToHome}>
        Dive In!
      </button>
      <Cards />
      <Footer />
    </div>
  );
}

export default LandingPage;
