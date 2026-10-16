/**
 * Formats an ISO-8601 UTC timestamp for display, e.g. "Oct 15, 2024".
 * Rendered in UTC (not the device's local time zone) so the displayed date
 * is deterministic and matches the date the backend recorded.
 */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
