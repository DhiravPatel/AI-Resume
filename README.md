# CodeReview AI

> AI-Powered Pull Request Reviewer for Modern Engineering Teams

## 📁 Project Structure

```
code_review/
├── web/                        # Frontend monorepo
│   ├── main.jsx               # App entry point
│   ├── App.jsx                # Root router (landing ↔ dashboard)
│   ├── styles/
│   │   └── index.css          # Global styles + Tailwind
│   ├── shared/                # Shared between landing & dashboard
│   │   ├── data/              # Mock data (repos, PRs, reviews)
│   │   └── components/        # Shared UI components
│   ├── landing/               # Marketing & onboarding app
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   └── Footer.jsx
│   │   └── pages/
│   │       └── HomePage.jsx
│   └── dashboard/             # Product dashboard app
│       ├── App.jsx
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── Topbar.jsx
│       │   ├── StatsCard.jsx
│       │   └── PRTable.jsx
│       └── pages/
│           ├── DashboardPage.jsx
│           ├── RepositoriesPage.jsx
│           ├── PullRequestsPage.jsx
│           └── PRDetailPage.jsx
├── api/                       # Backend placeholder (Fastify)
│   └── README.md
├── index.html                 # HTML entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── favicon.svg
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Styling
- **React Router 6** — Client-side routing
- **Lucide React** — Icon library
- **Framer Motion** — Animations

## 📄 Routes

| Route | App | Description |
|-------|-----|-------------|
| `/` | Landing | Marketing homepage |
| `/dashboard` | Dashboard | Overview stats |
| `/dashboard/repositories` | Dashboard | Connected repos |
| `/dashboard/pull-requests` | Dashboard | PR listing |
| `/dashboard/pr/:id` | Dashboard | PR review detail |

## 📝 License

MIT
