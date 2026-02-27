import { EVENT_FLYERS_THUMBNAILS_BUCKET } from '@constants';
import type { Event } from '@types';

export const formatEventDate = (startTime: string, endTime: string | null): string => {
  return `${formatEventDateOnly(startTime)} • ${formatEventTimeOnly(startTime, endTime)}`;
};

export const formatEventDateOnly = (startTime: string): string => {
  const start = new Date(startTime);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return start.toLocaleDateString('en-US', options);
};

export const formatEventTimeOnly = (startTime: string, endTime: string | null): string => {
  const start = new Date(startTime);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const startLabel = start.toLocaleTimeString('en-US', timeOptions);

  if (!endTime) return startLabel;

  const end = new Date(endTime);
  const endLabel = end.toLocaleTimeString('en-US', timeOptions);
  return `${startLabel} - ${endLabel}`;
};

export const getEventThumbnailUrl = (filename: string | null): string => {
  if (!filename) return '';
  const thumbnailName = filename.replace(/\.(png|webp|jpeg|jpg)$/i, '.jpg');
  return `${EVENT_FLYERS_THUMBNAILS_BUCKET}${thumbnailName}`;
};

export const getNextUpcomingEvent = (events: Event[], now = new Date()): Event | null => {
  const upcomingEvents = events
    .filter((event) => new Date(event.startTime).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  return upcomingEvents[0] ?? null;
};
