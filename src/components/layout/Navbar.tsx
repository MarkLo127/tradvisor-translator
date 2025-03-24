
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: '首頁', href: '#' },
    { label: '功能', href: '#features' },
    { label: '如何使用', href: '#how-it-works' },
    { label: '用戶評價', href: '#testimonials' },
    { label: '定價', href: '#pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-primary">TradVisor</span>
            <span className="font-medium text-lg ml-1">譯師</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <AnimatedButton variant="outline" size="sm">
              登入
            </AnimatedButton>
            <AnimatedButton size="sm">
              免費試用
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? '關閉選單' : '打開選單'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="container-padding py-4 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`block py-2 text-sm font-medium hover:text-primary transition-colors animate-slide-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <AnimatedButton variant="outline" fullWidth>
                登入
              </AnimatedButton>
              <AnimatedButton fullWidth>
                免費試用
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
