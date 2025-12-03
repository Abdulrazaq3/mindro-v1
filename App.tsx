import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Translation, Language } from './types';
import { TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Solution from './pages/Solution';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useTranslation must be used within AppProvider');
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <TopBar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          {/* Settings handles itself inside Profile component for simpler mobile nav flow */}
        </Routes>
      </div>
      <Navbar />
    </>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  // Update HTML dir attribute when language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: TRANSLATIONS[language],
  };

  return (
    <AppContext.Provider value={value}>
      <Router>
        <AppContent />
      </Router>
    </AppContext.Provider>
  );
};

export default App;