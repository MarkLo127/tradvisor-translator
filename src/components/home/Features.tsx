
import { useEffect } from 'react';
import { Globe, MessageSquare, FileText, Zap, Clock, Lock } from 'lucide-react';

const Features = () => {
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

  const features = [
    {
      icon: Globe,
      title: '多語言支援',
      description: '支援超過 100 種語言，滿足您全球交流的所有需求，無論是常見語言還是稀有語言。',
    },
    {
      icon: MessageSquare,
      title: '即時對話翻譯',
      description: '實時翻譯對話內容，讓您與使用不同語言的人流暢交流，消除溝通障礙。',
    },
    {
      icon: FileText,
      title: '文件翻譯',
      description: '快速翻譯各種文件格式，保持原始排版，適用於商業文件、學術論文等。',
    },
    {
      icon: Zap,
      title: 'AI 精準翻譯',
      description: '運用先進 AI 模型，提供比傳統翻譯更自然、更精確的翻譯結果。',
    },
    {
      icon: Clock,
      title: '高效率處理',
      description: '快速處理大量文本，節省您的時間，提高工作效率。',
    },
    {
      icon: Lock,
      title: '安全隱私保障',
      description: '嚴格的數據加密和隱私政策，確保您的敏感信息不會外洩。',
    },
  ];

  return (
    <section id="features" className="section-padding py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">功能特色</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">突破語言障礙的強大工具</h2>
          <p className="text-muted-foreground">
            TradVisor 譯師提供全方位的翻譯解決方案，結合最先進的 AI 技術，幫助您輕鬆應對各種翻譯需求
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
