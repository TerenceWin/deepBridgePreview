import { useState, useEffect } from 'react';

export const MAX_WIDTH = 1280;
export const LAPTOP_MAX_WIDTH = 960;
export const H_PAD = '0 72px';
export const NAV_HEIGHT = 72;
export const SECTION_PAD = '96px 72px';
export const SECTION_PAD_SM = '64px 72px';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

export function useMaxWidth() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return windowWidth <= 1480 ? LAPTOP_MAX_WIDTH : MAX_WIDTH;
}
