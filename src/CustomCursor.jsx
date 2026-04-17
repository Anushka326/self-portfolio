import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Check if it's a touch device or window is too small
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (isTouchDevice || isSmallScreen || !hasFinePointer) {
      document.documentElement.style.cursor = 'auto';
      return;
    }

    const cursor = document.getElementById("cursor");
    const cursorGlow = document.getElementById("cursor-glow");

    if (!cursor || !cursorGlow) return;

    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      window.requestAnimationFrame(() => {
        // Center the 12px dot (x - 6)
        cursor.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
        // Center the 48px halo (x - 24)
        cursorGlow.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0)`;
      });
    };

    // Ensure hidden globally
    document.documentElement.style.cursor = 'none';
    window.addEventListener("mousemove", move);

    return () => {
      document.documentElement.style.cursor = 'auto';
      window.removeEventListener("mousemove", move);
    };
  }, []);

  // Don't render cursor elements on mobile/touch
  if (typeof window !== 'undefined') {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (isTouchDevice || isSmallScreen || !hasFinePointer) return null;
  }

  return (
    <>
      <div
        id="cursor-glow"
        className="fixed top-0 left-0 w-12 h-12 bg-cyan-400/50 blur-md rounded-full pointer-events-none z-[9998] will-change-transform shadow-[0_0_20px_rgba(6,182,212,0.7)]"
      />
      <div
        id="cursor"
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] will-change-transform shadow-[0_0_10px_rgba(6,182,212,1)]"
      />
    </>
  );
}
