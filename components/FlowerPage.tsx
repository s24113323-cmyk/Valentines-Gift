
import React from 'react';
import { motion } from 'framer-motion';

// --- Flower Components ---

interface FlowerProps {
  x: number;
  y: number;
  scale: number;
  delay: number;
  rotate: number;
  zIndex?: number;
}

const Tulip: React.FC<FlowerProps> = ({ x, y, scale, delay, rotate, zIndex = 30 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        scale, 
        y: 0,
        rotate: [rotate, rotate + 1.5, rotate - 1.5, rotate]
      }}
      whileHover={{ 
        scale: scale * 1.1, 
        rotate: rotate + (rotate > 0 ? 3 : -3),
        transition: { type: 'spring', stiffness: 400, damping: 12 }
      }}
      transition={{ 
        type: 'spring', 
        damping: 20, 
        delay,
        rotate: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{ left: `${x}%`, top: `${y}%`, zIndex }}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer origin-bottom"
    >
      <svg width="50" height="70" viewBox="0 0 50 70" className="drop-shadow-md">
        {/* Main Petals */}
        <path d="M25 68 C5 55 5 20 25 2 C45 20 45 55 25 68" fill="#fda4af" />
        <path d="M25 68 C2 55 2 20 22 8 C30 20 30 50 25 68" fill="#fb7185" opacity="0.9" />
        <path d="M25 68 C48 55 48 20 28 8 C20 20 20 50 25 68" fill="#f43f5e" opacity="0.9" />
        {/* Inner shadow/detail */}
        <path d="M25 5 L27 12 L23 12 Z" fill="white" opacity="0.2" />
      </svg>
    </motion.div>
  );
};

const LuxuryRose: React.FC<FlowerProps> = ({ x, y, scale, delay, rotate, zIndex = 30 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale,
        rotate: [rotate, rotate - 2, rotate + 2, rotate]
      }}
      whileHover={{ 
        scale: scale * 1.12, 
        rotate: rotate - 5,
        transition: { type: 'spring', stiffness: 300 }
      }}
      transition={{ 
        type: 'spring', 
        damping: 18, 
        delay,
        rotate: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{ left: `${x}%`, top: `${y}%`, zIndex }}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer origin-center"
    >
      <svg width="90" height="90" viewBox="0 0 100 100" className="drop-shadow-lg">
        {/* Outer petals */}
        {[0, 60, 120, 180, 240, 300].map((rot, i) => (
          <path
            key={`outer-${rot}`}
            d="M50 92 C15 80 15 30 50 15 C85 30 85 80 50 92"
            fill={i % 2 === 0 ? "#be123c" : "#e11d48"}
            transform={`rotate(${rot} 50 50) scale(0.9)`}
            opacity={0.9}
          />
        ))}
        {/* Middle petals */}
        {[30, 90, 150, 210, 270, 330].map((rot, i) => (
          <path
            key={`mid-${rot}`}
            d="M50 85 C25 75 25 40 50 25 C75 40 75 75 50 85"
            fill={i % 2 === 0 ? "#fb7185" : "#f43f5e"}
            transform={`rotate(${rot} 50 50) scale(0.8)`}
            opacity={0.95}
          />
        ))}
        {/* Inner Core */}
        <circle cx="50" cy="50" r="18" fill="#9f1239" />
        <path d="M50 62 C40 58 40 48 50 42 C60 48 60 58 50 62" fill="#be123c" opacity="0.6" />
      </svg>
    </motion.div>
  );
};

const SoftPeony: React.FC<FlowerProps> = ({ x, y, scale, delay, rotate, zIndex = 20 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale,
        rotate: [rotate, rotate + 3, rotate - 3, rotate]
      }}
      whileHover={{ 
        scale: scale * 1.08,
        transition: { type: 'spring', stiffness: 400 }
      }}
      transition={{ 
        type: 'spring', 
        damping: 15, 
        delay,
        rotate: {
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{ left: `${x}%`, top: `${y}%`, zIndex }}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
    >
      <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-xl">
        {/* Soft layering of peony petals */}
        {Array.from({ length: 16 }).map((_, i) => (
          <path
            key={`peony-${i}`}
            d="M50 95 C5 75 5 15 50 5 C95 15 95 75 50 95"
            fill="#fce7f3"
            stroke="#f9a8d4"
            strokeWidth="0.2"
            opacity="0.4"
            transform={`rotate(${i * 22.5} 50 50) scale(0.95)`}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={`inner-peony-${i}`}
            d="M50 85 C15 70 15 30 50 15 C85 30 85 70 50 85"
            fill="#fbcfe8"
            opacity="0.6"
            transform={`rotate(${i * 36 + 18} 50 50) scale(0.7)`}
          />
        ))}
        <circle cx="50" cy="50" r="15" fill="#ec4899" opacity="0.2" />
      </svg>
    </motion.div>
  );
};

