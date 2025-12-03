export type Language = 'en' | 'ar';

export interface User {
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Translation {
  nav: {
    home: string;
    solution: string;
    chat: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    problemTitle: string;
    problemDesc: string;
    ideaTitle: string;
    ideaDesc: string;
    solutionPreviewTitle: string;
    featuresTitle: string;
    targetUsersTitle: string;
  };
  solution: {
    title: string;
    whatIs: string;
    howItWorks: string;
    tech: string;
    different: string;
  };
  chat: {
    title: string;
    placeholder: string;
    welcome: string;
    suggestion1: string;
    suggestion2: string;
  };
  auth: {
    login: string;
    signup: string;
    profile: string;
    email: string;
    password: string;
    name: string;
    submitLogin: string;
    submitSignup: string;
    logout: string;
    welcomeBack: string;
  };
  settings: {
    title: string;
    language: string;
    theme: string;
    notifications: string;
    privacy: string;
    deleteAccount: string;
  };
}