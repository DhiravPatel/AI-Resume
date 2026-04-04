import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './health.route';
import { authRoutes } from './auth.route';

export async function router(fastify: FastifyInstance) {
  fastify.register(healthRoutes, { prefix: '/health' });
  fastify.register(authRoutes, { prefix: '/auth' });
  
  // Future routes example:
  // fastify.register(userRoutes, { prefix: '/users' });
  // fastify.register(reviewRoutes, { prefix: '/reviews' });
}
