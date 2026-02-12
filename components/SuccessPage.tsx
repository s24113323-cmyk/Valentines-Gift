
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChevronRight } from 'lucide-react';

interface SuccessPageProps {
  onNext: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onNext }) => {
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ffb6c1']
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ffb6c1']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center text-center space-y-12 py-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          type: "spring", 
          duration: 1,
          bounce: 0.5
        }}
        className="text-9xl mb-4 drop-shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          🥰
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-2xl text-stone-700 max-w-2xl leading-relaxed px-6 italic space-y-8"
      >
        <p className="font-romantic text-4xl md:text-5xl text-rose-500 font-bold not-italic leading-tight">
          Anh biết mà… kiểu gì em cũng sẽ nói “đồng ý” thôi ❤️
        </p>
        <p className="text-stone-600 font-medium text-lg md:text-xl px-4">
          “Khoảng cách chỉ làm anh chắc chắn hơn rằng anh không muốn ai khác ngoài em. Cảm ơn em đã cho anh cơ hội được yêu em. Anh thương em nhiều lắm.”
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col items-center gap-12"
      >
        <div className="flex gap-6">
           {['❤️', '💖', '💝', '💕', '💌'].map((emoji, i) => (
             <motion.span 
               key={i}
               animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
               transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
               className="text-4xl"
             >
               {emoji}
             </motion.span>
           ))}
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="group bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-3 text-lg font-bold py-5 px-14 rounded-full shadow-2xl transition-all"
          >
            Xem điều bất ngờ tiếp theo <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-rose-400 font-bold tracking-[0.3em] uppercase text-[10px]"
          >
            Cùng bước tiếp chặng đường này nhé
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
