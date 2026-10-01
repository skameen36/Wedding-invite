import React from 'react';
import { Coffee, Sparkles, Utensils, Camera, Clock } from 'lucide-react';

const iconMap = {
  coffee: Coffee,
  sparkles: Sparkles,
  utensils: Utensils,
  camera: Camera
};

export const EventSchedule = ({ itinerary }) => {
  return (
    <section id="schedule" style={{ margin: '2.5rem 0' }}>
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
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            className="clay-tile"
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.85rem',
              backgroundColor: 'rgba(7, 45, 33, 0.95)',
              border: '2px solid rgba(212, 175, 55, 0.75)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.35)'
            }}
          >
            <Clock size={28} color="#d4af37" />
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
              Auspicious Occasion Programme (प्रोग्राम के औकात / اوقاتِ تقریب)
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(1.4rem, 4.5vw, 1.85rem)',
              fontWeight: 800,
              color: 'var(--gold-200)',
              margin: '0.35rem 0 0.2rem'
            }}
          >
            Wedding Day Schedule &amp; Timings
          </h3>

          <p
            style={{
              fontSize: '0.86rem',
              color: 'rgba(251, 243, 213, 0.85)',
              margin: 0
            }}
          >
            Kindly grace all ceremonies with your auspicious presence on Sunday, 13th December 2026
          </p>
        </div>

        {/* 2026 Bento Timeline Stack with Tactile Clay VIP Passes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {itinerary.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Clock;
            const isHighlight = item.highlight;

            return (
              <div
                key={index}
                className={`tactile-card ${isHighlight ? 'clay-card-elevated' : 'clay-tile'}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.15rem',
                  padding: '1.15rem 1.35rem',
                  borderRadius: '1.25rem',
                  border: isHighlight
                    ? '2px solid rgba(244, 227, 159, 0.85)'
                    : '1.5px solid rgba(212, 175, 55, 0.38)',
                  boxShadow: isHighlight
                    ? '0 16px 36px -6px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.35), inset 0 3px 6px rgba(255, 255, 255, 0.35)'
                    : undefined,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Highlight Glow Sweep for Nikah Ceremony */}
                {isHighlight && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '90px',
                      height: '90px',
                      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
                      pointerEvents: 'none'
                    }}
                  />
                )}

                {/* Tactile 3D Icon Medallion */}
                <div
                  className="clay-tile"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '9999px',
                    backgroundColor: isHighlight
                      ? 'rgba(212, 175, 55, 0.35)'
                      : 'rgba(7, 45, 33, 0.95)',
                    border: '1.5px solid rgba(212, 175, 55, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                    marginTop: '2px'
                  }}
                >
                  <IconComponent size={22} color={isHighlight ? '#fffef8' : '#d4af37'} />
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  {item.day && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                      <span
                        className="clay-pill"
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          padding: '0.15rem 0.65rem',
                          backgroundColor: 'rgba(212, 175, 55, 0.2)',
                          color: 'var(--gold-300)',
                          border: '1px solid rgba(212, 175, 55, 0.45)'
                        }}
                      >
                        {item.day}
                      </span>
                      {item.location && (
                        <span style={{ fontSize: '0.72rem', color: 'rgba(251, 243, 213, 0.75)', fontWeight: 600 }}>
                          📍 {item.location}
                        </span>
                      )}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      marginBottom: '0.4rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-cinzel)',
                          fontSize: 'clamp(1.05rem, 3.2vw, 1.25rem)',
                          fontWeight: 800,
                          color: isHighlight ? 'var(--gold-100)' : 'var(--gold-200)'
                        }}
                      >
                        {item.title}
                      </span>
                      {isHighlight && (
                        <span
                          className="clay-pill"
                          style={{
                            fontSize: '0.58rem',
                            fontWeight: 800,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            padding: '0.15rem 0.55rem',
                            backgroundColor: 'rgba(212, 175, 55, 0.25)',
                            color: 'var(--gold-300)',
                            border: '1px solid rgba(212, 175, 55, 0.55)'
                          }}
                        >
                          Sacred Covenant
                        </span>
                      )}
                    </div>

                    {/* 3D Tactile Time Badge */}
                    <span
                      className="clay-btn-gold"
                      style={{
                        padding: '0.35rem 0.95rem',
                        fontSize: '0.86rem',
                        letterSpacing: '0.04em',
                        borderRadius: '9999px',
                        cursor: 'default',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.85)'
                      }}
                    >
                      ⏰ {item.time}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: 'rgba(251, 243, 213, 0.95)',
                      lineHeight: 1.55,
                      margin: 0
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
