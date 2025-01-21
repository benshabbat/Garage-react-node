import React, { useEffect, useLayoutEffect } from 'react';

const Layout = ({ children }) => {
  // Prevent layout shifts
  useLayoutEffect(() => {
    document.documentElement.classList.add('hydrated');
    
    // Lock dimensions on initial load
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update dimensions on resize
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent unwanted scaling on mobile
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  return (
    <div className="layout-container">
      {children}
    </div>
  );
};

export default Layout;