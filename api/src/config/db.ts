import { PrismaClient } from '../../prisma/generated';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL,
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
