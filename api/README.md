# API

> Placeholder directory for the future Fastify backend.

## Planned Stack

- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma)
- **Auth**: GitHub OAuth2
- **AI**: OpenAI / Anthropic API for code analysis

## Planned Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/repos` | List connected repositories |
| POST | `/api/repos/sync` | Sync repository data from GitHub |
| GET | `/api/prs` | List pull requests |
| GET | `/api/prs/:id` | Get PR details |
| POST | `/api/prs/:id/review` | Trigger AI review |
| GET | `/api/reviews/:id` | Get review results |
| POST | `/api/auth/github` | GitHub OAuth callback |
| GET | `/api/user` | Get current user |

## Setup (Future)

```bash
cd api
npm install
npm run dev
```
