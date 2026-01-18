export interface BoardMember {
  id: string;
  position: string;
  fullName: string;
  bio: string;
  major: string;
  year: string;
  hometown: string;
  linkedinUrl: string;
  email: string;
  headshotFile: string;
  orderIndex: number;
}

export interface BoardMemberResponse {
  id: string;
  position: string;
  full_name: string;
  bio: string;
  major: string;
  year: string;
  hometown: string;
  linkedin_url: string;
  email: string;
  headshot_file: string;
  order_index: number;
}
