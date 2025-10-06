import React from 'react';

const Background2 = () => {
  const codeSnippets = [
    '{ }',
    '</>',
    '( )',
    'fn()',
    '=>',
    'const',
    'let',
    'if',
    'while',
    'for',
    '&&',
    '||',
    '===',
    'async',
    'await',
    'try',
    'catch',
    'return',
    'import',
    'export',
  ];

  const logos = ['⚛️', '🔥', '⚡', '💻', '🚀', '🎯', '✨', '🌟', '⭐', '🔧'];

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-black via-yellow-950 to-black overflow-hidden">
      <style jsx>{`
        @keyframes float-code {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes float-code-reverse {
          0% {
            transform: translateY(-100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(-50px) rotate(-360deg);
            opacity: 0;
          }
        }
        
        @keyframes pulse-yellow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(250, 204, 21, 0.6);
          }
        }
        
        @keyframes grid-slide {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .code-float {
          animation: float-code linear infinite;
        }
        
        .code-float-reverse {
          animation: float-code-reverse linear infinite;
        }
        
        .pulse-yellow {
          animation: pulse-yellow 4s ease-in-out infinite;
        }
        
        .glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .grid-pattern-diagonal {
          background-image: 
            linear-gradient(45deg, rgba(250, 204, 21, 0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(250, 204, 21, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-slide 20s linear infinite;
        }
        
        .spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .gradient-orb-yellow {
          filter: blur(80px);
          opacity: 0.5;
        }
      `}</style>
      
      {/* Animated diagonal grid */}
      <div className="absolute inset-0 grid-pattern-diagonal opacity-40"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-500 rounded-full gradient-orb-yellow pulse-yellow"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-400 rounded-full gradient-orb-yellow pulse-yellow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-600 rounded-full gradient-orb-yellow pulse-yellow" style={{ animationDelay: '1s' }}></div>
      
      {/* Spline 3D Scene */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <iframe 
          src='https://my.spline.design/untitled-271c906c10b4c02ba0566c78beae8dc0/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-auto opacity-80"
        />
      </div>
      
      {/* Floating code snippets and logos */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {codeSnippets.map((snippet, i) => (
          <div
            key={`snippet-${i}`}
            className={`absolute font-mono text-yellow-400 font-bold ${i % 2 === 0 ? 'code-float' : 'code-float-reverse'}`}
            style={{
              left: `${(i * 17) % 90}%`,
              fontSize: `${Math.random() * 1.5 + 0.8}rem`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              textShadow: '0 0 10px rgba(250, 204, 21, 0.5)',
            }}
          >
            {snippet}
          </div>
        ))}
        
        {logos.map((logo, i) => (
          <div
            key={`logo-${i}`}
            className={`absolute text-4xl ${i % 2 === 0 ? 'code-float' : 'code-float-reverse'}`}
            style={{
              left: `${(i * 23 + 10) % 85}%`,
              animationDuration: `${Math.random() * 8 + 12}s`,
              animationDelay: `${Math.random() * 6}s`,
              filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))',
            }}
          >
            {logo}
          </div>
        ))}
      </div>
      
      {/* Geometric shapes */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-yellow-400/30 spin-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-amber-400/30 rounded-full spin-slow" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute top-2/3 left-1/2 w-20 h-20 border-2 border-yellow-500/30 rotate-45 spin-slow"></div>
      </div>
      
      {/* Glowing particles */}
      <div className="absolute inset-0 z-15">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full glow-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Scan lines */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-20 top-1/4"></div>
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-20 top-2/4"></div>
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-20 top-3/4"></div>
      </div>
      
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-20 pointer-events-none"></div>
      
      {/* Content placeholder */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="text-center text-yellow-400/20 font-mono text-sm">
          {/* Your portfolio content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Background2;