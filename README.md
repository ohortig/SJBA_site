# Stern Jewish Business Association Website Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![CI](https://github.com/ohortig/SJBA_site/actions/workflows/ci.yml/badge.svg)](https://github.com/ohortig/SJBA_site/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&logoColor=white)](https://nyu-sjba.org)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22.x-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple?logo=vite&logoColor=white)](https://vitejs.dev/)

A React frontend for the Stern Jewish Business Association website.

**Live Frontend**: [nyu-sjba.org](https://nyu-sjba.org)
**Live API**: [api.nyu-sjba.org](https://api.nyu-sjba.org)

> **Note:** This README will be updated soon with full information on local development and production deployment.

## Local Development

### Prerequisites
- Node.js (v22.x)
- npm
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/ohortig/SJBA_site.git
   cd SJBA_site
   ```

2. **Install dependencies**
   ```bash
   npm install --save-dev
   ```

3. **Environment Configuration**
   
   Copy `.env.example` to `.env` and add:
   ```env
   VITE_BOARD_IMAGES_BUCKET=
   VITE_EVENT_FLYERS_BUCKET=
   ```
   
   **Backend URL Options:**
   - **Production**: `https://api.nyu-sjba.org/v1`
   - **Local Development**: `http://localhost:3000/v1`
     
   > See: [SJBA Backend Repository](https://github.com/ohortig/SJBA_site_backend)

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
- `npm run format` - Format code

## Contact

Omer Hortig

Email: [oh2065@nyu.edu](mailto:oh2065@nyu.edu)

Feel free to reach out to report bugs, ask questions, or inquire about joining the development team.

## License

This project is licensed under the [MIT License](./LICENSE).
