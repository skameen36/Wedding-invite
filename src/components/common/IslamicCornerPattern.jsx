import React from 'react';

export const IslamicCornerPattern = () => {
  const commonStyle = {
    position: 'absolute',
    width: '48px',
    height: '48px',
    pointerEvents: 'none',
    zIndex: 2,
    color: 'rgba(212, 175, 55, 0.4)'
  };

  return (
    <>
      {/* Top Left */}
      <svg
        style={{ ...commonStyle, top: '6px', left: '6px' }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M0,0 L100,0 C70,10 50,30 40,60 C35,45 25,35 0,30 Z" opacity="0.35" />
        <path d="M4,4 L60,4 C50,15 35,25 25,45 C20,30 15,20 4,15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <circle cx="28" cy="8" r="2" fill="currentColor" />
        <circle cx="8" cy="28" r="2" fill="currentColor" />
      </svg>

      {/* Top Right */}
      <svg
        style={{ ...commonStyle, top: '6px', right: '6px', transform: 'scaleX(-1)' }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M0,0 L100,0 C70,10 50,30 40,60 C35,45 25,35 0,30 Z" opacity="0.35" />
        <path d="M4,4 L60,4 C50,15 35,25 25,45 C20,30 15,20 4,15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <circle cx="28" cy="8" r="2" fill="currentColor" />
        <circle cx="8" cy="28" r="2" fill="currentColor" />
      </svg>

      {/* Bottom Left */}
      <svg
        style={{ ...commonStyle, bottom: '6px', left: '6px', transform: 'scaleY(-1)' }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M0,0 L100,0 C70,10 50,30 40,60 C35,45 25,35 0,30 Z" opacity="0.35" />
        <path d="M4,4 L60,4 C50,15 35,25 25,45 C20,30 15,20 4,15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>

      {/* Bottom Right */}
      <svg
        style={{ ...commonStyle, bottom: '6px', right: '6px', transform: 'scale(-1)' }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M0,0 L100,0 C70,10 50,30 40,60 C35,45 25,35 0,30 Z" opacity="0.35" />
        <path d="M4,4 L60,4 C50,15 35,25 25,45 C20,30 15,20 4,15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    </>
  );
};
