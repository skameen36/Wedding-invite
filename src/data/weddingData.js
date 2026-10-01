/**
 * Royal Islamic Luxury Wedding Invitation Data
 * Centralized content source - Easy to customize for any wedding couple
 */

export const weddingData = {
  couple: {
    monogram: "M & M",
    hashtag: "#MohammedWedsMaliha",
    groom: {
      name: "Shaikh Mohammed",
      title: "The Groom",
      arabicTitle: "العريس المبارك",
      parentage: "Son of Shaikh Abdullah",
      location: "Camp Area, Amravati",
      bio: "Holding deep gratitude to Allah for this blessed step into sacred companionship."
    },
    bride: {
      name: "Syeda Maliha",
      title: "The Bride",
      arabicTitle: "العروس المصونة",
      parentage: "Daughter of Syed Sharafat Ali",
      location: "Barsi Takli, Dist. Akola",
      bio: "Embarking on a journey of love, faith, and barakah with prayers for eternal peace."
    }
  },

  date: {
    gregorian: "Sunday, 13th December 2026",
    shortFormatted: "13 · XII · 2026",
    hijri: "4 Jumada al-Thani 1448 AH",
    time: "2:00 PM onwards",
    isoDateTime: "2026-12-13T14:00:00+05:30",
    calendar: {
      startUtc: "20261213T083000Z", // 2:00 PM IST in UTC
      endUtc: "20261213T163000Z"
    }
  },

  sacredTexts: {
    bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    bismillahTranslation: "In The Name of Allah, The Most Gracious, The Most Merciful",
    quranVerseArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    quranVerseTranslation:
      '"And among His signs is that He created for you mates from among yourselves, that you may dwell in peace with them, and He put love and mercy between your hearts."',
    quranReference: "Surah Ar-Rum (30:21)",
    welcomeNote:
      "Together with their families, cordially request the pleasure of your presence and earnest prayers at the auspicious occasion of the Nikah ceremony."
  },

  itinerary: [
    // Day 1 - Nikah at Barsi Takli
    {
      day: "Day 1 · Sunday, 13th Dec 2026",
      location: "Barsi Takli (Akola)",
      time: "1:30 PM",
      title: "Istaqbaal & Welcome Drinks",
      desc: "Warm reception of Barat and esteemed guests with royal saffron rose sharbat.",
      icon: "coffee"
    },
    {
      day: "Day 1 · Sunday, 13th Dec 2026",
      location: "Barsi Takli (Akola)",
      time: "2:15 PM",
      title: "Sacred Nikah Ceremony",
      desc: "Solemnization of the sacred marital covenant (Ijab-o-Qubool) and Khutbah-e-Nikah at Dada Hayat Qalandar Hall.",
      icon: "sparkles",
      highlight: true
    },
    {
      day: "Day 1 · Sunday, 13th Dec 2026",
      location: "Barsi Takli (Akola)",
      time: "3:00 PM",
      title: "Royal Nikah Dastarkhwan",
      desc: "Grand traditional feast featuring authentic Mughlai specialties, Biryani and royal sweets.",
      icon: "utensils"
    },
    // Day 2 - Grand Walima Reception at Amravati
    {
      day: "Day 2 · Monday, 14th Dec 2026",
      location: "Amravati",
      time: "7:30 PM",
      title: "Grand Reception Arrival (Walima)",
      desc: "Warm welcome of family, relatives and guests at Zam Zam Function Lawn, Amravati.",
      icon: "coffee"
    },
    {
      day: "Day 2 · Monday, 14th Dec 2026",
      location: "Amravati",
      time: "8:15 PM",
      title: "Duas & Stage Celebrations",
      desc: "Felicitating the newly-wed couple with blessings, stage greetings & photographs.",
      icon: "camera"
    },
    {
      day: "Day 2 · Monday, 14th Dec 2026",
      location: "Amravati",
      time: "8:45 PM",
      title: "Royal Walima Dastarkhwan (Dinner)",
      desc: "Lavish banquet hosted by Groom's family with grand Mughlai dinner and festive desserts.",
      icon: "utensils",
      highlight: true
    }
  ],

  // Venue 1: Nikah Ceremony
  venue: {
    name: "Dada Hayat Qalandar Function Hall",
    subtitle: "Nikah Ceremony Venue · Barsi Takli",
    eventLabel: "Nikah Ceremony",
    date: "Sunday, 13th December 2026",
    time: "2:00 PM onwards",
    hijri: "4 Jumada al-Thani 1448 AH",
    address: "Near New Bus Stand, Barsi Takli, Dist. Akola, Maharashtra - 444401",
    googleMapsUrl: "https://maps.google.com/?q=Dada+Hayat+Qalandar+Function+Hall+Barsi+Takli",
    mapEmbedQuery: "Dada+Hayat+Qalandar+Function+Hall+Barsi+Takli",
    landmark: "500m from New Bus Stand Barsi Takli, ample parking available"
  },

  // Venue 2: Grand Reception (Walima)
  walima: {
    name: "Zam Zam Function Lawn",
    subtitle: "Grand Reception (Walima) Venue · Amravati",
    eventLabel: "Dawat-e-Walima (Reception)",
    arabicTitle: "طعامِ ولیمہ و استقبالیہ",
    hindiTitle: "दावत-ए-वलीमा (रिसेप्शन)",
    date: "Monday, 14th December 2026",
    time: "7:30 PM onwards",
    hijri: "5 Jumada al-Thani 1448 AH",
    address: "Near Camp Area, Walgaon Road, Amravati, Maharashtra - 444602",
    googleMapsUrl: "https://maps.google.com/?q=Zam+Zam+Function+Lawn+Amravati",
    mapEmbedQuery: "Zam+Zam+Function+Lawn+Amravati",
    landmark: "Easily accessible from Amravati & Badnera stations, grand lawn with spacious parking"
  },

  hosts: {
    title: "Cordially Invited By",
    subTitle: "نیک تمناؤں اور پرخلوص دعاؤں کے ساتھ",
    groomSide: {
      title: "Groom's Family",
      head: "Shaikh Abdullah & Family",
      location: "Camp Area, Amravati"
    },
    brideSide: {
      title: "Bride's Family",
      head: "Syed Sharafat Ali & Family",
      location: "Barsi Takli, Dist. Akola"
    },
    welcomers: "Uncles, Aunts, Brothers, Sisters & All Esteemed Relatives"
  },

  guestbookDefaults: [
    {
      id: "wish-1",
      name: "Shaikh Farhan & Family",
      city: "Amravati",
      text: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fee khair! Heartiest congratulations to both families. 🤲💐",
      time: "Just now"
    },
    {
      id: "wish-2",
      name: "Syed Imran Quadri",
      city: "Akola",
      text: "Mabrouk! May Allah grant both of you eternal peace, boundless affection, and abundant barakah. 🤍✨",
      time: "1 hour ago"
    },
    {
      id: "wish-3",
      name: "Dr. Aamir Patel",
      city: "Nagpur",
      text: "Warmest congratulations Mohammed bhai & Syeda sister! Looking forward to attending the royal feast. 🌸",
      time: "Yesterday"
    }
  ],

  quickBlessings: [
    { label: "🤲 BarakAllah", text: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fee khair 🤲" },
    { label: "💐 Mubarak", text: "Heartiest congratulations & lots of prayers for a blessed married life! 💐" },
    { label: "🌸 Best Wishes", text: "May Allah bless this beautiful union with eternal love, joy, and peace. 🌸" },
    { label: "✨ Barakah & Peace", text: "May Allah fill your new home with laughter, sakinah, and countless blessings. ✨" }
  ]
};
