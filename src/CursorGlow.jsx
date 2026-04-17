import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let animationFrameId;
    
    const handleMouseMove = (e) => {
      // Use requestAnimationFrame to throttle state updates yielding incredibly smooth and lightweight performance
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[100px] ease-out mix-blend-screen"
      style={{
        transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
        willChange: 'transform',
        transition: 'transform 0.1s ease-out'
      }}
    />
  );
}
