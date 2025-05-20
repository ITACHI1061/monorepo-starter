/**
 * value 가 최소값 이하일 경우 최소값으로, 최대값 이상은 최대값으로 처리
 * @example
 * clamp(120, 50, 100); // 100
 * clamp(10, 15, 20);   // 15
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * @example
 * random(0, 5);      // 0 < x <= 5
 * random(5);         // 0 < x <= 5
 * random(5, true);   // 0 < x <= 5
 * random(1.2, 5.2);  // 1.2 < x <= 5.2
 * random();          // 0 or 1
 * random(-1);        // -1 or 0
 */
export function random(lower = 0, upper: number, floating: boolean = false) {
  if (typeof upper === 'boolean') {
    floating = upper;
  }

  if (isNaN(upper)) {
    upper = lower < 0 ? 0 : 1;
  }

  if (typeof floating === 'undefined') {
    floating = !Number.isInteger(lower) || !Number.isInteger(upper);
  }

  const randomNumber = Math.random() * (upper - lower) + lower;
  return floating ? randomNumber : Math.round(randomNumber);
}

/**
 * @example
 * zerofill(35, 2)  // 35
 * zerofill(7, 3)   // 007
 * zerofill(37, 4)  // 0037
 * zerofill(799, 2) // 799
 */
export function zerofill(num: number, precision: number = 2) {
  const strNumber = num.toString();

  if (strNumber.length >= precision) {
    return strNumber;
  } else {
    return '0'.repeat(precision - strNumber.length) + strNumber;
  }
}

/**
 * Number Format
 * @param value
 * @param precision - 자릿수
 * @example
 * format(999_999.999)     // 999,999.999
 * format(999_999, -3)     // 999,000
 * format(999_999.999, 1)  // 999,000.9
 */
export function format(value: number, precision: number = 0) {
  if (precision) {
    const modifier = 10 ** precision;
    return new Intl.NumberFormat().format(Math.floor(value * modifier) / modifier);
  }

  return new Intl.NumberFormat().format(value);
}
