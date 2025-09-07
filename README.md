# Stern Jewish Business Association Website

A modern React website for the Stern Jewish Business Association at NYU, featuring dynamic content management and responsive design.

🌐 **Live Site**: [sjba-site.vercel.app](https://sjba-site.vercel.app)

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: CSS3 with custom animations
- **Routing**: React Router
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Backend**: Node.js/Express (separate repository)
- **Database**: Supabase

## Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/ohortig/SJBA_site.git
   cd SJBA_site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory and add:
   ```env
   VITE_BACKEND_URL=your_backend_url_here
   ```
   
   **Backend URL Options:**
   - **Production**: `https://sjba-site-backend.vercel.app/api/v1`
   - **Local Development**: `http://localhost:3000/api/v1`
     
   > 📝 For local backend setup, see: [SJBA Backend Repository](https://github.com/ohortig/SJBA_site_backend)

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Contributing

This project is actively maintained by the SJBA tech team. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Omer Hortig  
📧 Email: [oh2065@nyu.edu](mailto:oh2065@nyu.edu)

Feel free to reach out to report bugs, ask questions, or inquire about joining the development team!

## Release Notes

### Version 0.1
Initial release. Functional Home, Our Board, and Contact Us pages with static content.

### Version 0.2 
- Added backend API integration for dynamic content management
- Board member profiles now load from Supabase database
- Implemented loading states and error handling for API calls
- Enhanced UI with new loading spinner and error display components 
