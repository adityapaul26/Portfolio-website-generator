import React from 'react';

const Background1 = () => {
  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-move 2s linear infinite;
        }
        
        .gradient-orb {
          filter: blur(60px);
          opacity: 0.7;
        }
      `}</style>
      
      {/* Animated grid */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full gradient-orb animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600 rounded-full gradient-orb animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full gradient-orb animate-pulse-glow"></div>
      
      {/* Spline 3D Scene */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <iframe 
          src='https://my.spline.design/untitled-271c906c10b4c02ba0566c78beae8dc0/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-auto"
        />
      </div>
      
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent z-20 pointer-events-none"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20 animate-pulse"></div>
      </div>
      
      {/* Content placeholder (for your portfolio content) */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white/30 font-mono text-sm">
          {/* Your portfolio content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Background1;