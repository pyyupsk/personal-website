import { env } from '@/env';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

const prismaClientSingleton = () => {
    return new PrismaClient({ adapter });
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export const runtime = 'edge';
