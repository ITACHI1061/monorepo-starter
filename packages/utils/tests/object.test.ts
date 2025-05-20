import { describe, expect, it } from 'vitest';
import { get, set } from '~/object.js';

describe('object', () => {
  it(`object.get 테스트`, () => {
    expect(get({ a: { b: { c: 1 } } }, ['a', 'b', 'c'], 10)).toEqual(1);
  });

  it(`object.set 테스트(값 변경)`, () => {
    expect(set({ a: { b: { c: 1 } } }, ['a', 'b', 'c'], 10)).toEqual({
      a: { b: { c: 10 } },
    });
  });

  it(`object.set 테스트(값 추가)`, () => {
    expect(set({ a: { b: { c: 1 } } }, ['a', 'b', 'd'], 10)).toEqual({
      a: { b: { c: 1, d: 10 } },
    });
  });
});
