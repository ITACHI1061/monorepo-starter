import {
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { type CodeToHastOptions } from 'shiki';

/**
 * @see {@link https://shiki.matsu.io/packages/transformers Transformers}
 * @see {@link https://shiki.matsu.io/packages/transformers#transformernotationhighlight TransformerNotationHighlight}
 * @see {@link https://shiki.matsu.io/packages/transformers#transformernotationwordhighlight TransformerNotationWordHighlight}
 * @see {@link https://shiki.matsu.io/packages/transformers#transformernotationerrorlevel TransformerNotationErrorLevel}
 */
export const transformers: CodeToHastOptions['transformers'] = [
  transformerNotationHighlight({
    matchAlgorithm: 'v3',
    classActiveLine: 'bg-gray-500/20',
  }),

  transformerNotationWordHighlight({
    matchAlgorithm: 'v3',
    classActiveWord: 'ring-1 ring-gray-200/40 rounded-xs',
  }),

  transformerNotationErrorLevel({
    matchAlgorithm: 'v3',
    classMap: {
      error: 'bg-red-600/20',
      warning: 'bg-yellow-600/20',
    },
  }),
  {
    code(node) {
      this.addClassToHast(node, 'flex flex-col');
    },
    line(node, line) {
      node.properties.dataLineNumber = line;
      this.addClassToHast(
        node,
        'text-[13px]/5 before:content-[attr(data-line-number)] before:inline-block before:w-13 before:pr-5 before:text-xs before:text-right before:text-background/50 w-full',
      );
    },
  },
];
