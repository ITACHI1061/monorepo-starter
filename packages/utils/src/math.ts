/**
 * 올림
 * @param value
 * @param precision - 자릿수
 * @example
 * const value1 = ceil(1_555_555.12345)     // 1,555,556
 * const value2 = ceil(1_555_555.12345, 2)  // 1,555,555.13
 * const value3 = ceil(1_222_222.12345, -3) // 1,223,000
 */
export function ceil(value: number, precision: number = 0) {
  const modifier = 10 ** precision;
  return Math.ceil(value * modifier) / modifier;
}

/**
 * 절삭
 * @param value
 * @param precision - 자릿수
 * @example
 * const value1 = floor(1_999_999.12345)      // 1,999,999
 * const value2 = floor(1_999_999.12345, 2)   // 1,999,999.12
 * const value3 = floor(1_999_999.12345, -3)  // 1,999,000
 */
export function floor(value: number, precision: number = 0) {
  const modifier = 10 ** precision;
  return Math.floor(value * modifier) / modifier;
}

/**
 * 최대값
 * @param nums
 * @example
 * const value1 = max([1, 2, 3, 4, 5]); // 5
 */
export function max(nums: number[]) {
  if (nums.length) return Math.max(...nums);
}

/**
 * 평균값
 * @param arr
 * @example
 * const value1 = mean([1, 2, 3, 4, 5]); // 3
 */
export function mean(arr: number[]) {
  return arr.reduce((acc, num) => acc + num, 0) / arr.length;
}

/**
 * 최소값
 * @param nums
 * @example
 * const value1 = min([1, 2, 3, 4, 5]); // 1
 */
export function min(nums: number[]) {
  if (nums.length) return Math.min(...nums);
}

/**
 * 반올림
 * @param value
 * @param precision - 자릿수
 * @example
 * const value1 = round(1_555_555.12345)     // 1,555,555
 * const value2 = round(1_555_555.12345, 2)  // 1,555,555.12
 * const value3 = round(1_222_222.12345, -3) // 1,222,000
 */
export function round(value: number, precision: number = 0) {
  const modifier = 10 ** precision;
  // return num.toFixed(precision);
  return Math.round(value * modifier) / modifier;
}

/**
 * 합계
 */
export function sum(arr: number[]) {
  return arr.reduce((acc, num) => acc + num, 0);
}
