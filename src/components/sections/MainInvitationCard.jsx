import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Navigation, Orbit, Sparkles, CalendarPlus, Heart } from 'lucide-react';
import { IslamicCornerPattern } from '../common/IslamicCornerPattern';
import { calendarService } from '../../services/calendarService';
import { soundService } from '../../services/soundService';

export const MainInvitationCard = ({ weddingData, onLaunch3D, onShowToast }) => {
  const { couple, date, venue, sacredTexts } = weddingData;

  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const target = new Date(date.isoDateTime).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [date.isoDateTime]);

  const handleGoogleCalendar = () => {
    soundService.playCelebrationSound();
    const url = calendarService.getGoogleCalendarUrl(weddingData);
    window.open(url, '_blank');
    onShowToast('Opening Google Calendar...', '📅');
  };

  const handleMaps = () => {
    soundService.playClickSound();
    window.open(venue.googleMapsUrl, '_blank');
  };

  return (
    <article
      id="top-card"
      className="clay-card clay-pulse-glow"
      style={{
        padding: 'clamp(1.25rem, 4vw, 2.5rem)',
        overflow: 'hidden',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Ornate Gold Islamic Corner Filigree */}
      <IslamicCornerPattern />

      {/* 2026 Ambient Ethereal Glow Ring */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '320px',
          height: '240px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(13, 66, 49, 0.25) 50%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* 1. SACRED HEADER & BISMILLAH ILLUMINATION */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '1.25rem' }}>
        {/* Monogram Crest with Rotating Sacred Geometry */}
        <div
          style={{
            position: 'relative',
            width: '84px',
            height: '84px',
            margin: '0 auto 0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Rotating 8-Point Islamic Star Ring */}
          <div
            className="animate-spin-slow"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '9999px',
              border: '1.5px dashed rgba(212, 175, 55, 0.65)',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)',
              pointerEvents: 'none'
            }}
          />

          {/* Reverse Orbit Ring */}
          <div
            className="animate-spin-reverse"
            style={{
              position: 'absolute',
              inset: '5px',
              borderRadius: '9999px',
              border: '1px dotted rgba(244, 227, 159, 0.5)',
              pointerEvents: 'none'
            }}
          />

          {/* Center Claymorphic Medallion */}
          <div
            className="clay-tile"
            style={{
              width: '62px',
              height: '62px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 35% 30%, #155e46 0%, #063123 60%, #02170f 100%)',
              border: '2px solid rgba(212, 175, 55, 0.85)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '1.05rem',
                fontWeight: 900,
                color: 'var(--gold-200)',
                letterSpacing: '0.08em',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)'
              }}
            >
              {couple.monogram}
            </span>
          </div>
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
              fontSize: 'clamp(0.62rem, 1.8vw, 0.72rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold-400)',
              fontWeight: 700
            }}
          >
            {sacredTexts.bismillahTranslation}
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 'clamp(2rem, 6vw, 2.75rem)',
            color: 'var(--gold-300)',
            margin: '0.35rem 0 0.2rem',
            lineHeight: 1.25,
            textShadow: '0 0 25px rgba(212, 175, 55, 0.65)'
          }}
          dir="rtl"
        >
          {sacredTexts.bismillah}
        </h1>

        {/* Illuminated Quran Verse Frame */}
        <div
          className="glass-crystal"
          style={{
            maxWidth: '520px',
            margin: '0.65rem auto 0',
            padding: '0.75rem 1rem',
            borderRadius: '1rem'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-playfair)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.76rem, 2.2vw, 0.88rem)',
              color: 'rgba(251, 243, 213, 0.95)',
              lineHeight: 1.5,
              margin: 0
            }}
          >
            {sacredTexts.quranVerseTranslation}
            <span
              style={{
                display: 'block',
                marginTop: '0.35rem',
                fontStyle: 'normal',
                color: 'var(--gold-400)',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em'
              }}
            >
              — {sacredTexts.quranReference}
            </span>
          </p>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold-300)',
            marginTop: '0.85rem',
            fontWeight: 700
          }}
        >
          Together with their families, cordially invite you to the Nikah of
        </p>
      </div>

      {/* 2. GROOM & BRIDE CLAYMORPHIC BENTO PRESENTATION */}
      <div
        className="clay-card-elevated"
        style={{
          padding: '1.25rem 1rem',
          marginBottom: '1.25rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Groom Section */}
        <div style={{ padding: '0.35rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span
              className="clay-pill"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold-300)',
                fontWeight: 800,
                padding: '0.2rem 0.65rem'
              }}
            >
              {couple.groom.title}
            </span>
            <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', color: 'var(--gold-300)' }}>
              {couple.groom.arabicTitle}
            </span>
          </div>

          <h2
            className="gold-text-gradient gold-text-glow"
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(1.65rem, 5.5vw, 2.35rem)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              margin: '0.25rem 0 0.15rem'
            }}
          >
            {couple.groom.name}
          </h2>

          <p style={{ fontSize: '0.86rem', color: 'rgba(251, 243, 213, 0.95)', fontWeight: 500 }}>
            {couple.groom.parentage}
            <span
              style={{
                color: 'var(--gold-400)',
                marginLeft: '0.45rem',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              • 📍 {couple.groom.location}
            </span>
          </p>
        </div>

        {/* Heraldic 3D Weds Medallion Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            margin: '0.65rem 0'
          }}
        >
          <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.65), transparent)' }} />
          <div
            className="clay-tile"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 35% 30%, #155e46 0%, #063123 60%, #02170f 100%)',
              border: '2px solid rgba(212, 175, 55, 0.85)',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.4)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.65rem',
                color: 'var(--gold-300)',
                lineHeight: 1
              }}
            >
              Weds
            </span>
          </div>
          <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.65), transparent)' }} />
        </div>

        {/* Bride Section */}
        <div style={{ padding: '0.35rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span
              className="clay-pill"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold-300)',
                fontWeight: 800,
                padding: '0.2rem 0.65rem'
              }}
            >
              {couple.bride.title}
            </span>
            <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', color: 'var(--gold-300)' }}>
              {couple.bride.arabicTitle}
            </span>
          </div>

          <h2
            className="gold-text-gradient gold-text-glow"
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(1.65rem, 5.5vw, 2.35rem)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              margin: '0.25rem 0 0.15rem'
            }}
          >
            {couple.bride.name}
          </h2>

          <p style={{ fontSize: '0.86rem', color: 'rgba(251, 243, 213, 0.95)', fontWeight: 500 }}>
            {couple.bride.parentage}
            <span
              style={{
                color: 'var(--gold-400)',
                marginLeft: '0.45rem',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              • 📍 {couple.bride.location}
            </span>
          </p>
        </div>
      </div>

      {/* 3. TACTILE CLAYMORPHIC DUAL OCCASION CAPSULES (NIKAH & WALIMA) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '0.95rem',
          marginBottom: '1.35rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Nikah Ceremony Capsule */}
        <div
          className="clay-tile tactile-card"
          style={{
            padding: '1.1rem 1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem',
            textAlign: 'left',
            border: '1.5px solid rgba(212, 175, 55, 0.55)'
          }}
        >
          <div
            className="clay-pill"
            style={{
              width: '46px',
              height: '46px',
              flexShrink: 0,
              backgroundColor: 'rgba(212, 175, 55, 0.22)',
              border: '1.5px solid rgba(212, 175, 55, 0.65)',
              marginTop: '2px'
            }}
          >
            <Calendar size={22} color="#d4af37" />
          </div>
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold-400)',
                display: 'block',
                fontWeight: 700
              }}
            >
              💍 Event 1: Sacred Nikah
            </span>
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(0.98rem, 2.8vw, 1.15rem)',
                fontWeight: 800,
                color: 'var(--ivory-100)',
                display: 'block',
                marginTop: '0.15rem'
              }}
            >
              {venue.date || date.gregorian}
            </span>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--gold-300)', display: 'block' }}>
              ⏰ {venue.time || date.time} • ({venue.hijri || date.hijri})
            </span>
            <span style={{ fontSize: '0.82rem', color: 'rgba(251, 243, 213, 0.9)', display: 'block', marginTop: '0.35rem' }}>
              📍 <strong>{venue.name}</strong>, Barsi Takli (Akola)
            </span>
          </div>
        </div>

        {/* Walima Reception Capsule */}
        <div
          className="clay-tile tactile-card"
          style={{
            padding: '1.1rem 1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem',
            textAlign: 'left',
            border: '1.5px solid rgba(244, 227, 159, 0.6)',
            backgroundColor: 'rgba(7, 45, 33, 0.95)'
          }}
        >
          <div
            className="clay-pill"
            style={{
              width: '46px',
              height: '46px',
              flexShrink: 0,
              backgroundColor: 'rgba(244, 227, 159, 0.25)',
              border: '1.5px solid rgba(244, 227, 159, 0.75)',
              marginTop: '2px'
            }}
          >
            <MapPin size={22} color="#f4e39f" />
          </div>
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold-300)',
                display: 'block',
                fontWeight: 700
              }}
            >
              👑 Event 2: Grand Reception (Walima)
            </span>
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(0.98rem, 2.8vw, 1.15rem)',
                fontWeight: 800,
                color: 'var(--ivory-100)',
                display: 'block',
                marginTop: '0.15rem'
              }}
            >
              {weddingData.walima?.date || "Monday, 14th December 2026"}
            </span>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--gold-300)', display: 'block' }}>
              ⏰ {weddingData.walima?.time || "7:30 PM onwards"} • ({weddingData.walima?.hijri || "5 Jumada al-Thani"})
            </span>
            <span style={{ fontSize: '0.82rem', color: 'rgba(251, 243, 213, 0.9)', display: 'block', marginTop: '0.35rem' }}>
              📍 <strong>{weddingData.walima?.name || "Zam Zam Function Lawn"}</strong>, Amravati
            </span>
          </div>
        </div>
      </div>

      {/* 4. TACTILE CLAYMORPHIC COUNTDOWN TICKER */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.65rem',
          maxWidth: '380px',
          margin: '0 auto 1.35rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        {[
          { label: 'Days', val: timeLeft.days },
          { label: 'Hours', val: timeLeft.hours },
          { label: 'Mins', val: timeLeft.minutes },
          { label: 'Secs', val: timeLeft.seconds }
        ].map((t, idx) => (
          <div
            key={idx}
            className="clay-tile"
            style={{
              padding: '0.65rem 0.35rem',
              textAlign: 'center',
              backgroundColor: idx === 3 ? 'rgba(16, 75, 57, 0.95)' : undefined
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
                fontWeight: 800,
                color: idx === 3 ? 'var(--gold-300)' : 'var(--gold-100)',
                lineHeight: 1,
                display: 'block',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)'
              }}
            >
              {t.val}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.58rem',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'rgba(251, 243, 213, 0.85)',
                marginTop: '0.25rem',
                display: 'block',
                fontWeight: 700
              }}
            >
              {t.label}
            </span>
          </div>
        ))}
      </div>

      {/* 5. 2026 TACTILE ACTION HUB BUTTONS (Compact 2x2 on Mobile, Sleek & Balanced) */}
      <div
        className="action-buttons-group"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
          gap: '0.6rem',
          maxWidth: '520px',
          margin: '0 auto 1.1rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Nikah Map Button */}
        <button
          type="button"
          onClick={handleMaps}
          className="clay-btn-gold animate-shimmer tactile-btn"
          style={{
            padding: '0.65rem 0.75rem',
            minHeight: '48px',
            borderRadius: '0.85rem',
            fontSize: '0.78rem',
            fontWeight: 800,
            gap: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Navigation size={15} color="#01110b" fill="#01110b" />
          <span>Nikah Map (Barsi Takli)</span>
        </button>

        {/* Walima Map Button */}
        <button
          type="button"
          onClick={() => {
            soundService.playClickSound();
            window.open(weddingData.walima?.googleMapsUrl || "https://maps.google.com/?q=Zam+Zam+Function+Lawn+Amravati", '_blank');
          }}
          className="clay-btn-gold animate-shimmer tactile-btn"
          style={{
            padding: '0.65rem 0.75rem',
            minHeight: '48px',
            borderRadius: '0.85rem',
            fontSize: '0.78rem',
            fontWeight: 800,
            gap: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Navigation size={15} color="#01110b" fill="#01110b" />
          <span>Walima Map (Amravati)</span>
        </button>

        {/* Add to Calendar Button */}
        <button
          type="button"
          onClick={handleGoogleCalendar}
          className="clay-btn-emerald tactile-btn"
          style={{
            padding: '0.65rem 0.75rem',
            minHeight: '48px',
            borderRadius: '0.85rem',
            fontSize: '0.78rem',
            fontWeight: 700,
            gap: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CalendarPlus size={15} color="#d4af37" />
          <span>Add to Calendar</span>
        </button>

        {/* View 3D Heart Button */}
        <button
          type="button"
          onClick={() => {
            soundService.playClickSound();
            onLaunch3D();
          }}
          className="clay-btn-emerald tactile-btn"
          style={{
            padding: '0.65rem 0.75rem',
            minHeight: '48px',
            borderRadius: '0.85rem',
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            gap: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid rgba(212, 175, 55, 0.65)'
          }}
        >
          <Orbit size={15} color="#d4af37" />
          <span>View 3D Heart</span>
          <Sparkles size={11} color="#d4af37" />
        </button>
      </div>

      {/* Clear Guidance Banner for Elders */}
      <div
        className="clay-pill"
        style={{
          marginTop: '0.85rem',
          padding: '0.45rem 1rem',
          backgroundColor: 'rgba(5, 30, 21, 0.85)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          color: 'var(--gold-300)',
          fontSize: '0.78rem',
          fontWeight: 600,
          position: 'relative',
          zIndex: 2
        }}
      >
        <span>⬇️ Scroll down for Complete Timings, Full Venue Map &amp; Hosts ⬇️</span>
      </div>
    </article>
  );
};
