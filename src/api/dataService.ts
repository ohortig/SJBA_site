import { apiClient } from './client';
import type { ApiResponse, PaginatedResponse } from './client';
import type {
  BoardMember,
  Event,
  EventsQueryParams,
  NewsletterSignup,
  NewsletterSignupResponse,
  ContactFormData,
  ContactFormResponse,
} from '@types';

/* Board Members Service */

const boardMembersService = {
  async getAll(): Promise<BoardMember[]> {
    const response = await apiClient.get<ApiResponse<BoardMember[]>>('/board-members');
    return response.data;
  },

  async getById(id: string): Promise<BoardMember> {
    const response = await apiClient.get<ApiResponse<BoardMember>>(`/board-members/${id}`);
    return response.data;
  },
};

/* Newsletter Service */

const newsletterService = {
  async signup(data: NewsletterSignup): Promise<NewsletterSignupResponse> {
    const payload = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
    };
    const response = await apiClient.post<ApiResponse<NewsletterSignupResponse>>(
      '/newsletter-sign-ups',
      payload
    );
    return response.data;
  },
};

/* Events Service */

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
      limit: 50,
      ...params,
    };

    const response = await apiClient.get<PaginatedResponse<Event>>('/events', queryParams);

    return {
      events: response.data,
      pagination: response.pagination,
    };
  },

  async getById(id: string): Promise<Event> {
    const response = await apiClient.get<ApiResponse<Event>>(`/events/${id}`);
    return response.data;
  },

  async getUpcoming(limit = 5): Promise<Event[]> {
    const response = await apiClient.get<ApiResponse<Event[]>>('/events/upcoming', { limit });
    return response.data;
  },
};

/* Contact Form Service */

const contactService = {
  async submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
    const response = await apiClient.post<ApiResponse<ContactFormResponse>>('/contact', data);
    return response.data;
  },
};

export const dataService = {
  boardMembers: boardMembersService,
  newsletter: newsletterService,
  events: eventsService,
  contact: contactService,
};
