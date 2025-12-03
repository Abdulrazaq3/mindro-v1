import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, BrainCircuit } from 'lucide-react';
import { useTranslation } from '../App';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  // Exact Layout:
  // English: [Chat (Left)] - [Solution (Center)] - [Home (Right)]
  // Arabic:  [Chat (Left)] - [Solution (Center)] - [Home (Right)] (Visual position remains same)
  // Since we are using flex, and we want Chat strictly on LEFT and Home strictly on RIGHT:
  
  // If LTR (English): Order matches DOM [Chat, Solution, Home] -> Chat is Left (Start), Home is Right (End).
  // If RTL (Arabic): Order matches DOM [Chat, Solution, Home] -> Chat is Right (Start), Home is Left (End). 
  // Wait, Requirement: Arabic: Chat -> Far Left, Home -> Far Right.
  // So for Arabic, visually it must be same as English.
  // We can force direction LTR for the navbar container regardless of app language to maintain visual positions.

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 bg-brand-primary/95 backdrop-blur-md rounded-2xl shadow-2xl z-50 h-16 border border-brand-sec2/30" 
      dir="ltr" // Force LTR to keep Chat on Left and Home on Right visually
    >
      <div className="flex justify-between items-center h-full px-6">
        
        {/* Left: Chat */}
        <button 
          onClick={() => navigate('/chat')}
          className={`flex flex-col items-center justify-center w-12 h-12 transition-all duration-300 ${
            isActive('/chat') ? 'text-brand-accent2 scale-110' : 'text-brand-bg1/60 hover:text-brand-bg1'
          }`}
        >
          <MessageSquare size={24} strokeWidth={isActive('/chat') ? 2.5 : 2} />
          <span className="text-[9px] mt-1 font-medium">{t.nav.chat}</span>
        </button>

        {/* Center: Solution */}
        <button 
          onClick={() => navigate('/solution')}
          className={`relative -top-6 flex flex-col items-center justify-center w-16 h-16 rounded-full bg-brand-accent1 shadow-lg border-4 border-brand-bg1 transition-all duration-300 ${
            isActive('/solution') ? 'scale-110 bg-brand-accent2' : 'hover:scale-105'
          }`}
        >
          <BrainCircuit size={32} className="text-brand-primary" />
        </button>

        {/* Right: Home */}
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center w-12 h-12 transition-all duration-300 ${
            isActive('/') ? 'text-brand-accent2 scale-110' : 'text-brand-bg1/60 hover:text-brand-bg1'
          }`}
        >
          <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-[9px] mt-1 font-medium">{t.nav.home}</span>
        </button>

      </div>
    </div>
  );
};

export default Navbar;