import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Helper to query the DB safely
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};