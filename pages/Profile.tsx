import React, { useState } from 'react';
import { useTranslation } from '../App';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Globe, Moon, Bell, Shield, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AuthState = 'login' | 'signup' | 'profile' | 'settings';

const Profile: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const [view, setView] = useState<AuthState>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setView('profile');
  };

  const BackButton = () => (
    <button onClick={() => view === 'settings' ? setView('profile') : navigate('/')} className="mb-4 text-brand-primary flex items-center gap-2 text-sm font-bold">
       <ArrowLeft size={16} className={language === 'ar' ? 'rotate-180' : ''} />
       {view === 'settings' ? t.auth.profile : t.nav.home}
    </button>
  );

  if (view === 'settings') {
    return (
      <div className="p-6 pb-24">
        <BackButton />
        <h1 className="text-2xl font-bold text-brand-primary mb-6">{t.settings.title}</h1>
        
        <div className="space-y-4">
          <SettingItem 
            icon={<Globe />} 
            label={t.settings.language} 
            action={
              <button 
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="bg-brand-primary text-white text-xs px-3 py-1 rounded-full"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
            } 
          />
          <SettingItem icon={<Moon />} label={t.settings.theme} />
          <SettingItem icon={<Bell />} label={t.settings.notifications} />
          <SettingItem icon={<Shield />} label={t.settings.privacy} />
          <div className="pt-8">
            <button className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 py-3 rounded-xl text-sm font-bold">
                <Trash2 size={16} />
                {t.settings.deleteAccount}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="p-6 pb-24">
        <BackButton />
        <div className="flex flex-col items-center mb-8">
           <div className="w-24 h-24 rounded-full bg-brand-sec2 flex items-center justify-center mb-3 shadow-lg border-4 border-white">
              <span className="text-3xl text-white font-bold">JD</span>
           </div>
           <h2 className="text-xl font-bold text-brand-primary">John Doe</h2>
           <p className="text-brand-primary/50 text-sm">john.doe@example.com</p>
        </div>

        <div className="space-y-3">
           <ProfileOption label={t.settings.title} onClick={() => setView('settings')} />
           <ProfileOption label="My Device Status" onClick={() => {}} />
           <ProfileOption label="Caregiver Sync" onClick={() => {}} />
           <button 
             onClick={() => setIsLoggedIn(false)}
             className="w-full bg-brand-white border border-brand-primary/10 p-4 rounded-xl text-brand-primary font-bold shadow-sm mt-8"
           >
             {t.auth.logout}
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 flex flex-col justify-center min-h-[80vh]">
      <div className="mb-8 text-center">
         <h1 className="text-3xl font-bold text-brand-primary mb-2">{view === 'login' ? t.auth.welcomeBack : t.auth.signup}</h1>
         <p className="text-brand-primary/60 text-sm">Access your Mindro-V1 dashboard.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {view === 'signup' && (
             <Input icon={<User size={18} />} placeholder={t.auth.name} type="text" />
        )}
        <Input icon={<Mail size={18} />} placeholder={t.auth.email} type="email" />
        <Input icon={<Lock size={18} />} placeholder={t.auth.password} type="password" />

        <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">
          {view === 'login' ? t.auth.submitLogin : t.auth.submitSignup}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button 
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            className="text-sm text-brand-sec2 font-semibold underline"
        >
            {view === 'login' ? 'Need an account? Sign Up' : 'Have an account? Log In'}
        </button>
      </div>
    </div>
  );
};

const SettingItem = ({ icon, label, action }: { icon: React.ReactNode, label: string, action?: React.ReactNode }) => (
  <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-brand-primary/5">
    <div className="flex items-center gap-3 text-brand-primary">
       <div className="text-brand-sec2">{icon}</div>
       <span className="text-sm font-semibold">{label}</span>
    </div>
    {action || <div className="w-10 h-6 bg-brand-bg1 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-brand-primary/20 rounded-full"></div></div>}
  </div>
);

const ProfileOption = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <button onClick={onClick} className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-brand-primary/5 font-semibold text-brand-primary flex justify-between items-center">
    {label}
    <span className="text-brand-primary/30">›</span>
  </button>
);

const Input = ({ icon, placeholder, type }: { icon: React.ReactNode, placeholder: string, type: string }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/40">
       {icon}
    </div>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-white border border-brand-primary/10 rounded-xl py-4 pl-12 pr-4 text-brand-primary outline-none focus:border-brand-primary/50 transition-colors"
    />
  </div>
);

export default Profile;