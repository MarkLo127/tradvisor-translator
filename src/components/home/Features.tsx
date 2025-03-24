
import { useEffect } from 'react';
import { FileText, Search, Zap, BarChart, Clock, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = language === 'zh' 
    ? [
        {
          icon: Search,
          title: 'SEC 文件爬取',
          description: '自動從 SEC 官方網站獲取最新的 10-K、10-Q、8-K 等文件，無需手動下載和整理。',
        },
        {
          icon: FileText,
          title: '文件分析',
          description: '對冗長的 SEC 文件進行深度解析，提取關鍵信息，包括財務數據、風險因素和管理層討論。',
        },
        {
          icon: Zap,
          title: 'AI 報告生成',
          description: '運用先進 AI 模型，將複雜的財務信息轉化為清晰易懂的分析報告和摘要。',
        },
        {
          icon: BarChart,
          title: '數據可視化',
          description: '將財務數據轉換為互動圖表，讓您能夠直觀地理解公司的財務狀況和趨勢。',
        },
        {
          icon: Clock,
          title: '即時監控',
          description: '隨時獲取公司最新的 SEC 文件和分析，第一時間掌握重要信息。',
        },
        {
          icon: Lock,
          title: '安全隱私保障',
          description: '嚴格的數據加密和隱私政策，確保您的搜索和分析不會外流。',
        },
      ]
    : [
        {
          icon: Search,
          title: 'SEC Document Crawler',
          description: 'Automatically retrieve the latest 10-K, 10-Q, 8-K documents from the SEC official website without manual downloading.',
        },
        {
          icon: FileText,
          title: 'Document Analysis',
          description: 'Deep analysis of lengthy SEC documents, extracting key information including financial data, risk factors, and management discussions.',
        },
        {
          icon: Zap,
          title: 'AI Report Generation',
          description: 'Use advanced AI models to transform complex financial information into clear, easy-to-understand analysis reports and summaries.',
        },
        {
          icon: BarChart,
          title: 'Data Visualization',
          description: 'Convert financial data into interactive charts for intuitive understanding of company financial conditions and trends.',
        },
        {
          icon: Clock,
          title: 'Real-time Monitoring',
          description: 'Access the latest SEC documents and analysis of companies at any time, staying ahead with important information.',
        },
        {
          icon: Lock,
          title: 'Security & Privacy',
          description: 'Strict data encryption and privacy policies ensure your searches and analyses remain confidential.',
        },
      ];

  return (
    <section id="features" className="section-padding py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            {language === 'zh' ? '功能特色' : 'Key Features'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'zh' ? '強大的 SEC 文件分析工具' : 'Powerful SEC Document Analysis Tools'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'zh' 
              ? 'SECGPT 提供全方位的 SEC 文件分析解決方案，結合最先進的 AI 技術，幫助投資者快速獲取洞見'
              : 'SECGPT offers comprehensive SEC document analysis solutions, leveraging cutting-edge AI technology to help investors quickly gain insights'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300 reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary mr-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
