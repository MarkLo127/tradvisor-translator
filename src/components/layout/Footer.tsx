
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const footerSections = [
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
        { label: 'AI 翻譯', href: '/features/ai-translation' },
        { label: '多語言支援', href: '/features/languages' },
        { label: '即時對話', href: '/features/real-time' },
        { label: '語音翻譯', href: '/features/voice' },
        { label: '文件翻譯', href: '/features/documents' },
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
              <span className="text-xl font-bold tracking-tight text-primary">TradVisor</span>
              <span className="font-medium text-lg ml-1">譯師</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              TradVisor 譯師結合了先進的 AI 技術，提供高精準度的即時翻譯服務，幫助您輕鬆跨越語言障礙，連接全球。
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
            © {year} TradVisor 譯師. 保留所有權利.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              隱私政策
            </a>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              服務條款
            </a>
            <a href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookie 政策
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
