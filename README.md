## ApniSec — Full-Stack Cybersecurity Platform

ApniSec is a production-ready full-stack cybersecurity service platform built using Next.js (App Router) and TypeScript, designed with enterprise-level security, scalability, and clean architecture principles.

The project demonstrates real-world implementation of custom JWT authentication, rate-limited APIs, OOP-based backend architecture, email integration, and a modern SEO-optimized frontend. It reflects how professional SaaS platforms are structured in large product-based companies.

---

### Key Features

#### Authentication & Security
- Custom JWT-based authentication with HTTP-only secure cookies
- Middleware-protected routes for authenticated access
- Logout with proper cookie invalidation
- Rate-limited authentication endpoints to prevent abuse
- Fully typed authentication flow using strict TypeScript

#### Backend Architecture (OOP-Based)
- Entire backend designed using Object-Oriented Programming principles
- Clear separation of concerns across Controllers, Services, Models, and Utilities
- Business logic encapsulated inside service classes
- Centralized error handling and reusable service layers
- Strong typing across all layers (no use of `any`)

#### Issue Management System
- Full CRUD support for cybersecurity issues
- Supported issue types:
  - Cloud Security
  - Red Team Assessment
  - VAPT (Vulnerability Assessment & Penetration Testing)
- Advanced filtering, search, priority, and status management
- User-scoped access control ensuring data isolation

#### Email Integration
- Integrated Resend Email API for onboarding and notifications
- Configurable sender identity and branding
- Production-ready email delivery setup

#### Frontend & UX
- Modern cybersecurity-themed UI using Tailwind CSS
- Fully responsive layout
- SEO-optimized landing page with metadata and Open Graph support
- Auth-aware navigation and real-time dashboard experience

---

### API Overview

#### User APIs
| Method | Endpoint              | Description           | Auth |
|------|----------------------|-----------------------|------|
| GET  | /api/users/profile   | Fetch user profile    | Yes  |
| PUT  | /api/users/profile   | Update user profile   | Yes  |

#### Issue Management APIs
| Method | Endpoint              | Description           | Auth |
|------|----------------------|-----------------------|------|
| GET  | /api/issues           | List user issues      | Yes  |
| POST | /api/issues           | Create new issue      | Yes  |
| GET  | /api/issues/[id]      | Get issue details     | Yes  |
| PUT  | /api/issues/[id]      | Update issue          | Yes  |
| DELETE | /api/issues/[id]    | Delete issue          | Yes  |

Filtering Example:
GET /api/issues?type=cloud-security

---

### Tech Stack

**Frontend**
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Server & Client Components
- SEO metadata & Open Graph

**Backend**
- Next.js API Routes
- MongoDB with Mongoose
- JWT Authentication
- Custom Rate Limiting
- OOP-based architecture

---

### Production Readiness
- Environment-based configuration for development and production
- Secure cookies enabled automatically in HTTPS
- Optimized for Vercel deployment
- Clean, maintainable, and scalable codebase

---

### Author
Gurudas Maurya  
Full-Stack Developer | Cybersecurity Enthusiast
