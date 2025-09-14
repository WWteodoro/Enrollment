import amqp from 'amqplib';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://root:root@localhost:5433/postgres';

const pool = new Pool({ connectionString: DATABASE_URL });

async function startWorker() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue('payment_requested', { durable: true });

  console.log('[worker] Aguardando mensagens em payment_requested...');

  channel.consume('payment_requested', async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    const enrollmentId = data.enrollmentId;
    const studentId = data.studentId;
    const courseId = data.courseId;

    console.log(`[worker] Processando pagamento da matrícula ${enrollmentId}...`);

    const delay = Math.floor(Math.random() * 2000) + 3000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const client = await pool.connect();
    try {
      await client.query(
        `UPDATE enrollments SET status = 'paid' WHERE id = $1 AND status = 'pending_payment'`,
        [enrollmentId]
      );
      console.log(`[worker] Matrícula ${enrollmentId} marcada como 'paid'.`);

      const welcomePayload = {
        enrollmentId,
        studentId,
        courseId,
        sentAt: new Date().toISOString()
      };

      console.log('[worker] welcome_email:', welcomePayload);
    } catch (err) {
      console.error('[worker] Erro ao atualizar matrícula:', err);
    } finally {
      client.release();
      channel.ack(msg);
    }
  });
}

startWorker().catch((err) => {
  console.error('[worker] Falha ao iniciar:', err);
  process.exit(1);
});
