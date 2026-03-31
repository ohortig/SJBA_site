const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL as string;

export const BACKEND_URL =
  import.meta.env.DEV && configuredBackendUrl === 'http://localhost:3000/v1'
    ? '/v1'
    : configuredBackendUrl;
export const BOARD_IMAGES_BUCKET = import.meta.env.VITE_BOARD_IMAGES_BUCKET as string;
export const BOARD_THUMBNAILS_BUCKET = `${BOARD_IMAGES_BUCKET}thumbnails/`;
export const EVENT_FLYERS_BUCKET = import.meta.env.VITE_EVENT_FLYERS_BUCKET as string;
export const EVENT_FLYERS_THUMBNAILS_BUCKET = `${EVENT_FLYERS_BUCKET}thumbnails/`;

export const STATUS_PAGE_URL = 'https://status.nyu-sjba.org';

export const MENTORSHIP_APPLICATION_CONFIG_DEFAULTS: Record<
  'mentorship_application_open' | 'mentorship_application_url',
  string
> = {
  mentorship_application_open: 'false',
  mentorship_application_url: '',
};
export const MENTORSHIP_APPLICATION_CONFIG_TTL_MS = 60 * 60 * 1000;
export const MENTORSHIP_APPLICATION_CONFIG_STORAGE_KEY = 'programs:mentorshipApplicationConfig';
