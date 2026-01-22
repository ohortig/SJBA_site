export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
export const BOARD_IMAGES_BUCKET = import.meta.env.VITE_BOARD_IMAGES_BUCKET as string;
export const EVENT_FLYERS_BUCKET = import.meta.env.VITE_EVENT_FLYERS_BUCKET as string;

// Semester date ranges
export const SEMESTER_DATE_RANGES: Record<
  string,
  { startMonth: number; startDay: number; endMonth: number; endDay: number }
> = {
  fall: { startMonth: 7, startDay: 1, endMonth: 11, endDay: 31 }, // Aug 1 - Dec 31
  spring: { startMonth: 0, startDay: 1, endMonth: 4, endDay: 31 }, // Jan 1 - May 31
};

// Get semester date range for a specific year
export function getSemesterDates(
  semester: 'fall' | 'spring',
  year: number
): { start: Date; end: Date } {
  const range = SEMESTER_DATE_RANGES[semester];
  return {
    start: new Date(year, range.startMonth, range.startDay),
    end: new Date(year, range.endMonth, range.endDay),
  };
}

// Determine which semester a given date falls into
export function getSemesterForDate(
  date: Date
): { semester: 'fall' | 'spring'; year: number } | null {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const fall = SEMESTER_DATE_RANGES.fall;
  const spring = SEMESTER_DATE_RANGES.spring;

  // Check if date falls within fall semester (Aug 1 - Dec 31)
  if (
    (month > fall.startMonth || (month === fall.startMonth && day >= fall.startDay)) &&
    (month < fall.endMonth || (month === fall.endMonth && day <= fall.endDay))
  ) {
    return { semester: 'fall', year };
  }

  // Check if date falls within spring semester (Jan 1 - May 31)
  if (
    (month > spring.startMonth || (month === spring.startMonth && day >= spring.startDay)) &&
    (month < spring.endMonth || (month === spring.endMonth && day <= spring.endDay))
  ) {
    return { semester: 'spring', year };
  }

  // Date falls in summer (June - July) - not in a semester
  return null;
}

// Semester identifier type
export type Semester = `${'fall' | 'spring'}${number}`;
