import { describe, it, expect } from 'vitest';
import { getQiblaDirection } from './islamicApi';

describe('getQiblaDirection', () => {
  it('returns the correct Google Maps URL and a numeric bearing', () => {
    const result = getQiblaDirection(0, 0);
    expect(result.url).toBe('https://www.google.com/maps/dir/0,0/21.4225,39.8262');
    expect(typeof result.bearing).toBe('number');
  });
});
