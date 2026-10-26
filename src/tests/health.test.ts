import { describe, expect, it } from 'vitest';
import { GET } from '../pages/api/health';

describe('GET /api/health', () => {
  it('returns 200 with a JSON body', async () => {
    const response = await GET({} as Parameters<typeof GET>[0]);

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/json');

    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(typeof body.uptime).toBe('number');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });
});