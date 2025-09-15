import client from 'prom-client';

const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const requestCounter = new client.Counter({
  name: 'api_requests_total',
  help: 'Total de requisições na API',
  labelNames: ['method', 'route', 'status']
});

register.registerMetric(requestCounter);

export { register };