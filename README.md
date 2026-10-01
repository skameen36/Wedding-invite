# 👑 Royal Islamic Luxury Wedding Invitation

An ultra-luxury, interactive 3D Royal Islamic Wedding Invitation web application for **Shaikh Mohammed** & **Syeda Maliha**.

Built with modern **React**, **Vite**, **Three.js (WebGL)**, and modern **CSS design tokens** featuring full mobile-first responsiveness, acoustic Web Audio API synthesized royal ambient melody, interactive wax seal unboxing, live countdown, calendar integration, guestbook with Duas, and WhatsApp sharing.

---

## 🌟 Key Features

1. **Separation of Concerns & Architecture**:
   - `src/data/weddingData.js`: Centralized data store. Easily customize bride & groom details, parents' lineage, dates, times, venue, Quranic verses, itinerary, and guestbook defaults without touching any UI code.
   - `src/services/soundService.js`: Pure Web Audio API acoustic chime engine. Synthesizes oriental acoustic raag/santoor notes and physical wax-seal cracking sound with zero external MP3 dependencies.
   - `src/services/calendarService.js`: Generates Google Calendar links and Apple/Outlook `.ics` calendar invitation files.
   - `src/services/storageService.js`: LocalStorage manager for guestbook prayers & Duas with persistence.
   - `src/components/3d/Royal3DCanvas.jsx`: High-performance Three.js WebGL scene with extruded royal emerald/gold heart, dual crisp 2048x2048 medallion textures, dual golden orbital rings with glowing celestial gems, floating stardust vortex, and 360° touch/mouse drag inertia.
   - `src/components/envelope/EnvelopeModal.jsx`: Bespoke 3D unboxing experience featuring an authentic metallic wax seal (`M & M`), realistic crack sound, gold confetti burst, 180° flap swing, and sliding gold invitation card.
   - `src/components/sections/`: Modular, clean presentation sections (Hero Banner, Couple Cards, Live Countdown, Itinerary, Venue with Google Maps, Guestbook, WhatsApp sharing).
   - `src/styles/`: Modular design system (`variables.css`, `animations.css`, `responsive.css`) with emerald `#01110b`, 24K gold gradients, and Islamic geometric jali lattice patterns.

2. **Mobile-First Responsiveness**:
   - Pixel-perfect layout across iPhone SE (320px), standard phones (375px–414px), tablets, and high-DPI desktop screens.
   - Fluid typography with `clamp()` and touch targets sized to 44px+.
   - Dynamic 3D camera distance scaling so the 3D heart never clips or overflows on narrow mobile screens.

3. **Production-Ready & Deployable**:
   - Optimized Vite build with vendor chunk splitting (`vendor-react`, `vendor-three`, `vendor-icons`).
   - Ready for one-click deployment on **Vercel**, **Netlify**, **Cloudflare Pages**, or static web hosts.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be generated in the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 📂 Project Directory Structure

```
Wedding-Card/
├── index.html                  # HTML5 template with Google Fonts & OpenGraph meta tags
├── package.json                # Project dependencies & npm scripts
├── vite.config.js              # Vite config with React plugin & vendor chunk splitting
├── README.md                   # Documentation & deployment guide
├── public/
│   └── favicon.svg             # Gold Royal Seal SVG monogram
└── src/
    ├── main.jsx                # Application root entry point
    ├── App.jsx                 # Master application controller & state orchestrator
    ├── index.css               # Global stylesheet & Islamic jali pattern utility
    ├── data/
    │   └── weddingData.js      # All wedding text, couple info, venue & timeline
    ├── services/
    │   ├── soundService.js     # Web Audio API acoustic chime & seal break synthesizer
    │   ├── calendarService.js  # Google Calendar URL & .ICS file generation
    │   └── storageService.js   # LocalStorage persistence for guestbook Duas
    ├── components/
    │   ├── 3d/
    │   │   └── Royal3DCanvas.jsx # Three.js WebGL heart, rings, medallions & stardust
    │   ├── common/
    │   │   ├── IslamicCornerPattern.jsx # Vector Arabesque corner filigree
    │   │   └── Toast.jsx         # Floating glassmorphic notification pill
    │   ├── envelope/
    │   │   ├── EnvelopeModal.jsx # 3D envelope gate with unfolding flap & card
    │   │   └── WaxSeal.jsx       # 3D metallic gold wax seal with pulse glow
    │   └── sections/
    │       ├── TopBar.jsx        # Floating header with audio toggle & 3D switch
    │       ├── HeroBanner.jsx    # Bismillah & Surah Ar-Rum Quranic verse
    │       ├── CoupleCards.jsx   # Groom, Bride, and Weds royal separator
    │       ├── CountdownTimer.jsx# Live countdown timer & calendar actions
    │       ├── EventSchedule.jsx # Auspicious programme itinerary timeline
    │       ├── VenueCard.jsx     # Function hall details & Google Maps navigation
    │       ├── Guestbook.jsx     # Interactive prayers & Duas with confetti
    │       ├── ShareFooter.jsx   # WhatsApp & link sharing with closing blessing
    │       ├── Interactive3DPrompt.jsx # Call-to-action button with animated tapping hand
    │       └── Explore3DOverlay.jsx    # Fullscreen 3D viewer overlay & return button
    └── styles/
        ├── variables.css         # Royal emerald & 24K gold color tokens
        ├── animations.css        # Wax breathing, shimmer sweep, tap bounce, 3D envelope
        └── responsive.css        # Fluid sizing & mobile notch support
```

---

## 🎨 How to Customize Couple Details

All wedding content is cleanly separated in [weddingData.js](file:///e:/ReactProjects/Wedding-Card/src/data/weddingData.js). To customize for any other couple, simply edit that file:
- Groom & Bride names, lineage, and locations
- Date, time, Hijri equivalent
- Venue name, address, Google Maps URL, and contact numbers
- Programme itinerary items
- Quranic verses or translations

---

## 🌐 Deploy to Production

### Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset: **Vite**
5. Click **"Deploy"**.

### Deploying to Netlify
1. Go to [Netlify](https://www.netlify.com).
2. Choose **"Import from Git"**.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy site"**.
