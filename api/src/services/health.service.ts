import { prisma } from '../config/db';

export class HealthService {
  /**
   * Check if the database connection to Postgres is healthy
   */
  static async checkDatabase(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (e) {
      return false;
    }
  }
}
