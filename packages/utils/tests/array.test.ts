import { describe, expect, it } from 'vitest';
import { chunk, difference, differenceFrom, move, range } from '~/array.js';

describe('array', () => {
  it('should be able to chunk an array', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should be able to difference an array', () => {
    expect(difference([1, 2, 3, 4, 5], [3, 4, 5])).toEqual([1, 2]);
  });

  it('should be able to difference symmetrical an array', () => {
    expect(differenceFrom([1, 2, 3, 4, 5], [3, 4])).toEqual([1, 2, 5]);
  });

  it('should be able to range an array', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
  });

  it('should be able to range an array with start, end', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
  });

  it('should be able to range an array with start, end, increment', () => {
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
  });

  it('should be able to range an array with start, end, increment', () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  it('should be able to range an array with start, end, increment', () => {
    expect(range(1, 4, 0)).toEqual([1, 1, 1]);
  });

  it('should be able to move an array', () => {
    expect(move([1, 2, 3, 4], 2, 1)).toEqual([1, 3, 2, 4]);
  });

  it('should be able to move an array', () => {
    expect(move([1, 2, 3, 4], 3, 0)).toEqual([4, 1, 2, 3]);
  });
});
