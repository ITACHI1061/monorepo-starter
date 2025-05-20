/**
 * 배열 청크 분할
 * @example
 * const a = [1,2,3,4,5];
 * const b = chunk(a, 2); // [[1,2], [3,4], [5]]
 */
export function chunk<T>(arr: T[], chunkSize = 1, cache: T[][] = []) {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
}

/**
 * 두 배열의 차집합을 반환
 * @example
 * const a = [1,2,3,4];
 * const b = [3,4,5];
 * const result = difference(a, b); // [1, 2, 5]
 */
export function difference<T>(arr1: T[], arr2: T[]) {
  return arr1.filter((x) => !arr2.includes(x));
}

/**
 * 첫 번째 배열에서 두 번째 배열의 요소를 제외한 차집합을 반환
 * @example
 * const a = [1,2,3,4];
 * const b = [3,4,5];
 * const result = differenceFrom(a, b); // [1, 2, 5]
 */
export function differenceFrom<T>(arr1: T[], arr2: T[]) {
  return arr1.filter((x) => !arr2.includes(x)).concat(arr2.filter((x) => !arr1.includes(x)));
}

/**
 * 범위 생성
 * @param start
 * @param end
 * @param increment
 * @example
 * range(4) // => [0, 1, 2, 3]
 * range(-4) // => [0, -1, -2, -3]
 * range(1, 5) // => [1, 2, 3, 4]
 * range(0, 20, 5) // => [0, 5, 10, 15]
 * range(0, -4, -1) // => [0, -1, -2, -3]
 * range(1, 4, 0) // => [1, 1, 1]
 * range(0) // => []
 */
export function range(start: number, end?: number, increment?: number) {
  const isEndDef = typeof end !== 'undefined';
  const endValue = isEndDef ? end : start;
  const startValue = isEndDef ? start : 0;

  // if the increment is not defined, we could need a +1 or -1
  // depending on whether we are going up or down
  if (typeof increment === 'undefined') {
    increment = Math.sign(endValue - startValue);
  }

  // calculating the lenght of the array, which has always to be positive
  const length = Math.abs((endValue - startValue) / (increment || 1));

  // In order to return the right result, we need to create a new array
  // with the calculated length and fill it with the items starting from
  // the start value + the value of increment.
  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      // append the current value to the result array
      result: [...result, current],
      // adding the increment to the current item
      // to be used in the next iteration
      current: current + increment,
    }),
    { current: startValue, result: [] },
  );

  return result;
}

/**
 * Intersection 2 Array (교집합)
 * @example
 * const a = [1,2,3,4];
 * const b = [3,4,5];
 * const result = intersection(a, b); // [3, 4]
 */
export function intersection<T>(arr: T[], ...args: T[][]) {
  return arr.filter((item) => args.every((arr) => arr.includes(item)));
}

/**
 * 배열 중복 제거 및 정렬
 * @example
 * const a = [1, 2, 2, 3, 4, 4, 5];
 * const result = sortedUniq(a); // [1, 2, 3, 4, 5]
 */
export function sortedUniq<T>(arr: T[]) {
  return [...new Set(arr)].sort();
}

/**
 * 배열 합치기 및 중복 제거
 * @example
 * const a = [1, 2, 3];
 * const b = [4, 5, 6];
 * const result = union(a, b); // [1, 2, 3, 4, 5, 6]
 */
export function union<T>(arr: T[], ...args: T[][]) {
  return [...new Set(arr.concat(...args))];
}

/**
 * 배열 중복 제거
 * @example
 * const a = [1, 2, 2, 3, 4, 4, 5];
 * const result = uniq(a); // [1, 2, 3, 4, 5]
 */
export function uniq<T>(arr: T[]) {
  return [...new Set(arr)];
}

/**
 * 배열 위치 이동
 * @example
 * move([1,2,3,4], 2, 1) // [1,3,2,4]
 * move([1, 2, 3, 4], 3, 0) // [4,1,2,3]
 */
export function move<T = any>(array: T[], fromIndex: number, toIndex: number) {
  const value = array[fromIndex];
  if (value === undefined) return array;
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, value);
  return array;
}
