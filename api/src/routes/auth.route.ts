import type { FastifyInstance } from 'fastify';
import { googleCallback, getMe, logout } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function authRoutes(fastify: FastifyInstance) {
  // GET /api/v1/auth/google/callback — Google OAuth2 callback
  fastify.get('/google/callback', googleCallback);

  // GET /api/v1/auth/me — get current user profile
  fastify.get('/me', { preHandler: [authMiddleware] }, getMe);

  // POST /api/v1/auth/logout — logout mechanism
  fastify.post('/logout', logout);
}
