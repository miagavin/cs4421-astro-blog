import { defineMiddleware } from 'astro:middleware';
import { logRequest } from './utils/logger';

export const onRequest = defineMiddleware(async (context, next) => {
  const start = performance.now();
  const route = new URL(context.request.url).pathname;

  // ROLLBACK DRILL 2: deliberately broken health check.
  const response =
    route === '/api/health'
      ? new Response('simulated failure', { status: 500 })
      : await next();

  logRequest({
    route,
    method: context.request.method,
    statusCode: response.status,
    latencyMs: Math.round(performance.now() - start),
  });

  return response;
});