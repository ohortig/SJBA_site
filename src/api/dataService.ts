import { apiClient } from './client';
import type { ApiResponse, PaginatedResponse } from './client';
import type { 
     BoardMember,
     Event,
     EventsQueryParams,
     NewsletterSignup,
     NewsletterSignupResponse
} from '../types';

// Board members API
const boardMembersService = {

  async getAll(): Promise<BoardMember[]> {
    const response = await apiClient.get<ApiResponse<BoardMember[]>>('/board-members');
    return response.data;
  },

  async getById(id: string): Promise<BoardMember> {
    const response = await apiClient.get<ApiResponse<BoardMember>>(`/board-members/${id}`);
    return response.data;
  }
};

// Newsletter API
const newsletterService = {
  async signup(data: NewsletterSignup): Promise<NewsletterSignupResponse> {
    const response = await apiClient.post<ApiResponse<NewsletterSignupResponse>>(
      '/newsletter-sign-ups',
      data
    );
    return response.data;
  }
};

// Events API
const eventsService = {
  async getAll(params: EventsQueryParams = {}): Promise<{
    events: Event[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    // Set default pagination values
    const queryParams = {
      page: 1,
      limit: 10,
      ...params
    };

    const response = await apiClient.get<PaginatedResponse<Event>>(
      '/events',
      queryParams
    );

    return {
      events: response.data,
      pagination: response.pagination
    };
  },

  async getById(id: string): Promise<Event> {
    const response = await apiClient.get<ApiResponse<Event>>(`/events/${id}`);
    return response.data;
  },

  async getUpcoming(limit = 5): Promise<Event[]> {
    const now = new Date().toISOString();
    const { events } = await this.getAll({
      startDate: now,
      isPublic: true,
      limit
    });
    return events;
  },
};

// Export all services as a single object for convenience
export const dataService = {
  boardMembers: boardMembersService,
  newsletter: newsletterService,
  events: eventsService
};
