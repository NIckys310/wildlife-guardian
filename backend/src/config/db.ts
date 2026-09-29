import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/wildlife_guardian',
});

pool.on('connect', () => {
    console.log('📦 Conectado exitosamente a la base de datos PostgreSQL');
});