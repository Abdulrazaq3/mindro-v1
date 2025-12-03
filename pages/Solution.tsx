import React from 'react';
import { useTranslation } from '../App';
import { motion } from 'framer-motion';
import { ScanFace, Wifi, Battery, Glasses } from 'lucide-react';

const Solution: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pb-28 px-4 space-y-6 pt-4"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-brand-primary">{t.solution.title}</h1>
        <div className="w-16 h-1 bg-brand-accent1 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] rounded-3xl bg-brand-white shadow-inner flex items-center justify-center overflow-hidden border border-brand-sec4/20">
         <img src="https://picsum.photos/600/400?blur=2" alt="Mindro-V1 Prototype" className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-brand-primary/80 backdrop-blur-sm p-4 rounded-full border border-brand-accent1">
                <Glasses size={48} className="text-brand-white" />
            </div>
         </div>
      </div>

      {/* What Is */}
      <div className="bg-brand-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-bold text-brand-primary mb-3">{t.solution.whatIs}</h2>
        <p className="text-sm text-brand-primary/80 leading-relaxed">
          Mindro-V1 uses augmented reality and real-time AI processing to recognize faces, objects, and schedules, discreetly projecting prompts into the user's field of view.
        </p>
      </div>

      {/* How it Works - Steps */}
      <div>
        <h2 className="text-lg font-bold text-brand-primary mb-4 px-2">{t.solution.howItWorks}</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-4 bg-brand-bg2 p-4 rounded-2xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary text-brand-white flex items-center justify-center font-bold">
                {step}
              </div>
              <p className="text-xs font-medium text-brand-primary">
                {step === 1 ? 'Sensors capture visual and audio data.' : 
                 step === 2 ? 'AI processes context locally on device.' : 
                 'Relevant cues are displayed in AR.'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies - Chips */}
      <div>
        <h2 className="text-lg font-bold text-brand-primary mb-3 px-2">{t.solution.tech}</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          <TechChip icon={<ScanFace size={16} />} label="Face Rec" />
          <TechChip icon={<Wifi size={16} />} label="5G Connect" />
          <TechChip icon={<Battery size={16} />} label="24h Batt" />
          <TechChip icon={<Glasses size={16} />} label="MicroLED" />
        </div>
      </div>

      {/* Differentiators */}
      <div className="bg-brand-primary text-brand-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-brand-accent1 font-bold mb-4">{t.solution.different}</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-brand-accent1">•</span> Non-intrusive design looks like normal eyewear.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-accent1">•</span> Privacy-first local processing.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-accent1">•</span> Caregiver syncing app included.
          </li>
        </ul>
      </div>

    </motion.div>
  );
};

const TechChip = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex-shrink-0 flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-brand-primary/10 shadow-sm text-xs font-bold text-brand-primary">
    {icon}
    {label}
  </div>
);

export default Solution;