import React from 'react';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import Header from './components/Header/Header';
import './App.css';

interface AppProps { }

const App: React.FC<AppProps> = () => {
  return (
    <div className="app">
      <AnimatedBackground />
      <div className="parallax-container">
        <Header />
        <div className="scroll-content">
          {/* 스크롤을 위한 빈 공간 */}
        </div>
      </div>
    </div>
  );
};

export default App;