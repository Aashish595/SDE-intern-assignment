ApniSec – Full-Stack Cybersecurity Platform

A production-ready Next.js application with custom authentication, issue management, rate limiting, and email integration.

📌 Overview

ApniSec is a full-stack cybersecurity service platform built using Next.js App Router and TypeScript, following enterprise-grade architecture principles.
The application demonstrates real-world implementation of custom JWT authentication, rate-limited APIs, OOP-based backend design, email notifications, and a SEO-optimized marketing landing page.

This project was designed as a professional SDE-level assignment, focusing on clean architecture, scalability, and production readiness.
🚀 Features
🔐 Authentication & Security

Custom JWT-based authentication

Secure HTTP-only cookies

Protected routes using middleware

Logout with cookie invalidation

Rate-limited authentication APIs

Fully typed auth flow (no any usage)

📧 Email Integration

Email service powered by Resend

Used for onboarding / notifications

Configurable sender and branding

🧠 Backend Architecture (OOP)

Entire backend follows Object-Oriented Programming

Business logic implemented via classes

Clear separation of:

Controllers

Services

Models

Utilities

No functional business logic

Strong typing across all layers

🛡️ Issue Management System

Create, read, update, delete issues

Supported issue types:

Cloud Security

Red Team Assessment

VAPT (Vulnerability Assessment & Penetration Testing)

Issue filtering & search

Priority and status management

User-scoped access control

🌐 Frontend & UX

Modern, cybersecurity-themed UI

Tailwind CSS for responsive design

SEO-optimized landing page

Smooth scrolling navigation

Auth-aware navigation bar

Dashboard with real data

🧱 Tech Stack
Frontend

Next.js 15+ (App Router)

TypeScript

Tailwind CSS

Server Components + Client Components

SEO metadata & Open Graph support

Backend

Next.js API Routes

MongoDB + Mongoose

JWT (jsonwebtoken)

Resend Email API

Custom Rate Limiting

Class-based OOP architecture

🌍 Pages
1️⃣ Landing Page (/)

ApniSec-themed cybersecurity landing page

Hero section with value proposition

Services showcase

SEO-optimized metadata

Navigation bar:

Logo

Services

Why ApniSec

Login / Register

Footer with company details

2️⃣ Login (/login)

Secure login form

Redirects to dashboard on success

3️⃣ Register (/register)

New user registration

Email integration support

4️⃣ Dashboard (/dashboard) (Protected)

Welcome message with user data

Issue management interface

5️⃣ Profile (/profile) (Protected)

View and update user profile

🔌 API Endpoints
🔐 User APIs
Method	Endpoint	Description	Auth
GET	/api/users/profile	Get user profile	✅
PUT	/api/users/profile	Update user profile	✅
🛠️ Issue Management APIs
Method	Endpoint	Description	Auth
GET	/api/issues	List user issues	✅
POST	/api/issues	Create issue	✅
GET	/api/issues/[id]	Get single issue	✅
PUT	/api/issues/[id]	Update issue	✅
DELETE	/api/issues/[id]	Delete issue	✅

Query Filtering

GET /api/issues?type=cloud-security

⚙️ Environment Variables

Create a .env.local file:

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/

# Authentication
JWT_SECRET=super-secret-long-random-string
JWT_EXPIRES_IN=15m

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
COMPANY_NAME="ApniSec Platform"

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

🔑 Production Notes

On Vercel, set environment variables in:
Project → Settings → Environment Variables

NEXT_PUBLIC_APP_URL should be your deployed domain

secure: true cookies are automatically enabled in production (HTTPS)

▶️ Running Locally
npm install
npm run dev


App will be available at:

http://localhost:3000

🚢 Deployment (Vercel)

Push repository to GitHub

Import project into Vercel

Add environment variables

Deploy

✔ No server setup required
✔ Automatic HTTPS
✔ Optimized Next.js builds

🧪 Code Quality & Best Practices

Strict TypeScript (no any)

OOP-based backend

Reusable service layers

Centralized error handling

Clean, readable, maintainable code

Production-ready security patterns

📌 Assignment Objectives Covered

✅ Full-stack Next.js application

✅ Custom authentication (JWT)

✅ Rate limiting

✅ Email integration

✅ MongoDB with Mongoose

✅ OOP backend architecture

✅ SEO-optimized landing page

✅ Professional UI/UX

✅ Production deployment readiness

👤 Author

Aashish Maurya
Full-Stack Developer | Cybersecurity Enthusiast

If you want, I can also:

Add API documentation (Swagger style)

Create a system design section

Optimize this README for resume / portfolio submissions

Review your repo for final production polish

Just tell me.