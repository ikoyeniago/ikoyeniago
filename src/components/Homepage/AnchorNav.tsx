import React, { useState, useEffect } from 'react';
import styles from './AnchorNav.module.css';

interface NavItem {
  id: string;
  label: string;
}

interface AnchorNavProps {
  items: NavItem[];
}

export default function AnchorNav({ items }: AnchorNavProps): JSX.Element {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 显示/隐藏导航（滚动超过Hero区域后显示）
      const heroHeight = window.innerHeight * 0.6;
      setIsVisible(window.scrollY > heroHeight);

      // 检测当前所在区域
      const sections = items.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(items[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始检测

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const navHeight = 80;
        const offsetTop = element.offsetTop - navHeight;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* 桌面端锚点导航 */}
      <nav className={`${styles.desktopNav} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.navContainer}>
          {items.map((item) => (
            <button
              key={item.id}
              className={`${styles.navButton} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 移动端浮动菜单按钮 */}
      <div className={`${styles.mobileNav} ${isVisible ? styles.visible : ''}`}>
        <button
          className={`${styles.floatingButton} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
        </button>

        {/* 移动端菜单 */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          {items.map((item, index) => (
            <button
              key={item.id}
              className={`${styles.mobileNavButton} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => scrollToSection(item.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 遮罩层 */}
        {isMobileMenuOpen && (
          <div 
            className={styles.overlay}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
}
