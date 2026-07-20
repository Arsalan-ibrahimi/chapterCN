import React, { useEffect, useRef, useState } from "react";
import img from './BG.png'

const THREAD_GREEN = "#D7FF56";
const INK = "#1C1B18";
const PAPER = "#FAF9F3";
const PAPER_DEEP = "#EFEDE1";

export default function HeroUnravelingStories() {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [heroTop, setHeroTop] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);

    const measure = () => {
      if (heroRef.current) {
        setHeroTop(heroRef.current.offsetTop);
      }
    };
    measure();

    const onScroll = () => setScrollY(window.scrollY || window.pageYOffset || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    const t = setTimeout(() => setMounted(true), 40);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
      clearTimeout(t);
    };
  }, []);

  // progress through the hero section only, 0 -> 1
  const heroHeight = 900;
  const localScroll = Math.max(0, scrollY - heroTop);
  const progress = reducedMotion ? 0 : Math.min(1, localScroll / heroHeight);

  const p = (mult) => `translate3d(0, ${localScroll * mult}px, 0)`;

  return (
    <div className="uhs-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Work+Sans:wght@400;500;600&display=swap');

        .uhs-root {
          --paper: ${PAPER};
          --paper-deep: ${PAPER_DEEP};
          --ink: ${INK};
          --thread: ${THREAD_GREEN};
          margin: 0;
          font-family: 'Work Sans', sans-serif;
          color: var(--ink);
          background: var(--paper);
          overflow-x: hidden;
        }

        .uhs-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          padding-top: clamp(20px, 3vh, 60px);
          background:
            radial-gradient(ellipse 70% 50% at 50% 8%, rgba(215,255,86,0.16), transparent 60%),
            var(--paper);
        }

        .uhs-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.5;
          mix-blend-mode: multiply;
          background-image: radial-gradient(circle, rgba(28,27,24,0.55) 0.6px, transparent 0.6px);
          background-size: 3px 3px;
        }

        .uhs-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          pointer-events: none;
        }

        .uhs-eyebrow {
          font-family: 'Work Sans', sans-serif;
          font-weight: 600;
          font-size: 12.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .uhs-eyebrow::before {
          content: '';
          width: 26px;
          height: 2px;
          background: var(--ink);
          display: inline-block;
        }
        .uhs-mounted .uhs-eyebrow { opacity: 0.72; transform: translateY(0); transition-delay: 0.15s; }

        .uhs-headline {
          margin: 14px 0 0 0;
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(34px, 6vw, 66px);
          line-height: 1.04;
          text-align: center;
          letter-spacing: -0.01em;
          max-width: 15ch;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .uhs-mounted .uhs-headline { opacity: 1; transform: translateY(0); transition-delay: 0.28s; }

        .uhs-headline em {
          font-style: italic;
          font-weight: 500;
          position: relative;
          white-space: nowrap;
        }
        .uhs-headline .uhs-underline {
          position: absolute;
          left: -2%;
          right: -2%;
          bottom: -0.06em;
          height: 0.34em;
          background: var(--thread);
          z-index: -1;
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 0.6s cubic-bezier(.5,.05,.15,1) 1.05s;
        }
        .uhs-mounted .uhs-underline { transform: scaleX(1); }

        .uhs-sub {
          margin: 18px 0 0 0;
          font-size: clamp(14.5px, 1.6vw, 17px);
          line-height: 1.6;
          text-align: center;
          max-width: 46ch;
          color: rgba(28,27,24,0.68);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .uhs-mounted .uhs-sub { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }

        .uhs-ctas {
          margin-top: 26px;
          display: flex;
          gap: 14px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .uhs-mounted .uhs-ctas { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }

        .uhs-btn {
          font-family: 'Work Sans', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          padding: 13px 26px;
          border-radius: 999px;
          border: 1.5px solid var(--ink);
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }
        .uhs-btn-primary {
          background: var(--ink);
          color: var(--paper);
        }
        .uhs-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 0 -3px var(--thread);
        }
        .uhs-btn-ghost {
          background: transparent;
          color: var(--ink);
        }
        .uhs-btn-ghost:hover {
          background: var(--ink);
          color: var(--paper);
        }

        .uhs-stage {
          position: relative;
          width: min(1440px, 97vw);
          margin-top: clamp(30px, 5vw, 54px);
        }

        .uhs-thread-svg {
          position: absolute;
          inset: -6% -4%;
          width: 108%;
          height: 112%;
          pointer-events: none;
          z-index: 0;
        }
        .uhs-thread-path {
          fill: none;
          stroke: var(--thread);
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          transition: stroke-dashoffset 1.6s cubic-bezier(.3,.05,.15,1) 0.2s;
          filter: drop-shadow(0 2px 0 rgba(0,0,0,0.05));
        }
        .uhs-mounted .uhs-thread-path { stroke-dashoffset: 0; }

        .uhs-image-wrap {
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: scale(0.965) translateY(10px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(.2,.6,.2,1);
        }
        .uhs-mounted .uhs-image-wrap { opacity: 1; transform: scale(1) translateY(0); transition-delay: 0.1s; }

        .uhs-image {
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          -webkit-user-drag: none;
          margin-top: -10%;
        }

        .uhs-sparkle {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .uhs-mounted .uhs-sparkle { opacity: 1; }
        .uhs-float {
          animation: uhs-bob 5.5s ease-in-out infinite;
        }
        @keyframes uhs-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-11px) rotate(6deg); }
        }
        .uhs-float-slow { animation-duration: 7.5s; }
        .uhs-float-rev { animation-direction: alternate-reverse; }

        .uhs-scrollcue {
          margin-top: clamp(28px, 5vw, 46px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.7s ease;
          font-size: 11.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(28,27,24,0.5);
        }
        .uhs-mounted .uhs-scrollcue { opacity: 1; transition-delay: 0.9s; }
        .uhs-scrollcue-line {
          width: 1.5px;
          height: 30px;
          background: linear-gradient(to bottom, rgba(28,27,24,0.55), transparent);
          position: relative;
          overflow: hidden;
        }
        .uhs-scrollcue-line::after {
          content: '';
          position: absolute;
          left: 0; top: -100%;
          width: 100%; height: 100%;
          background: var(--thread);
          animation: uhs-drip 1.8s ease-in-out infinite;
        }
        @keyframes uhs-drip {
          0% { top: -100%; }
          60% { top: 100%; }
          100% { top: 100%; }
        }

        .uhs-next {
          position: relative;
          padding: 110px 24px 140px;
          background: var(--paper-deep);
          text-align: center;
          border-top: 1.5px solid rgba(28,27,24,0.1);
        }
        .uhs-next h2 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(24px, 3.4vw, 36px);
          margin: 0 0 14px;
        }
        .uhs-next p {
          max-width: 44ch;
          margin: 0 auto;
          color: rgba(28,27,24,0.62);
          line-height: 1.7;
          font-size: 15px;
        }

        @media (max-width: 640px) {
          .uhs-ctas { flex-direction: column; width: 100%; max-width: 280px; }
          .uhs-btn { width: 100%; text-align: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .uhs-float { animation: none; }
          .uhs-scrollcue-line::after { animation: none; }
        }
      `}</style>

      <section
        className={`uhs-hero${mounted ? " uhs-mounted" : ""}`}
        ref={heroRef}
      >
        <div className="uhs-grain" style={{ transform: p(0.04) }} />

        <div
          className="uhs-blob"
          style={{
            width: 420, height: 420, top: -140, left: "8%",
            background: "radial-gradient(circle, rgba(215,255,86,0.35), transparent 70%)",
            transform: p(0.08),
          }}
        />
        <div
          className="uhs-blob"
          style={{
            width: 320, height: 320, top: 120, right: "4%",
            background: "radial-gradient(circle, rgba(28,27,24,0.05), transparent 70%)",
            transform: p(0.14),
          }}
        />

        <span className="uhs-eyebrow">a home for cozy tales</span>

        <h1 className="uhs-headline">
          Every story starts with{" "}
          <em>
            one loose thread
            <span className="uhs-underline" />
          </em>
        </h1>

        <p className="uhs-sub">
          Fox, robot, bear, and a whole cast of curious readers — pull the
          thread and see where today's chapter takes you.
        </p>

        <div className="uhs-ctas">
          <button className="uhs-btn uhs-btn-primary">Start reading</button>
          <button className="uhs-btn uhs-btn-ghost">Browse the library</button>
        </div>

        <div
          className="uhs-stage"
          style={{ transform: p(0.16) }}
        >
        

          <div className="uhs-image-wrap">
            <img
              className="uhs-image"
              src={img}
              alt="Illustration of a fox, cat, robot, bear, rabbit and hooded child reading books around hand-lettered text that reads Unraveling Stories, tied together by a bright green thread"
              draggable="false"
            />
          </div>

          <svg
            className="uhs-sparkle uhs-float"
            style={{ top: "4%", left: "-2%", transform: p(0.26) }}
            width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"
          >
            <path d="M13 0 L15.5 10.5 L26 13 L15.5 15.5 L13 26 L10.5 15.5 L0 13 L10.5 10.5 Z" fill={THREAD_GREEN} />
          </svg>
          <svg
            className="uhs-sparkle uhs-float uhs-float-slow uhs-float-rev"
            style={{ bottom: "10%", right: "-1.5%", transform: p(0.32) }}
            width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"
          >
            <circle cx="9" cy="9" r="9" fill={INK} opacity="0.85" />
          </svg>
          <svg
            className="uhs-sparkle uhs-float uhs-float-slow"
            style={{ top: "38%", right: "3%", transform: p(0.22) }}
            width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"
          >
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill={THREAD_GREEN} opacity="0.9" />
          </svg>
        </div>

        <div className="uhs-scrollcue">
          <span>Unravel</span>
          <div className="uhs-scrollcue-line" />
        </div>
      </section>

      <section className="uhs-next">
        <h2>Chapter one begins below</h2>
        <p>
          This is where your story feed, featured collections, or reading
          picks would continue — scroll to see the hero's parallax layers
          settle into place.
        </p>
      </section>
    </div>
  );
}