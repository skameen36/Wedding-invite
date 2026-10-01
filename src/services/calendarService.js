/**
 * Calendar & Social Integration Service
 */

export const calendarService = {
  getGoogleCalendarUrl(data) {
    const title = `Wedding: ${data.couple.groom.name} & ${data.couple.bride.name}`;
    const desc = `Nikah & Royal Walima celebration of ${data.couple.groom.name} and ${data.couple.bride.name}.\n\nVenue: ${data.venue.name}, ${data.venue.address}\n\nTime: ${data.date.time}`;
    const location = `${data.venue.name}, ${data.venue.address}`;
    const dates = `${data.date.calendar.startUtc}/${data.date.calendar.endUtc}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${dates}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(location)}`;
  },

  downloadIcsFile(data) {
    const title = `Nikah Ceremony: ${data.couple.groom.name} & ${data.couple.bride.name}`;
    const desc = `Royal Islamic Wedding Celebration of ${data.couple.groom.name} and ${data.couple.bride.name}. Venue: ${data.venue.name}, ${data.venue.address}`;
    const location = `${data.venue.name}, ${data.venue.address}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//RoyalIslamicWedding//Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${location}`,
      `DTSTART:${data.date.calendar.startUtc}`,
      `DTEND:${data.date.calendar.endUtc}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Wedding_${data.couple.groom.name}_${data.couple.bride.name}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  getWhatsAppShareUrl(data) {
    const pageUrl = window.location.href;
    const msg =
      `🌸 *Royal Wedding Invitation* 🌸\n\n` +
      `بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\n\n` +
      `Together with their families, cordially invite you to celebrate the wedding celebrations of:\n\n` +
      `👑 *${data.couple.groom.name}*\n` +
      `(${data.couple.groom.parentage}, ${data.couple.groom.location})\n` +
      `     & \n` +
      `👑 *${data.couple.bride.name}*\n` +
      `(${data.couple.bride.parentage}, ${data.couple.bride.location})\n\n` +
      `💍 *NIKAH CEREMONY:*\n` +
      `🗓 ${data.venue.date} (${data.venue.time})\n` +
      `📍 ${data.venue.name}, ${data.venue.address}\n\n` +
      `👑 *GRAND RECEPTION (WALIMA):*\n` +
      `🗓 ${data.walima.date} (${data.walima.time})\n` +
      `📍 ${data.walima.name}, ${data.walima.address}\n\n` +
      `Experience the interactive 3D Royal Invitation & send your Duas:\n` +
      `${pageUrl}`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  },

  async copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    }
  }
};
