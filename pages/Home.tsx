import React from 'react';
import { useTranslation } from '../App';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck, Eye, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const isRtl = language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="pb-24 px-4 space-y-8"
    >
      {/* Hero */}
      <motion.div variants={itemVariants} className="relative w-full h-80 rounded-3xl overflow-hidden shadow-xl mt-4 group">
        <img 
          src="https://picsum.photos/800/800?grayscale" 
          alt="Elderly using technology" 
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl font-bold text-brand-white mb-2">{t.home.heroTitle}</h1>
          <p className="text-brand-bg1/90 text-sm mb-4">{t.home.heroSubtitle}</p>
          <button 
            onClick={() => navigate('/solution')}
            className="self-start bg-brand-accent1 text-brand-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-brand-accent2 transition-colors flex items-center gap-2"
          >
            {t.nav.solution} {isRtl ? <ArrowRight className="rotate-180" size={16}/> : <ArrowRight size={16}/>}
          </button>
        </div>
      </motion.div>

      {/* Problem */}
      <motion.div variants={itemVariants} className="bg-brand-white p-6 rounded-2xl shadow-sm border-l-4 border-brand-sec2">
        <h2 className="text-brand-sec2 text-xs font-bold uppercase tracking-wider mb-2">{t.home.problemTitle}</h2>
        <p className="text-brand-primary leading-relaxed text-lg font-medium">
          {t.home.problemDesc}
        </p>
      </motion.div>

      {/* Idea */}
      <motion.div variants={itemVariants} className="bg-brand-primary p-6 rounded-2xl shadow-lg text-brand-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuitIcon size={120} />
        </div>
        <h2 className="text-brand-accent1 text-xs font-bold uppercase tracking-wider mb-2">{t.home.ideaTitle}</h2>
        <p className="text-brand-bg1 leading-relaxed">
          {t.home.ideaDesc}
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold text-brand-primary mb-4 px-2">{t.home.featuresTitle}</h3>
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard icon={<Eye />} title="Visual Aid" color="bg-brand-sec1" />
          <FeatureCard icon={<Activity />} title="Memory Log" color="bg-brand-sec2" />
          <FeatureCard icon={<Cpu />} title="AI Core" color="bg-brand-sec3" />
          <FeatureCard icon={<ShieldCheck />} title="Privacy" color="bg-brand-sec4" />
        </div>
      </motion.div>

      {/* Target Users */}
      <motion.div variants={itemVariants} className="bg-brand-bg2 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-brand-primary mb-3">{t.home.targetUsersTitle}</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
           <div className="flex-shrink-0 w-32 h-40 bg-white rounded-xl shadow-sm p-3 flex flex-col items-center justify-center text-center">
             <div className="w-12 h-12 rounded-full bg-brand-bg1 mb-2"></div>
             <span className="text-xs font-bold">Early Stage</span>
           </div>
           <div className="flex-shrink-0 w-32 h-40 bg-white rounded-xl shadow-sm p-3 flex flex-col items-center justify-center text-center">
             <div className="w-12 h-12 rounded-full bg-brand-bg1 mb-2"></div>
             <span className="text-xs font-bold">Caregivers</span>
           </div>
           <div className="flex-shrink-0 w-32 h-40 bg-white rounded-xl shadow-sm p-3 flex flex-col items-center justify-center text-center">
             <div className="w-12 h-12 rounded-full bg-brand-bg1 mb-2"></div>
             <span className="text-xs font-bold">Clinics</span>
           </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-center text-brand-primary/40 text-xs pt-8 pb-4">
        © 2024 Mindro-V1. All rights reserved.
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => (
  <div className={`${color} bg-opacity-90 p-4 rounded-xl shadow-md text-white flex flex-col items-center justify-center aspect-square`}>
    <div className="mb-2 opacity-90">{icon}</div>
    <span className="font-semibold text-sm">{title}</span>
  </div>
);

// Fallback icon component
const BrainCircuitIcon = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M9 13a4.5 4.5 0 0 0 3-4" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M6 18a4 4 0 0 1-1.972-3.484" />
  </svg>
);

export default Home;