import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { WaxSeal } from './WaxSeal';
import { soundService } from '../../services/soundService';
import { Sparkles, ArrowDown } from 'lucide-react';

export const EnvelopeModal = ({ weddingData, onUnlock }) => {
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);

  const handleUnlock = () => {
    if (isBreaking) return;
    setIsBreaking(true);

    // 1. Play realistic wax break sound effect
    soundService.playSealBreakSound();

    // 2. Confetti sparkle burst radiating from wax seal
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.52 },
      colors: ['#d4af37', '#f4e39f', '#ffffff', '#146950', '#e6c86a']
    });

    // 3. Open triangular flap and elevate inner card
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 280);

    // 4. Start background ambient melody
    setTimeout(() => {
      soundService.startMelody();
    }, 850);

    // 5. Complete unsealing transition and hand over to full invite view
    setTimeout(() => {
      onUnlock();
    }, 1550);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#010c07',
        padding: '1rem',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* 2026 Celestial Mesh Aurora Background */}
      <div
        className="animate-aurora"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(16, 75, 57, 0.45) 0%, rgba(212, 175, 55, 0.15) 45%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Envelope Stage Container */}
      <div
        className="envelope-perspective envelope-stage"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Sacred Header Calligraphy */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '1.25rem',
            transition: 'opacity 0.5s ease',
            opacity: isBreaking ? 0 : 1
          }}
        >
          <div
            className="clay-pill"
            style={{
              padding: '0.35rem 1rem',
              marginBottom: '0.5rem',
              backgroundColor: 'rgba(5, 32, 23, 0.92)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--gold-400)',
                fontWeight: 700
              }}
            >
              Royal Wedding Invitation
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: 'clamp(1.75rem, 5.5vw, 2.3rem)',
              color: 'var(--gold-300)',
              margin: '0.25rem 0',
              lineHeight: 1.25,
              textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
            }}
            dir="rtl"
          >
            {weddingData.sacredTexts.bismillah}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-playfair)',
              fontStyle: 'italic',
              fontSize: '0.84rem',
              color: 'rgba(251, 243, 213, 0.85)'
            }}
          >
            Break the royal seal to reveal the auspicious card
          </p>
        </div>

        {/* 3D Tactile Claymorphic Envelope Box */}
        <div
          className={`envelope-box ${isFlapOpen ? 'envelope-open' : ''}`}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 3',
            maxHeight: '290px',
            borderRadius: '1.75rem',
            background: 'radial-gradient(135% 120% at 20% 15%, #0a3d2e 0%, #042118 65%, #02120c 100%)',
            border: '2px solid rgba(212, 175, 55, 0.55)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.3), inset 0 3px 6px rgba(255, 255, 255, 0.35), inset 0 -4px 10px rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Ornate Gold Filigree Envelope Trim */}
          <div
            className="jali-bg"
            style={{
              position: 'absolute',
              inset: '12px',
              borderRadius: '1.25rem',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              opacity: 0.45,
              pointerEvents: 'none'
            }}
          />

          {/* 3D SLIDING INNER ROYAL CARD (Claymorphic) */}
          <div
            className="envelope-card-slide envelope-card-inner"
            style={{
              position: 'absolute',
              inset: '14px 16px',
              borderRadius: '1.15rem',
              background: 'radial-gradient(130% 120% at 25% 20%, #0d4a37 0%, #052a1e 55%, #02140d 100%)',
              border: '2px solid rgba(212, 175, 55, 0.85)',
              boxShadow: 'inset 0 3px 5px rgba(255, 255, 255, 0.4), inset 0 -3px 8px rgba(0, 0, 0, 0.7)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
              overflow: 'hidden',
              pointerEvents: 'none'
            }}
          >
            {/* Card Corner Borders */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '20px', height: '20px', borderTop: '2px solid rgba(212, 175, 55, 0.9)', borderLeft: '2px solid rgba(212, 175, 55, 0.9)' }} />
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', borderTop: '2px solid rgba(212, 175, 55, 0.9)', borderRight: '2px solid rgba(212, 175, 55, 0.9)' }} />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '20px', height: '20px', borderBottom: '2px solid rgba(212, 175, 55, 0.9)', borderLeft: '2px solid rgba(212, 175, 55, 0.9)' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '20px', height: '20px', borderBottom: '2px solid rgba(212, 175, 55, 0.9)', borderRight: '2px solid rgba(212, 175, 55, 0.9)' }} />

            {/* Inner Header */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-400)',
                  fontWeight: 700
                }}
              >
                The Nikah Celebration
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.75rem, 5.5vw, 2.35rem)',
                  color: 'var(--gold-200)',
                  marginTop: '0.2rem',
                  lineHeight: 1.1,
                  textShadow: '0 0 14px rgba(212, 175, 55, 0.4)'
                }}
              >
                {weddingData.couple.groom.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  color: 'var(--gold-400)',
                  margin: '0.1rem 0'
                }}
              >
                &amp;
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.75rem, 5.5vw, 2.35rem)',
                  color: 'var(--gold-200)',
                  lineHeight: 1.1,
                  textShadow: '0 0 14px rgba(212, 175, 55, 0.4)'
                }}
              >
                {weddingData.couple.bride.name}
              </div>
            </div>

            {/* Inner Badge */}
            <div>
              <div
                className="clay-pill"
                style={{
                  padding: '0.35rem 1rem',
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--gold-200)',
                  letterSpacing: '0.14em'
                }}
              >
                {weddingData.date.shortFormatted}
              </div>
            </div>
          </div>

          {/* LOWER POCKET OF ENVELOPE (Tactile Clay Silk finish) */}
          <div
            style={{
              position: 'absolute',
              inset: 'auto 0 0 0',
              height: '65%',
              borderBottomLeftRadius: '1.75rem',
              borderBottomRightRadius: '1.75rem',
              background: 'radial-gradient(130% 120% at 50% 10%, #0a3f30 0%, #05261c 50%, #02120c 100%)',
              borderTop: '1.5px solid rgba(212, 175, 55, 0.55)',
              boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.25)',
              zIndex: 20,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '0.85rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.62rem',
                textTransform: 'uppercase',
                letterSpacing: '0.32em',
                color: 'rgba(212, 175, 55, 0.75)',
                zIndex: 22,
                fontWeight: 600
              }}
            >
              Imperial Royal Edition
            </span>
          </div>

          {/* 3D TOP FOLDING TRIANGULAR FLAP */}
          <div
            className="envelope-flap-top"
            style={{
              position: 'absolute',
              top: 0,
              insetInline: 0,
              height: '52%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <svg
              style={{
                width: '100%',
                height: '100%',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.75))'
              }}
              viewBox="0 0 400 150"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 400,0 200,150" fill="#073224" stroke="#d4af37" strokeWidth="2.5" />
              <polygon points="12,2 388,2 200,140" fill="none" stroke="#f4e39f" strokeWidth="0.8" opacity="0.45" />
            </svg>
          </div>

          {/* 3D LUXURY WAX SEAL */}
          <WaxSeal
            onClick={handleUnlock}
            isBreaking={isBreaking}
            monogram={weddingData.couple.monogram}
          />
        </div>

        {/* 2026 TACTILE CLAYMORPHIC CALL TO ACTION */}
        <div
          style={{
            marginTop: '1.5rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            opacity: isBreaking ? 0 : 1,
            transition: 'opacity 0.4s ease'
          }}
        >
          {/* Main Claymorphic Gold Button */}
          <button
            type="button"
            onClick={handleUnlock}
            className="clay-btn-gold animate-shimmer"
            style={{
              width: '100%',
              maxWidth: '350px',
              padding: '1.05rem 1.6rem',
              borderRadius: '9999px',
              fontSize: '0.94rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              gap: '0.6rem'
            }}
          >
            <span>✉️ OPEN ROYAL INVITATION ✉️</span>
          </button>

          <span
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: '1.05rem',
              color: 'var(--gold-300)',
              direction: 'rtl'
            }}
          >
            دعوت نامہ کھولنے کے لیے یہاں دبائیں / निमंत्रण खोलें
          </span>

          {/* Frosted Glass Bypass Button */}
          <button
            type="button"
            onClick={() => {
              soundService.startMelody();
              onUnlock();
            }}
            className="clay-pill"
            style={{
              padding: '0.5rem 1.15rem',
              backgroundColor: 'rgba(3, 22, 16, 0.85)',
              color: 'rgba(251, 243, 213, 0.85)',
              fontSize: '0.78rem',
              cursor: 'pointer',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              fontFamily: 'var(--font-sans)',
              marginTop: '0.2rem'
            }}
          >
            <span>View All Details Directly 📜 (सीधे पूरी जानकारी देखें)</span>
          </button>
        </div>

        {/* Footer Hint */}
        <div
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'rgba(212, 175, 55, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            fontFamily: 'var(--font-sans)',
            opacity: isBreaking ? 0 : 1,
            transition: 'opacity 0.4s ease'
          }}
        >
          <Sparkles size={14} color="#d4af37" />
          <span>Acoustic royal chime &amp; 3D experience unfolds upon opening</span>
        </div>
      </div>
    </div>
  );
};
