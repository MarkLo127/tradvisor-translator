
import { useEffect } from 'react';

const HowItWorks = () => {
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
  
  const steps = [
    {
      number: '01',
      title: '輸入或上傳內容',
      description: '輸入文字、上傳文件或開始即時對話，系統會自動檢測原始語言。',
    },
    {
      number: '02',
      title: '選擇目標語言',
      description: '從超過 100 種語言中選擇您需要的目標語言，或使用自動建議功能。',
    },
    {
      number: '03',
      title: 'AI 進行翻譯處理',
      description: '我們的 AI 引擎會分析內容，考慮語境和專業術語，生成最準確的翻譯。',
    },
    {
      number: '04',
      title: '獲取翻譯結果',
      description: '幾秒鐘內獲得翻譯結果，可以複製、下載或直接分享給他人。',
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">使用指南</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">如何開始使用 TradVisor 譯師</h2>
          <p className="text-muted-foreground">
            只需簡單幾步，即可獲得專業級別的翻譯結果，滿足您的各種語言需求
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
