import { apiClient } from './client';
import type { ApiResponse, PaginatedResponse } from './client';
import type {
  BoardMember,
  BoardMemberResponse,
  Event,
  EventsQueryParams,
  NewsletterSignup,
  NewsletterSignupResponse,
  ContactFormData,
  ContactFormResponse,
} from '@types';

/* Board Members Service */

// Helper function to transform snake_case API response to camelCase
const transformBoardMember = (apiMember: BoardMemberResponse): BoardMember => {
  return {
    id: apiMember.id,
    position: apiMember.position,
    fullName: apiMember.full_name,
    bio: apiMember.bio.replace(/\\n/g, '\n'), // stop-gap fix: convert escaped newlines to actual newlines
    major: apiMember.major,
    year: apiMember.year,
    hometown: apiMember.hometown,
    linkedinUrl: apiMember.linkedin_url,
    email: apiMember.email,
    headshotFile: apiMember.headshot_file,
    orderIndex: apiMember.order_index,
  };
};

const boardMembersService = {
  async getAll(): Promise<BoardMember[]> {
    const response = await apiClient.get<ApiResponse<BoardMemberResponse[]>>('/board-members');
    return response.data.map(transformBoardMember);
  },

  async getById(id: string): Promise<BoardMember> {
    const response = await apiClient.get<ApiResponse<BoardMemberResponse>>(`/board-members/${id}`);
    return transformBoardMember(response.data);
  },
};

/* Newsletter Service */

const newsletterService = {
  async signup(data: NewsletterSignup): Promise<NewsletterSignupResponse> {
    const response = await apiClient.post<ApiResponse<NewsletterSignupResponse>>(
      '/newsletter-sign-ups',
      data
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
    const now = new Date().toISOString();
    const { events } = await this.getAll({
      startDate: now,
      isPublic: true,
      limit,
    });
    return events;
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
