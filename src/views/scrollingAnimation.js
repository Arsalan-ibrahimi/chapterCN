import React, { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
// If you're on the older package name, use: import Lenis from "@studio-freight/lenis";
// Also import Lenis's stylesheet once, e.g. in your app's entry file:
//   import "lenis/dist/lenis.css";

/* ------------------------------------------------------------------
   Content — six specimen entries from a fictional herbarium archive.
------------------------------------------------------------------- */
const SPECIMENS = [
  {
    no: "014",
    common: "Bracken Fern",
    latin: "Pteridium aquilinum",
    site: "Blackwood Ridge",
    date: "Collected 11 Apr",
    note: "Found colonizing a felled clearing; fronds pressed while still unfurling.",
    variant: "fern",
  },
  {
    no: "027",
    common: "English Oak",
    latin: "Quercus robur",
    site: "Thornfield Hollow",
    date: "Collected 03 May",
    note: "Single leaf from a lower branch, taken after a late frost thinned the canopy.",
    variant: "oak",
  },
  {
    no: "032",
    common: "Field Maple",
    latin: "Acer campestre",
    site: "Millbrook Creek",
    date: "Collected 19 May",
    note: "Edge specimen, corked bark visible at the petiole where it was cut.",
    variant: "maple",
  },
  {
    no: "041",
    common: "Common Ivy",
    latin: "Hedera helix",
    site: "Ashgrove Wall",
    date: "Collected 02 Jun",
    note: "Juvenile leaf form, five-lobed, taken low on a north-facing stretch of wall.",
    variant: "ivy",
  },
  {
    no: "056",
    common: "Cushion Moss",
    latin: "Leucobryum glaucum",
    site: "Fenwick Bog",
    date: "Collected 14 Jun",
    note: "Dense clump lifted whole; kept its dome shape through drying.",
    variant: "moss",
  },
  {
    no: "063",
    common: "Spear Thistle",
    latin: "Cirsium vulgare",
    site: "Harrow Field",
    date: "Collected 28 Jun",
    note: "Flowerhead just past bloom, spines softened before mounting.",
    variant: "thistle",
  },
];

const SEEDS = [
  { no: "S-01", common: "Bracken Fern", latin: "Pteridium aquilinum", site: "Full shade, moist soil", date: "Packed for spring sowing", note: "Spores kept dry and dark; viable up to two seasons in a sealed tin.", variant: "fern" },
  { no: "S-02", common: "English Oak", latin: "Quercus robur", site: "Full sun, open ground", date: "Packed for autumn sowing", note: "Acorns lose viability fast — sow within weeks of collection.", variant: "oak" },
  { no: "S-03", common: "Field Maple", latin: "Acer campestre", site: "Part shade, hedgerow", date: "Packed for autumn sowing", note: "Winged keys need a cold spell before they'll break dormancy.", variant: "maple" },
  { no: "S-04", common: "Common Ivy", latin: "Hedera helix", site: "Shade, climbing support", date: "Packed for spring sowing", note: "Berries cleaned of pulp before drying, to stop them rotting in storage.", variant: "ivy" },
  { no: "S-05", common: "Cushion Moss", latin: "Leucobryum glaucum", site: "Damp shade, bare soil", date: "Packed for summer sowing", note: "Spread as fragments rather than seed; keep the packet slightly humid.", variant: "moss" },
  { no: "S-06", common: "Spear Thistle", latin: "Cirsium vulgare", site: "Full sun, disturbed ground", date: "Packed for spring sowing", note: "Downy pappus removed by hand so the seed settles instead of drifting.", variant: "thistle" },
];

/* Simple line-art botanical marks, one per specimen variant. */
function LeafIcon({ variant }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (variant) {
    case "fern":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <path d="M60 108V20" {...common} />
          {[...Array(7)].map((_, i) => {
            const y = 28 + i * 11;
            const len = 30 - i * 2.5;
            return (
              <g key={i}>
                <path d={`M60 ${y} Q ${60 - len} ${y - 6} ${60 - len - 6} ${y + 8}`} {...common} />
                <path d={`M60 ${y} Q ${60 + len} ${y - 6} ${60 + len + 6} ${y + 8}`} {...common} />
              </g>
            );
          })}
        </svg>
      );
    case "oak":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <path d="M60 16c5 9-3 13 2 20 7-5 15-2 13 7-2 7-11 6-11 13 9-2 16 5 11 12-5 7-14 2-16 9-2 7 5 12-2 18" {...common} />
          <path d="M60 16c-5 9 3 13-2 20-7-5-15-2-13 7 2 7 11 6 11 13-9-2-16 5-11 12 5 7 14 2 16 9 2 7-5 12 2 18" {...common} />
          <path d="M60 95v13" {...common} />
        </svg>
      );
    case "maple":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <path d="M60 108V60" {...common} />
          <path d="M60 60 30 46l8-4-14-16 16 4-2-14 12 12 10-30 10 30 12-12-2 14 16-4-14 16 8 4-30 14z" {...common} />
        </svg>
      );
    case "ivy":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <path d="M20 100C40 60 40 40 60 20" {...common} />
          <path d="M60 46c-14-6-22 4-18 16 10 6 20-2 18-16z" {...common} />
          <path d="M46 70c-14-2-20 10-14 20 11 3 19-8 14-20z" {...common} />
          <path d="M60 20c-2-14 8-20 18-14 4 11-8 19-18 14z" {...common} />
        </svg>
      );
    case "moss":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          {[...Array(9)].map((_, i) => {
            const x = 24 + (i % 3) * 32;
            const y = 40 + Math.floor(i / 3) * 28;
            return <circle key={i} cx={x} cy={y} r={10 - (i % 3)} {...common} />;
          })}
        </svg>
      );
    case "thistle":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <path d="M60 108V56" {...common} />
          <path d="M42 70l18-14 18 14" {...common} />
          {[...Array(14)].map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const x2 = 60 + Math.cos(a) * 22;
            const y2 = 34 + Math.sin(a) * 22;
            return <path key={i} d={`M60 34L${x2.toFixed(1)} ${y2.toFixed(1)}`} {...common} />;
          })}
          <circle cx="60" cy="34" r="10" {...common} />
        </svg>
      );
    default:
      return null;
  }
}

