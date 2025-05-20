import { highlight } from '@monorepo-starter/ui/composites/code-highlight/highlight-html';
import type { MDXComponents } from 'mdx/types';
import { Article } from '~/components/common/article';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => <Article>{children}</Article>,
    pre: async ({ children }) => {
      const lang = children.props.className?.replace('language-', '');
      const html = await highlight(children.props.children, lang);
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    },
    ...components,
  };
}
