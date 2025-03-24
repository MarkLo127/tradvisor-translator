
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
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

  const testimonials = [
    {
      content: "TradVisor 譯師徹底改變了我們的國際業務溝通方式。翻譯質量非常精確，特別是對於專業術語的處理，比其他翻譯工具精準得多。現在我們能夠自信地與全球客戶交流，拓展業務範圍。",
      author: "陳小明",
      position: "國際貿易經理",
      company: "環球貿易有限公司",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      content: "作為一名旅行博主，我經常需要在不同國家與當地人交流。TradVisor 譯師的即時對話翻譯功能讓我能夠輕鬆打破語言障礙，獲得更真實的當地體驗。介面簡潔易用，是我旅行的必備工具。",
      author: "林美玲",
      position: "旅行博主",
      company: "環遊世界",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      content: "我們學術團隊使用 TradVisor 譯師翻譯研究論文和國際協作文件，其準確度和專業術語的處理能力令人印象深刻。它極大地提高了我們的工作效率，幫助我們與全球同行保持順暢的學術交流。",
      author: "王教授",
      position: "資深研究員",
      company: "臺灣大學",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">用戶評價</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">值得信賴的翻譯夥伴</h2>
          <p className="text-muted-foreground">
            來自各行各業的專業人士對 TradVisor 譯師的真實評價
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto reveal">
          <div className="glass rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex justify-center mb-8">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={24} />
                ))}
              </div>
            </div>
            
            <div 
              className="transition-all duration-500"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="flex items-start space-x-10">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="min-w-full">
                    <p className="text-lg md:text-xl italic mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute left-0 right-0 bottom-8 flex justify-center space-x-4 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-primary w-6' : 'bg-primary/30'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`前往第 ${index + 1} 個評價`}
                />
              ))}
            </div>
          </div>

          <button
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            onClick={prevTestimonial}
            aria-label="前一個評價"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            onClick={nextTestimonial}
            aria-label="下一個評價"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
