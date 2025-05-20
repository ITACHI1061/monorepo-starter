'use client';

import { highlight } from '@monorepo-starter/ui/composites/code-highlight/highlight-jsx';
import { JSX, useLayoutEffect, useState } from 'react';

export default function CodeBlock({ initial }: { initial?: JSX.Element }) {
  const [nodes, setNodes] = useState(initial);

  useLayoutEffect(() => {
    void highlight('const loader = "Rendered on client";', 'ts').then(setNodes);
  }, []);

  return nodes ?? <p>Loading...</p>;
}
