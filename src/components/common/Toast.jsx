import React from 'react';

export const Toast = ({ toast }) => {
  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        pointerEvents: 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        className="glass-emerald-dark"
        style={{
          padding: '0.65rem 1.4rem',
          borderRadius: '9999px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.85rem',
          color: 'var(--gold-200)',
          border: '1px solid rgba(212, 175, 55, 0.5)'
        }}
      >
        <span style={{ fontSize: '1rem', color: 'var(--gold-400)' }}>{toast.icon || '✨'}</span>
        <span style={{ fontWeight: 500, fontFamily: 'var(--font-sans)', letterSpacing: '0.01em' }}>
          {toast.message}
        </span>
      </div>
    </div>
  );
};
