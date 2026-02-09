# 🛍️ Production-Ready E-Commerce Application

A **Next.js 16** e-commerce platform with **TypeScript**, **React Server Components**, **Redux Toolkit**, and **DummyJSON API** integration.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

- **Username**: `emilys`
- **Password**: `emilypass`

---

## 📋 Features Implemented

### ✅ Authentication

- JWT Token-based login/logout
- HTTP-only secure cookies
- Automatic token refresh
- Server-side session management
- Protected routes with middleware
- Auto redirects (logged-in → /products, logged-out → /login)

### ✅ Products Management

- Server-side product fetching with Suspense
- Category filtering
- Sorting (by title, price, rating)
- Pagination with API support
- Search functionality
- Product detail pages with reviews

### ✅ Shopping Cart

- Redux-based state management
- Local storage persistence
- Add/remove/update quantity
- Order summary with tax calculation
- Cart notifications
- Responsive desktop & mobile UI

### ✅ Architecture & Quality

- Clean Architecture with separation of concerns
- React Server Components by default
- TypeScript strict mode everywhere
- Error boundaries & error pages
- Loading states with Suspense
- SEO-friendly metadata
- Accessible & responsive UI
- Middleware-based route protection

---

## 🏗️ Project Structure

```
src/
├── domain/                    # Types & interfaces
├── services/                 # Business logic & API calls
├── store/                    # Redux state management
├── ui/components/            # Presentational components
└── app/                      # Next.js routes

lib/
├── auth.ts                   # Cookie & token utilities

middleware.ts                 # Route protection & redirects
```

---

## 🔐 Security Features

- ✅ **HTTP-only Cookies**: Tokens stored securely
- ✅ **Server-Side Sessions**: User data fetched server-side only
- ✅ **Protected Routes**: Middleware prevents unauthorized access
- ✅ **Token Refresh**: Automatic token refresh on expiration
- ✅ **CSRF Protection**: Middleware handles validation
- ✅ **XSS Prevention**: React automatically escapes content
- ✅ **No Secrets in Client**: All sensitive operations on server

---

## 🔌 API Routes

All external API calls go through **Next.js route handlers**:

### Authentication

```
POST   /api/auth/login      - Login (username, password)
GET    /api/auth/me         - Get current user
POST   /api/auth/refresh    - Refresh access token
POST   /api/auth/logout     - Logout
```

### Products

```
GET    /api/products                    - Get all products
GET    /api/products/[id]               - Get product by ID
GET    /api/products/categories         - Get all categories
```

---

## 🛠️ Tech Stack

| Category             | Technology                    |
| -------------------- | ----------------------------- |
| **Framework**        | Next.js 16 (App Router)       |
| **Language**         | TypeScript 5                  |
| **Rendering**        | SSR + React Server Components |
| **State Management** | Redux Toolkit 2.0             |
| **Form Validation**  | React Hook Form + Zod         |
| **Styling**          | Tailwind CSS 4                |
| **HTTP Client**      | Axios 1.6                     |
| **Authentication**   | JWT + HTTP-only Cookies       |

---

## 📝 Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```