const EucalyptusLeaf: React.FC<{ x: number, y: number, rotate: number, scale: number, delay: number }> = ({ x, y, rotate, scale, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: rotate - 15 }}
    animate={{ 
      opacity: 1, 
      scale, 
      rotate: [rotate, rotate + 1.5, rotate - 1.5, rotate] 
    }}
    whileHover={{ rotate: rotate + 5, scale: scale * 1.05 }}
    transition={{ 
      duration: 1.2, 
      delay, 
      type: 'spring',
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    style={{ left: `${x}%`, top: `${y}%` }}
    className="absolute z-10 origin-bottom cursor-pointer pointer-events-none"
  >
    <svg width="60" height="120" viewBox="0 0 60 120">
      <path 
        d="M30 120 Q-10 70 30 0 Q70 70 30 120" 
        fill="#2d4a4a" 
        fillOpacity="0.25" 
        stroke="#064e3b" 
        strokeWidth="0.3"
      />
    </svg>
  </motion.div>
);

const StemBundle: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full z-[5] pointer-events-none">
    {/* Stems anchored to a common base at the bottom, reaching up to the flowers */}
    {Array.from({ length: 40 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: '75%' }}
        transition={{ delay: 0.02 * i, duration: 2, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          width: '1.2px',
          backgroundColor: '#065f46',
          opacity: 0.1 + Math.random() * 0.2,
          transform: `translateX(-50%) rotate(${(i - 20) * 2.2}deg)`,
          transformOrigin: 'bottom',
          borderRadius: '99px'
        }}
      />
    ))}
    {/* Decorative ribbon at the gathering point */}
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-16 h-8 bg-rose-500/20 backdrop-blur-[2px] rounded-full flex items-center justify-center border border-white/30"
    >
      <div className="w-4 h-4 rounded-full bg-rose-400 opacity-40 shadow-sm" />
    </motion.div>
  </div>
);

