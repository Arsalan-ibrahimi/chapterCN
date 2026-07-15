import React, { useEffect, useRef, useState, useCallback } from "react";

export default function SquiggleDraw() {
  const pathRef = useRef(null);
  const trackRef = useRef(null);
  const labelRef = useRef(null);
  const [length, setLength] = useState(0);

  const d =
    "M -30 150 " +
    "C 0 40, 60 -10, 100 40 " +
    "C 140 90, 130 200, 80 250 " +
    "C 40 290, 0 260, 20 210 " +
    "C 50 130, 150 20, 230 40 " +
    "C 300 60, 330 160, 280 220 " +
    "C 240 265, 190 230, 210 180 " +
    "C 240 110, 330 40, 400 70 " +
    "C 450 90, 470 150, 450 190 " +
    "C 435 220, 405 220, 400 195 " +
    "C 396 175, 415 160, 435 170 " +
    "C 460 182, 480 210, 470 240";

  useEffect(() => {
    if (pathRef.current) {
      const total = pathRef.current.getTotalLength();
      setLength(total);
      pathRef.current.style.strokeDasharray = String(total);
      pathRef.current.style.strokeDashoffset = String(total);
    }
  }, []);

  const tickingRef = useRef(false);
  const lengthRef = useRef(0);

  useEffect(() => {
    lengthRef.current = length;
  }, [length]);

  const applyProgress = useCallback((p) => {
    if (pathRef.current && lengthRef.current) {
      pathRef.current.style.strokeDashoffset = String(
        lengthRef.current * (1 - p)
      );
    }
    if (labelRef.current) {
      labelRef.current.textContent = `${Math.round(p * 100)}%`;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      tickingRef.current = false;
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height - viewportH;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      applyProgress(p);
    });
  }, [applyProgress]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: "#F4F1EA",
        position: "relative"
      }}
    >
      <div
        style={{
          height: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ecececff",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
      
      </div>

      <div ref={trackRef} style={{ position: "relative", height: "300vh" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            background: "#ecececff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="-40 -30 550 330"
            width="100%"
            height="100%"
            style={{ maxWidth: "100%"}}
          >
            <path
              ref={pathRef}
              d={d}
              fill="none"
              stroke="#5df130ff"
              strokeWidth="25"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: length ? 1 : 0,
                willChange: "stroke-dashoffset",
              }}
            />
          </svg>

           <div className="portfolio-footer-wrapper">
      {/* Scoped CSS Styles */}
      <style>{`
        .portfolio-footer-wrapper {
        position: absolute;
          --bg-color: #EFEFEF;
          --card-bg: #F9F9F9;
          --text-primary: #111111;
          --text-secondary: #777777;
          --accent-red: #E63E12;
          
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: transparent;
          padding: 40px 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
        }

        .portfolio-card {
          background-color: var(--card-bg);
          border-radius: 40px;
          padding: 60px 60px 0 60px;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .grid-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
          gap: 40px;
          margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .grid-container {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
          .portfolio-card {
            padding: 40px 30px 0 30px;
          }
        }

        @media (max-width: 600px) {
          .grid-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        /* Column 1: Main Statement */
        .statement-col h2 {
          font-size: 24px;
          font-weight: 500;
          line-height: 1.3;
          color: var(--text-primary);
          margin: 0;
          max-width: 280px;
        }

        /* General Column Styles */
        .column-title {
          font-size: 13px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .link-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .link-list li {
          margin-bottom: 10px;
        }

        .link-list a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s ease;
        }

        .link-list a:hover {
          color: var(--text-primary);
        }

        /* Column 3: Social Links Grid */
        .socials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px 20px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s ease;
        }

        .social-link:hover {
          color: var(--text-primary);
        }

        .social-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 10px;
          color: #fff;
        }

        /* Column 4: Action Items */
        .action-item {
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }

        .action-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .action-title-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          margin-bottom: 4px;
        }

        .action-title {
          font-size: 20px;
          font-weight: 600;
        }

        .action-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .arrow-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 11px;
          font-weight: bold;
        }

        /* Huge Brand Name */
        .brand-name-container {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          pointer-events: none;
          user-select: none;
        }

        .brand-name {
          font-size: 20vw; /* Responsively scales with viewport */
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 0.72;
          color: var(--text-primary);
          margin: 0;
          transform: translateY(5%); /* Seamlessly crops into the bottom container curve */
        }

        @media (min-width: 1200px) {
          .brand-name {
            font-size: 240px;
          }
        }

        /* External Meta Footer Row */
        .meta-footer {
          max-width: 1200px;
          width: 100%;
          margin: 20px auto 0 auto;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-secondary);
          padding: 0 10px;
          box-sizing: border-box;
        }

        .meta-left span, .meta-right span {
          margin-right: 15px;
        }

        .meta-left span:last-child, .meta-right span:last-child {
          margin-right: 0;
        }
      `}</style>

      {/* Main White Card Container */}
      <div className="portfolio-card">
        <div className="grid-container">
          
          {/* Column 1: Intro */}
          <div className="statement-col">
            <h2>Arsalan is independent creative director and solopreneur</h2>
          </div>

          {/* Column 2: Explore */}
          <div>
            <div className="column-title">Explore</div>
            <ul className="link-list">
              <li><a href="#bio">Bio</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Follow Me */}
          <div>
            <div className="column-title">Follow me</div>
            <div className="socials-grid">
              <a href="#x" className="social-link">
                <span className="social-icon" style={{ backgroundColor: '#000000' }}>𝕏</span>
                @fazurrehman
              </a>
              <a href="#instagram" className="social-link">
                <span className="social-icon" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>📸</span>
                @ArsalanIbrahimi
              </a>
              <a href="#threads" className="social-link">
                <span className="social-icon" style={{ backgroundColor: '#E1306C' }}>🌺</span>
                @ArsalanIbrahimi
              </a>
              <a href="#youtube" className="social-link">
                <span className="social-icon" style={{ backgroundColor: '#FF0000' }}>▶</span>
                @ArsalanIbrahimi
              </a>
              <a href="#figma" className="social-link">
                <span className="social-icon" style={{ backgroundColor: '#0ACF83' }}>🎨</span>
                @ArsalanIbrahimi
              </a>
            </div>
          </div>

          {/* Column 4: Action / CTAs */}
          <div>
          
            
            <div className="action-item">
              <a href="#courses" className="action-title-wrapper" style={{ color: 'var(--text-primary)' }}>
                <span className="action-title">Courses & Tools</span>
                <span className="arrow-badge" style={{ backgroundColor: 'var(--text-primary)' }}>↗</span>
              </a>
              <div className="action-subtitle">Creative tools</div>
            </div>
          </div>

        </div>

        {/* Gigantic visual baseline text */}
        <div className="brand-name-container">
          <h1 className="brand-name">Arsalan</h1>
        </div>
      </div>

      {/* External Footer Row */}
      <div className="meta-footer">
        <div className="meta-left">
          <span>Arsalan ©2026</span>
          <span>·</span>
          <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
        <div className="meta-right">
          <span>South Australia, Adelaide</span>
        
        </div>
      </div>
    </div>

        
        </div>
      </div>

      <div
        style={{
          height: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ecececff",
          textAlign: "center",
          padding: "0 0px",
        }}
      >
       
      </div>
    </div>




        </>

  );
}