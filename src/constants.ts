export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
export const BOARD_IMAGES_BUCKET = import.meta.env.VITE_BOARD_IMAGES_BUCKET as string;
export const BOARD_THUMBNAILS_BUCKET = `${BOARD_IMAGES_BUCKET}thumbnails/`;
export const EVENT_FLYERS_BUCKET = import.meta.env.VITE_EVENT_FLYERS_BUCKET as string;
export const EVENT_FLYERS_THUMBNAILS_BUCKET = `${EVENT_FLYERS_BUCKET}thumbnails/`;

export const HOME_PAGE_SPEAKER_LOGOS = [
  { name: 'Goldman Sachs', src: '/speaker-logos/goldman-sachs-logo.png' },
  { name: 'JPMorgan Chase', src: '/speaker-logos/jpmorgan-logo.jpg' },
  { name: 'Morgan Stanley', src: '/speaker-logos/morgan-stanley-logo.jpg' },
  { name: 'Blackstone', src: '/speaker-logos/blackstone-logo.png' },
  { name: 'Sequoia Capital', src: '/speaker-logos/sequoia-logo.png' },
  { name: 'McKinsey & Company', src: '/speaker-logos/mckinsey-logo.jpg' },
  { name: 'Ackman-Ziff', src: '/speaker-logos/ackman-ziff-logo.jpg' },
  { name: 'Axom Partners', src: '/speaker-logos/axom-partners-logo.jpg' },
  { name: 'Bank of America', src: '/speaker-logos/bank-of-america-logo.png' },
  { name: 'Carter Pierce', src: '/speaker-logos/carter-pierce-logo.png' },
  { name: 'Cushman & Wakefield', src: '/speaker-logos/cushman-and-wakefield-logo.png' },
  { name: 'Declaration Partners', src: '/speaker-logos/declaration-partners-logo.jpg' },
  { name: 'Deutsche Bank', src: '/speaker-logos/deutsche-bank-logo.png' },
  { name: 'Eden Global Partners', src: '/speaker-logos/eden-global-partners-logo.jpeg' },
  { name: 'FTI Consulting', src: '/speaker-logos/FTI-consulting-logo.png' },
  { name: 'HSBC', src: '/speaker-logos/HSBC-logo.png' },
  { name: 'IBM', src: '/speaker-logos/IBM-logo.png' },
  { name: 'KKR', src: '/speaker-logos/KKR-logo.png' },
  { name: 'Cantor Fitzgerald', src: '/speaker-logos/cantor-fitzgerald-logo.png' },
  { name: 'Palantir', src: '/speaker-logos/palantir-logo.png' },
  { name: 'UBS', src: '/speaker-logos/UBS-logo.png' },
];
