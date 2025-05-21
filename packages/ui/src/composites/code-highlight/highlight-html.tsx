import { transformers } from '@monorepo-starter/ui/composites/code-highlight/options';
import { type BundledLanguage, BundledTheme, CodeOptionsSingleTheme, CodeToHastOptions, codeToHtml } from 'shiki';

/**
 * 코드 문자열을 HTML 요소로 변환 (Server-side 사용가능)
 *
 * @throws ⚠️ 사용시, 메인 워크스페이스에서 반드시 다음의 패키지를 설치 해야 함
 * ```bash
 * pnpm add @shikijs/transformers
 * ```
 */
export async function highlight(
  code: string,
  lang: BundledLanguage,
  theme: CodeOptionsSingleTheme<BundledTheme>['theme'] = 'one-dark-pro',
  options?: Partial<CodeToHastOptions>,
) {
  return await codeToHtml(code, { theme, lang, transformers, ...options });
}
