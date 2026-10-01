import React from 'react';
import { Compass, VolumeX, Share2, Sparkles } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const TopBar = ({ is3DModeOnly, onToggle3D, isAudioPlaying, onShareClick }) => {
  const handleToggleAudio = () => {
    soundService.toggleMelody();
  };

  return (
    <header
      className="floating-top-bar"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: '0.55rem',
        pointerEvents: 'auto'
      }}
    >
      {/* 2026 Dynamic Island Capsule */}
      <div
        className="glass-island"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.45rem'
        }}
      >
        {/* 3D View Toggle Pill */}
        <button
          type="button"
          onClick={onToggle3D}
          className={is3DModeOnly ? 'clay-btn-gold' : 'clay-pill'}
          style={{
            height: '40px',
            padding: '0 0.95rem',
            border: is3DModeOnly ? '1.5px solid #fff2b8' : '1px solid rgba(212, 175, 55, 0.45)',
            cursor: 'pointer',
            gap: '0.45rem',
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: is3DModeOnly ? '#01110b' : 'var(--gold-200)'
          }}
        >
          <Compass size={16} color={is3DModeOnly ? '#01110b' : '#d4af37'} />
          <span>{is3DModeOnly ? 'Show Card' : 'Explore 3D'}</span>
          <Sparkles size={12} color={is3DModeOnly ? '#01110b' : '#d4af37'} />
        </button>

        {/* Audio Synthesizer Toggle */}
        <button
          type="button"
          onClick={handleToggleAudio}
          aria-label="Toggle Royal Melody"
          className="clay-pill"
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            padding: 0,
            backgroundColor: isAudioPlaying ? 'rgba(212, 175, 55, 0.22)' : 'rgba(5, 30, 21, 0.9)',
            border: isAudioPlaying
              ? '1.5px solid var(--gold-400)'
              : '1px solid rgba(212, 175, 55, 0.35)'
          }}
        >
          {isAudioPlaying ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '17px' }}>
              <span style={{ width: '3px', backgroundColor: 'var(--gold-300)', borderRadius: '2px' }} className="eq-bar-1" />
              <span style={{ width: '3px', backgroundColor: 'var(--gold-300)', borderRadius: '2px' }} className="eq-bar-2" />
              <span style={{ width: '3px', backgroundColor: 'var(--gold-300)', borderRadius: '2px' }} className="eq-bar-3" />
            </div>
          ) : (
            <VolumeX size={17} color="#d4af37" />
          )}
        </button>

        {/* Share Quick Button */}
        <button
          type="button"
          onClick={onShareClick}
          aria-label="Share Wedding Invitation"
          className="clay-pill"
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            padding: 0,
            border: '1px solid rgba(212, 175, 55, 0.35)'
          }}
        >
          <Share2 size={16} color="#d4af37" />
        </button>
      </div>
    </header>
  );
};