export const FlowerPage: React.FC = () => {
  // ORGANIC & TAPERED BOUQUET COMPOSITION
  const flowers = [
    // --- Central Foundation (Peonies) ---
    { type: 'peony', x: 50, y: 40, scale: 1.3, delay: 0.5, rotate: 0, z: 15 },
    { type: 'peony', x: 38, y: 45, scale: 1.1, delay: 1.1, rotate: -20, z: 12 },
    { type: 'peony', x: 62, y: 45, scale: 1.1, delay: 1.2, rotate: 20, z: 12 },
    
    // --- Hero Roses (Central Cluster) ---
    { type: 'rose', x: 50, y: 55, scale: 1.4, delay: 1.5, rotate: 0, z: 60 },
    { type: 'rose', x: 42, y: 52, scale: 1.1, delay: 1.7, rotate: -12, z: 50 },
    { type: 'rose', x: 58, y: 52, scale: 1.1, delay: 1.8, rotate: 12, z: 50 },
    
    // --- Upper Taper (Roses & Tulips) ---
    { type: 'rose', x: 50, y: 30, scale: 0.9, delay: 0.8, rotate: 0, z: 25 },
    { type: 'tulip', x: 44, y: 22, scale: 0.9, delay: 1.0, rotate: -8, z: 40 },
    { type: 'tulip', x: 56, y: 22, scale: 0.9, delay: 1.2, rotate: 8, z: 40 },
    { type: 'tulip', x: 50, y: 12, scale: 0.8, delay: 2.2, rotate: 0, z: 10 },
    
    // --- Lower Flanks (Support) ---
    { type: 'rose', x: 30, y: 60, scale: 0.85, delay: 1.4, rotate: -45, z: 30 },
    { type: 'rose', x: 70, y: 60, scale: 0.85, delay: 1.5, rotate: 45, z: 30 },
    { type: 'tulip', x: 22, y: 55, scale: 0.75, delay: 2.4, rotate: -65, z: 20 },
    { type: 'tulip', x: 78, y: 55, scale: 0.75, delay: 2.5, rotate: 65, z: 20 },
    
    // --- Small Fillers ---
    { type: 'tulip', x: 40, y: 35, scale: 0.6, delay: 2.6, rotate: -15, z: 45 },
    { type: 'tulip', x: 60, y: 35, scale: 0.6, delay: 2.7, rotate: 15, z: 45 },
    { type: 'rose', x: 25, y: 40, scale: 0.65, delay: 2.8, rotate: -30, z: 10 },
    { type: 'rose', x: 75, y: 40, scale: 0.65, delay: 2.9, rotate: 30, z: 10 },
  ];

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center overflow-hidden bg-[#fafaf9]">
      
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#fef2f2_0%,transparent_50%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#f0fdf4_0%,transparent_50%)] opacity-20" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-rose-100/15 blur-[150px] rounded-full z-0" />
      <div className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <div className="w-full max-w-7xl flex flex-col md:flex-row h-full relative z-10 items-center justify-center p-6 md:p-12">
        
        {/* BOUQUET AREA */}
        <div className="w-full md:w-1/2 relative h-[600px] md:h-[800px] flex items-center justify-center">
          <div className="relative w-full h-full max-w-[550px]">
            <StemBundle />

            {/* Lush Leafy Halo */}
            {Array.from({ length: 28 }).map((_, i) => {
              const angle = (i / 28) * Math.PI * 2;
              const rX = 22 + Math.random() * 10;
              const rY = 18 + Math.random() * 8;
              return (
                <EucalyptusLeaf 
                  key={`leaf-${i}`}
                  x={50 + Math.cos(angle) * rX}
                  y={42 + Math.sin(angle) * rY}
                  rotate={(i / 28) * 360 + 90}
                  scale={0.4 + Math.random() * 0.5}
                  delay={0.03 * i}
                />
              );
            })}

            {/* Flowers placed exactly on their coordinates */}
            {flowers.map((f, i) => {
              const props = { x: f.x, y: f.y, scale: f.scale, delay: f.delay, rotate: f.rotate, zIndex: f.z };
              if (f.type === 'tulip') return <Tulip key={i} {...props} />;
              if (f.type === 'rose') return <LuxuryRose key={i} {...props} />;
              return <SoftPeony key={i} {...props} />;
            })}

            {/* Sparkling Baby's Breath / Light Particles */}
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ 
                  duration: 3 + Math.random() * 4, 
                  delay: Math.random() * 10, 
                  repeat: Infinity 
                }}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${15 + Math.random() * 60}%`,
                  width: '2.5px',
                  height: '2.5px',
                }}
                className="absolute z-[70] bg-white rounded-full blur-[0.8px] shadow-[0_0_5px_rgba(255,255,255,0.8)] pointer-events-none"
              />
            ))}

            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-48 h-12 bg-stone-900/5 blur-[50px] rounded-full z-0 pointer-events-none" />
          </div>
        </div>

        {/* MESSAGE AREA */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="max-w-lg relative"
          >
            <div className="absolute inset-0 -m-20 bg-white/30 blur-3xl rounded-full z-[-1]" />

            <h1 className="text-[#9d174d] font-romantic text-5xl md:text-7xl leading-[1.2] drop-shadow-sm mb-6">
              Chúc mừng Valentine <br/>
              nha bé yêu ❤️
            </h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="h-[1.5px] bg-rose-200 mt-6 mx-auto md:mx-0"
            />
            
            <div className="mt-10 space-y-8">
              <p className="text-stone-600 font-serif italic text-lg md:text-xl leading-relaxed max-w-md">
                “Cảm ơn em đã xuất hiện trong cuộc đời anh và làm mọi thứ trở nên dịu dàng hơn. Có em rồi, anh không cần gì hơn nữa đâu.”
              </p>
              
              <div className="pt-4 space-y-2">
                <p className="text-stone-400 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">
                  Forever & Always
                </p>
                <p className="text-stone-400 text-[10px] italic opacity-60">
                  From 浩然 with all my love
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        .font-romantic {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
};
