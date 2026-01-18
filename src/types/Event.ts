export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 date string
  time?: string;
  location?: string;
  imageUrl?: string;
  registrationUrl?: string;
  isPublic: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  isPublic?: boolean;
  tags?: string[];
}
