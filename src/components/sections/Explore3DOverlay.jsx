import React from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const Explore3DOverlay = ({ is3DModeOnly, onExit3D }) => {
  if (!is3DModeOnly) return null;

  const handleExit = () => {
    soundService.playClickSound();
    onExit3D();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 45,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem'
      }}
    >
      {/* Top Hint Pill */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4.5rem' }}>
        <div
          style={{
            pointerEvents: 'auto',
            padding: '0.45rem 1.1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(2, 18, 12, 0.92)',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--gold-200)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-cinzel)'
          }}
        >
          <RotateCw size={14} color="#d4af37" className="animate-spin" style={{ animationDuration: '6s' }} />
          <span>Drag screen to spin 3D royal heart in 360°</span>
        </div>
      </div>

      {/* Bottom Floating Return Button */}
      <div
        className="floating-exit-banner"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <button
          type="button"
          onClick={handleExit}
          style={{
            pointerEvents: 'auto',
            padding: '0.85rem 1.75rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #093c2d 0%, #05261c 100%)',
            border: '2px solid var(--gold-400)',
            color: 'var(--gold-100)',
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 35px rgba(212, 175, 55, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            transition: 'all 0.25s ease'
          }}
        >
          <ArrowLeft size={17} color="#d4af37" />
          <span>Return to Invitation Details</span>
        </button>
      </div>
    </div>
  );
};
