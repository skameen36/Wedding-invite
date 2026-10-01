/**
 * Storage Service for Guestbook Duas & Wishes
 */

const STORAGE_KEY = "royal_wedding_guestbook_duas_v2";

export const storageService = {
  getWishes(defaults = []) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaults;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaults;
    } catch (err) {
      console.warn("Storage retrieval warning:", err);
      return defaults;
    }
  },

  addWish(wish, currentWishes) {
    const newEntry = {
      id: `wish-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: wish.name.trim(),
      city: wish.city ? wish.city.trim() : "Well-wisher",
      text: wish.text.trim(),
      time: "Just now",
      createdAt: new Date().toISOString()
    };

    const updated = [newEntry, ...currentWishes];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Storage save warning:", err);
    }

    return updated;
  }
};
