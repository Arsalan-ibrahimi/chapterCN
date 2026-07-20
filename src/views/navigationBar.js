import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show the navbar at the very top of the page
      if (currentScrollY <= 0) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // If scrolling down, hide it. If scrolling up, show it.
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Embedded styles object
  const styles = {
    navbarContainer: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: '100%',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      padding: '20px 40px',
      
      // Sticky positioning
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      
      // Smooth slide transition based on scroll behavior
      transition: 'transform 0.3s ease-in-out',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    },
    topRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '15px',
    },
    socialLinks: {
      display: 'flex',
      gap: '20px',
      color: '#333333',
    },
    iconLink: {
      color: '#333333',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoText: {
      fontSize: '22px',
      fontWeight: '500',
      color: '#333333',
      letterSpacing: '0.5px',
    },
    searchContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    searchInput: {
      padding: '8px 40px 8px 16px',
      borderRadius: '20px',
      border: '1px solid #cccccc',
      fontSize: '13px',
      fontStyle: 'italic',
      color: '#777777',
      outline: 'none',
      width: '180px',
    },
    searchIcon: {
      position: 'absolute',
      right: '15px',
      color: '#333333',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    divider: {
      border: 'none',
      borderTop: '1px solid #eaeaea',
      margin: '0',
    },
    bottomRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      paddingTop: '15px',
    },
    navLink: {
      textDecoration: 'none',
      color: '#444444',
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      transition: 'color 0.2s',
    }
  };

  return (
    <nav style={styles.navbarContainer}>
      {/* Top Row: Socials, Logo, Search */}
      <div style={styles.topRow}>
        {/* Social Icons */}
        <div style={styles.socialLinks}>
          <a href="#facebook" style={styles.iconLink}>f</a>
          <a href="#gplus" style={styles.iconLink}>g+</a>
          <a href="#twitter" style={styles.iconLink}>t</a>
          <a href="#vimeo" style={styles.iconLink}>v</a>
        </div>

        {/* Brand Logo */}
        <div style={styles.logoContainer}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span style={styles.logoText}>Poseidon</span>
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="I'm searching for..." 
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
      </div>

      {/* Horizontal Line Divider */}
      <hr style={styles.divider} />

      {/* Bottom Row: Navigation Links */}
      <div style={styles.bottomRow}>
        <a href="#home" style={styles.navLink}>Home</a>
        <a href="#products" style={styles.navLink}>Products</a>
        <a href="#about" style={styles.navLink}>About Us</a>
        <a href="#pricing" style={styles.navLink}>Pricing</a>
        <a href="#blog" style={styles.navLink}>Blog</a>
        <a href="#contact" style={styles.navLink}>Contact</a>
      </div>
    </nav>
  );
}