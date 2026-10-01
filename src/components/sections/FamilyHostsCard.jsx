import React from 'react';
import { Users, Heart } from 'lucide-react';

export const FamilyHostsCard = ({ hosts }) => {
  if (!hosts) return null;

  return (
    <section id="hosts" style={{ margin: '2.5rem 0' }}>
      <div
        className="clay-card"
        style={{
          padding: 'clamp(1.25rem, 4vw, 2.25rem)',
          border: '1.5px solid rgba(212, 175, 55, 0.45)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            className="clay-tile"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(7, 45, 33, 0.95)',
              border: '2px solid rgba(212, 175, 55, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.85rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.35)'
            }}
          >
            <Users size={27} color="#d4af37" />
          </div>

          <div
            className="clay-pill"
            style={{
              padding: '0.28rem 1rem',
              marginBottom: '0.5rem',
              backgroundColor: 'rgba(5, 34, 24, 0.92)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--gold-400)',
                fontWeight: 750
              }}
            >
              {hosts.title || 'Cordially Invited By'}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(1.35rem, 4.5vw, 1.75rem)',
              fontWeight: 800,
              color: 'var(--gold-200)',
              margin: '0.35rem 0 0.2rem'
            }}
          >
            Shaikh &amp; Syed Families
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: '1.05rem',
              color: 'var(--gold-300)',
              direction: 'rtl'
            }}
          >
            {hosts.subTitle || 'نیک تمناؤں اور پرخلوص دعاؤں کے ساتھ'}
          </p>
        </div>

        {/* Dual 2026 Claymorphic Family Shields */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.15rem',
            marginBottom: '1.5rem'
          }}
        >
          {/* Groom's Family */}
          <div
            className="clay-card-elevated tactile-card"
            style={{
              padding: '1.35rem 1.15rem',
              borderRadius: '1.25rem',
              textAlign: 'center'
            }}
          >
            <span
              className="clay-pill"
              style={{
                display: 'inline-block',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold-300)',
                padding: '0.25rem 0.85rem',
                marginBottom: '0.65rem',
                fontWeight: 700
              }}
            >
              {hosts.groomSide.title}
            </span>

            <h4
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--ivory-100)',
                margin: '0.25rem 0 0.4rem'
              }}
            >
              {hosts.groomSide.head}
            </h4>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(251, 243, 213, 0.9)',
                fontWeight: 500,
                margin: 0
              }}
            >
              📍 {hosts.groomSide.location}
            </p>
          </div>

          {/* Bride's Family */}
          <div
            className="clay-card-elevated tactile-card"
            style={{
              padding: '1.35rem 1.15rem',
              borderRadius: '1.25rem',
              textAlign: 'center'
            }}
          >
            <span
              className="clay-pill"
              style={{
                display: 'inline-block',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold-300)',
                padding: '0.25rem 0.85rem',
                marginBottom: '0.65rem',
                fontWeight: 700
              }}
            >
              {hosts.brideSide.title}
            </span>

            <h4
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--ivory-100)',
                margin: '0.25rem 0 0.4rem'
              }}
            >
              {hosts.brideSide.head}
            </h4>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(251, 243, 213, 0.9)',
                fontWeight: 500,
                margin: 0
              }}
            >
              📍 {hosts.brideSide.location}
            </p>
          </div>
        </div>

        {/* Welcomers footer */}
        <div
          className="clay-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.55rem 1.25rem',
            maxWidth: '520px',
            margin: '0 auto',
            backgroundColor: 'rgba(5, 30, 21, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.4)'
          }}
        >
          <Heart size={15} color="#d4af37" fill="rgba(212, 175, 55, 0.6)" />
          <p
            style={{
              fontSize: '0.84rem',
              color: 'var(--gold-200)',
              fontStyle: 'italic',
              margin: 0,
              fontWeight: 500
            }}
          >
            {hosts.welcomers}
          </p>
        </div>
      </div>
    </section>
  );
};
