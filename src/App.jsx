import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Anchor, ArrowDown, Droplets, Info, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LoadingScreen = ({ onFinish }) => {
  const loaderRef = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: onFinish
    });

    tl.to(".loader-text", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(".loader-progress", {
      width: "100%",
      duration: 2,
      ease: "power1.inOut"
    })
    .to(".loader-text", {
      opacity: 0,
      y: -20,
      duration: 0.5
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut"
    });
  }, { scope: loaderRef });

  return (
    <div ref={loaderRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--color-midnight)',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    }}>
      <h2 className="loader-text" style={{ 
        opacity: 0, 
        transform: 'translateY(20px)',
        fontSize: '2rem',
        letterSpacing: '8px',
        marginBottom: '2rem'
      }}>PREPARING DESCENT</h2>
      <div style={{ 
        width: '200px', 
        height: '2px', 
        background: 'rgba(255,255,255,0.1)',
        overflow: 'hidden'
      }}>
        <div className="loader-progress" style={{ 
          width: '0%', 
          height: '100%', 
          background: 'var(--color-accent)'
        }}></div>
      </div>
    </div>
  );
};

const App = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    // Custom Cursor Logic
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', moveCursor);

    // Scroll Progress Tracking
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setScrollProgress(self.progress * 100)
    });

    // Parallax Reveal Animations
    const sections = gsap.utils.toArray('.ocean-section');
    sections.forEach((section, i) => {
      const title = section.querySelector('h2');
      const content = section.querySelector('.glass-card');
      const bg = section.querySelector('.parallax-layer');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        }
      });

      tl.fromTo(title, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(content,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" },
        "-=0.5"
      );

      // Background Parallax
      gsap.fromTo(bg,
        { y: -50 },
        {
          y: 50,
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          }
        }
      );
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="app-container">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <div ref={cursorRef} className="custom-cursor"></div>
      
      {/* Dynamic Background */}
      <div className="gradient-bg"></div>
      
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator">
        <div 
          className="scroll-bar" 
          style={{ height: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="ocean-section hero-section">
        <div className="parallax-layer surface-bubbles" style={{ 
          backgroundImage: 'url(/assets/sunlight.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }}></div>
        <div className="content-layer">
          <div className="hero-icon-container" style={{ position: 'relative', display: 'inline-block' }}>
            <Waves size={64} className="mb-4 text-cyan-400 opacity-80" />
            <div className="pulse-ring" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              border: '2px solid var(--color-accent)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', marginBottom: '1rem' }}>ABYSSAL</h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.8, letterSpacing: '8px' }}>VOYAGE</p>
          <div className="glass-card" style={{ marginTop: '3rem' }}>
            <p>Scroll down to begin your descent into the unknown.</p>
            <ArrowDown className="mt-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* 1. Sunlight Zone (Epipelagic) */}
      <section className="ocean-section">
        <div className="parallax-layer" style={{ 
          background: 'linear-gradient(to bottom, rgba(121, 216, 255, 0.2), transparent)',
          opacity: 0.5 
        }}></div>
        <div className="content-layer">
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>The Sunlight Zone</h2>
          <p style={{ marginTop: '0.5rem', color: 'var(--color-accent)', fontWeight: 'bold' }}>DEPTH: 0 - 200m</p>
          <div className="glass-card">
            <p>The top layer of the ocean is the only place where enough sunlight penetrates for photosynthesis. This zone is teeming with 90% of all marine life.</p>
            <div className="species-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div className="glass-card species-item" style={{ margin: 0 }}>
                <Droplets className="mb-2 text-cyan-300" />
                <strong>Green Sea Turtle</strong>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>Travels thousands of miles across oceans to return to its home beach.</p>
              </div>
              <div className="glass-card species-item" style={{ margin: 0 }}>
                <Waves className="mb-2 text-cyan-300" />
                <strong>Great White Shark</strong>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>The apex predator of the sunlit waters, capable of bursts up to 25mph.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Twilight Zone (Mesopelagic) */}
      <section className="ocean-section">
        <div className="content-layer">
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>The Twilight Zone</h2>
          <p style={{ marginTop: '0.5rem', color: '#64B5F6', fontWeight: 'bold' }}>DEPTH: 200 - 1,000m</p>
          <div className="glass-card">
            <p>Light begins to fade into a dim blue. This is the "shadow world," where spectacular bioluminescence begins to reveal itself in the darkness.</p>
            <div className="glass-card species-item" style={{ maxWidth: '400px', margin: '2rem auto 0' }}>
              <Info className="mb-2 text-blue-400" />
              <strong>Lantern Fish</strong>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>Possesses tiny light organs that help it hide from predators by mimicking the dim surface light.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Midnight Zone (Bathypelagic) */}
      <section className="ocean-section">
        <div className="parallax-layer" style={{ 
          backgroundImage: 'url(/assets/midnight.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
          opacity: 0.4
        }}></div>
        <div className="content-layer" style={{ zIndex: 20 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>The Midnight Zone</h2>
          <p style={{ marginTop: '0.5rem', color: '#1E88E5', fontWeight: 'bold' }}>DEPTH: 1,000 - 4,000m</p>
          <div className="glass-card">
            <p>Complete darkness. The only light comes from the creatures themselves. The pressure here is enough to crush a human in seconds.</p>
            <div className="glass-card species-item" style={{ maxWidth: '500px', margin: '2rem auto 0' }}>
              <strong style={{ color: '#E1F5FE' }}>The Anglerfish</strong>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>Uses a bioluminescent lure to attract prey in the infinite night of the deep ocean.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Abyss (Abyssopelagic) */}
      <section className="ocean-section">
        <div className="content-layer">
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>The Abyss</h2>
          <p style={{ marginTop: '0.5rem', color: '#0D47A1', fontWeight: 'bold' }}>DEPTH: 4,000 - 6,000m</p>
          <div className="glass-card" style={{ borderLeft: '4px solid #0D47A1' }}>
            <p>A vast, icy wasteland. The temperature is near freezing, and the pressure is over 8,000 pounds per square inch. This is the end of the line for most life.</p>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Anchor size={48} className="opacity-20 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Trench (Hadalpelagic) */}
      <section className="ocean-section" style={{ minHeight: '120vh' }}>
        <div className="content-layer">
          <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#000814' }}>THE DEEP</h2>
          <p style={{ marginTop: '0.5rem', color: '#000', fontWeight: 'bold', letterSpacing: '4px' }}>DEPTH: 11,000m+</p>
          <div className="glass-card" style={{ background: 'rgba(0,0,0,0.8)', color: '#fff' }}>
            <h3 style={{ marginBottom: '1rem' }}>Mariana Trench</h3>
            <p>The deepest scar on Earth's crust. Here, at Challenger Deep, the weight of the water above is equivalent to one person carrying 50 jumbo jets.</p>
            <div style={{ marginTop: '3rem', padding: '2rem', border: '1px solid var(--color-accent)' }}>
              <p style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Exploration Complete</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '1rem' }}>You have reached the bottom of the world.</p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
        <p>© 2026 Frontend Odyssey | Built with GSAP & React</p>
      </footer>
    </div>
  );
};

export default App;
