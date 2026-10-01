import React, { useState, useEffect } from 'react';
import { weddingData } from './data/weddingData';
import { soundService } from './services/soundService';
import { calendarService } from './services/calendarService';
import { Royal3DCanvas } from './components/3d/Royal3DCanvas';
import { EnvelopeModal } from './components/envelope/EnvelopeModal';
import { Toast } from './components/common/Toast';
import { TopBar } from './components/sections/TopBar';
import { MainInvitationCard } from './components/sections/MainInvitationCard';
import { NavigationTabs } from './components/sections/NavigationTabs';
import { EventSchedule } from './components/sections/EventSchedule';
import { VenueCard } from './components/sections/VenueCard';
import { FamilyHostsCard } from './components/sections/FamilyHostsCard';
import { Guestbook } from './components/sections/Guestbook';
import { ShareFooter } from './components/sections/ShareFooter';
import { Explore3DOverlay } from './components/sections/Explore3DOverlay';

export function App() {
  // Check if previously unsealed in this browser session
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('royal_wedding_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [is3DModeOnly, setIs3DModeOnly] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [toast, setToast] = useState(null);

  // Subscribe to Sound Service audio playback state
  useEffect(() => {
    const unsubscribe = soundService.subscribe((playing) => {
      setIsAudioPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message, icon = '✨') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem('royal_wedding_unlocked', 'true');
    } catch {
      // ignore
    }
    showToast('Welcome to the Royal Celebration!', '✨');
  };

  const handleToggle3D = () => {
    soundService.playClickSound();
    const nextState = !is3DModeOnly;
    setIs3DModeOnly(nextState);
    if (nextState) {
      showToast('Drag screen to spin 3D royal heart 360°', '💖');
    }
  };

  const handleShareClick = () => {
    soundService.playClickSound();
    const url = calendarService.getWhatsAppShareUrl(weddingData);
    window.open(url, '_blank');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 2026 Ambient Ethereal Celestial Aurora Glow */}
      <div className="ambient-aurora-bg" />

      {/* 3D Three.js Interactive WebGL Background & Model */}
      <Royal3DCanvas
        isUnlocked={isUnlocked}
        is3DModeOnly={is3DModeOnly}
        coupleData={weddingData.couple}
      />

      {/* Floating Notification Toast */}
      <Toast toast={toast} />

      {/* Floating Top Action Bar (Visible once unsealed) */}
      {isUnlocked && (
        <TopBar
          is3DModeOnly={is3DModeOnly}
          onToggle3D={handleToggle3D}
          isAudioPlaying={isAudioPlaying}
          onShareClick={handleShareClick}
        />
      )}

      {/* 3D Exploration Overlay (Active in Fullscreen 3D Mode) */}
      <Explore3DOverlay
        is3DModeOnly={is3DModeOnly}
        onExit3D={() => setIs3DModeOnly(false)}
      />

      {/* Unsealed Wax Envelope Gate Overlay (Initial Step with Direct Bypass) */}
      {!isUnlocked && (
        <EnvelopeModal
          weddingData={weddingData}
          onUnlock={handleUnlock}
        />
      )}

      {/* MAIN INVITATION CONTAINER - ALL DATA PRESENTED AT ONCE (NO HIDDEN TABS) */}
      {isUnlocked && (
        <main
          className="invitation-container"
          style={{
            position: 'relative',
            zIndex: 20,
            margin: '0 auto',
            width: '100%',
            opacity: is3DModeOnly ? 0 : 1,
            pointerEvents: is3DModeOnly ? 'none' : 'auto',
            transition: 'opacity 0.4s ease',
            paddingTop: '3.8rem',
            paddingBottom: '2.5rem'
          }}
        >
          {/* 1. Main Royal Invitation Card (Bride, Groom, Parents, Date & Venue Highlights) */}
          <MainInvitationCard
            weddingData={weddingData}
            onLaunch3D={() => {
              setIs3DModeOnly(true);
              showToast('Drag screen to spin 3D heart in 360°', '💖');
            }}
            onShowToast={showToast}
          />

          {/* 2. Quick Jump Anchor Bar (Smooth-scroll shortcuts - DOES NOT HIDE ANY DATA) */}
          <NavigationTabs />

          {/* 3. Auspicious Programme Schedule & Timings (ALWAYS FULLY VISIBLE) */}
          <EventSchedule itinerary={weddingData.itinerary} />

          {/* 4. Complete Venue Details for Nikah & Walima Reception (ALWAYS FULLY VISIBLE) */}
          <VenueCard venue={weddingData.venue} walima={weddingData.walima} />

          {/* 5. Cordially Invited by Shaikh & Syed Families (ALWAYS FULLY VISIBLE) */}
          <FamilyHostsCard hosts={weddingData.hosts} />

          {/* 6. Guestbook & Quick Blessings / Duas (ALWAYS FULLY VISIBLE) */}
          <Guestbook
            initialWishes={weddingData.guestbookDefaults}
            quickBlessings={weddingData.quickBlessings}
            onShowToast={showToast}
          />

          {/* 7. WhatsApp Share & Family Appreciation Footer */}
          <ShareFooter
            weddingData={weddingData}
            onShowToast={showToast}
          />
        </main>
      )}
    </div>
  );
}

export default App;
