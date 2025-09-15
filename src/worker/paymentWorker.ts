import { createClient } from 'redis';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { AppError } from '../errors/AppError';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://root:root@localhost:5432/postgres';

const redis = createClient({ url: REDIS_URL });
const pool = new Pool({ connectionString: DATABASE_URL });

async function startWorker() {

    if (process.env.APP_USE_WEBHOOK === 'true') {
                throw new AppError('Worker desativado');
            }

  await redis.connect();
  console.log('[worker] Escutando stream "payment_requested"...');

  let lastId = '0';

  while (true) {
  const result: any = await redis.sendCommand([
    'XREAD',
    'BLOCK',
    '5000',
    'COUNT',
    '1',
    'STREAMS',
    'payment_requested',
    lastId
  ]);

  if (!Array.isArray(result) || result.length === 0) continue;

  const [streamName, messages] = result[0]; // result[0] = ['payment_requested', [ [id, fields] ] ]

  for (const [id, fields] of messages) {
    lastId = id;

    const payload: Record<string, string> = {};
    for (let i = 0; i < fields.length; i += 2) {
      payload[fields[i]] = fields[i + 1];
    }

    const { enrollmentId, studentId, courseId } = payload;
    console.log('[worker] Tentando atualizar matrícula com ID:', enrollmentId);

    console.log(`[worker] Processando matrícula ${enrollmentId}...`);

    const delay = Math.floor(Math.random() * 2000) + 3000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const client = await pool.connect();
    await client.query(
      `UPDATE "Enrollment" SET status = 'paid' WHERE id = $1`,
      [enrollmentId]
    );
    client.release();

    console.log('[worker] welcome_email:', {
      enrollmentId,
      studentId,
      courseId,
      sentAt: new Date().toISOString()
    });
  }
}

}

startWorker().catch(err => {
  console.error('[worker] Erro fatal:', err);
  process.exit(1);
});
