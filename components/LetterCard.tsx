
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

interface LetterCardProps {
  isOpen: boolean;
  onOpen: () => void;
  onNext: () => void;
}

const Cloud = ({ className, delay = 0, scale = 1 }: { className?: string, delay?: number, scale?: number }) => (
  <motion.svg 
    viewBox="0 0 24 24" 
    className={`fill-white opacity-80 ${className}`}
    initial={{ scale }}
    animate={{ x: [0, 15, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <path d="M17.5,19c-3.037,0-5.5-2.463-5.5-5.5c0-0.007,0-0.013,0-0.019c-0.211,0.012-0.423,0.019-0.636,0.019c-3.235,0-5.858-2.623-5.858-5.858 c0-3.064,2.35-5.584,5.347-5.842C11.332,0.769,12.597,0,14,0c2.209,0,4,1.791,4,4c0,0.141-0.008,0.28-0.022,0.417 C20.379,5.013,22,7.319,22,10c0,3.314-2.686,6-6,6c-0.007,0-0.013,0-0.02,0C15.867,17.653,16.592,19,17.5,19z" />
  </motion.svg>
);

const HeartBalloon = ({ color, className, delay = 0, scale = 1 }: { color: string, className?: string, delay?: number, scale?: number }) => (
  <motion.div 
    className={`absolute ${className}`}
    initial={{ scale }}
    animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
    transition={{ duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <div className="relative">
      <Heart fill={color} className="w-10 h-10 text-transparent drop-shadow-md" />
      <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[1px] h-32 bg-amber-800/10 origin-top"></div>
    </div>
  </motion.div>
);

export const LetterCard: React.FC<LetterCardProps> = ({ isOpen, onOpen, onNext }) => {
  return (
    <motion.div
      initial={{ x: -1000, rotate: -180, scale: 0.5, opacity: 0 }}
      animate={{ x: 0, rotate: 0, scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        damping: 15, 
        stiffness: 80,
        duration: 1.5 
      }}
      whileHover={!isOpen ? { 
        scale: 1.01, 
        y: -5,
        transition: { type: "spring", stiffness: 400 }
      } : {}}
      className={`relative cursor-pointer w-[350px] md:w-[760px] perspective-1000 z-20 ${isOpen ? 'h-auto' : 'h-[460px] md:h-[500px]'}`}
      onClick={!isOpen ? onOpen : undefined}
    >
      <div className={`relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] md:border-[10px] border-white bg-sky-100 transition-all duration-500 ${isOpen ? 'h-auto min-h-[500px]' : 'h-full'}`}>
        
        {/* FRONT OF THE CARD */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-white"></div>
          
          <Cloud className="absolute top-[12%] left-[10%] w-20 h-20 z-10" delay={0} scale={1.1} />
          <Cloud className="absolute top-[8%] right-[20%] w-28 h-28 z-10 opacity-90" delay={1.5} />
          <Cloud className="absolute bottom-[15%] left-[8%] w-24 h-24 z-10 opacity-60" delay={0.5} scale={1.0} />
          <Cloud className="absolute bottom-[20%] right-[15%] w-36 h-36 z-10 opacity-70" delay={2.5} scale={1.2} />

          <HeartBalloon color="#fda4af" className="top-[20%] left-[25%] z-20" delay={0} scale={0.8} />
          <HeartBalloon color="#f472b6" className="top-[30%] left-[40%] z-25" delay={0.8} scale={1.0} />
          <HeartBalloon color="#fb7185" className="top-[22%] right-[35%] z-20" delay={1.5} scale={0.9} />
          <HeartBalloon color="#fecdd3" className="top-[35%] right-[20%] z-15" delay={2.2} scale={0.7} />

          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            animate={{ y: ["-50%", "-53%", "-50%"], rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
             <div className="relative w-24 h-18 md:w-28 md:h-22 bg-white rounded-2xl shadow-2xl border border-rose-50/50 flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.25, 1, 1.3, 1] }}
                    transition={{ 
                        duration: 1.8, 
                        repeat: Infinity, 
                        times: [0, 0.1, 0.2, 0.3, 1],
                        ease: "easeInOut"
                    }}
                >
                    <Heart fill="#f43f5e" className="text-transparent w-8 h-8 drop-shadow-md" />
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-rose-50/20"></div>
             </div>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        </div>

        {/* INSIDE OF THE CARD */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full bg-[#fdfcfb] px-6 md:px-16 py-10 md:py-14 flex flex-col items-center justify-between min-h-[500px]"
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
              
              <div className="relative w-full flex flex-col items-center z-10 flex-grow">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="flex justify-center gap-2 mb-4">
                    <Heart size={12} fill="#fda4af" className="text-transparent animate-pulse" />
                    <Heart size={12} fill="#f472b6" className="text-transparent animate-pulse" />
                    <Heart size={12} fill="#fb7185" className="text-transparent animate-pulse" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-rose-500 font-romantic text-center mb-6">
                    Chào em yêu ❤️
                  </h2>

                  <div className="space-y-5 text-stone-600 leading-relaxed text-[14px] md:text-[16px] font-medium font-sans px-2 md:px-6 text-justify">
                    <p>
                      Anh ước gì bây giờ có thể ở bên em. Dù mình đang xa nhau, anh muốn em biết rằng tình cảm anh dành cho em vẫn luôn vậy. Xa em không hề dễ dàng, nhưng điều đó khiến anh nhận ra một điều — trái tim anh đã chọn em, và mỗi ngày trôi qua, nó vẫn luôn chọn em.
                    </p>
                    <p>
                      Anh nhớ em nhiều đến mức không biết phải diễn tả sao cho đủ. Anh nhớ sự hiện diện của em, hơi ấm của em, và cái cách mà chỉ cần có em thôi là mọi thứ đã thấy ổn hơn rồi. 
                    </p>
                    <p>
                      Anh mong đến ngày được nhìn vào mắt em, nhẹ nhàng ôm lấy khuôn mặt em, và nói trực tiếp rằng anh yêu em sâu đậm đến nhường nào.
                    </p>
                  </div>

                  <div className="text-center mt-8 mb-2 flex flex-col items-center">
                    <p className="text-2xl md:text-3xl font-romantic text-rose-600">Anh yêu em nhiều lắm!! 💕</p>
                    <p className="mt-4 text-stone-400 font-romantic text-xl md:text-2xl">- 浩然</p>
                  </div>
                </motion.div>
              </div>

              {/* Continue Button */}
              <div className="relative z-20 mt-6 pb-2">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="group bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-3 text-[12px] md:text-[13px] font-bold uppercase tracking-[0.25em] py-4 px-12 rounded-full shadow-xl transition-all pointer-events-auto"
                >
                  Tiếp tục <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
