import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from '@docusaurus/Link';
import styles from './HeroCarousel.module.css';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttons: {
    label: string;
    to?: string;
    onClick?: () => void;
    variant: 'primary' | 'secondary';
  }[];
}

interface HeroCarouselProps {
  slides: SlideData[];
}

const AUTO_PLAY_INTERVAL = 10000; // 10秒

export default function HeroCarousel({ slides }: HeroCarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    progressRef.current = 0;
    lastTimeRef.current = 0;
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
    progressRef.current = 0;
    lastTimeRef.current = 0;
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    progressRef.current = 0;
    lastTimeRef.current = 0;
  }, [slides.length]);

  // 进度条动画
  useEffect(() => {
    if (isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      progressRef.current += deltaTime;
      const newProgress = Math.min((progressRef.current / AUTO_PLAY_INTERVAL) * 100, 100);
      setProgress(newProgress);
      
      if (progressRef.current >= AUTO_PLAY_INTERVAL) {
        goToNext();
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, goToNext]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    lastTimeRef.current = 0;
  };

  return (
    <div 
      className={styles.carouselContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 轮播内容 */}
      <div className={styles.slidesWrapper}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(95, 75, 139, 0.7), rgba(95, 75, 139, 0.5)), url(${slide.backgroundImage})`,
            }}
          >
            <div className={styles.slideContent}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <div className={styles.buttons}>
                {slide.buttons.map((button, btnIndex) => (
                  button.to ? (
                    <Link
                      key={btnIndex}
                      className={`${styles.button} ${button.variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}`}
                      to={button.to}
                    >
                      {button.label}
                    </Link>
                  ) : (
                    <button
                      key={btnIndex}
                      className={`${styles.button} ${button.variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}`}
                      onClick={button.onClick}
                    >
                      {button.label}
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 左右箭头 */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={goToNext}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* 底部进度条 */}
      <div className={styles.progressContainer}>
        {slides.map((_, index) => (
          <div key={index} className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{
                width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* 指示器点 */}
      <div className={styles.dotsContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
