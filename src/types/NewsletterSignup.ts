export interface NewsletterSignup {
  firstName: string;
  lastName: string;
  email: string;
}

export interface NewsletterSignupResponse {
  success: boolean;
  message: string;
}
