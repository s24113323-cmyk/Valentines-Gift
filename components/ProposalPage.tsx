
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProposalPageProps {
  onYes: () => void;
}

export const ProposalPage: React.FC<ProposalPageProps> = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [confirmationStep, setConfirmationStep] = useState(0);

  const moveNoButton = () => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;
    setNoPosition({ x: randomX, y: randomY });
    setNoScale(prev => Math.max(prev * 0.9, 0.4));
  };

  const handleYesClick = () => {
    if (confirmationStep < 2) {
      setConfirmationStep(prev => prev + 1);
    } else {
      onYes();
    }
  };

  const getQuestionText = () => {
    switch (confirmationStep) {
      case 1:
        return "Bạn có chắc không? 😏";
      case 2:
        return "Chắc chắn 100% luôn hả? 😏";
      default:
        return "Em làm Valentine của anh nhé?";
    }
  };

  const getYesButtonText = () => {
    switch (confirmationStep) {
      case 1:
        return "Chắc mà! ❤️";
      case 2:
        return "Đúng rồi đó! ❤️";
      default:
        return "Đồng ý ❤️";
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-12">
      <div className="min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={confirmationStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-romantic font-bold text-rose-600 drop-shadow-sm px-4">
              {getQuestionText()}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 relative min-h-[100px] w-full">
        <motion.button
          key={`yes-btn-${confirmationStep}`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleYesClick}
          className="bg-rose-500 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-xl hover:bg-rose-600 transition-colors z-20 min-w-[200px]"
        >
          {getYesButtonText()}
        </motion.button>

        <motion.button
          animate={{ x: noPosition.x, y: noPosition.y, scale: noScale }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          onMouseEnter={moveNoButton}
          className="bg-gray-200 text-gray-500 px-10 py-4 rounded-full text-2xl font-bold shadow-md cursor-default"
        >
          Không
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-rose-300 italic"
      >
        {confirmationStep === 0 ? "Anh đang chờ câu trả lời của em đó..." : "Nghĩ kỹ chưa nà? ❤️"}
      </motion.div>
    </div>
  );
};
