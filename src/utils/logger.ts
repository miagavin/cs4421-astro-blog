export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export interface RequestLogInput {
  route: string;
  method: string;
  statusCode: number;
  latencyMs: number;
}

export function levelForStatus(statusCode: number): LogLevel {
  if (statusCode >= 500) return 'ERROR';
  if (statusCode >= 400) return 'WARN';
  return 'INFO';
}

export function formatRequestLog(input: RequestLogInput, now: Date = new Date()): string {
  return JSON.stringify({
    timestamp: now.toISOString(),
    level: levelForStatus(input.statusCode),
    route: input.route,
    method: input.method,
    statusCode: input.statusCode,
    latencyMs: input.latencyMs,
  });
}

export function logRequest(input: RequestLogInput): void {
  process.stdout.write(`${formatRequestLog(input)}\n`);
}