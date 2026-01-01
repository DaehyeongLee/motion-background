import React from 'react';
import useParallax from '../../hooks/useParallax';
import './Header.css';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const titleRef = useParallax({ speed: 0.6 }) as React.RefObject<HTMLHeadingElement>;
  const subtitleRef = useParallax({ speed: 0.4 }) as React.RefObject<HTMLParagraphElement>;

  return (
    <div className="header-container">
      <h1 ref={titleRef} className="parallax-text main-title">
        할일 관리
      </h1>
      <p ref={subtitleRef} className="parallax-text subtitle">
        React 18의 최신 기능으로 구현된 현대적인 Todo 앱
      </p>
      <div className="header-features">
        <span className="feature-badge">동시 렌더링</span>
        <span className="feature-badge">자동 배칭</span>
        <span className="feature-badge">Suspense</span>
      </div>
    </div>
  );
};

export default Header;