
import AnimatedButton from '../ui/AnimatedButton';

const CallToAction = () => {
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
            準備好突破語言障礙了嗎？
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            立即開始使用 TradVisor 譯師，讓全球溝通變得前所未有的簡單
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <AnimatedButton 
              className="bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              免費試用 14 天
            </AnimatedButton>
            <AnimatedButton 
              className="bg-transparent border border-white text-white hover:bg-white/10" 
              size="lg"
            >
              聯絡銷售團隊
            </AnimatedButton>
          </div>
          <p className="text-sm text-primary-foreground/60 mt-6">
            無需信用卡，隨時取消
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
