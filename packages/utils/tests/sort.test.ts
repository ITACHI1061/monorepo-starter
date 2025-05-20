import { describe, expect, it } from 'vitest';
import { sortArrayObject } from '~/sort.js';

describe('sort', () => {
  const data = [
    { a: 1, b: 10 },
    { a: 2, b: 50 },
    { a: 3, b: 30 },
  ];

  it(`sort.sortArrayObject 테스트(오름차순)`, () => {
    expect(sortArrayObject(data, { asc: (a) => a.a })[0]?.a).toBe(1);
  });

  it(`sort.sortArrayObject 테스트(내림차순)`, () => {
    expect(sortArrayObject(data, { desc: (a) => a.b })[0]?.b).toBe(50);
  });
});
