import React from 'react';
import { ArrowLeft, RotateCw, User, Heart, Play, Pause } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const Explore3DOverlay = ({
  is3DModeOnly,
  onExit3D,
  onSelectFace,
  isAutoSpinning = true,
  onToggleAutoSpin
}) => {
  if (!is3DModeOnly) return null;

  const handleExit = () => {
    soundService.playClickSound();
    onExit3D();
  };

  const handleFaceClick = (face) => {
    soundService.playClickSound();
    if (onSelectFace) onSelectFace(face);
  };

  const handleToggleSpin = () => {
    soundService.playClickSound();
    if (onToggleAutoSpin) onToggleAutoSpin();
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
        padding: '1rem'
      }}
    >
      {/* Top Hint Pill */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4.2rem' }}>
        <div
          style={{
            pointerEvents: 'auto',
            padding: '0.45rem 1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(2, 18, 12, 0.94)',
            border: '1px solid rgba(212, 175, 55, 0.6)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--gold-200)',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-cinzel)',
            fontWeight: 700
          }}
        >
          <RotateCw size={13} color="#d4af37" className="animate-spin" style={{ animationDuration: '6s' }} />
          <span>👆 Drag screen to spin 360° or tap buttons below</span>
        </div>
      </div>

      {/* Bottom Floating Control Hub & Return Button */}
      <div
        className="floating-exit-banner"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.25rem'
        }}
      >
        {/* Quick Flip Dock (Groom / Bride / Auto-Spin) */}
        <div
          className="glass-island"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.5rem',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.25)'
          }}
        >
          {/* View Groom Side */}
          <button
            type="button"
            onClick={() => handleFaceClick('groom')}
            className="clay-pill tactile-btn"
            style={{
              padding: '0.45rem 0.85rem',
              cursor: 'pointer',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--gold-200)',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.72rem',
              fontWeight: 700
            }}
          >
            <User size={13} color="#d4af37" />
            <span>Groom</span>
          </button>

          {/* View Bride Side */}
          <button
            type="button"
            onClick={() => handleFaceClick('bride')}
            className="clay-pill tactile-btn"
            style={{
              padding: '0.45rem 0.85rem',
              cursor: 'pointer',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--gold-200)',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.72rem',
              fontWeight: 700
            }}
          >
            <Heart size={13} color="#f4e39f" fill="#f4e39f" />
            <span>Bride</span>
          </button>

          {/* Auto-Spin Toggle */}
          <button
            type="button"
            onClick={handleToggleSpin}
            className="clay-pill tactile-btn"
            style={{
              padding: '0.45rem 0.75rem',
              cursor: 'pointer',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--gold-300)',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.72rem',
              fontWeight: 700
            }}
          >
            {isAutoSpinning ? <Pause size={12} color="#d4af37" /> : <Play size={12} color="#d4af37" />}
            <span>{isAutoSpinning ? 'Pause' : 'Spin'}</span>
          </button>
        </div>

        {/* Big Prominent Return Button */}
        <button
          type="button"
          onClick={handleExit}
          className="clay-btn-gold animate-shimmer tactile-btn"
          style={{
            pointerEvents: 'auto',
            padding: '0.85rem 1.6rem',
            borderRadius: '9999px',
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 800,
            gap: '0.55rem',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.6)'
          }}
        >
          <ArrowLeft size={17} color="#01110b" />
          <span>Return to Invitation Details</span>
        </button>
      </div>
    </div>
  );
};
