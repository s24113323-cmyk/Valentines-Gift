
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterCard } from './components/LetterCard';
import { FloatingHearts } from './components/FloatingHearts';
import { ProposalPage } from './components/ProposalPage';
import { SuccessPage } from './components/SuccessPage';
import { DistancePage } from './components/DistancePage';
import { FlowerPage } from './components/FlowerPage';

type Step = 'letter' | 'proposal' | 'success' | 'distance' | 'flower';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('letter');
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
  };

  const goToProposal = () => {
    setStep('proposal');
  };

  const handleToSuccess = () => {
    setStep('success');
  };

  const handleToDistance = () => {
    setStep('distance');
  };

  const handleToFlower = () => {
    setStep('flower');
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-100 via-sky-50 to-rose-200 overflow-x-hidden overflow-y-auto py-10 px-4">
      {/* Background atmosphere */}
      <FloatingHearts />
      
      {/* Central Content */}
      <div className="z-10 w-full max-w-6xl flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 'letter' && (
            <motion.div
              key="letter-step"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              {!isLetterOpen && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8 text-rose-400 font-medium animate-pulse text-center tracking-wide"
                >
                  Gửi người anh yêu nhất... <br/> 
                  <span className="text-xs opacity-70">(Hãy nhấn vào bức thư nhé)</span>
                </motion.p>
              )}
              
              <LetterCard 
                isOpen={isLetterOpen} 
                onOpen={handleOpenLetter} 
                onNext={goToProposal}
              />
            </motion.div>
          )}

          {step === 'proposal' && (
            <motion.div
              key="proposal-step"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ProposalPage onYes={handleToSuccess} />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full"
            >
              <SuccessPage onNext={handleToDistance} />
            </motion.div>
          )}

          {step === 'distance' && (
            <motion.div
              key="distance-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full"
            >
              <DistancePage onNext={handleToFlower} />
            </motion.div>
          )}

          {step === 'flower' && (
            <motion.div
              key="flower-step"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <FlowerPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Decoration */}
      <div className="fixed bottom-6 left-0 right-0 text-center pointer-events-none opacity-40 z-0">
        <p className="text-rose-400 text-[10px] font-bold tracking-[0.3em] uppercase">
          Valentine's Day 2025 • Forever & Always
        </p>
      </div>
    </main>
  );
};

export default App;
