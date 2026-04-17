import React, { useState, useEffect, useRef } from 'react';
import CustomCursor from './CustomCursor';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={isVisible ? 'reveal-visible' : 'reveal-hidden'}>
      {children}
    </div>
  );
};

const Separator = () => (
  <div className="max-w-7xl mx-auto px-6 my-6 md:my-10">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
  </div>
);

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      <div className="relative z-10 w-full overflow-x-hidden">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 md:py-6 bg-slate-950/80 backdrop-blur-3xl fixed top-0 left-0 right-0 w-full z-[60] transition-all duration-700 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {/* Bottom gradient border matching the buttons */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 opacity-50"></div>

          <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 tracking-wider uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 transition-transform duration-500 cursor-default shrink-0">
            ANUSHKA
          </h1>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[70] transition-all duration-300 relative"
            aria-label="Toggle Menu"
          >
            <span className={`w-8 h-[2px] bg-cyan-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`}></span>
            <span className={`w-8 h-[2px] bg-purple-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-8 h-[2px] bg-cyan-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}></span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 lg:space-x-8 text-sm font-bold items-center">
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
                className={`group relative px-2 lg:px-4 py-2 transition-all duration-300 uppercase tracking-widest text-gray-300 hover:text-white ${link.hidden ? 'hidden lg:inline-block' : ''}`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full shadow-[0_0_15px_rgba(34,211,238,0.6)]"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Overlay & Drawer */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-[55] md:hidden">
              {/* Overlay */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={() => setIsMenuOpen(false)}
              ></div>
              
              {/* Drawer */}
              <div 
                className={`absolute top-0 right-0 h-screen w-3/4 max-w-sm bg-slate-950/95 border-l border-white/10 p-12 flex flex-col items-center justify-center gap-8 shadow-2xl transition-all duration-500 ease-out transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
              >
                {[
                  { name: 'Profile', href: '#hero' },
                  { name: 'About', href: '#about' },
                  { name: 'What I Do', href: '#what-i-do' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Resume', href: '#resume' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold uppercase tracking-widest text-gray-300 hover:text-cyan-400 transition-colors min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero */}
        <section id="hero" className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto pt-40 pb-16 px-6 md:px-12 min-h-[85vh] md:min-h-[75vh] relative gap-10 md:gap-12">

          {/* Fun Emojis - Hidden on very small screens or adjusted */}
          <div className="absolute top-[10%] left-[5%] text-2xl md:text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🚀</div>
          <div className="absolute top-[80%] right-[10%] text-3xl md:text-5xl animate-pulse" style={{ animationDuration: '2s' }}>✨</div>
          <div className="absolute top-[15%] right-[15%] text-3xl md:text-5xl animate-bounce" style={{ animationDuration: '4s' }}>💡</div>

          {/* Left Text Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 w-full">
            <h1 
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 group cursor-default leading-tight animate-fade-in-up opacity-0"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-sm group-hover:from-pink-400 group-hover:to-cyan-400 transition-all duration-700">Anushka</span>
              <span className="inline-block group-hover:animate-spin origin-bottom ml-2">👋</span>
            </h1>

            <h2 
              className="text-4xl sm:text-5xl md:text-[5rem] lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 sm:mb-8 leading-[1.1] md:leading-[1.05] tracking-tight animate-fade-in-up opacity-0"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              AI Developer <br className="hidden md:block" /> & Problem Solver
            </h2>

            <div 
              className="inline-block w-full max-w-lg mb-8 sm:mb-10 animate-fade-in-up opacity-0"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              <p className="text-base sm:text-lg md:text-xl text-white font-mono font-light leading-relaxed px-4 md:px-0">
                {currentText}
                <span className="inline-block w-[3px] h-[1.1em] bg-cyan-400 ml-1 animate-blink align-middle translate-y-[-1px]"></span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-6 animate-fade-in-up opacity-0"
              style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
            >
              <a 
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>View Projects</span>
                <span className="group-hover:translate-x-1 transition-transform">🚀</span>
              </a>
              
              <a 
                href="/Resume.pdf"
                download="Anushka_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-white/40 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Get Resume</span>
                <span className="group-hover:animate-bounce">📄</span>
              </a>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="flex-1 flex justify-center md:justify-end items-center z-10 w-full mb-10 md:mb-0">
            <div className="transform transition-all duration-700 hover:scale-[1.05] hover:-translate-y-2 relative group w-40 h-40 sm:w-56 sm:h-56 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] cursor-pointer">
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

        <Separator />

        {/* About */}
        <ScrollReveal>
          <section id="about" className="px-6 py-12 md:py-24 max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-10 md:mb-16 tracking-wide uppercase">About Me</h2>

            <div className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-light text-justify bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:border-purple-500/30 hover:bg-white/10 group cursor-default">
              {/* Subtle glow inside the about card */}
              <div className="absolute -top-24 -right-24 w-32 h-32 md:w-48 md:h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-32 h-32 md:w-48 md:h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>

              <p className="mb-6 relative z-10">
                AI & Data Science student with hands-on experience in building real-world applications such as an Image Captioning System for visually impaired users, SnapBudget (an OCR-based expense tracker), and SymptoGuard AI, an intelligent healthcare assistant for symptom analysis. I also developed an Android Language Learning App as part of my exploration in mobile development.
              </p>
              <p className="relative z-10">
                Skilled in Python, Machine Learning, and Computer Vision, I enjoy applying AI techniques to create practical solutions and continuously improve through projects and open source contributions.
              </p>
            </div>
          </section>
        </ScrollReveal>
        <Separator />

        {/* What I Do */}
        <ScrollReveal>
          <section id="what-i-do" className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-10 md:mb-16 tracking-wide uppercase">What I Do</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-left">
              {/* Card 1 */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:border-cyan-400/40 hover:bg-white/10 group cursor-default">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform origin-bottom">🧠</span>
                  <span className="group-hover:text-cyan-400 transition-colors">AI & ML Solutions</span>
                </h3>
                <p className="text-gray-300 font-light text-base md:text-xl leading-relaxed">
                  Designing and building AI-powered applications that solve real-world problems using machine learning and computer vision techniques.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:border-purple-400/40 hover:bg-white/10 group cursor-default">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform origin-bottom">💻</span>
                  <span className="group-hover:text-purple-400 transition-colors">Full-Stack Development</span>
                </h3>
                <p className="text-gray-300 font-light text-base md:text-xl leading-relaxed">
                  Developing interactive web applications with modern technologies, focusing on performance, usability, and clean user interfaces.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:border-blue-400/40 hover:bg-white/10 group cursor-default">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform origin-bottom">📊</span>
                  <span className="group-hover:text-blue-400 transition-colors">Data & Problem Solving</span>
                </h3>
                <p className="text-gray-300 font-light text-base md:text-xl leading-relaxed">
                  Analyzing data and building logical solutions to improve decision-making and create efficient, scalable systems.
                </p>
              </div>

              {/* Card 4 */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:border-pink-400/40 hover:bg-white/10 group cursor-default">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform origin-bottom">🚀</span>
                  <span className="group-hover:text-pink-400 transition-colors">Open Source & Learning</span>
                </h3>
                <p className="text-gray-300 font-light text-base md:text-xl leading-relaxed">
                  Actively learning, exploring new technologies, and contributing to projects to continuously grow as a developer.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>


        <Separator />

        {/* Skills */}
        <ScrollReveal>
          <section id="skills" className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-12 md:mb-20 tracking-wide uppercase">Skills & Tech Stack</h2>

            <div className="space-y-16">
              {[
                {
                  category: "Programming",
                  skills: [
                    { name: "Python", color: "#3776AB", iconPath: "M23.922 21.016c-.232.806-.767 1.488-1.542 1.954-1.295.772-2.316 1.055-3.155 1.03-3.003-.09-5.945-.297-8.914-.525-1.531-.118-2.585-1.1-2.616-2.559-.026-1.2.036-2.399.031-3.599v-.598c0-1.8.847-3.32 2.39-4.321 1.708-1.103 3.42-2.14 5.313-2.695 1.346-.395 2.766-.549 4.155-.429.35.03.71.042 1.066.072 1.25.105 2.45.36 3.596.862 1.765.776 3.016 2.051 3.235 3.991.22 1.942.215 3.91.026 5.856zM15.46 12.333a1.444 1.444 0 100-2.888 1.444 1.444 0 000 2.888z" },
                    { name: "JavaScript", color: "#F7DF1E", iconPath: "M0 0h24v24H0V0zm22.034 18.258c-.224-1.357-1.121-2.312-3.167-3.107l-1.077-.425c-.714-.282-1.02-.456-1.02-.75 0-.276.244-.45 1.472-.45.452 0 1.256.122 1.83.332l.309-1.84c-.394-.131-1.082-.338-2.043-.338-2.484 0-4.088 1.332-4.088 3.39 0 1.5.897 2.438 2.625 3.112l1.012.413c1.012.375 1.332.656 1.332 1.069 0 .524-.45 1.011-1.687 1.011-1.424 0-2.119-.506-2.587-1.35l-1.744 1.125c.375 1.481 1.275 2.512 3.862 2.512 3.037 0 5.025-1.5 5.025-3.956z" },
                    { name: "TypeScript", color: "#3178C6", iconPath: "M0 0h24v24H0V0zm22.034 18.258c-.224-1.357-1.121-2.312-3.167-3.107l-1.077-.425c-.714-.282-1.02-.456-1.02-.75 0-.276.244-.45 1.472-.45.422 0 1.15.116 1.706.315l.394-1.82c-.394-.131-1.082-.338-2.043-.338-2.484 0-4.088 1.332-4.088 3.39 0 1.5.897 2.438 2.625 3.112l1.012.413c1.012.375 1.332.656 1.332 1.069 0 .524-.45 1.011-1.687 1.011-1.424 0-2.119-.506-2.587-1.35l-1.744 1.125c.375 1.481 1.275 2.512 3.862 2.512 3.037 0 5.025-1.5 5.025-3.956zM8.38 11.232l-.394 1.821c.394.13.91.315 1.631.315.656 0 1.144-.113 1.144-.544 0-.318-.282-.469-.938-.731l-.487-.206c-.843-.338-1.519-.9-.1519-1.932 0-.974.787-1.894 2.756-1.894.9 0 1.556.169 1.95.338l-.394 1.838c-.356-.131-.844-.262-1.406-.262-.507 0-.788.169-.788.45 0 .319.282.469.956.731l.488.206c.825.338 1.538.863 1.538 1.931 0 .975-.825 1.932-2.906 1.932-1.05 0-1.8-.188-2.25-.376z" },
                    { name: "C++", color: "#00599C", iconPath: "M1.44 5.4c-.9 0-1.44.54-1.44 1.44v10.3c0 .9.54 1.44 1.44 1.44h21.12c1.08 0 1.44-.36 1.44-1.44v-10.3c0-.9-.36-1.44-1.44-1.44h-21.12zm9.12 3.84c0-.9.54-1.44 1.44-1.44s1.44.54 1.44 1.44v1.92h1.92c.9 0 1.44.54 1.44 1.44s-.54 1.44-1.44 1.44h-1.92v1.92c0 .9-.54 1.44-1.44 1.44s-1.44-.54-1.44-1.44v-1.92h-1.92c-.9 0-1.44-.54-1.44-1.44s.54-1.44 1.44-1.44h1.92v-1.92z" }
                  ]
                },
                {
                  category: "AI & Machine Learning",
                  skills: [
                    { name: "TensorFlow", color: "#FF6F00", iconPath: "M22.38 10L12 4L1.62 10V18L12 24L22.38 18V10ZM12 6.3L19.22 10.46V17.54L12 21.7L4.78 17.54V10.46L12 6.3ZM13.88 12.5H16.38V14.17H13.88V19.17H12V14.17H9.5V12.5H12V7.5H13.88V12.5Z" },
                    { name: "OpenCV", color: "#5C3EE8", iconPath: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm0 21.6A9.6 9.6 0 1121.6 12 9.61 9.61 0 0112 21.6zM15.429 8h-6.858a.571.571 0 00-.571.571v6.858a.571.571 0 00.571.571h6.858a.571.571 0 00.571-.571V8.571A.571.571 0 0015.43 8zm-.571 6.857h-5.715v-5.714h5.715v5.714z" },
                    { name: "Scikit-learn", color: "#F7931E", iconPath: "M15.601 5.53c-1.91.035-3.981.91-5.63 2.56-2.93 2.93-2.083 8.53-1.088 9.525.805.804 6.595 1.843 9.526-1.088a9.74 9.74 0 0 0 .584-.643c.043-.292.205-.66.489-1.106a1.848 1.848 0 0 1-.537.176c-.144.265-.37.55-.676.855-.354.335-.607.554-.76.656a.795.795 0 0 1-.437.152c-.35 0-.514-.308-.494-.924-.22.316-.425.549-.612.7a.914.914 0 0 1-.578.224c-.194 0-.36-.09-.496-.273a1.03 1.03 0 0 1-.193-.507 4.016 4.016 0 0 1-.726.583c-.224.132-.47.197-.74.197-.3 0-.543-.096-.727-.288a.978 9.78 0 0 1-.257-.524v.004c-.3.276-.564.48-.79.611a1.295 1.295 0 0 1-.649.197.693.693 0 0 1-.571-.275c-.145-.183-.218-.43-.218-.739 0-.464.101-1.02.302-1.67.201-.65.445-1.25.733-1.797l.842-.312a.21.21 0 0 1 .06-.013c.063 0 .116.047.157.14.04.095.061.221.061.38 0 .451-.104.888-.312 1.31-.207.422-.532.873-.974 1.352-.018.23-.027.388-.027.474 0 .193.036.345.106.458.071.113.165.169.282.169a.71.71 0 0 0 .382-.13c.132-.084.333-.26.602-.523.028-.418.187-.798.482-1.142.324-.38.685-.569 1.08-.569.206 0 .37.054.494.16a.524.524 0 0 1 .186.417c0 .458-.486.829-1.459 1.114.088.43.32.646.693.646a.807.807 0 0 0 .417-.117c.129-.076.321-.243.575-.497.032-.252.118-.495.259-.728.182-.3.416-.544.701-.73.285-.185.537-.278.756-.278.276 0 .47.127.58.381l.677-.374h.186l-.292.971c-.15.488-.226.823-.226 1.004 0 .19.067.285.202.285.086 0 .181-.045.285-.137.104-.092.25-.232.437-.42v.001c.143-.155.274-.32.392-.494-.19-.084-.285-.21-.285-.375 0-.17.058-.352.174-.545.116-.194.275-.29.479-.29.172 0 .258.088.258.265 0 .139-.05.338-.149.596.367-.04.687-.32.961-.842l.228-.01c1.059-2.438.828-5.075-.83-6.732-1.019-1.02-2.408-1.5-3.895-1.471zm4.725 8.203a8.938 8.938 0 0 1-1.333 2.151 1.09 1.09 0 0 0-.012.147c0 .168.047.309.14.423.092.113.206.17.34.17.296 0 .714-.264 1.254-.787-.001.04-.003.08-.003.121 0 .146.012.368.036.666l.733-.172c0-.2.003-.357.01-.474.01-.157.033-.33.066-.517.02-.11.07-.216.152-.315l.186-.216a5.276 5.276 0 0 1 .378-.397c.062-.055.116-.099.162-.13a.26.26 0 0 1 .123-.046c.055 0 .083.035.083.106 0 .07-.052.236-.156.497" }
                  ]
                },
                {
                  category: "Web & Backend",
                  skills: [
                    { name: "React", color: "#61DAFB", iconPath: "M21.1 12c0 2.3-3.1 4.4-7.8 5.7L12 12.5l-1.3 5.2c-4.7-1.3-7.8-3.4-7.8-5.7s3.1-4.4 7.8-5.7L12 11.5l1.3-5.2c4.7 1.3 7.8 3.4 7.8 5.7zM12 13a1 1 0 110-2 1 1 0 010 2zm11.7-1c0 5-5.2 9-11.7 9S.3 17 0.3 12s5.2-9 11.7-9 11.7 4 11.7 9z" },
                    { name: "Tailwind CSS", color: "#06B6D4", iconPath: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" },
                    { name: "Node.js", color: "#339933", iconPath: "M12 0L24 6V18L12 24L0 18V6L12 0ZM12 4.2L4.2 8.1V15.9L12 19.8L19.8 15.9V8.1L12 4.2ZM12 8.4C13.9882 8.4 15.6 10.0118 15.6 12C15.6 13.9882 13.9882 15.6 12 15.6C10.0118 15.6 8.4 13.9882 8.4 12C8.4 10.0118 10.0118 8.4 12 8.4Z" }
                  ]
                },
                {
                  category: "Databases",
                  skills: [
                    { name: "MongoDB", color: "#47A248", iconPath: "M17.193 9.555c-1.132-4.036-3.174-7.562-5.185-9.555-2.007 1.993-4.05 5.515-5.182 9.552-1.047 3.729-.622 7.7 1.156 11.058C8.58 21.6 9.4 22.46 10.3 23.36V24l1.7-.735L13.7 24v-.64c.9-.9 1.76-1.76 2.405-2.585 1.782-3.355 2.156-7.39 1.088-11.22zm-7.34 7.648l1.45 1.62-.262-.263.633.722-.164-.136.374.453-.122-.09.324.4-.085-.062.277.35-.15-.17.153.185v.003l.365-.436-.182.203.32-.387-.13.136.27-.34-.093.1.201-.264-.06.1c.115-.175.22-.36.32-.544.135-.25.26-.505.373-.77.106-.25.195-.506.274-.766l.015-.1a2.8 2.8 0 0 0-.27 2.405z" },
                    { name: "MySQL", color: "#4479A1", iconPath: "M12.23 6.94s.104-.005.143-.005c.877 0 1.293.308 1.48.56.242.327.3.708.303 1.02-.32-.154-1.012-.345-2.036-.345s-1.787.21-2.112.37c0-.282.046-.61.192-.93.2-.44.823-.67 2.03-.67zM11.58 4c.3 0 .42.067.443.085.068.046.12.115.115.22-.008.232-.236.425-.568.425-.094 0-.17-.015-.245-.034-.234-.06-.402-.12-.417-.3C10.89 4.14 11.166 4 11.58 4zm1.19.167c.026.046.034.098.026.155-.026.19-.246.335-.557.38a1.2 1.2 0 0 1-.223.018c-.463 0-.677-.2-.686-.39 0-.096.043-.177.12-.24a1.86 1.86 0 0 1 .494-.282c.3-.117.513-.106.635-.018.064.043.14.116.19.177zm.82 2.128c.45.034.824.168 1.05.378.14.13.3.363.3.623a.138.138 0 0 1-.057.11c-.046.035-.11.053-.19.053a.35.35 0 0 1-.275-.145.49.49 0 0 0-.41-.186c-.198 0-.5.068-.788.163-.01.003-.018.005-.02.005-.008 0-.012-.005-.015-.01a.34.34 0 0 1-.02-.126c0-.39-.143-.76-.395-1.07zm1.168 2.583a3.507 3.507 0 0 1 .463 1.636c0 1.344-.654 2.193-1.042 2.56-1.554 1.485-3.66 1.51-4.706 1.103-1.04-.403-1.793-1.848-1.574-3.535l.006-.05c.102-.746.208-1.423.75-1.895l.138-.114s1.25-.436 2.44-.436c.646 0 1.114.072 1.442.148.43.1.58.267.58.42a.3.3 0 0 1-.107.228.318.318 0 0 1-.237.085c-.15 0-.435-.152-1.614-.152-1.378 0-1.883.33-2.065.71l-.146.3c.094-.04.283-.11.6-.176.223-.047.533-.082.905-.082 1.402 0 2.218.498 2.457 1.05zm1.5-2.228l.053.078c.415.617.767 1.258.988 2.016.59 2.028-.27 4.298-1.708 5.614-1.282 1.173-3.415 1.543-5.58 1.347-1.332-.123-2.613-.532-3.32-.82-.36-.145-.7-.34-.94-.52-.39-.29-.728-.687-.803-.94-.035-.116-.017-.225.048-.308.067-.087.165-.138.283-.146.138-.01.597.098 1.042.197.697.155.8.125.867.11.232-.045.418-.328.6-.66.626-1.144.38-3.006-.55-4.59-.444-.755-.98-1.127-1.383-1.32-.4-.19-.74-.265-.968-.3-.223-.035-.348-.152-.348-.327 0-.083.028-.158.082-.224a.3.3 0 0 1 .232-.09c.27 0 .584.225 1.047.595.6.48.97 1.096 1.42 2.162.77 1.826 1.196 2.502 1.528 2.502.164 0 .33-.163.79-.868.528-.802 1.22-1.637 1.96-2.268.32-.273.71-.564.912-.68.274-.16.326-.182.4-.2.13-.028.26.046.335.14s.08.204.05.3zm.507-1.72a4.426 4.426 0 0 1 .71.748c.1.135.205.3.267.45.093.22.02.484-.136.6-.13.1-.4.1-0.6-.014-.136-.076-.237-.253-.309-.364-.2-.315-.434-.6-.708-.853-.08-.073-.122-.128-.122-.164s.03-.062.08-.088c.1-.052.487-.19.82-.314zm4.493 2.58l.113.116c1.17 1.258 1.763 3.447 1.467 5.258a10.05 10.05 0 0 1-.95 2.87c-.6.126-1.7.352-2.316.483l.003-.03a.5.5 0 0 0-.256-.465c-.144-.082-.314-.1-.476-.05-.084.025-.562.176-.9.282-1.042.327-2.6.21-3.6-.3a4.06 4.06 0 0 0-1.615-.465 6.34 6.34 0 0 0-1.137.07c-2.016.29-4.8 1.28-5.3 1.46 v1.46l-.004.004c.007.037.13.565.176.716.467 1.543 2.214 2.295 4.312 2.295a9 9 0 0 0 1.63-.146l.27-.046s1.65-.28 3.32-.28c2.115 0 4.1.488 5.768.87.69.16 1.21.328 1.427.42.226.1.343.208.384.34.043.14.015.343-.13.595l.02.01c.28-.11.664-.465.664-.99s-.284-1-1.077-1.39l.11-.274a10.85 10.85 0 0 0 1.13-4.322c.112-2.144-.657-4.474-1.956-7l-.022-.047s-.43-.996-.867-1.423c-.328-.318-.543-.377-.733-.377-.282 0-.422.18-.422.378a3.3 3.3 0 0 0 .117.652c.13.435.378.887.494 1.12zM6.502 11.45a3.4 3.4 0 0 1 .452-1.39.2.2 0 0 1 .18-.1c.066 0 .12.03.16.09s.053.138.04.225c-.15.93-.16 1.847.114 2.45.1.223.23.4.407.54l-.452.26s-.913-.88-.9-2.074zm-2.484.583a4.13 4.13 0 0 1 1.047-2.316l.123-.134c.05-.05.106-.076.166-.076a.186.186 0 0 1 .172.12c.1.23.1.52.003.854a8.134 8.134 0 0 0-.044.823s.06 1.25.753 2l-.248.14a3.89 3.89 0 0 1-1.972-1.412zm.283.475l.18.17s-.103.35-.103.542c0 .285.42 1.483.42 1.483l-.154.088s-.8-.745-.88-1.574c-.032-.34.126-.574.537-.71z" }
                  ]
                },
                {
                  category: "Tools & Platforms",
                  skills: [
                    { name: "Git", color: "#F05032", iconPath: "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.187 0L8.708 2.62l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.904l2.747 2.747c.646-.22 1.388-.078 1.904.439.708.707.708 1.854 0 2.561-.707.708-1.854.708-2.56 0-.518-.517-.659-1.259-.439-1.905l-2.61-2.61v4.46c.214.07.412.186.58.351.708.707.708 1.854 0 2.561-.708.708-1.854.708-2.561 0-.708-.707-.708-1.854 0-2.561.166-.165.364-.282.578-.352V8.905c-.214-.07-.411-.187-.58-.351-.518-.517-.658-1.259-.438-1.905l-2.76-2.76L.453 10.93c-.603.605-.603 1.583 0 2.187l10.478 10.478c.605.603 1.582.603 2.187 0l10.429-10.43c.603-.603.603-1.581 0-2.185z" },
                    { name: "Jupyter", color: "#F37626", iconPath: "M7.184 18.046c.556 0 1.008-.444 1.008-.99 0-.547-.452-.991-1.008-.991-.555 0-1.008.444-1.008.99 0 .547.453.991 1.008.991zm5.222-12.09c.775 0 1.403-.62 1.403-1.382 0-.763-.628-1.382-1.403-1.382-.775 0-1.403.62-1.403 1.382 0 .762.628 1.382 1.403 1.382zm0 16.088c.775 0 1.403-.62 1.403-1.382 0-.762-.628-1.381-1.403-1.381-.775 0-1.403.62-1.403 1.381 0 .762.628 1.382 1.403 1.382zm0-13.324c-.775 0-1.403.62-1.403 1.382 0 .762.628 1.381 1.403 1.381.775 0 1.403-.62 1.403-1.381 0-.762-.628-1.382-1.403-1.382zm5.222 9.324c.556 0 1.008-.444 1.008-.991 0-.546-.452-.99-1.008-.99-.555 0-1.008.444-1.008.99 0 .547.453.991 1.008.991zm0-6.66c.556 0 1.008-.444 1.008-.99 0-.547-.452-.991-1.008-.991-.555 0-1.008.444-1.008.99 0 .546.453.991 1.008.991zM21.393 12c0 5.185-4.204 9.393-9.393 9.393S2.607 17.185 2.607 12 6.811 2.607 12 2.607 21.393 6.815 21.393 12zM0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12zm2.015 0c0-5.514 4.471-9.985 9.985-9.985S21.985 6.486 21.985 12s-4.471 9.985-9.985 9.985S2.015 17.514 2.015 12z" },
                    { name: "Power BI", color: "#F2C811", iconPath: "M1 1v22h6V1zm8 0v22h6V1zm8 0v22h6V1z" }
                  ]
                }
              ].map((cat, idx) => (
                <div key={idx} className="space-y-6 md:space-y-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-400 uppercase tracking-widest pl-2 border-l-4 border-cyan-500/50">{cat.category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 40px ${skill.color}55`;
                          e.currentTarget.style.borderColor = `${skill.color}66`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                        className="group flex flex-col items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 hover:scale-105 cursor-default"
                      >
                        <div className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg viewBox="0 0 24 24" fill={skill.color} className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity">
                            <path d={skill.iconPath} />
                          </svg>
                        </div>
                        <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors tracking-wide">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <Separator />

        {/* Currently Doing */}
        <ScrollReveal>
          <section id="currently-doing" className="px-6 py-12 md:py-24 max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-10 md:mb-16 tracking-wide uppercase">What I'm Currently Doing</h2>

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
        </ScrollReveal>

        <Separator />

        {/* Projects */}
        <ScrollReveal>
          <section id="projects" className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-10 md:mb-16 tracking-wide uppercase">Featured Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:border-cyan-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl">
                    <span className="text-3xl">🖼️</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">AI</span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">CV</span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">NLP</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Image Captioning System</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  AI-based system generating meaningful descriptions for images to assist visually impaired users. Features audio output and high-accuracy visual recognition.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">GitHub Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:border-emerald-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl">
                    <span className="text-3xl text-emerald-400">🧾</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">OCR</span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">React</span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">ML</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">SnapBudget OCR</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Optical Character Recognition based expense tracker. Automates receipt data extraction and categorizes finances with high precision.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <a href="https://github.com/PratikshaDharne/hackarena26-CodeCrew" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:border-rose-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-rose-500/10 rounded-2xl">
                    <span className="text-3xl text-rose-400">🩺</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">AI</span>
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">ML</span>
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">Health</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-rose-400 transition-colors">SymptoGuard AI</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Intelligent healthcare assistant analyzing user-reported symptoms to suggest possible medical conditions with precautionary guidance.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-v from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <a href="https://github.com/Anushka326/Symptoms_guard_agent" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Project 4 */}
              <div className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:border-indigo-500/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl">
                    <span className="text-3xl text-indigo-400">💳</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20">TS</span>
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20">React</span>
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20">Fin</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">NovaExpense</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                  Modern expense management app focusing on performance and clean UI. Features structured tracking and analytics for personal finances.
                </p>
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-500 font-bold rounded-xl cursor-not-allowed group/btn overflow-hidden relative">
                    <span className="relative z-10 transition-colors">Demo Coming Soon</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <a href="https://github.com/Anushka326/NovaExpense" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>


        <Separator />

        {/* Resume Section */}
        <ScrollReveal>
          <section id="resume" className="px-6 py-12 md:py-20 max-w-5xl mx-auto flex justify-center items-center relative z-10">
            <a
              href="/Resume.pdf"
              download="Anushka_Resume.pdf"
              className="mt-6 md:mt-10 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-4 px-10 md:py-6 md:px-16 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 flex items-center justify-center gap-4 md:gap-5 group text-lg md:text-2xl uppercase tracking-widest min-h-[50px]"
            >
              <span>Download Resume</span>
              <span className="group-hover:animate-bounce text-2xl md:text-3xl">📄</span>
            </a>
          </section>
        </ScrollReveal>

        <Separator />

        {/* Contact */}
        <ScrollReveal>
          <section id="contact" className="text-center py-12 md:py-24 mb-10 w-full max-w-5xl mx-auto px-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

              {/* Decorative Floating Symbols - hidden/reduced on mobile */}
              <div className="absolute top-10 right-10 text-5xl animate-bounce opacity-20 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block">📬</div>
              <div className="absolute bottom-10 left-10 text-5xl animate-bounce opacity-20 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block" style={{ animationDelay: "0.5s" }}>💌</div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 md:mb-12 uppercase tracking-widest leading-normal pb-2">Let's Connect</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 flex-wrap">
                  <a href="mailto:anushkanpise@gmail.com" className="bg-white/10 px-6 py-3 md:px-8 md:py-4 rounded-xl border border-white/20 hover:border-pink-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(236,72,153,0)] hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] min-h-[44px]">
                    <span className="group-hover/btn:animate-pulse text-xl">📧</span>
                    <span className="text-sm md:text-base">Email: anushkanpise@gmail.com</span>
                  </a>
                  <a href="https://github.com/Anushka326" target="_blank" rel="noopener noreferrer" className="bg-white/10 px-6 py-3 md:px-8 md:py-4 rounded-xl border border-white/20 hover:border-cyan-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] min-h-[44px]">
                    <span className="group-hover/btn:animate-bounce text-xl">💻</span>
                    <span className="text-sm md:text-base">GitHub: Anushka326</span>
                  </a>
                  <a href="https://www.linkedin.com/in/anushka-p-978a8b327/" target="_blank" rel="noopener noreferrer" className="bg-white/10 px-6 py-3 md:px-8 md:py-4 rounded-xl border border-white/20 hover:border-purple-400 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 font-semibold tracking-wide hover:-translate-y-1 group/btn shadow-[0_0_15px_rgba(168,85,247,0)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] min-h-[44px]">
                    <span className="group-hover/btn:animate-ping text-xl">🤝</span>
                    <span className="text-sm md:text-base">LinkedIn: Anushka Pise</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <footer className="py-12 px-6 border-t border-cyan-500/10 bg-[#1B3C53]/30 backdrop-blur-md">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Anushka Pise</h2>
              <p className="text-gray-400 font-light text-sm tracking-wide uppercase">AI & ML Enthusiast</p>
            </div>

            <div className="flex gap-6">
              <a 
                href="https://github.com/Anushka326" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/anushka-p-978a8b327/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>

            <div className="text-gray-500 text-xs font-light tracking-widest flex flex-col items-center gap-1">
              <p>&copy; {new Date().getFullYear()} Anushka Pise. All rights reserved.</p>
              <p>Built with <span className="text-cyan-400/60 font-medium">React</span> & <span className="text-purple-400/60 font-medium">Tailwind</span> + Deployed on <span className="text-white/60 font-medium tracking-normal">Vercel</span></p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}