/**
 * 지연 실행
 * @example
 * delay(1000);
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 한번만 실행되는 함수
 * @example
 * const a = once((a, b) => a + b);
 * a(1, 2); // 3
 */
export function once<T extends (...args: any[]) => any>(func: T) {
  let called = false;
  let result: ReturnType<T>;
  return (...args: Parameters<T>) => {
    if (!called) {
      result = func(...args);
      called = true;
    }
    return result;
  };
}

/**
 * 비동기 함수를 디바운스 처리
 */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args).catch((error) => {
        throw error;
      });
    }, delay);
  };
}
