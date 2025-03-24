
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorks = () => {
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
  
  const steps = language === 'zh'
    ? [
        {
          number: '01',
          title: '輸入公司代號',
          description: '輸入您想了解的公司股票代碼或名稱，系統將自動搜尋相關的 SEC 文件。',
        },
        {
          number: '02',
          title: '選擇文件類型',
          description: '從 10-K 年報、10-Q 季報、8-K 重大事件報告等多種 SEC 文件中選擇您需要分析的類型。',
        },
        {
          number: '03',
          title: 'AI 進行文件分析',
          description: '我們的 AI 引擎會深入分析文件內容，提取關鍵信息，生成摘要和見解。',
        },
        {
          number: '04',
          title: '獲取分析報告',
          description: '查看 AI 生成的分析報告，包括財務摘要、風險評估、管理層討論要點等重要內容。',
        },
      ]
    : [
        {
          number: '01',
          title: 'Enter Company Symbol',
          description: 'Input the stock symbol or name of the company you want to research, and the system will automatically search for relevant SEC documents.',
        },
        {
          number: '02',
          title: 'Select Document Type',
          description: 'Choose from various SEC documents including 10-K annual reports, 10-Q quarterly reports, 8-K significant event reports, and more.',
        },
        {
          number: '03',
          title: 'AI Document Analysis',
          description: 'Our AI engine deeply analyzes the document content, extracting key information and generating summaries and insights.',
        },
        {
          number: '04',
          title: 'Get Analysis Report',
          description: 'View the AI-generated analysis report, including financial summaries, risk assessments, key points from management discussions, and more.',
        },
      ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            {language === 'zh' ? '使用指南' : 'How It Works'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'zh' ? '如何使用 SECGPT' : 'How to Use SECGPT'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'zh'
              ? '只需簡單幾步，即可獲得對 SEC 文件的專業分析，更快做出投資決策'
              : 'In just a few simple steps, get professional analysis of SEC documents to make faster investment decisions'}
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-secondary hidden md:block"></div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center reveal`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} mb-8 md:mb-0`}>
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                <div className="md:w-1/2 relative flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center z-10 text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="absolute w-24 h-24 rounded-full bg-primary/10 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
