import { devLog } from '@monorepo-starter/utils/console';
import { debounceAsync } from '@monorepo-starter/utils/fn';
import { watch } from 'chokidar';
import { generate as generateDictionaries } from './gen-dictionaries';
import { generate as generateRouteTypes } from './gen-routes';

/**
 * 자동 생성 스크립트
 */
export async function generateAll() {
  // 개발 환경에서는 파일 변경 시 자동 생성
  if (process.env.NODE_ENV === 'development') {
    watch(['./src/app', './src/dictionaries/**/*.yaml'], { persistent: true }).on(
      'all',
      // debounceAsync(async (eventName, path) => { ... }, 1000);
      debounceAsync(async () => {
        devLog('process', 'Generating all...');
        await Promise.all([generateRouteTypes('src/app-path-types.ts'), generateDictionaries('src/dictionaries')]);
        devLog('success', 'Generated all successfully');
      }, 1000),
    );
  }
  // 빌드 시, 한번만 실행
  else {
    void Promise.all([generateRouteTypes('src/app-path-types.ts'), generateDictionaries('src/dictionaries')]);
  }
}
