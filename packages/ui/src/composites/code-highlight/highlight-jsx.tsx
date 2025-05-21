import { transformers } from '@monorepo-starter/ui/composites/code-highlight/options';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, type JSX } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import {
  type BundledLanguage,
  BundledTheme,
  CodeOptionsSingleTheme,
  codeToHast,
  type CodeToHastOptions,
} from 'shiki/bundle/web';

/**
 * 코드 문자열을 JSX 요소로 변환 (Client-side Only)
 */
export async function highlight(
  code: string,
  lang: BundledLanguage,
  theme: CodeOptionsSingleTheme<BundledTheme>['theme'] = 'one-dark-pro',
  options?: Partial<CodeToHastOptions>,
) {
  const out = await codeToHast(code, { lang, transformers, theme, ...options });
  return toJsxRuntime(out, { Fragment, jsx, jsxs }) as JSX.Element;
}
