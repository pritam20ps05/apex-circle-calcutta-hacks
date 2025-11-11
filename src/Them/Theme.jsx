import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DotGrid from '../components/DotGrid';

const Theme = ({ children }) => {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    const rafCallback = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(rafCallback);
    };

    rafIdRef.current = requestAnimationFrame(rafCallback);

    const gsapCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(gsapCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenis.destroy();
      gsap.ticker.remove(gsapCallback);
    };
  }, []);

  return (
    <div
      className="
          w-screen min-h-screen overflow-x-hidden flex flex-col
          bg-[#f3e5c1] relative select-none z-0
        "
    >
      <div className="fixed w-full h-full top-0 left-0 z-1">
        <DotGrid
          dotSize={1.9}
          gap={15}
          baseColor="#bc984e"
          activeColor="#3e2d1c"
          proximity={170}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <section className="z-2 select-none relative">{children}</section>
    </div>
  );
};

export default Theme;
