import React, { useState, useEffect } from 'react';


const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = ['Home', 'Stories', 'About', 'Contact'];

  // This effect runs every time isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <div className="navbar-logo">
        <svg 
          className="logo-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
        <span className="logo-text">Chapter</span>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-menu">
        {navItems.map((item) => (
          <li key={item} className="nav-item">
            <button
              onClick={() => setActiveTab(item)}
              className={`nav-link ${activeTab === item ? 'active' : ''}`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      {/* Utility Icons */}
      <div className="navbar-actions">
        {/* Dark Mode Toggle */}
        <button 
          className="action-btn" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle dark mode"
        >
          {/* Swapped to a filled sun/moon vibe depending on state */}
          <svg viewBox="0 0 24 24" fill={isDarkMode ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        {/* Search */}
        <button className="action-btn" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;