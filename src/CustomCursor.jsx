import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
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
      document.documentElement.style.cursor = 'default';
      window.removeEventListener("mousemove", move);
    };
  }, []);

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
