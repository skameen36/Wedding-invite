import React from 'react';
import { MessageCircle, Copy, Heart, Sparkles } from 'lucide-react';
import { calendarService } from '../../services/calendarService';
import { soundService } from '../../services/soundService';

export const ShareFooter = ({ weddingData, onShowToast }) => {
  const handleWhatsAppShare = () => {
    soundService.playClickSound();
    const url = calendarService.getWhatsAppShareUrl(weddingData);
    window.open(url, '_blank');
  };

  const handleCopyLink = async () => {
    soundService.playClickSound();
    const success = await calendarService.copyToClipboard(window.location.href);
    if (success) {
      onShowToast('Invitation link copied to clipboard!', '📋');
    } else {
      onShowToast('Could not copy link directly', '⚠️');
    }
  };

  return (
    <footer
      style={{
        marginTop: '2.5rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.35)',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <div
        className="clay-pill"
        style={{
          padding: '0.3rem 1.15rem',
          marginBottom: '1.25rem',
          backgroundColor: 'rgba(5, 30, 21, 0.9)'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.74rem',
            color: 'var(--gold-300)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 700
          }}
        >
          Share the Auspicious Joy With Family &amp; Friends
        </span>
      </div>

      {/* Share Buttons - 2026 Tactile Claymorphic */}
      <div
        className="action-buttons-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.85rem',
          maxWidth: '480px',
          margin: '0 auto'
        }}
      >
        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="tactile-btn"
          style={{
            flex: 1,
            padding: '0.95rem 1.4rem',
            borderRadius: '1.15rem',
            background: 'radial-gradient(130% 120% at 25% 20%, #29e06e 0%, #1da851 60%, #128c42 100%)',
            boxShadow: '0 12px 28px -6px rgba(37, 211, 102, 0.5), inset 0 3px 5px rgba(255, 255, 255, 0.6), inset 0 -3px 6px rgba(0, 0, 0, 0.5)',
            color: '#ffffff',
            fontWeight: 750,
            fontSize: '0.88rem',
            border: '1.5px solid rgba(255, 255, 255, 0.4)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem'
          }}
        >
          <MessageCircle size={19} color="#ffffff" fill="#ffffff" />
          <span>Share on WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="clay-btn-emerald tactile-btn"
          style={{
            flex: 1,
            padding: '0.95rem 1.4rem',
            borderRadius: '1.15rem',
            fontSize: '0.88rem',
            fontWeight: 750,
            gap: '0.55rem'
          }}
        >
          <Copy size={17} color="#d4af37" />
          <span>Copy Invite Link</span>
        </button>
      </div>

      {/* Closing Calligraphy Blessing */}
      <div style={{ marginTop: '2.5rem', paddingBottom: '1.5rem' }}>
        <p
          className="gold-text-glow"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.4rem, 7vw, 3.4rem)',
            color: 'var(--gold-200)',
            lineHeight: 1.1,
            margin: '0 0 0.4rem'
          }}
        >
          Shukran Jazilan
        </p>

        <p
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: '1.15rem',
            color: 'var(--gold-300)',
            direction: 'rtl',
            margin: '0.35rem 0'
          }}
        >
          جَزَاكُمُ ٱللَّٰهُ خَيْرًا وَبَارَكَ فِيكُمْ
        </p>

        <p
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.74rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(212, 175, 55, 0.85)',
            marginTop: '0.5rem',
            fontWeight: 700
          }}
        >
          Shaikh &amp; Syed Families Look Forward to Welcoming You
        </p>
      </div>
    </footer>
  );
};
