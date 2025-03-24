
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<string, Record<Language, string>> = {
  // Site branding
  'site.name': {
    en: 'SECGPT',
    zh: 'SECGPT',
  },
  'site.slogan': {
    en: 'AI-Powered SEC Document Analysis',
    zh: 'AI 驅動的 SEC 文件分析',
  },
  
  // Navigation
  'nav.home': {
    en: 'Home',
    zh: '首頁',
  },
  'nav.features': {
    en: 'Features',
    zh: '功能',
  },
  'nav.howItWorks': {
    en: 'How It Works',
    zh: '如何使用',
  },
  'nav.pricing': {
    en: 'Pricing',
    zh: '定價',
  },
  'nav.login': {
    en: 'Login',
    zh: '登入',
  },
  'nav.freeTrial': {
    en: 'Free Trial',
    zh: '免費試用',
  },

  // Hero section
  'hero.title': {
    en: 'Simplify SEC Filings with AI',
    zh: '以 AI 簡化 SEC 文件',
  },
  'hero.subtitle': {
    en: 'Extract insights from SEC documents instantly with our AI-powered analysis',
    zh: '運用我們的 AI 技術，即時從 SEC 文件中獲取洞見',
  },
  'hero.cta': {
    en: 'Start Analyzing',
    zh: '開始分析',
  },
  'hero.secondary': {
    en: 'Learn More',
    zh: '了解更多',
  },

  // Features section
  'features.title': {
    en: 'Powerful Features',
    zh: '強大功能',
  },
  'features.subtitle': {
    en: 'Our AI-powered tools help you understand complex SEC filings',
    zh: '我們的 AI 工具幫助您理解複雜的 SEC 文件',
  },

  // How it works
  'howItWorks.title': {
    en: 'How It Works',
    zh: '如何使用',
  },
  'howItWorks.subtitle': {
    en: 'Simple steps to get insights from SEC documents',
    zh: '簡單步驟，從 SEC 文件獲取洞見',
  },

  // Call to action
  'cta.title': {
    en: 'Ready to simplify your investment research?',
    zh: '準備簡化您的投資研究？',
  },
  'cta.subtitle': {
    en: 'Start analyzing SEC documents with AI today',
    zh: '今天就開始使用 AI 分析 SEC 文件',
  },
  'cta.button': {
    en: 'Get Started',
    zh: '立即開始',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to browser language or Chinese
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.substring(0, 2);
    return browserLang === 'en' ? 'en' : 'zh';
  };

  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || getBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
