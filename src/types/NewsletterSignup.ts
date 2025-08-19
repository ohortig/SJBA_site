export interface NewsletterSignup {
     firstName: string;
     lastName: string;
     year: string;
     college: string;
     email: string;
}
   
export interface NewsletterSignupResponse {
     success: boolean;
     message: string;
}