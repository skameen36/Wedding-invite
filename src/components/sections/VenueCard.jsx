import React from 'react';
import { MapPin, Navigation, Car, Calendar, Sparkles } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const VenueCard = ({ venue, walima }) => {
  const handleMapClick = () => {
    soundService.playClickSound();
  };

  return (
    <section id="venue" style={{ margin: '2.5rem 0' }}>
      <div
        className="clay-card"
        style={{
          padding: 'clamp(1.25rem, 4vw, 2.25rem)',
          border: '1.5px solid rgba(212, 175, 55, 0.45)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            className="clay-tile"
            style={{
              width: '62px',
              height: '62px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(7, 45, 33, 0.95)',
              border: '2px solid rgba(212, 175, 55, 0.75)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.85rem',
              color: 'var(--gold-300)'
            }}
          >
            <MapPin size={28} color="#d4af37" />
          </div>

          <div
            className="clay-pill"
            style={{
              padding: '0.28rem 1.15rem',
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
              Wedding Venues &amp; Locations (स्थान व पता / تقریب گاہ)
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(1.45rem, 4.8vw, 1.95rem)',
              fontWeight: 800,
              color: 'var(--gold-200)',
              margin: '0.35rem 0 0.2rem'
            }}
          >
            Ceremony &amp; Reception Locations
          </h3>

          <p
            style={{
              fontSize: '0.86rem',
              color: 'rgba(251, 243, 213, 0.85)',
              margin: 0
            }}
          >
            Complete location directions for both Nikah &amp; Walima Reception
          </p>
        </div>

        {/* Dual Venue 2026 Bento Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* VENUE 1: NIKAH CEREMONY (BARSI TAKLI) */}
          <div
            className="clay-card-elevated tactile-card"
            style={{
              padding: '1.5rem 1.25rem',
              borderRadius: '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(212, 175, 55, 0.5)'
            }}
          >
            <div
              className="clay-pill"
              style={{
                padding: '0.3rem 1rem',
                backgroundColor: 'rgba(212, 175, 55, 0.18)',
                border: '1.5px solid rgba(212, 175, 55, 0.55)',
                marginBottom: '0.75rem'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-300)',
                  fontWeight: 800
                }}
              >
                💍 Venue 1: Sacred Nikah Ceremony
              </span>
            </div>

            <h4
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(1.3rem, 4.2vw, 1.7rem)',
                fontWeight: 800,
                color: 'var(--ivory-100)',
                margin: '0.2rem 0 0.25rem'
              }}
            >
              {venue.name}
            </h4>

            <p style={{ fontSize: '0.84rem', color: 'var(--gold-300)', fontWeight: 600, marginBottom: '0.85rem' }}>
              🗓 {venue.date} • ⏰ {venue.time}
            </p>

            {/* Address */}
            <div
              className="clay-tile"
              style={{
                padding: '0.85rem 1.15rem',
                maxWidth: '520px',
                margin: '0 auto 0.85rem',
                textAlign: 'center'
              }}
            >
              <p
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  color: 'var(--ivory-100)',
                  lineHeight: 1.55,
                  margin: 0
                }}
              >
                📍 {venue.address}
              </p>
            </div>

            {/* Landmark */}
            <div
              className="clay-pill"
              style={{
                padding: '0.35rem 1rem',
                marginBottom: '1.25rem',
                gap: '0.45rem',
                backgroundColor: 'rgba(2, 16, 11, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.35)'
              }}
            >
              <Car size={15} color="#d4af37" />
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-200)', fontWeight: 600 }}>
                {venue.landmark}
              </span>
            </div>

            {/* Maps Button */}
            <div style={{ marginBottom: '1.25rem' }}>
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMapClick}
                className="clay-btn-gold animate-shimmer tactile-btn"
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  padding: '0.95rem 1.4rem',
                  borderRadius: '1rem',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  gap: '0.65rem'
                }}
              >
                <Navigation size={18} color="#01110b" fill="#01110b" />
                <span>Open Nikah Map (Barsi Takli रास्ता देखें)</span>
              </a>
            </div>

            {/* Live Interactive Map */}
            <div
              className="glass-crystal"
              style={{
                borderRadius: '1.15rem',
                overflow: 'hidden',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                maxWidth: '520px',
                margin: '0 auto',
                height: '210px',
                position: 'relative'
              }}
            >
              <iframe
                title="Nikah Venue Map"
                src={`https://maps.google.com/maps?q=${venue.mapEmbedQuery || 'Dada+Hayat+Qalandar+Function+Hall+Barsi+Takli'}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* VENUE 2: GRAND RECEPTION / WALIMA (AMRAVATI) */}
          {walima && (
            <div
              className="clay-card-elevated tactile-card"
              style={{
                padding: '1.5rem 1.25rem',
                borderRadius: '1.5rem',
                textAlign: 'center',
                border: '2px solid rgba(244, 227, 159, 0.65)',
                backgroundColor: 'rgba(7, 45, 33, 0.96)'
              }}
            >
              <div
                className="clay-pill"
                style={{
                  padding: '0.3rem 1rem',
                  backgroundColor: 'rgba(244, 227, 159, 0.22)',
                  border: '1.5px solid rgba(244, 227, 159, 0.75)',
                  marginBottom: '0.75rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-200)',
                    fontWeight: 800
                  }}
                >
                  👑 Venue 2: Grand Reception (Walima)
                </span>
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: 'clamp(1.3rem, 4.2vw, 1.7rem)',
                  fontWeight: 800,
                  color: 'var(--ivory-100)',
                  margin: '0.2rem 0 0.25rem'
                }}
              >
                {walima.name}
              </h4>

              <p style={{ fontSize: '0.84rem', color: 'var(--gold-300)', fontWeight: 600, marginBottom: '0.85rem' }}>
                🗓 {walima.date} • ⏰ {walima.time} ({walima.hijri})
              </p>

              {/* Address */}
              <div
                className="clay-tile"
                style={{
                  padding: '0.85rem 1.15rem',
                  maxWidth: '520px',
                  margin: '0 auto 0.85rem',
                  textAlign: 'center'
                }}
              >
                <p
                  style={{
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    color: 'var(--ivory-100)',
                    lineHeight: 1.55,
                    margin: 0
                  }}
                >
                  📍 {walima.address}
                </p>
              </div>

              {/* Landmark */}
              <div
                className="clay-pill"
                style={{
                  padding: '0.35rem 1rem',
                  marginBottom: '1.25rem',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(2, 16, 11, 0.85)',
                  border: '1px solid rgba(212, 175, 55, 0.35)'
                }}
              >
                <Car size={15} color="#d4af37" />
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-200)', fontWeight: 600 }}>
                  {walima.landmark}
                </span>
              </div>

              {/* Maps Button */}
              <div style={{ marginBottom: '1.25rem' }}>
                <a
                  href={walima.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMapClick}
                  className="clay-btn-gold animate-shimmer tactile-btn"
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    padding: '0.95rem 1.4rem',
                    borderRadius: '1rem',
                    fontSize: '0.9rem',
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    gap: '0.65rem'
                  }}
                >
                  <Navigation size={18} color="#01110b" fill="#01110b" />
                  <span>Open Walima Map (Amravati रास्ता देखें)</span>
                </a>
              </div>

              {/* Live Interactive Map */}
              <div
                className="glass-crystal"
                style={{
                  borderRadius: '1.15rem',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(244, 227, 159, 0.55)',
                  maxWidth: '520px',
                  margin: '0 auto',
                  height: '210px',
                  position: 'relative'
                }}
              >
                <iframe
                  title="Walima Venue Map"
                  src={`https://maps.google.com/maps?q=${walima.mapEmbedQuery || 'Zam+Zam+Function+Lawn+Amravati'}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
