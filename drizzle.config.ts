import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './migrations',
  schema: './src/models/Schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Local and CI builds (npm run build-local) start an in-memory PGlite server on
    // 127.0.0.1:5432; fall back to it so `drizzle-kit migrate` has a target when no
    // DATABASE_URL is configured. Vercel builds use migrate-optional and skip this.
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5432/postgres',
  },
  verbose: true,
  strict: true,
});
