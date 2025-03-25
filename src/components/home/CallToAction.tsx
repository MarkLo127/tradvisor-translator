
import { Link } from 'react-router-dom';
import AnimatedButton from '../ui/AnimatedButton';
import { useLanguage } from '@/contexts/LanguageContext';

const CallToAction = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-white"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {language === 'zh' 
              ? '準備好簡化您的投資研究了嗎？'
              : 'Ready to simplify your investment research?'}
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            {language === 'zh'
              ? '立即開始使用 SECGPT，讓 AI 幫助您分析 SEC 文件，更快獲取投資洞見'
              : 'Start using SECGPT today and let AI help you analyze SEC documents for faster investment insights'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/analysis">
              <AnimatedButton 
                className="bg-white text-primary hover:bg-white/90"
                size="lg"
              >
                {language === 'zh' ? '立即開始' : 'Get Started'}
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
