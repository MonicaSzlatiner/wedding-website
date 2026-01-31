/**
 * Calendar utilities for Add to Calendar functionality
 * Supports Google Calendar links and .ics file generation
 */

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format (24h)
  endDate: string;
  endTime: string;
  timezone: string;
}

/**
 * Format date and time for Google Calendar URL
 * Google Calendar uses YYYYMMDDTHHMMSS format
 */
function formatGoogleDate(date: string, time: string): string {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  return `${year}${month}${day}T${hour}${minute}00`;
}

/**
 * Generate Google Calendar URL
 * Opens Google Calendar with pre-filled event details
 */
export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const startDateTime = formatGoogleDate(event.startDate, event.startTime);
  const endDateTime = formatGoogleDate(event.endDate, event.endTime);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startDateTime}/${endDateTime}`,
    details: event.description,
    location: event.location,
    ctz: event.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Format date and time for ICS file
 * ICS uses YYYYMMDDTHHMMSS format with timezone
 */
function formatICSDate(date: string, time: string): string {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  return `${year}${month}${day}T${hour}${minute}00`;
}

/**
 * Generate ICS file content for Apple Calendar / Outlook
 * Returns a string that can be downloaded as a .ics file
 */
export function generateICSContent(event: CalendarEvent): string {
  const startDateTime = formatICSDate(event.startDate, event.startTime);
  const endDateTime = formatICSDate(event.endDate, event.endTime);
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  // Escape special characters in text fields
  const escapeText = (text: string) =>
    text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Website//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VTIMEZONE
TZID:${event.timezone}
END:VTIMEZONE
BEGIN:VEVENT
DTSTART;TZID=${event.timezone}:${startDateTime}
DTEND;TZID=${event.timezone}:${endDateTime}
DTSTAMP:${now}
UID:${now}-wedding@laurens-monica.com
SUMMARY:${escapeText(event.title)}
DESCRIPTION:${escapeText(event.description)}
LOCATION:${escapeText(event.location)}
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;
}

/**
 * Trigger download of ICS file
 * Creates a blob and triggers browser download
 */
export function downloadICSFile(event: CalendarEvent, filename = "wedding.ics"): void {
  const icsContent = generateICSContent(event);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
