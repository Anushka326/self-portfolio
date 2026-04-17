import React from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';

export default function Landing() {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white min-h-screen relative overflow-hidden font-sans flex flex-col justify-center items-center cursor-none">
      <CustomCursor />
      
      {/* Very lightweight background glow */}
      <div className="absolute top-[30%] left-[30%] w-[300px] h-[300px] bg-cyan-700/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 animate-fade-in-up w-full">
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 sm:mb-8">
          Welcome <span className="inline-block hover:animate-spin origin-bottom">👋</span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-4xl text-gray-300 font-light max-w-4xl leading-relaxed mb-10 sm:mb-14">
          Building AI-powered solutions for real-world impact 🤖
        </p>

        <Link 
          to="/home"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-4 px-10 sm:py-6 sm:px-16 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 flex items-center justify-center gap-4 sm:gap-5 group text-lg sm:text-2xl uppercase tracking-widest cursor-none min-h-[50px]"
        >
          <span>Explore My Work</span>
          <span className="group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-300 text-2xl sm:text-3xl">🚀</span>
        </Link>
        
      </div>
    </div>
  );
}
