import type { FastifyRequest, FastifyReply } from 'fastify';
import { errorResponse } from '../utils/response';
import '@fastify/jwt';

/**
 * Auth middleware — verifies the standard JWT from cookies
 * Attaches the authenticated user to `request.user` for downstream handlers.
 */
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // fastify-jwt decorator validates the cookie (or auth header)
    await request.jwtVerify();
  } catch (err) {
    request.log.error(err, 'Auth middleware error');
    return reply.code(401).send(
      errorResponse('Authentication failed', 401)
    );
  }
};
