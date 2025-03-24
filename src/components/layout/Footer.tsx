
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  const footerSections = [];


  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 text-center">
          {/* Logo and Description */}
          <div className="space-y-4 flex flex-col items-center text-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-primary">{t('site.name')}</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              {language === 'zh' 
                ? 'SECGPT 結合了先進的 AI 技術，分析 SEC 文件並生成簡易報告，幫助投資者快速理解重點，不必閱讀冗長複雜的文件。'
                : 'SECGPT combines advanced AI technology to analyze SEC documents and generate simplified reports, helping investors quickly understand key points without reading lengthy complex documents.'}
            </p>
          </div>

          {/* Footer Navigation */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4 text-center">
              <h3 className="font-medium">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-xs text-muted-foreground">
            © {year} {t('site.name')}. {language === 'zh' ? '保留所有權利' : 'All rights reserved'}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
