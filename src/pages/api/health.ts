import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};