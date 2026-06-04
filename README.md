# CodeLens — AI Code Review Platform

A full-stack MERN app that uses Claude AI to review your code and find bugs, security issues, and improvements.

---

## Tech Stack

**Frontend:** React + Vite, Tailwind CSS v4, Framer Motion, Monaco Editor, React Router, Axios

**Backend:** Node.js, Express.js, MongoDB + Mongoose, JWT Auth, Anthropic Claude API

---

## Folder Structure

```
ai-code-review/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js  # Register, login, profile logic
│   │   │   └── reviewController.js# Create review, fetch, delete, stats
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js  # JWT token verification
│   │   │   └── errorMiddleware.js # Global error handler
│   │   ├── models/
│   │   │   ├── User.js            # User schema (with password hashing)
│   │   │   └── Review.js          # Review schema with issues sub-docs
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # /api/auth/* endpoints
│   │   │   └── reviewRoutes.js    # /api/reviews/* endpoints
│   │   ├── utils/
│   │   │   └── generateToken.js   # JWT token generator
│   │   └── server.js              # Express app entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   └── ProtectedRoute.jsx  # Guards private pages
    │   │   ├── layout/
    │   │   │   └── Navbar.jsx          # Top navigation bar
    │   │   ├── review/
    │   │   │   ├── IssueCard.jsx       # Single AI issue display
    │   │   │   └── ReviewCard.jsx      # Dashboard review list item
    │   │   └── ui/
    │   │       ├── Button.jsx          # Reusable button
    │   │       ├── Input.jsx           # Reusable input field
    │   │       ├── ScoreRing.jsx       # Circular score chart
    │   │       └── StatCard.jsx        # Dashboard metric card
    │   ├── context/
    │   │   └── AuthContext.jsx    # Global auth state (React Context)
    │   ├── pages/
    │   │   ├── LandingPage.jsx    # Public homepage
    │   │   ├── LoginPage.jsx      # Login form
    │   │   ├── RegisterPage.jsx   # Register form
    │   │   ├── DashboardPage.jsx  # User dashboard with stats
    │   │   ├── NewReviewPage.jsx  # Create a new code review
    │   │   └── ReviewDetailPage.jsx# View AI review results
    │   ├── services/
    │   │   └── api.js             # All Axios API calls
    │   └── App.jsx                # Routes setup
    └── package.json
```

---

## Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Copy environment variables file
cp .env.example .env

# Edit .env and fill in:
# - MONGO_URI: your MongoDB connection string
# - JWT_SECRET: any random secret string
# - ANTHROPIC_API_KEY: from https://console.anthropic.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs at: http://localhost:5000

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at: http://localhost:5173

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Create new account | No |
| POST | /api/auth/login | Login and get token | No |
| GET | /api/auth/profile | Get current user | Yes |
| GET | /api/reviews | Get all my reviews | Yes |
| POST | /api/reviews | Create new review | Yes |
| GET | /api/reviews/stats | Get dashboard stats | Yes |
| GET | /api/reviews/:id | Get one review | Yes |
| DELETE | /api/reviews/:id | Delete a review | Yes |

---

## Key Concepts (for Interview)

- **JWT Authentication**: Token stored in localStorage, sent as `Bearer <token>` in every protected request header
- **Protected Routes**: Frontend checks auth state before rendering private pages; backend verifies JWT on every private API call
- **React Context**: AuthContext provides global user state to all components without prop drilling
- **Axios Interceptors**: Automatically attach auth token to all requests
- **Mongoose Middleware**: Password hashing happens in the model's `pre('save')` hook before DB write
- **AI Integration**: Code is sent to Anthropic's Claude API with a structured prompt; response is parsed as JSON
