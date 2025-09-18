export interface NewsletterSignup {
     first_name: string;
     last_name: string;
     year: string;
     college: string;
     email: string;
}
   
export interface NewsletterSignupResponse {
     success: boolean;
     message: string;
}