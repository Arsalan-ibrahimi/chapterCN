import React from 'react';
import img from './BG.png'

const HeroSection = () => {
  return (
    <div className="landing-page">
      {/* Reusing the navbar we built together */}
   

      {/* Main Hero Container */}
      <header className="hero-container">
        {/* Comic/Illustration background image slot */}
        <div className="hero-bg-wrapper">
          <img 
            src={img}
            alt="Comic/Anime background illustration" 
            className="hero-bg-image"
          />
          {/* Subtle overlay to guarantee readability of dark text */}

        </div>

        {/* Content Box Overlaid on Left */}
       
      </header>

      {/* Bottom Features Banner */}
      {/* <section className="features-banner">
        <div className="feature-card">
          <div className="feature-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div className="feature-text">
            <h3>Handpicked Stories</h3>
            <p>Carefully chosen stories that inspire, move and make you think.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="feature-text">
            <h3>Real Connections</h3>
            <p>A community of readers and writers who get you.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
          <div className="feature-text">
            <h3>Moments of Peace</h3>
            <p>Take a break from the noise and lose yourself in a good story.</p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HeroSection;