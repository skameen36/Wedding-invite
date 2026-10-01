import React from 'react';

export const WaxSeal = ({ onClick, isBreaking, monogram = "M & M" }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* 3D Wax Seal Button */}
      <button
        type="button"
        aria-label="Break Wax Seal to Open Invitation"
        onClick={onClick}
        disabled={isBreaking}
        className={`wax-seal ${!isBreaking ? 'seal-pulse-glow' : ''}`}
        style={{
          position: 'relative',
          width: '78px',
          height: '78px',
          borderRadius: '9999px',
          cursor: isBreaking ? 'default' : 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          outline: 'none',
          transform: isBreaking
            ? 'scale(1.28) rotate(15deg)'
            : undefined,
          opacity: isBreaking ? 0 : 1,
          transition: isBreaking
            ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease 0.15s, box-shadow 0.3s ease'
            : 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        {/* Ornate Outer Dashed Wax Impression Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '6px',
            borderRadius: '9999px',
            border: '2px dashed rgba(255, 235, 140, 0.65)',
            pointerEvents: 'none'
          }}
        />

        {/* Monogram Initials */}
        <span
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '1.05rem',
            fontWeight: 900,
            letterSpacing: '0.12em',
            color: '#2d1f05',
            textShadow: '0 1px 1px rgba(255, 255, 255, 0.7)',
            lineHeight: 1
          }}
        >
          {monogram}
        </span>

        {/* Open Label */}
        <span
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: '#4d370b',
            fontWeight: 800,
            marginTop: '3px'
          }}
        >
          OPEN
        </span>

        {/* Ribbon Tails hanging behind seal */}
        <div
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: '14px',
            width: '12px',
            height: '20px',
            backgroundColor: '#8c6719',
            transform: 'rotate(-14deg)',
            borderBottomLeftRadius: '3px',
            borderBottomRightRadius: '3px',
            zIndex: -1,
            boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
            border: '1px solid rgba(244, 227, 159, 0.4)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-12px',
            right: '14px',
            width: '12px',
            height: '20px',
            backgroundColor: '#725211',
            transform: 'rotate(14deg)',
            borderBottomLeftRadius: '3px',
            borderBottomRightRadius: '3px',
            zIndex: -1,
            boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
            border: '1px solid rgba(244, 227, 159, 0.4)'
          }}
        />
      </button>

      {/* Tapping Hint Pill */}
      {!isBreaking && (
        <div
          style={{
            marginTop: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(2, 18, 12, 0.92)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '9999px',
              backgroundColor: 'var(--gold-400)'
            }}
            className="tap-ring-pulse"
          />
          <span
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.65rem',
              color: 'var(--gold-300)',
              letterSpacing: '0.08em',
              fontWeight: 600,
              textTransform: 'uppercase'
            }}
          >
            Tap Seal to Open Card
          </span>
        </div>
      )}
    </div>
  );
};
