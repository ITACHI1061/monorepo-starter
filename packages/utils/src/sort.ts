import { sort as fastSort, inPlaceSort, type ISortByObjectSorter } from 'fast-sort';

/**
 * 배열 객체 정렬
 * 100,000 정렬시, 112ms 소요
 * @example
 * const a = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * const b = sortArrayObject(a, { asc: (a) => a.a }); // [{ a: 1 }, { a: 2 }, { a: 3 }]
 */
export function sortArrayObject<T = any>(array: T[], compareFn: ISortByObjectSorter<T> | ISortByObjectSorter<T>[]) {
  return fastSort(array).by(compareFn);
}

/**
 * 배열 객체 정렬 (원본 변경)
 * @example
 * const a = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * const b = inPlaceSortArrayObject(a, { asc: (a) => a.a }); // [{ a: 1 }, { a: 2 }, { a: 3 }]
 */
export function sortArrayObjectInPlace<T = any>(
  array: T[],
  compareFn: ISortByObjectSorter<T> | ISortByObjectSorter<T>[],
) {
  return inPlaceSort(array).by(compareFn);
}
