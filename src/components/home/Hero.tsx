
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../ui/AnimatedButton';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
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

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden" ref={heroRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-100/50 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-cyan-50 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto container-padding py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-6 mb-12 lg:mb-0">
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-in reveal">
              {language === 'zh' ? 'AI 驅動的 SEC 文件分析' : 'AI-Powered SEC Document Analysis'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight reveal">
              {language === 'zh' ? (
                <>
                  智能分析，<br />
                  <span className="text-primary">投資洞見</span>
                </>
              ) : (
                <>
                  Smart Analysis,<br />
                  <span className="text-primary">Investment Insights</span>
                </>
              )}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl reveal stagger-1">
              {language === 'zh' 
                ? 'SECGPT 運用最先進的 AI 技術，分析 SEC 文件並生成簡易報告，幫助投資者快速理解重點，不必閱讀冗長複雜的文件。'
                : 'SECGPT uses advanced AI technology to analyze SEC documents and generate simplified reports, helping investors quickly understand key points without reading lengthy complex documents.'}
            </p>
            <div className="flex justify-center reveal stagger-2">
              <Link to="/analysis">
                <AnimatedButton size="lg">
                  {language === 'zh' ? '立即開始分析' : 'Start Analyzing'}
                </AnimatedButton>
              </Link>
            </div>
            <div className="reveal stagger-3">
              <p className="text-sm text-muted-foreground">
                {language === 'zh' ? '支援 10-K、10-Q、8-K 等多種 SEC 文件' : 'Supports various SEC documents including 10-K, 10-Q, 8-K and more'}
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative reveal stagger-3">
            <div className="glass rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-5 py-3 flex items-center border-b border-border">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between mb-4">
                  <div className="w-1/2 pr-2">
                    <div className="text-sm text-muted-foreground mb-2">
                      {language === 'zh' ? 'SEC 文件（10-K 年報）' : 'SEC Document (10-K Filing)'}
                    </div>
                    <div className="rounded-lg bg-secondary/70 p-4 h-48 overflow-y-auto text-xs">
                      <p className="font-mono">
                        {language === 'zh' 
                          ? 'Item 1A. 風險因素 \n我們的業務、財務狀況和經營業績可能受到各種風險的重大不利影響，包括但不限於以下概述的風險...'
                          : 'Item 1A. Risk Factors \nOur business, financial condition and operating results may be materially adversely affected by various risks, including, but not limited to those outlined below...'}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="text-sm text-muted-foreground mb-2">
                      {language === 'zh' ? 'AI 生成報告' : 'AI-Generated Report'}
                    </div>
                    <div className="rounded-lg bg-secondary/70 p-4 h-48 overflow-y-auto text-xs">
                      <p>
                        {language === 'zh' 
                          ? '主要風險概述：\n1. 市場競爭加劇\n2. 法規變更風險\n3. 技術創新不足\n4. 供應鏈中斷\n5. 網絡安全威脅增加'
                          : 'Key Risk Summary:\n1. Increased market competition\n2. Regulatory change risks\n3. Insufficient technological innovation\n4. Supply chain disruptions\n5. Growing cybersecurity threats'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <AnimatedButton>
                    {language === 'zh' ? '生成完整報告' : 'Generate Full Report'}
                  </AnimatedButton>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-50 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
