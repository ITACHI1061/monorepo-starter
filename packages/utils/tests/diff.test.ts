import { describe, expect, it } from 'vitest';
import { diffObject } from '~/diff.js';

describe('diff', () => {
  it(`diff.diffObject 테스트(값 추가)`, () => {
    const previous = {
      name: 'kim',
      age: 20,
      gender: 'male',
      jobs: ['developer', 'designer'],
    };
    const current = {
      name: 'kims',
      age: 20,
      gender: 'male',
      jobs: ['developer'],
      address: 'seoul',
    };
    const { added, updated, deleted } = diffObject(previous, current);

    expect(added).toContain('address');
    expect(updated).toContain('name');
    expect(deleted).toContain('jobs.1');
  });
});
