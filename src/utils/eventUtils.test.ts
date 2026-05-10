import { describe, expect, it, vi } from 'vitest';
import type { Event } from '@types';
import { formatEventDate, getEventThumbnailUrl, getNextUpcomingEvent } from './eventUtils';

vi.mock('@constants', () => ({
  EVENT_FLYERS_THUMBNAILS_BUCKET: 'https://cdn.example.com/event-thumbnails/',
}));

const makeEvent = (id: string, startTime: string): Event => ({
  id,
  startTime,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  title: `Event ${id}`,
  company: null,
  endTime: null,
  location: null,
  flyerFile: null,
  rsvpLink: null,
  description: null,
  semester: 'S26',
});

describe('eventUtils', () => {
  it('formats event dates and times in the site timezone', () => {
    expect(formatEventDate('2026-03-31T23:45:00.000Z', '2026-04-01T01:15:00.000Z')).toBe(
      'Tue, Mar 31, 2026 • 7:45 PM - 9:15 PM'
    );
  });

  it('falls back to TBA labels for invalid dates', () => {
    expect(formatEventDate('not-a-date', null)).toBe('Date TBA • Time TBA');
  });

  it('builds thumbnail URLs from flyer filenames', () => {
    expect(getEventThumbnailUrl('spring-panel.PNG')).toBe(
      'https://cdn.example.com/event-thumbnails/spring-panel.jpg'
    );
    expect(getEventThumbnailUrl(null)).toBe('');
  });

  it('returns the next upcoming event sorted by start time', () => {
    const now = new Date('2026-03-31T12:00:00.000Z');
    const events = [
      makeEvent('future-late', '2026-04-03T16:00:00.000Z'),
      makeEvent('past', '2026-03-30T16:00:00.000Z'),
      makeEvent('future-early', '2026-04-01T16:00:00.000Z'),
    ];

    expect(getNextUpcomingEvent(events, now)?.id).toBe('future-early');
  });
});