function useLenis(options) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      ...options,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return lenisRef;
}

/* ------------------------------------------------------------------
   useDoubleHorizontalPin — tracks a single sticky wrapper containing
   two horizontal scrolling rows. Both rows run off the same progress,
   but track 2 slides in the opposite direction.
------------------------------------------------------------------- */
function useDoubleHorizontalPin() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null); // Used to measure row width (since both rows match layout sizing)
  const [sectionHeight, setSectionHeight] = useState(0);
  const [translateX1, setTranslateX1] = useState(0);
  const [translateX2, setTranslateX2] = useState(0);
  const [progress, setProgress] = useState(0);

  const recalc = useCallback(() => {
    if (!trackRef.current) return;
    const viewportW = window.innerWidth;
    const trackW = trackRef.current.scrollWidth;
    const scrollDistance = Math.max(trackW - viewportW, 0);
    // Multiply distance slightly if you want a longer, slower scroll feeling
    setSectionHeight(window.innerHeight + scrollDistance * 1.2);
    setTranslateX1(0);
    setTranslateX2(-scrollDistance);
  }, []);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("resize", recalc);
      ro.disconnect();
    };
  }, [recalc]);

  useEffect(() => {
    let raf = null;
    const measure = () => {
      raf = null;
      if (!sectionRef.current || !trackRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const trackW = trackRef.current.scrollWidth;
      const scrollDistance = Math.max(trackW - viewportW, 0);
      const started = -rect.top;
      
      // Calculate layout's active pin scroll distance boundary
      const activeScrollDistance = scrollDistance * 1.2;
      const p = activeScrollDistance > 0 ? Math.min(Math.max(started / activeScrollDistance, 0), 1) : 0;
      
      setProgress(p);
      setTranslateX1(-p * scrollDistance);
      setTranslateX2(-scrollDistance + p * scrollDistance);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { sectionRef, trackRef, sectionHeight, translateX1, translateX2, progress };
}

export default function HerbariumScroll() {
  useLenis();

  const dualPin = useDoubleHorizontalPin();

  // Active indexes for both rows driven by the unified scroll progress
  const activeIndex1 = Math.min(SPECIMENS.length - 1, Math.round(dualPin.progress * (SPECIMENS.length - 1)));
  const activeIndex2 = Math.min(SEEDS.length - 1, Math.round((1 - dualPin.progress) * (SEEDS.length - 1)));

  return (
    <div className="hb-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .hb-root {
          --hb-bg: #12211a;
          --hb-bg-deep: #0c1712;
          --hb-paper: #f1ecdd;
          --hb-paper-dim: #e6dfc9;
          --hb-line: #2c4433;
          --hb-brass: #c6a15b;
          --hb-brass-dim: #7c6a3f;
          --hb-ink: #1c1b16;
          --hb-mist: #cfd8c9;
          --hb-mist-dim: #8ea28f;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          color: var(--hb-mist);
          background: var(--hb-bg);
        }
        .hb-root * { box-sizing: border-box; }
        .hb-display {
          font-family: 'Fraunces', Georgia, serif;
        }

        /* ---------- intro ---------- */
        .hb-intro {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 8vh 8vw;
          background:
            radial-gradient(ellipse at 20% 20%, rgba(198,161,91,0.08), transparent 55%),
            var(--hb-bg);
          border-bottom: 1px solid var(--hb-line);
        }
        .hb-eyebrow {
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-size: 0.68rem;
          color: var(--hb-brass);
          margin-bottom: 1.4rem;
        }
        .hb-intro h1 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 500;
          font-style: italic;
          font-size: clamp(2.2rem, 6vw, 4.4rem);
          line-height: 1.05;
          color: var(--hb-paper);
          margin: 0 0 1.6rem 0;
          max-width: 16ch;
        }
        .hb-intro p {
          max-width: 46ch;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--hb-mist-dim);
          margin: 0 0 2.2rem 0;
        }
        .hb-scroll-cue {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--hb-brass);
        }
        .hb-scroll-cue span.hb-cue-line {
          width: 34px;
          height: 1px;
          background: var(--hb-brass-dim);
          position: relative;
          overflow: hidden;
        }
        .hb-scroll-cue span.hb-cue-line::after {
          content: "";
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: var(--hb-brass);
          animation: hbCue 1.8s ease-in-out infinite;
        }
        @keyframes hbCue {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }

        /* ---------- pinned horizontal dual drawer ---------- */
        .hb-pin-wrap {
          position: relative;
        }
        .hb-pin-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3vh;
          background: var(--hb-bg-deep);
        }
        .hb-drawer-label {
          position: absolute;
          top: 4vh;
          left: 8vw;
          display: flex;
          align-items: baseline;
          gap: 0.8rem;
          color: var(--hb-brass);
          z-index: 3;
        }
        .hb-drawer-label .hb-idx {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 1.1rem;
        }
        .hb-drawer-label .hb-total {
          font-size: 0.72rem;
          color: var(--hb-brass-dim);
          letter-spacing: 0.1em;
        }
        .hb-track-container {
          display: flex;
          flex-direction: column;
          gap: 4vh;
          margin: 6vh 0 4vh 0;
        }
        .hb-track {
          display: flex;
          align-items: center;
          gap: 4vw;
          padding: 0 8vw;
          will-change: transform;
        }
        .hb-card {
          flex: 0 0 auto;
          width: min(50vw, 360px);
          background: var(--hb-paper);
          color: var(--hb-ink);
          border-radius: 2px;
          padding: 1.6rem 1.6rem 1.4rem;
          position: relative;
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.55);
          border: 1px solid var(--hb-paper-dim);
        }
        .hb-card::before {
          content: "";
          position: absolute;
          inset: 8px;
          border: 1px dashed rgba(28,27,22,0.18);
          pointer-events: none;
        }
        .hb-card-no {
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: var(--hb-brass-dim);
        }
        .hb-card-icon {
          width: 50px;
          height: 50px;
          margin: 0.4rem 0 0.6rem;
          color: var(--hb-brass-dim);
        }
        .hb-card h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 1.3rem;
          margin: 0;
        }
        .hb-card .hb-latin {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 0.85rem;
          color: #4a5a3f;
          margin: 0 0 0.6rem 0;
        }
        .hb-card .hb-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.62rem;
          letter-spacing: 0.04em;
          color: #5c5a4b;
          border-top: 1px solid rgba(28,27,22,0.12);
          border-bottom: 1px solid rgba(28,27,22,0.12);
          padding: 0.4rem 0;
          margin-bottom: 0.6rem;
        }
        .hb-card .hb-note {
          font-size: 0.75rem;
          line-height: 1.45;
          color: #33321f;
        }

        /* ---------- progress rail ---------- */
        .hb-rail-wrap {
          position: absolute;
          bottom: 4vh;
          left: 8vw;
          right: 8vw;
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 3;
        }
        .hb-rail {
          position: relative;
          flex: 1;
          height: 1px;
          background: var(--hb-line);
        }
        .hb-rail-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: var(--hb-brass);
          transition: width 0.05s linear;
        }
        .hb-rail-ticks {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hb-rail-tick {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--hb-bg-deep);
          border: 1px solid var(--hb-brass-dim);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .hb-rail-tick.hb-active {
          background: var(--hb-brass);
          border-color: var(--hb-brass);
        }
        .hb-rail-count {
          font-size: 0.68rem;
          color: var(--hb-brass-dim);
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        /* ---------- outro ---------- */
        .hb-outro {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 8vh 8vw;
          background: var(--hb-bg);
          border-top: 1px solid var(--hb-line);
        }
        .hb-outro .hb-eyebrow { margin-bottom: 1.4rem; }
        .hb-outro h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-weight: 500;
          font-size: clamp(1.8rem, 4.4vw, 3rem);
          color: var(--hb-paper);
          margin: 0 0 1.2rem 0;
          max-width: 20ch;
        }
        .hb-outro p {
          max-width: 44ch;
          font-size: 0.92rem;
          line-height: 1.7;
          color: var(--hb-mist-dim);
        }

        @media (max-height: 700px) {
          .hb-card { padding: 1rem; }
          .hb-card-icon { width: 35px; height: 35px; margin: 0.2rem 0; }
          .hb-card .hb-note { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        }

        @media (max-width: 640px) {
          .hb-card { width: 72vw; }
          .hb-track-container { gap: 2vh; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hb-scroll-cue span.hb-cue-line::after { animation: none; }
        }
      `}</style>

      {/* ---------------- intro section ---------------- */}
      <section className="hb-intro">
        <div className="hb-eyebrow">Field Notes — Archive Vol. II</div>
        <h1 className="hb-display">A herbarium, digitized</h1>
        <p>
          Six specimens and their matching seeds. Keep scrolling — both drawers slide open in opposing directions simultaneously.
        </p>
        <div className="hb-scroll-cue">
          <span className="hb-cue-line" />
          Scroll to open the drawers
        </div>
      </section>

      {/* ---------------- single pinned horizontal section (dual track) ---------------- */}
      <div className="hb-pin-wrap" ref={dualPin.sectionRef} style={{ height: dualPin.sectionHeight ? `${dualPin.sectionHeight}px` : "100vh" }}>
        <div className="hb-pin-sticky">
          <div className="hb-drawer-label">
            <span className="hb-idx">{SPECIMENS[activeIndex1].no} / {SEEDS[activeIndex2].no}</span>
            <span className="hb-total">/ index {activeIndex1 + 1} of {SPECIMENS.length}</span>
          </div>

          <div className="hb-track-container">
            {/* Row 1: Specimens (Slides Left) */}
            <div
              className="hb-track"
              ref={dualPin.trackRef}
              style={{ transform: `translateX(${dualPin.translateX1}px)` }}
            >
              {SPECIMENS.map((s) => (
                <article className="hb-card" key={s.no}>
                  <div className="hb-card-no">Specimen No. {s.no}</div>
                  <div className="hb-card-icon">
                    <LeafIcon variant={s.variant} />
                  </div>
                  <h3>{s.common}</h3>
                  <p className="hb-latin">{s.latin}</p>
                  <div className="hb-meta">
                    <span>{s.site}</span>
                    <span>{s.date}</span>
                  </div>
                  <p className="hb-note">{s.note}</p>
                </article>
              ))}
            </div>

            {/* Row 2: Seed Packets (Slides Right - Mirrored) */}
            <div
              className="hb-track"
              style={{ transform: `translateX(${dualPin.translateX2}px)` }}
            >
              {SEEDS.map((s) => (
                <article className="hb-card hb-card-copper" key={s.no}>
                  <div className="hb-card-no">Packet {s.no}</div>
                  <div className="hb-card-icon">
                    <LeafIcon variant={s.variant} />
                  </div>
                  <h3>{s.common}</h3>
                  <p className="hb-latin">{s.latin}</p>
                  <div className="hb-meta">
                    <span>{s.site}</span>
                    <span>{s.date}</span>
                  </div>
                  <p className="hb-note">{s.note}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="hb-rail-wrap">
            <div className="hb-rail">
              <div className="hb-rail-fill" style={{ width: `${dualPin.progress * 100}%` }} />
              <div className="hb-rail-ticks">
                {SPECIMENS.map((s, i) => (
                  <div key={s.no} className={`hb-rail-tick${i <= activeIndex1 ? " hb-active" : ""}`} />
                ))}
              </div>
            </div>
            <div className="hb-rail-count">{String(activeIndex1 + 1).padStart(2, "0")} / {String(SPECIMENS.length).padStart(2, "0")}</div>
          </div>
        </div>
      </div>

      {/* ---------------- final section ---------------- */}
      <section className="hb-outro">
        <div className="hb-eyebrow">End of Archive</div>
        <h2 className="hb-display">Both drawers, synchronized</h2>
        <p>
          The pressings and seed profiles moved across your view at the same time—pairing visual anatomy with their life cycle.
        </p>
      </section>
    </div>
  );
}