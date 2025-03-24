
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center p-2 rounded-full hover:bg-secondary transition-colors"
      aria-label={language === 'zh' ? 'Switch to English' : '切換至中文'}
    >
      <Languages size={20} className="mr-1" />
      <span className="text-sm font-medium">{language === 'zh' ? 'EN' : '中'}</span>
    </button>
  );
};

export default LanguageToggle;
