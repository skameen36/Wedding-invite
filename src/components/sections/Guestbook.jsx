import React, { useState } from 'react';
import { HeartHandshake, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../../services/soundService';
import { storageService } from '../../services/storageService';

export const Guestbook = ({ initialWishes, quickBlessings, onShowToast }) => {
  const [wishes, setWishes] = useState(() => storageService.getWishes(initialWishes));
  const [formData, setFormData] = useState({ name: '', city: '', message: '' });

  const handleQuickDua = (text) => {
    soundService.playClickSound();
    setFormData(prev => ({ ...prev, message: text }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    soundService.playCelebrationSound();

    const updated = storageService.addWish(
      {
        name: formData.name,
        city: formData.city,
        text: formData.message
      },
      wishes
    );

    setWishes(updated);
    setFormData({ name: '', city: '', message: '' });

    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#d4af37', '#f4e39f', '#ffffff', '#146950']
    });

    onShowToast('JazakAllah! Your Dua has been received.', '🤲');
  };

  return (
    <section id="guestbook" style={{ margin: '2.5rem 0' }}>
      <div
        className="clay-card"
        style={{
          padding: 'clamp(1.25rem, 4vw, 2.25rem)',
          border: '1.5px solid rgba(212, 175, 55, 0.45)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
            paddingBottom: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              className="clay-tile"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(7, 45, 33, 0.95)',
                border: '1.5px solid rgba(212, 175, 55, 0.65)'
              }}
            >
              <HeartHandshake size={22} color="#d4af37" />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)',
                  fontWeight: 800,
                  color: 'var(--gold-200)',
                  margin: 0
                }}
              >
                Send Wishes &amp; Duas
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'rgba(251, 243, 213, 0.75)' }}>
                Share your prayers and blessings for the newly-weds
              </span>
            </div>
          </div>

          <div
            className="clay-pill"
            style={{
              padding: '0.35rem 0.85rem',
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              border: '1.5px solid rgba(212, 175, 55, 0.45)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.74rem',
                color: 'var(--gold-300)',
                fontWeight: 750
              }}
            >
              {wishes.length} Blessings
            </span>
          </div>
        </div>

        {/* 1-Tap Clay Blessing Stones */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span
            style={{
              display: 'block',
              fontSize: '0.76rem',
              color: 'var(--gold-300)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-cinzel)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            ✨ Tap a blessing stone to auto-fill:
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              overflowX: 'auto',
              paddingBottom: '0.45rem'
            }}
          >
            {quickBlessings.map((b, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickDua(b.text)}
                className="clay-pill tactile-btn"
                style={{
                  whiteSpace: 'nowrap',
                  padding: '0.45rem 0.95rem',
                  backgroundColor: 'rgba(7, 45, 33, 0.85)',
                  border: '1.5px solid rgba(212, 175, 55, 0.4)',
                  color: 'var(--gold-200)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2026 Tactile Input Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div
            className="action-buttons-group"
            style={{
              display: 'flex',
              gap: '0.75rem'
            }}
          >
            <input
              type="text"
              required
              placeholder="Your Name / Family (नाम)"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="clay-tile"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                color: 'var(--gold-100)',
                fontSize: '0.86rem',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                border: '1.5px solid rgba(212, 175, 55, 0.35)'
              }}
            />
            <input
              type="text"
              placeholder="Your City (शहर e.g. Amravati, Akola)"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className="clay-tile"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                color: 'var(--gold-100)',
                fontSize: '0.86rem',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                border: '1.5px solid rgba(212, 175, 55, 0.35)'
              }}
            />
          </div>

          <textarea
            required
            rows={2}
            placeholder="Write your heartfelt blessing or Dua for the couple... (दुआ व मुबारकबाद)"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className="clay-tile"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              color: 'var(--gold-100)',
              fontSize: '0.86rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              resize: 'none',
              border: '1.5px solid rgba(212, 175, 55, 0.35)'
            }}
          />

          {/* 3D Tactile Submit Button */}
          <button
            type="submit"
            className="clay-btn-gold animate-shimmer tactile-btn"
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              borderRadius: '1rem',
              fontSize: '0.88rem',
              letterSpacing: '0.04em',
              gap: '0.55rem'
            }}
          >
            <Send size={16} color="#01110b" />
            <span>Send Your Dua &amp; Blessing (दुआ भेजें)</span>
          </button>
        </form>

        {/* Wishes List Stream */}
        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            maxHeight: '240px',
            overflowY: 'auto',
            paddingRight: '0.35rem'
          }}
        >
          {wishes.map((w) => (
            <div
              key={w.id}
              className="glass-crystal tactile-card"
              style={{
                padding: '0.85rem 1.05rem',
                borderRadius: '0.9rem',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontWeight: 750,
                    fontSize: '0.88rem',
                    color: 'var(--gold-300)'
                  }}
                >
                  {w.name}{' '}
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      color: 'rgba(212, 175, 55, 0.8)',
                      fontWeight: 500
                    }}
                  >
                    ({w.city || 'Guest'})
                  </span>
                </span>
                <span style={{ fontSize: '0.68rem', color: 'rgba(251, 243, 213, 0.6)' }}>
                  {w.time || 'Recent'}
                </span>
              </div>
              <p style={{ color: 'rgba(251, 243, 213, 0.95)', lineHeight: 1.5, fontSize: '0.82rem', margin: 0 }}>
                {w.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
