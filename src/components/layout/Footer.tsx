
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  const footerSections = language === 'zh' ? [
    {
      title: '公司',
      links: [
        { label: '關於我們', href: '/about' },
        { label: '聯絡我們', href: '/contact' },
        { label: '職業機會', href: '/careers' },
        { label: '隱私政策', href: '/privacy' },
        { label: '服務條款', href: '/terms' },
      ],
    },
    {
      title: '功能',
      links: [
        { label: '文件分析', href: '/features/document-analysis' },
        { label: 'SEC 文件爬取', href: '/features/sec-crawling' },
        { label: 'AI 報告生成', href: '/features/ai-reports' },
        { label: '投資洞見', href: '/features/investment-insights' },
        { label: '公司財務分析', href: '/features/financial-analysis' },
      ],
    },
    {
      title: '資源',
      links: [
        { label: '部落格', href: '/blog' },
        { label: '教學指南', href: '/guides' },
        { label: '常見問題', href: '/faq' },
        { label: '支援中心', href: '/support' },
        { label: '開發者 API', href: '/developers' },
      ],
    },
  ] : [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/careers' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
    {
      title: 'Features',
      links: [
        { label: 'Document Analysis', href: '/features/document-analysis' },
        { label: 'SEC Filing Crawler', href: '/features/sec-crawling' },
        { label: 'AI Report Generation', href: '/features/ai-reports' },
        { label: 'Investment Insights', href: '/features/investment-insights' },
        { label: 'Company Financials', href: '/features/financial-analysis' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Guides', href: '/guides' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Support', href: '/support' },
        { label: 'Developer API', href: '/developers' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-primary">{t('site.name')}</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              {language === 'zh' 
                ? 'SECGPT 結合了先進的 AI 技術，分析 SEC 文件並生成簡易報告，幫助投資者快速理解重點，不必閱讀冗長複雜的文件。'
                : 'SECGPT combines advanced AI technology to analyze SEC documents and generate simplified reports, helping investors quickly understand key points without reading lengthy complex documents.'}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors" aria-label={link.label}>
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Navigation */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
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

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {year} {t('site.name')}. {language === 'zh' ? '保留所有權利' : 'All rights reserved'}.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {language === 'zh' ? '隱私政策' : 'Privacy Policy'}
            </a>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {language === 'zh' ? '服務條款' : 'Terms of Service'}
            </a>
            <a href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {language === 'zh' ? 'Cookie 政策' : 'Cookie Policy'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
