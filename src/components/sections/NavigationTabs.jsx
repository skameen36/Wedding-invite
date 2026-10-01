import React from 'react';
import { Scroll, Clock, MapPin, HeartHandshake, Users, Sparkles } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const NavigationTabs = () => {
  const jumpLinks = [
    { id: 'top-card', label: 'Card', icon: Scroll },
    { id: 'schedule', label: 'Timings', icon: Clock },
    { id: 'venue', label: 'Venue & Map', icon: MapPin },
    { id: 'hosts', label: 'Hosts', icon: Users },
    { id: 'guestbook', label: 'Duas', icon: HeartHandshake }
  ];

  const handleScrollTo = (targetId) => {
    soundService.playClickSound();
    if (targetId === 'top-card') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div style={{ margin: '1.5rem 0 1.25rem', textAlign: 'center' }}>
      <div
        className="clay-pill"
        style={{
          padding: '0.25rem 0.85rem',
          marginBottom: '0.65rem',
          backgroundColor: 'rgba(4, 26, 18, 0.85)'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gold-400)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Sparkles size={11} color="#d4af37" />
          <span>All Details Displayed Below • Tap to Quick Jump</span>
          <Sparkles size={11} color="#d4af37" />
        </span>
      </div>

      <nav
        aria-label="Quick Jump Menu"
        className="glass-island"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.45rem',
          padding: '0.45rem 0.65rem',
          maxWidth: '100%'
        }}
      >
        {jumpLinks.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollTo(item.id)}
              className="clay-pill tactile-btn"
              style={{
                padding: '0.45rem 0.85rem',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(7, 45, 33, 0.82)',
                color: 'var(--gold-200)',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}
            >
              <Icon size={13} color="#d4af37" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
