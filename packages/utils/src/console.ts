import { clamp } from '@monorepo-starter/utils/number';

const RESET = '\x1b[0m';

const rgb = (value: string) => (text: string) => {
  const [red, green, blue] = value.split(' ').map(Number);
  if (!red || !green || !blue) {
    return text;
  }

  const clampedRed = clamp(red, 0, 255);
  const clampedGreen = clamp(green, 0, 255);
  const clampedBlue = clamp(blue, 0, 255);
  return `\x1b[38;2;${clampedRed};${clampedGreen};${clampedBlue}m${text}${RESET}`; // bg: \x1b[48;2;...
};

export const colors = {
  process: rgb('156 163 175'),
  success: rgb('34 197 94'),
  info: rgb('59 130 246'),
  warn: rgb('250 204 21'),
  error: rgb('239 68 68'),
  green: rgb('34 197 94'),
};

type LogType = 'process' | 'success' | 'info' | 'warn' | 'error';

/**
 * `Edge runtime` 과 `Node.js`, `web` 에서 동일한 콘솔 로그 스타일을 유지하기 위한 유틸리티 Logger
 * @see {@link https://ui.shadcn.com/colors Tailwind CSS Colors}
 */
export function devLog(type: LogType, ...args: any[]) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const log = console.log;

  // `web` 에서 로그 출력
  if (typeof window !== 'undefined') {
    switch (type) {
      case 'process':
        log(`%c⏳ ${args[0]}`, 'color:rgb(161,161,170);', ...args.slice(1));
        return;
      case 'success':
        log(`%c✅ ${args[0]}`, 'color:rgb(21,128,61);', ...args.slice(1));
        return;
      case 'info':
        log(`%c💡 ${args[0]}`, 'color:rgb(100,149,237);', ...args.slice(1));
        return;
      case 'warn':
        log(`%c⚠️ ${args[0]}`, 'color:rgb(202,138,4);', ...args.slice(1));
        return;
      case 'error':
        log(`%c❌ ${args[0]}`, 'color:rgb(185,28,28);', ...args.slice(1));
        return;
      default:
        log(...args);
        return;
    }
  }

  const now = `[${new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })}]`;

  switch (type) {
    case 'process':
      log(colors.process(` ⠋ ${now}`), ...args);
      return;
    case 'success':
      log(colors.success(` ✓ ${now}`), ...args);
      return;
    case 'info':
      log(colors.info(` ○ ${now}`), ...args);
      return;
    case 'warn':
      log(colors.warn(` ⚠ ${now}`), ...args);
      return;
    case 'error':
      log(colors.error(` ✗ ${now}`), ...args);
      return;
    default:
      log(...args);
      return;
  }
}
