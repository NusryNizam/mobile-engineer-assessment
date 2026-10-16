import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('formats an ISO-8601 UTC timestamp as a short readable date', () => {
    expect(formatDate('2024-10-15T12:34:56Z')).toBe('Oct 15, 2024');
  });

  it('does not shift the date based on the time-of-day component', () => {
    expect(formatDate('2024-08-30T11:47:22Z')).toBe('Aug 30, 2024');
  });
});
