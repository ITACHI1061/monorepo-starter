import diff from 'microdiff';
import { type UnknownRecord } from 'type-fest';

/**
 * 두 객체의 차이를 반환
 * @param from 기존 객체
 * @param to 비교 대상 객체
 * @example
 * const from = { a: 1, b: 2, c: 3 };
 * const to = { a: 1, b: 3, d: 4 };
 * const result = diffObject(from, to); // { added: ['b'], updated: ['b'], deleted: ['c'] }
 */
export function diffObject(previous: UnknownRecord, current: UnknownRecord) {
  const diffResult = diff(previous, current);

  const result = diffResult.reduce<{
    added: string[];
    updated: string[];
    deleted: string[];
  }>(
    (acc, item) => {
      if (item.type === 'CREATE') {
        acc.added.push(item.path.join('.'));
      }

      if (item.type === 'CHANGE') {
        acc.updated.push(item.path.join('.'));
      }

      if (item.type === 'REMOVE') {
        acc.deleted.push(item.path.join('.'));
      }

      return acc;
    },
    {
      added: [],
      updated: [],
      deleted: [],
    },
  );

  return result;
}
