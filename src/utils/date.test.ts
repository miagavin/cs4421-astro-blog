import { describe, expect, it } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
	it('formats a date as "Mon D, YYYY"', () => {
		expect(formatDate(new Date(2026, 9, 24))).toBe('Oct 24, 2026');
	});

	it('does not pad single-digit days', () => {
		expect(formatDate(new Date(2026, 0, 5))).toBe('Jan 5, 2026');
	});
});