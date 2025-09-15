"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://root:root@localhost:5433/postgres';
const pool = new pg_1.Pool({ connectionString: DATABASE_URL });
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
        const channel = yield connection.createChannel();
        yield channel.assertQueue('payment_requested', { durable: true });
        console.log('[worker] Aguardando mensagens em payment_requested...');
        channel.consume('payment_requested', (msg) => __awaiter(this, void 0, void 0, function* () {
            if (!msg)
                return;
            const data = JSON.parse(msg.content.toString());
            const enrollmentId = data.enrollmentId;
            const studentId = data.studentId;
            const courseId = data.courseId;
            console.log(`[worker] Processando pagamento da matrícula ${enrollmentId}...`);
            const delay = Math.floor(Math.random() * 2000) + 3000;
            yield new Promise((resolve) => setTimeout(resolve, delay));
            const client = yield pool.connect();
            try {
                yield client.query(`UPDATE enrollments SET status = 'paid' WHERE id = $1 AND status = 'pending_payment'`, [enrollmentId]);
                console.log(`[worker] Matrícula ${enrollmentId} marcada como 'paid'.`);
                const welcomePayload = {
                    enrollmentId,
                    studentId,
                    courseId,
                    sentAt: new Date().toISOString()
                };
                console.log('[worker] welcome_email:', welcomePayload);
            }
            catch (err) {
                console.error('[worker] Erro ao atualizar matrícula:', err);
            }
            finally {
                client.release();
                channel.ack(msg);
            }
        }));
    });
}
startWorker().catch((err) => {
    console.error('[worker] Falha ao iniciar:', err);
    process.exit(1);
});
