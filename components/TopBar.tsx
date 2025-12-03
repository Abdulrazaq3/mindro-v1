import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useTranslation } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Position logic:
  // Arabic: Menu on Top-Left. English: Menu on Top-Right.
  // Since Flex follows direction, standard 'justify-between' works.
  // EN (LTR): Logo (Left) ... Menu (Right).
  // AR (RTL): Logo (Right) ... Menu (Left).
  // Wait, Requirement: "Located at top-right (English) or top-left (Arabic) through a menu button."
  // This matches standard RTL behavior if Logo is at Start and Menu is at End.

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-brand-bg1/80 backdrop-blur-sm z-40 flex items-center justify-between px-6 pt-safe">
        <div className="flex items-center gap-2" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-sec1 flex items-center justify-center shadow-md">
             <span className="text-white font-bold text-xs">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-brand-primary">Mindro-V1</span>
        </div>

        <button 
          onClick={() => navigate('/profile')}
          className="p-2 rounded-full bg-brand-white/50 hover:bg-brand-white shadow-sm border border-brand-sec4/20 transition-colors"
        >
          <Menu size={20} className="text-brand-primary" />
        </button>
      </div>
      <div className="h-16" /> {/* Spacer */}
    </>
  );
};

export default TopBar;