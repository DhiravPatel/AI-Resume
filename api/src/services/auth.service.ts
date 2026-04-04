import { prisma } from '../config/db';

interface UserPayload {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  provider: string;
}

export class AuthService {
  /**
   * Sync a Supabase-authenticated user into our database.
   * Uses upsert: creates the user if they don't exist, updates if they do.
   */
  static async syncUser(payload: UserPayload) {
    try {
      const user = await prisma.user.upsert({
        where: { email: payload.email },
        update: {
          name: payload.name,
          avatarUrl: payload.avatarUrl,
        },
        create: {
          email: payload.email,
          name: payload.name,
          avatarUrl: payload.avatarUrl,
          provider: payload.provider,
        },
      });

      return user;
    } catch (error) {
      console.error('Error in syncUser:', error);
      throw new Error('Failed to sync user to database');
    }
  }

  /**
   * Fetch a user by their email address.
   */
  static async getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      throw new Error('Failed to fetch user');
    }
  }

  /**
   * Fetch a user by their database ID.
   */
  static async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      return user;
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw new Error('Failed to fetch user');
    }
  }
}
