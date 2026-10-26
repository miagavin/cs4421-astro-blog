import { defineMiddleware } from 'astro:middleware';
import { logRequest } from './utils/logger';

export const onRequest = defineMiddleware(async (context, next) => {
  const start = performance.now();
  const response = await next();

  logRequest({
    route: new URL(context.request.url).pathname,
    method: context.request.method,
    statusCode: response.status,
    latencyMs: Math.round(performance.now() - start),
  });

  return response;
});