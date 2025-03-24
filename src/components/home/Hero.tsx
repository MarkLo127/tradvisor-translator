
import { useEffect, useRef } from 'react';
import AnimatedButton from '../ui/AnimatedButton';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
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
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-in reveal">AI 驅動的翻譯服務</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight reveal">
              智能翻譯，<br />
              <span className="text-primary">連接世界</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl reveal stagger-1">
              TradVisor 譯師運用最先進的 AI 技術，提供精準、自然的即時翻譯，幫助您輕鬆跨越語言障礙，實現無縫全球溝通。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 reveal stagger-2">
              <AnimatedButton size="lg">
                立即開始免費試用
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg">
                了解更多
              </AnimatedButton>
            </div>
            <div className="reveal stagger-3">
              <p className="text-sm text-muted-foreground">支援超過 100 種語言，無需註冊即可體驗</p>
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
                    <div className="text-sm text-muted-foreground mb-2">英文</div>
                    <div className="rounded-lg bg-secondary/70 p-4 h-48">
                      <p className="text-sm">Hello! I'm excited to connect with you. Could you please translate this message for me? I want to make sure we understand each other clearly.</p>
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="text-sm text-muted-foreground mb-2">繁體中文</div>
                    <div className="rounded-lg bg-secondary/70 p-4 h-48">
                      <p className="text-sm">你好！我很高興能和你連絡。你能幫我翻譯這條訊息嗎？我想確保我們彼此清楚地理解對方。</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <AnimatedButton>立即翻譯</AnimatedButton>
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
