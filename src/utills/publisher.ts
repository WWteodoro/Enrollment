import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redis.connect().catch(console.error);

export const publisher = {
  async publish(stream: string, payload: Record<string, any>) {
    const entries: [string, string][] = Object.entries({
      ...payload,
      timestamp: Date.now().toString()
    }).map(([key, value]) => [key, String(value)]);

    await redis.xAdd(stream, '*', Object.fromEntries(entries));
    console.log(`[publisher] Event published to "${stream}":`, payload);
  }
};
