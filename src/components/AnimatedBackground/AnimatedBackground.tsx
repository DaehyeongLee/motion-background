import React, { useState, useEffect } from 'react';
import './AnimatedBackground.css';

interface AnimatedBackgroundProps { }

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤에 따른 투명도 계산 (0-60px 구간에서 1 -> 0)
  const opacity = Math.max(0, 1 - scrollY / 60);

  return (
    <div className="animated-background" style={{ opacity }}>
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
    </div>
  );
};

export default AnimatedBackground;