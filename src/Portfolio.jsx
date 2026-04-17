import React, { useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

export default function Portfolio() {
  const phrases = [
    "AI & Data Science Student | Building AI Solutions 🤖",
    "Building intelligent solutions with AI 🤖",
    "Exploring ideas, turning them into reality 🚀",
    "Learning, creating, and improving every day 💡"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [hasStarted, setHasStarted] = useState(false);

  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Delay start of typing effect
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const handleTyping = () => {
      const fullPhrase = phrases[currentPhraseIndex];
      const fullPhraseChars = [...fullPhrase];
      const currentChars = [...currentText];

      if (!isDeleting) {
        // Typing
        setCurrentText(fullPhraseChars.slice(0, currentChars.length + 1).join(""));
        setTypingSpeed(80); // Smooth typing speed

        if (currentText === fullPhrase) {
          // Pause at the end
          setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullPhraseChars.slice(0, currentChars.length - 1).join(""));
        setTypingSpeed(40); // Faster deletion

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [hasStarted, currentText, isDeleting, currentPhraseIndex, typingSpeed, phrases]);

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white min-h-screen relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200 cursor-none">

      <CustomCursor />

      {/* Background Container - cleanly clips all decorative elements without breaking layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative background blobs - Refined for Depth */}
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 bg-slate-950/60 backdrop-blur-3xl fixed top-0 left-0 right-0 w-full z-50 transition-all duration-700 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {/* Bottom gradient border matching the buttons */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 opacity-50"></div>

          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 tracking-wider uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 transition-transform duration-500 cursor-default">
            ANUSHKA'S PORTFOLIO
          </h1>

          <div className="space-x-8 text-sm font-bold flex items-center">
            {[
              { name: 'Profile', href: '#hero' },
              { name: 'About', href: '#about' },
              { name: 'What I Do', href: '#what-i-do' },
              { name: 'Skills', href: '#skills' },
              { name: 'Currently Doing', href: '#currently-doing', hidden: true },
              { name: 'Projects', href: '#projects' },
              { name: 'Resume', href: '#resume' },
              { name: 'Contact', href: '#contact' }
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`group relative px-4 py-2 transition-all duration-300 uppercase tracking-widest text-gray-300 hover:text-white ${link.hidden ? 'hidden lg:inline-block' : ''}`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section id="hero" className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto pt-32 pb-16 px-6 md:px-12 min-h-[75vh] relative gap-12">

          {/* Fun Emojis - Adjusted for split layout */}
          <div className="absolute top-[10%] left-[5%] md:left-[5%] text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🚀</div>
          <div className="absolute top-[80%] right-[10%] md:right-[5%] text-5xl animate-pulse" style={{ animationDuration: '2s' }}>✨</div>
          <div className="absolute bottom-[5%] left-[20%] md:left-[35%] text-4xl animate-spin" style={{ animationDuration: '6s' }}>☕</div>
          <div className="absolute top-[15%] right-[15%] md:right-[45%] text-5xl animate-bounce" style={{ animationDuration: '4s' }}>💡</div>

          {/* Left Text Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 w-full">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 group cursor-default leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-sm group-hover:from-pink-400 group-hover:to-cyan-400 transition-all duration-700">Anushka</span>
              <span className="inline-block group-hover:animate-spin origin-bottom ml-2">👋</span>
            </h1>

            <h2 className="text-5xl md:text-[5rem] lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 leading-[1.05] tracking-tighter">
              AI Developer <br className="hidden md:block focus:hidden" /> & Problem Solver
            </h2>

            <div className="inline-block w-full max-w-lg">
              <p className="text-lg md:text-xl text-white font-mono font-light leading-relaxed">
                {currentText}
                <span className="inline-block w-[3px] h-[1.1em] bg-cyan-400 ml-1 animate-blink align-middle translate-y-[-1px]"></span>
              </p>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="flex-1 flex justify-center md:justify-end items-center z-10 w-full mb-10 md:mb-0">
            <div className="transform transition-all duration-700 hover:scale-[1.05] hover:-translate-y-2 relative group w-72 h-72 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] cursor-pointer">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping opacity-20"></div>
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000 group-hover:duration-300 animate-pulse"></div>
              <img
                src="/profile.png"
                alt="profile"
                className="relative w-full h-full rounded-full border-4 border-white/30 object-cover shadow-[0_0_40px_rgba(168,85,247,0.4)] bg-slate-800 z-10 hover:border-cyan-400 transition-colors duration-500"
              />
            </div>
          </div>

        </section>

        {/* About */}
        <section id="about" className="px-6 py-20 max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-16 tracking-wide uppercase">About Me</h2>

          <div className="text-xl md:text-2xl text-white leading-relaxed font-light text-justify bg-white/5 p-10 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:border-purple-500/30 hover:bg-white/10 group cursor-default">
            {/* Subtle glow inside the about card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>

            <p className="mb-6 relative z-10">
              AI & Data Science student with hands-on experience in building real-world applications such as an Image Captioning System for visually impaired users, SnapBudget (an OCR-based expense tracker), and SymptoGuard AI, an intelligent healthcare assistant for symptom analysis. I also developed an Android Language Learning App as part of my exploration in mobile development.
            </p>
            <p className="relative z-10">
              Skilled in Python, Machine Learning, and Computer Vision, I enjoy applying AI techniques to create practical solutions and continuously improve through projects and open source contributions.
            </p>
          </div>
        </section>
        {/* What I Do */}
        <section id="what-i-do" className="px-6 py-20 max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-16 tracking-wide uppercase">What I Do</h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 text-left">
            {/* Card 1 */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:border-cyan-400/40 hover:bg-white/10 group cursor-default">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl group-hover:scale-110 transition-transform origin-bottom">🧠</span>
                <span className="group-hover:text-cyan-400 transition-colors">AI & ML Solutions</span>
              </h3>
              <p className="text-gray-300 font-light text-xl leading-relaxed">
                Designing and building AI-powered applications that solve real-world problems using machine learning and computer vision techniques.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:border-purple-400/40 hover:bg-white/10 group cursor-default">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl group-hover:scale-110 transition-transform origin-bottom">💻</span>
                <span className="group-hover:text-purple-400 transition-colors">Full-Stack Development</span>
              </h3>
              <p className="text-gray-300 font-light text-xl leading-relaxed">
                Developing interactive web applications with modern technologies, focusing on performance, usability, and clean user interfaces.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:border-blue-400/40 hover:bg-white/10 group cursor-default">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl group-hover:scale-110 transition-transform origin-bottom">📊</span>
                <span className="group-hover:text-blue-400 transition-colors">Data & Problem Solving</span>
              </h3>
              <p className="text-gray-300 font-light text-xl leading-relaxed">
                Analyzing data and building logical solutions to improve decision-making and create efficient, scalable systems.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:border-pink-400/40 hover:bg-white/10 group cursor-default">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl group-hover:scale-110 transition-transform origin-bottom">🚀</span>
                <span className="group-hover:text-pink-400 transition-colors">Open Source & Learning</span>
              </h3>
              <p className="text-gray-300 font-light text-xl leading-relaxed">
                Actively learning, exploring new technologies, and contributing to projects to continuously grow as a developer.
              </p>
            </div>
          </div>
        </section>


        {/* Skills */}
        <section id="skills" className="px-6 py-20 max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-16 tracking-wide uppercase">Skills & Tech Stack</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Programming */}
            <div className="flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:border-cyan-400/40 hover:bg-white/10 group cursor-default">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">Programming</h3>
              <div className="flex justify-center gap-4 flex-wrap w-full">
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">🐍</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">Python</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">⚙️</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">C++</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">🟨</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">JavaScript</span>
                </div>
              </div>
            </div>

            {/* AI / ML */}
            <div className="flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:border-purple-400/40 hover:bg-white/10 group cursor-default">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">AI / ML</h3>
              <div className="flex justify-center gap-4 flex-wrap w-full">
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">🧠</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">TensorFlow</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">👁️</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">OpenCV</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">📊</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">Scikit-learn</span>
                </div>
              </div>
            </div>

            {/* Web */}
            <div className="flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:border-pink-400/40 hover:bg-white/10 group cursor-default">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">Web</h3>
              <div className="flex justify-center gap-4 flex-wrap w-full">
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-4xl group-hover/icon:animate-spin transition-transform duration-300 disabled pointer-events-none">⚛️</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">React</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">🟦</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">TypeScript</span>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:border-blue-400/40 hover:bg-white/10 group cursor-default h-full lg:col-span-1 md:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">Tools</h3>
              <div className="flex justify-center gap-4 flex-wrap w-full">
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">🐙</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">Git</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">🐱</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">GitHub</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">💻</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">VS Code</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">📓</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">Jupyter</span>
                </div>
              </div>
            </div>

            {/* Database */}
            <div className="flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:border-green-400/40 hover:bg-white/10 group cursor-default h-full">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">Databases</h3>
              <div className="flex justify-center gap-6 flex-wrap w-full">
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">🐬</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">MySQL</span>
                </div>
                <div className="flex flex-col items-center gap-3 group/icon">
                  <span className="text-5xl group-hover/icon:-translate-y-2 transition-transform duration-300 group-hover/icon:scale-110">🍃</span>
                  <span className="text-sm text-gray-300 font-medium whitespace-nowrap">MongoDB</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Currently Doing */}
        <section id="currently-doing" className="px-6 py-20 max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-16 tracking-wide uppercase">What I'm Currently Doing</h2>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:border-purple-400/40 hover:bg-white/10 group">
            <ul className="text-lg md:text-xl text-gray-300 font-light space-y-6 list-none">
              <li className="flex items-start gap-4 transform transition-transform hover:translate-x-3 duration-300 cursor-default">
                <span className="bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] rounded-full h-3 w-3 mt-2.5 inline-block flex-shrink-0"></span>
                <span className="hover:text-white transition-colors">Building AI-powered solutions 🤖</span>
              </li>
              <li className="flex items-start gap-4 transform transition-transform hover:translate-x-3 duration-300 cursor-default">
                <span className="bg-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.8)] rounded-full h-3 w-3 mt-2.5 inline-block flex-shrink-0"></span>
                <span className="hover:text-white transition-colors">Exploring real-world applications of Machine Learning</span>
              </li>
              <li className="flex items-start gap-4 transform transition-transform hover:translate-x-3 duration-300 cursor-default">
                <span className="bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] rounded-full h-3 w-3 mt-2.5 inline-block flex-shrink-0"></span>
                <span className="hover:text-white transition-colors">Actively learning and contributing through open source 🚀</span>
              </li>
              <li className="flex items-start gap-4 transform transition-transform hover:translate-x-3 duration-300 cursor-default">
                <span className="bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)] rounded-full h-3 w-3 mt-2.5 inline-block flex-shrink-0"></span>
                <span className="hover:text-white transition-colors">Continuously improving development and problem-solving skills</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-6 py-24 max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-16 tracking-wide uppercase">Projects</h2>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
            {/* Project 1 */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:border-cyan-400/40 hover:bg-white/10 group relative overflow-hidden text-left cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50 relative z-0"></div>
              <h3 className="text-4xl font-bold text-white mb-6 relative z-10 flex items-center gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform origin-bottom">🖼️</span>
                <span className="group-hover:text-cyan-400 transition-colors">Image Captioning System</span>
              </h3>
              <div className="text-white text-xl leading-relaxed relative z-10 font-light flex-grow space-y-5 text-justify">
                <p>Developed an AI-based Image Captioning System that generates meaningful descriptions for images using computer vision and natural language processing techniques. The system is designed to assist visually impaired users by converting visual content into text and audio output.</p>
                <p>This project highlights the integration of AI with accessibility-focused solutions for real-world impact.</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:border-purple-400/40 hover:bg-white/10 group relative overflow-hidden text-left cursor-pointer">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16 transition-opacity group-hover:opacity-100 opacity-50 relative z-0"></div>
              <h3 className="text-4xl font-bold text-white mb-6 relative z-10 flex items-center gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform origin-bottom">🧾</span>
                <span className="group-hover:text-purple-400 transition-colors">SnapBudget OCR</span>
              </h3>
              <div className="text-white text-xl leading-relaxed relative z-10 font-light flex-grow space-y-5 text-justify">
                <p>SnapBudget is an OCR-based expense tracking application that automates the process of extracting and categorizing data from receipts and bills. By using Optical Character Recognition, it reduces manual effort and simplifies financial tracking.</p>
                <p>The project focuses on combining automation with usability to provide an efficient solution for managing daily expenses.</p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] hover:border-pink-400/40 hover:bg-white/10 group relative overflow-hidden text-left cursor-pointer">
              <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -ml-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50 relative z-0"></div>
              <h3 className="text-4xl font-bold text-white mb-6 relative z-10 flex items-center gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform origin-bottom">🩺</span>
                <span className="group-hover:text-pink-400 transition-colors">SymptoGuard AI</span>
              </h3>
              <div className="text-white text-xl leading-relaxed relative z-10 font-light flex-grow space-y-5 text-justify">
                <p>SymptoGuard AI is an intelligent healthcare assistant that analyzes user-reported symptoms and suggests possible medical conditions using AI-based logic. It provides structured outputs along with precautionary guidance, focusing on early awareness and responsible AI usage.</p>
                <p>This project demonstrates the application of AI in healthcare to assist decision-making and improve accessibility to basic medical insights.</p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:border-blue-400/40 hover:bg-white/10 group relative overflow-hidden text-left cursor-pointer">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mb-16 transition-opacity group-hover:opacity-100 opacity-50 relative z-0"></div>
              <h3 className="text-4xl font-bold text-white mb-6 relative z-10 flex items-center gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform origin-bottom">💳</span>
                <span className="group-hover:text-blue-400 transition-colors">NovaExpense</span>
              </h3>
              <div className="text-white text-xl leading-relaxed relative z-10 font-light flex-grow space-y-5 text-justify">
                <p>NovaExpense is a modern expense management application built using TypeScript and React, designed to help users track, organize, and analyze their financial transactions efficiently. It provides a clean interface for managing expenses and understanding spending behavior.</p>
                <p>The project emphasizes structured frontend development, performance, and continuous improvement with ongoing feature enhancements.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Resume Section */}
        <section id="resume" className="px-6 py-20 max-w-5xl mx-auto flex justify-center items-center relative z-10">
          <a
            href="/Resume.pdf"
            download="Anushka_Resume.pdf"
            className="mt-10 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-6 px-16 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 flex items-center gap-5 group text-2xl uppercase tracking-widest"
          >
            <span>Download Resume</span>
            <span className="group-hover:animate-bounce text-3xl">📄</span>
          </a>
        </section>

        {/* Contact */}
        <section id="contact" className="text-center py-24 mb-10 w-full max-w-5xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

            <div className="absolute top-10 right-10 text-5xl animate-bounce opacity-20 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">📬</div>
            <div className="absolute bottom-10 left-10 text-5xl animate-bounce opacity-20 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" style={{ animationDelay: "0.5s" }}>💌</div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-12 uppercase tracking-widest leading-normal pb-2">Let's Connect</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-6 flex-wrap">
                <a href="mailto:anushkanpise@gmail.com" className="bg-white/10 px-8 py-4 rounded-xl border border-white/20 hover:border-pink-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(236,72,153,0)] hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                  <span className="group-hover/btn:animate-pulse text-xl">📧</span>
                  <span>Email: anushkanpise@gmail.com</span>
                </a>
                <a href="https://github.com/Anushka326" target="_blank" rel="noopener noreferrer" className="bg-white/10 px-8 py-4 rounded-xl border border-white/20 hover:border-cyan-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <span className="group-hover/btn:animate-bounce text-xl">💻</span>
                  <span>GitHub: Anushka326</span>
                </a>
                <a href="https://www.linkedin.com/in/anushka-p-978a8b327/" target="_blank" rel="noopener noreferrer" className="bg-white/10 px-8 py-4 rounded-xl border border-white/20 hover:border-purple-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(168,85,247,0)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <span className="group-hover/btn:animate-ping text-xl">🤝</span>
                  <span>LinkedIn: Anushka Pise</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}