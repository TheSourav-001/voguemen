
<div align="center">

# VogueMen — Ultra Luxury Fashion Platform

**A production-ready full-stack fashion platform for premium men’s lifestyle experiences**

![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)
![Render](https://img.shields.io/badge/Backend-Render-blue)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)
![Status](https://img.shields.io/badge/Status-Production--Ready-success)

</div>

---

## Live Deployment

URL:
https://voguemen.vercel.app

---

## Features

## 1. User Authentication & Authorization
- User registration (signup)
- User login with email and password
- Secure password hashing
- JWT-based authentication
- Protected routes for authenticated users
- Persistent login using tokens
- Logout functionality

## 2. User Profile Management
- Authenticated user profile view
- Fetch profile data from backend
- User-specific data handling
- Secure access to profile endpoints

## 3. Fashion & Product Browsing
- Luxury fashion item browsing
- Clean and modern product listing UI
- Category-based browsing support
- Responsive product cards
- Optimized layout for premium brand feel

## 4. Frontend Architecture
- React-based component architecture
- Vite-powered fast development and build
- Modular and reusable UI components
- Centralized API configuration
- Environment-based API switching
- Fully responsive design (desktop and mobile)

## 5. Backend API Architecture
- RESTful API design
- Express-based server
- Controller-based route handling
- Middleware-driven authentication
- Clean separation of routes and logic
- Environment-based backend configuration

## 6. Database & ORM
- MySQL database integration
- Prisma ORM for type-safe queries
- Centralized database access layer
- Schema-driven database design
- Migration-ready database structure

## 7. Security Features
- Encrypted password storage
- JWT token validation
- Secure CORS configuration
- Environment variable–based secrets
- No hardcoded sensitive information

## 8. Deployment & DevOps
- Frontend deployed on Vercel
- Backend deployed on Render
- Independent frontend and backend deployments
- Automatic redeployment on Git push
- Cloud-native production setup

## 9. Configuration & Environment Management
- Separate development and production configurations
- Frontend environment variables via Vite
- Backend environment variables via Render
- Easy switching between local and production environments

## 10. Developer Experience
- Clean and readable project structure
- Fast local development workflow
- Prisma CLI integration
- Git-based CI/CD workflow
- Production debugging via logs

## 11. Scalability & Maintainability
- Scalable backend architecture
- Database abstraction using ORM
- Easy feature extension support
- Ready for future modules and services

## 12. Production Readiness
- Industry-standard architecture
- Cloud deployment best practices
- Secure authentication flow
- Portfolio and interview ready project

## 13. Future Expandable Features
- Admin dashboard
- Product management system
- Order and checkout system
- Payment gateway integration
- Shopping cart and wishlist
- Role-based access control
- Analytics and reporting module

---

## System Architecture

The system is divided into three independent layers:

Frontend:
Handles user interface and client-side logic. Communicates with the backend using HTTP requests and runs on a global CDN.

Backend:
Manages application logic, authentication, and API endpoints. Acts as the bridge between the frontend and the database.

Database:
Cloud-hosted MySQL database accessed through Prisma ORM.

---

## Technology Stack

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS

Backend:
- Node.js
- Express
- Prisma ORM

Database:
- MySQL (Cloud-hosted)

---

## Deployment Infrastructure

Frontend is deployed on Vercel.
Backend API is deployed on Render.
Database is hosted externally using a managed MySQL provider.

This separation allows independent scaling, faster deployments, and improved reliability.

---

## Environment Variables

Frontend (Vercel):

VITE_API_URL=https://voguemen-api.onrender.com

Backend (Render):

PORT=5000
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your_secret_key
CORS_ORIGIN=https://voguemen.vercel.app

---

## Local Development Setup

Clone the repository:

git clone https://github.com/TheSourav-001/voguemen.git
cd voguemen

Install and run frontend:

npm install
npm run dev

Frontend will be available at:
http://localhost:3000

Run backend:

cd server
npm install
npm run dev

Backend API will be available at:
http://localhost:5000

---

## Database Setup (Prisma)

Create database tables:

cd server
npx prisma db push

For production database migrations:

npx prisma migrate deploy

---

## Deployment Workflow

- All code changes are pushed to the main branch.
- Vercel automatically rebuilds and deploys the frontend.
- Render automatically rebuilds and deploys the backend.
- Environment variables persist across deployments.

Manual redeployment is required only when environment variables or database schemas change.

---

## Project Status

Production ready and actively maintained.

---

## Author

- Developed by Sourav Dipto Apu
- Github: https://github.com/TheSourav-001
