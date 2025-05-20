// NOTE: This file should not be edited
import type { LiteralUnion } from 'type-fest';

export type StaticPath =
  | '/'
  | '/example'
  | '/example/auth'
  | '/example/auth/protect'
  | '/example/auth/public'
  | '/example/cache'
  | '/example/cache/01-data-cache-disabled'
  | '/example/cache/02-data-cache-time-based'
  | '/example/cache/03-data-cache-on-demand'
  | '/example/cache/04-full-route-disabled'
  | '/example/cache/05-full-route-force-static'
  | '/example/cache/06-full-route-time-based'
  | '/example/cache/07-isr'
  | '/example/cache/08-isr-force-static'
  | '/example/cache/09-isr-data-cache-revalidate'
  | '/example/code-block'
  | '/example/code-block/01-jsx'
  | '/example/code-block/02-html'
  | '/example/code-block/03-mdx'
  | '/example/code-block/04-editor'
  | '/example/code-block/05-editor-fs'
  | '/example/db'
  | '/example/db/crud'
  | '/example/dnd'
  | '/example/dnd/01-sortable-vertical'
  | '/example/dnd/02-sortable-horizontal'
  | '/example/dnd/03-sortable-grid'
  | '/example/dnd/04-multiple-container'
  | '/example/experimental'
  | '/example/experimental/api-cache'
  | '/example/experimental/file-upload'
  | '/example/form'
  | '/example/form/01-server-only'
  | '/example/form/02-client'
  | '/example/form/03-passing-args'
  | '/example/form/04-with-hook-form'
  | '/example/form/05-server-cookies'
  | '/example/form/06-events'
  | '/example/form/07-use-optimistic'
  | '/example/form/08-nested-list'
  | '/example/form/09-date-picker'
  | '/example/nuqs'
  | '/example/nuqs/01-client'
  | '/example/nuqs/02-server'
  | '/example/nuqs/03-complex'
  | '/example/push'
  | '/example/push/01-simple'
  | '/example/query'
  | '/example/query/prefetching'
  | '/example/query/straming'
  | '/example/route'
  | '/example/route/intercepting'
  | '/example/route/parallel'
  | '/example/table'
  | '/example/table/01-server-basic'
  | '/example/table/02-server-controls'
  | '/example/table/03-client-full'
  | '/example/virtual'
  | '/example/virtual/01-fixed-row'
  | '/example/virtual/02-fixed-column'
  | '/example/virtual/03-fixed-grid'
  | '/example/virtual/04-fixed-masonry-v'
  | '/example/virtual/05-fixed-masonry-h'
  | '/example/virtual/06-dynamic-row'
  | '/example/virtual/07-dynamic-column'
  | '/example/virtual/08-dynamic-grid'
  | '/example/virtual/09-infinite-scroll'
  | '/example/virtual/10-sortable-row'
  | '/example/virtual/11-sortable-column'
  | '/example/virtual/12-with-parallel-route'
  | '/example/zustand'
  | '/example/zustand/server'
  | '/example/zustand/server/view'
  | '/signin';

export type TypedRoute = LiteralUnion<
  StaticPath,
  | `/example/${string}`
  | `/example/${string}/${string}`
  | `/example/cache/07-isr/${string}`
  | `/example/cache/08-isr-force-static/${string}`
  | `/example/cache/09-isr-data-cache-revalidate/${string}`
  | `/example/route/intercepting/photo/${string}`
>;

export type ComponentTreeJson = {
  type: 'Layout' | 'Template' | 'ErrorBoundary' | 'Suspense' | 'Page';
  path: string;
  fallback?: 'Error' | 'NotFound' | 'Loading';
  children?: ComponentTreeJson[];
};

export type AppPathRoutes = {
  href: string | null;
  linkTypes: string;
  fileName: string;
  fileNames?: string[];
  componentTreeJson: ComponentTreeJson | null;
};

export const appPathRoutes: AppPathRoutes[] = [
  {
    href: '/',
    fileName: 'src/app/page.tsx',
    linkTypes: '/',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Page',
          path: 'src/app/page.tsx',
        },
      ],
    },
  },
  {
    href: '/example',
    fileName: 'src/app/example/page.tsx',
    linkTypes: '/example',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Page',
              path: 'src/app/example/page.tsx',
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/[lang]',
    fileName: 'src/app/example/[lang]/page.tsx',
    linkTypes: '/example/${string}',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/[lang]/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/[lang]/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/[lang]/[num]',
    fileName: 'src/app/example/[lang]/[num]/page.tsx',
    linkTypes: '/example/${string}/${string}',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/[lang]/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/[lang]/[num]/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/auth',
    fileName: 'src/app/example/auth/page.mdx',
    linkTypes: '/example/auth',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/auth/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/auth/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/auth/protect',
    fileName: 'src/app/example/auth/protect/page.tsx',
    linkTypes: '/example/auth/protect',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/auth/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/auth/protect/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/auth/public',
    fileName: 'src/app/example/auth/public/page.tsx',
    linkTypes: '/example/auth/public',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/auth/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/auth/public/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache',
    fileName: 'src/app/example/cache/page.mdx',
    linkTypes: '/example/cache',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/01-data-cache-disabled',
    fileName: 'src/app/example/cache/01-data-cache-disabled/page.tsx',
    linkTypes: '/example/cache/01-data-cache-disabled',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/01-data-cache-disabled/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/02-data-cache-time-based',
    fileName: 'src/app/example/cache/02-data-cache-time-based/page.tsx',
    linkTypes: '/example/cache/02-data-cache-time-based',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/02-data-cache-time-based/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/03-data-cache-on-demand',
    fileName: 'src/app/example/cache/03-data-cache-on-demand/page.tsx',
    linkTypes: '/example/cache/03-data-cache-on-demand',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/03-data-cache-on-demand/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/04-full-route-disabled',
    fileName: 'src/app/example/cache/04-full-route-disabled/page.tsx',
    linkTypes: '/example/cache/04-full-route-disabled',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/04-full-route-disabled/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/05-full-route-force-static',
    fileName: 'src/app/example/cache/05-full-route-force-static/page.tsx',
    linkTypes: '/example/cache/05-full-route-force-static',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/05-full-route-force-static/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/06-full-route-time-based',
    fileName: 'src/app/example/cache/06-full-route-time-based/page.tsx',
    linkTypes: '/example/cache/06-full-route-time-based',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/06-full-route-time-based/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/07-isr',
    fileName: 'src/app/example/cache/07-isr/page.tsx',
    linkTypes: '/example/cache/07-isr',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/07-isr/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/07-isr/[id]',
    fileName: 'src/app/example/cache/07-isr/[id]/page.tsx',
    linkTypes: '/example/cache/07-isr/${string}',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/07-isr/[id]/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/08-isr-force-static',
    fileName: 'src/app/example/cache/08-isr-force-static/page.tsx',
    linkTypes: '/example/cache/08-isr-force-static',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/08-isr-force-static/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/08-isr-force-static/[id]',
    fileName: 'src/app/example/cache/08-isr-force-static/[id]/page.tsx',
    linkTypes: '/example/cache/08-isr-force-static/${string}',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/08-isr-force-static/[id]/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/09-isr-data-cache-revalidate',
    fileName: 'src/app/example/cache/09-isr-data-cache-revalidate/page.tsx',
    linkTypes: '/example/cache/09-isr-data-cache-revalidate',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/09-isr-data-cache-revalidate/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/cache/09-isr-data-cache-revalidate/[id]',
    fileName: 'src/app/example/cache/09-isr-data-cache-revalidate/[id]/page.tsx',
    linkTypes: '/example/cache/09-isr-data-cache-revalidate/${string}',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/cache/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/cache/09-isr-data-cache-revalidate/[id]/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/code-block',
    fileName: 'src/app/example/code-block/page.mdx',
    linkTypes: '/example/code-block',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/code-block/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/code-block/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/code-block/01-jsx',
    fileName: 'src/app/example/code-block/01-jsx/page.tsx',
    linkTypes: '/example/code-block/01-jsx',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/code-block/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/code-block/01-jsx/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/code-block/02-html',
    fileName: 'src/app/example/code-block/02-html/page.tsx',
    linkTypes: '/example/code-block/02-html',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/code-block/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/code-block/02-html/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/code-block/03-mdx',
    fileName: 'src/app/example/code-block/03-mdx/page.mdx',
    linkTypes: '/example/code-block/03-mdx',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/code-block/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/code-block/03-mdx/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/code-block/04-editor',
    fileName: 'src/app/example/code-block/04-editor/page.tsx',
    linkTypes: '/example/code-block/04-editor',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/code-block/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/code-block/04-editor/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/code-block/05-editor-fs',
    fileName: 'src/app/example/code-block/05-editor-fs/page.tsx',
    linkTypes: '/example/code-block/05-editor-fs',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/code-block/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/code-block/05-editor-fs/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/db',
    fileName: 'src/app/example/db/page.mdx',
    linkTypes: '/example/db',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/db/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/db/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/db/crud',
    fileName: 'src/app/example/db/crud/page.tsx',
    linkTypes: '/example/db/crud',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/db/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/db/crud/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/dnd',
    fileName: 'src/app/example/dnd/page.mdx',
    linkTypes: '/example/dnd',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/dnd/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/dnd/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/dnd/01-sortable-vertical',
    fileName: 'src/app/example/dnd/01-sortable-vertical/page.tsx',
    linkTypes: '/example/dnd/01-sortable-vertical',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/dnd/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/dnd/01-sortable-vertical/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/dnd/02-sortable-horizontal',
    fileName: 'src/app/example/dnd/02-sortable-horizontal/page.tsx',
    linkTypes: '/example/dnd/02-sortable-horizontal',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/dnd/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/dnd/02-sortable-horizontal/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/dnd/03-sortable-grid',
    fileName: 'src/app/example/dnd/03-sortable-grid/page.tsx',
    linkTypes: '/example/dnd/03-sortable-grid',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/dnd/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/dnd/03-sortable-grid/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/dnd/04-multiple-container',
    fileName: 'src/app/example/dnd/04-multiple-container/page.tsx',
    linkTypes: '/example/dnd/04-multiple-container',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/dnd/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/dnd/04-multiple-container/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/experimental',
    fileName: 'src/app/example/experimental/page.mdx',
    linkTypes: '/example/experimental',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/experimental/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/experimental/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/experimental/api-cache',
    fileName: 'src/app/example/experimental/api-cache/page.tsx',
    linkTypes: '/example/experimental/api-cache',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/experimental/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/experimental/api-cache/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/experimental/file-upload',
    fileName: 'src/app/example/experimental/file-upload/page.tsx',
    linkTypes: '/example/experimental/file-upload',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/experimental/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/experimental/file-upload/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form',
    fileName: 'src/app/example/form/page.mdx',
    linkTypes: '/example/form',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/01-server-only',
    fileName: 'src/app/example/form/01-server-only/page.tsx',
    linkTypes: '/example/form/01-server-only',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/01-server-only/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/02-client',
    fileName: 'src/app/example/form/02-client/page.tsx',
    linkTypes: '/example/form/02-client',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/02-client/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/03-passing-args',
    fileName: 'src/app/example/form/03-passing-args/page.tsx',
    linkTypes: '/example/form/03-passing-args',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/03-passing-args/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/04-with-hook-form',
    fileName: 'src/app/example/form/04-with-hook-form/page.tsx',
    linkTypes: '/example/form/04-with-hook-form',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/04-with-hook-form/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/05-server-cookies',
    fileName: 'src/app/example/form/05-server-cookies/page.tsx',
    linkTypes: '/example/form/05-server-cookies',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/05-server-cookies/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/06-events',
    fileName: 'src/app/example/form/06-events/page.tsx',
    linkTypes: '/example/form/06-events',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/06-events/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/07-use-optimistic',
    fileName: 'src/app/example/form/07-use-optimistic/page.tsx',
    linkTypes: '/example/form/07-use-optimistic',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/07-use-optimistic/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/08-nested-list',
    fileName: 'src/app/example/form/08-nested-list/page.tsx',
    linkTypes: '/example/form/08-nested-list',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/08-nested-list/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/form/09-date-picker',
    fileName: 'src/app/example/form/09-date-picker/page.tsx',
    linkTypes: '/example/form/09-date-picker',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/form/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/form/09-date-picker/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/nuqs',
    fileName: 'src/app/example/nuqs/page.mdx',
    linkTypes: '/example/nuqs',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/nuqs/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/nuqs/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/nuqs/01-client',
    fileName: 'src/app/example/nuqs/01-client/page.tsx',
    linkTypes: '/example/nuqs/01-client',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/nuqs/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/nuqs/01-client/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/nuqs/02-server',
    fileName: 'src/app/example/nuqs/02-server/page.tsx',
    linkTypes: '/example/nuqs/02-server',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/nuqs/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/nuqs/02-server/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/nuqs/03-complex',
    fileName: 'src/app/example/nuqs/03-complex/page.tsx',
    linkTypes: '/example/nuqs/03-complex',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/nuqs/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/nuqs/03-complex/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/push',
    fileName: 'src/app/example/push/page.mdx',
    linkTypes: '/example/push',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/push/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/push/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/push/01-simple',
    fileName: 'src/app/example/push/01-simple/page.tsx',
    linkTypes: '/example/push/01-simple',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/push/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/push/01-simple/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/query',
    fileName: 'src/app/example/query/page.mdx',
    linkTypes: '/example/query',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/query/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/query/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/query/prefetching',
    fileName: 'src/app/example/query/prefetching/page.tsx',
    linkTypes: '/example/query/prefetching',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/query/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/query/prefetching/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/query/straming',
    fileName: 'src/app/example/query/straming/page.tsx',
    linkTypes: '/example/query/straming',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/query/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/query/straming/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/route',
    fileName: 'src/app/example/route/page.mdx',
    linkTypes: '/example/route',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/route/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/route/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/route/intercepting',
    fileName: 'src/app/example/route/intercepting/page.tsx',
    linkTypes: '/example/route/intercepting',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/route/layout.tsx',
              children: [
                {
                  type: 'Layout',
                  path: 'src/app/example/route/intercepting/layout.tsx',
                  children: [
                    {
                      type: 'Page',
                      path: 'src/app/example/route/intercepting/page.tsx',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/route/intercepting/photo/[id]',
    fileName: 'src/app/example/route/intercepting/photo/[id]/page.tsx',
    linkTypes: '/example/route/intercepting/photo/${string}',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/route/layout.tsx',
              children: [
                {
                  type: 'Layout',
                  path: 'src/app/example/route/intercepting/layout.tsx',
                  children: [
                    {
                      type: 'Suspense',
                      path: 'src/app/example/route/intercepting/photo/[id]/loading.tsx',
                      fallback: 'Loading',
                      children: [
                        {
                          type: 'Page',
                          path: 'src/app/example/route/intercepting/photo/[id]/page.tsx',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/route/parallel',
    linkTypes: '/example/route/parallel',
    fileName: '',
    fileNames: [
      'src/app/example/route/parallel/@comments/page.tsx',
      'src/app/example/route/parallel/@notifications/page.tsx',
      'src/app/example/route/parallel/@users/page.tsx',
    ],
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/route/layout.tsx',
              children: [
                {
                  type: 'Layout',
                  path: 'src/app/example/route/parallel/layout.tsx',
                  children: [
                    {
                      type: 'Layout',
                      path: 'src/app/example/route/parallel/@comments/layout.tsx',
                      children: [
                        {
                          type: 'Suspense',
                          path: 'src/app/example/route/parallel/@comments/loading.tsx',
                          fallback: 'Loading',
                          children: [
                            {
                              type: 'Page',
                              path: 'src/app/example/route/parallel/@comments/page.tsx',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'Layout',
                      path: 'src/app/example/route/parallel/@notifications/layout.tsx',
                      children: [
                        {
                          type: 'Suspense',
                          path: 'src/app/example/route/parallel/@notifications/loading.tsx',
                          fallback: 'Loading',
                          children: [
                            {
                              type: 'ErrorBoundary',
                              path: 'src/app/example/route/parallel/@notifications/error.tsx',
                              fallback: 'Error',
                              children: [
                                {
                                  type: 'Page',
                                  path: 'src/app/example/route/parallel/@notifications/page.tsx',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'Layout',
                      path: 'src/app/example/route/parallel/@users/layout.tsx',
                      children: [
                        {
                          type: 'Suspense',
                          path: 'src/app/example/route/parallel/@users/loading.tsx',
                          fallback: 'Loading',
                          children: [
                            {
                              type: 'Page',
                              path: 'src/app/example/route/parallel/@users/page.tsx',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/table',
    fileName: 'src/app/example/table/page.mdx',
    linkTypes: '/example/table',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/table/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/table/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/table/01-server-basic',
    fileName: 'src/app/example/table/01-server-basic/page.tsx',
    linkTypes: '/example/table/01-server-basic',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/table/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/table/01-server-basic/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/table/02-server-controls',
    fileName: 'src/app/example/table/02-server-controls/page.tsx',
    linkTypes: '/example/table/02-server-controls',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/table/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/table/02-server-controls/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/table/03-client-full',
    fileName: 'src/app/example/table/03-client-full/page.tsx',
    linkTypes: '/example/table/03-client-full',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/table/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/table/03-client-full/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual',
    fileName: 'src/app/example/virtual/page.mdx',
    linkTypes: '/example/virtual',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/01-fixed-row',
    fileName: 'src/app/example/virtual/01-fixed-row/page.tsx',
    linkTypes: '/example/virtual/01-fixed-row',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/01-fixed-row/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/02-fixed-column',
    fileName: 'src/app/example/virtual/02-fixed-column/page.tsx',
    linkTypes: '/example/virtual/02-fixed-column',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/02-fixed-column/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/03-fixed-grid',
    fileName: 'src/app/example/virtual/03-fixed-grid/page.tsx',
    linkTypes: '/example/virtual/03-fixed-grid',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/03-fixed-grid/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/04-fixed-masonry-v',
    fileName: 'src/app/example/virtual/04-fixed-masonry-v/page.tsx',
    linkTypes: '/example/virtual/04-fixed-masonry-v',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/04-fixed-masonry-v/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/05-fixed-masonry-h',
    fileName: 'src/app/example/virtual/05-fixed-masonry-h/page.tsx',
    linkTypes: '/example/virtual/05-fixed-masonry-h',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/05-fixed-masonry-h/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/06-dynamic-row',
    fileName: 'src/app/example/virtual/06-dynamic-row/page.tsx',
    linkTypes: '/example/virtual/06-dynamic-row',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/06-dynamic-row/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/07-dynamic-column',
    fileName: 'src/app/example/virtual/07-dynamic-column/page.tsx',
    linkTypes: '/example/virtual/07-dynamic-column',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/07-dynamic-column/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/08-dynamic-grid',
    fileName: 'src/app/example/virtual/08-dynamic-grid/page.tsx',
    linkTypes: '/example/virtual/08-dynamic-grid',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/08-dynamic-grid/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/09-infinite-scroll',
    fileName: 'src/app/example/virtual/09-infinite-scroll/page.tsx',
    linkTypes: '/example/virtual/09-infinite-scroll',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/09-infinite-scroll/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/10-sortable-row',
    fileName: 'src/app/example/virtual/10-sortable-row/page.tsx',
    linkTypes: '/example/virtual/10-sortable-row',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/10-sortable-row/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/11-sortable-column',
    fileName: 'src/app/example/virtual/11-sortable-column/page.tsx',
    linkTypes: '/example/virtual/11-sortable-column',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/virtual/11-sortable-column/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/virtual/12-with-parallel-route',
    linkTypes: '/example/virtual/12-with-parallel-route',
    fileName: '',
    fileNames: [
      'src/app/example/virtual/12-with-parallel-route/page.tsx',
      'src/app/example/virtual/12-with-parallel-route/@list/page.tsx',
    ],
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/virtual/layout.tsx',
              children: [
                {
                  type: 'Layout',
                  path: 'src/app/example/virtual/12-with-parallel-route/layout.tsx',
                  children: [
                    {
                      type: 'Suspense',
                      path: 'src/app/example/virtual/12-with-parallel-route/loading.tsx',
                      fallback: 'Loading',
                      children: [
                        {
                          type: 'Page',
                          path: 'src/app/example/virtual/12-with-parallel-route/page.tsx',
                        },
                        {
                          type: 'Page',
                          path: 'src/app/example/virtual/12-with-parallel-route/@list/page.tsx',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/zustand',
    fileName: 'src/app/example/zustand/page.mdx',
    linkTypes: '/example/zustand',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/zustand/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/zustand/page.mdx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/zustand/server',
    fileName: 'src/app/example/zustand/server/page.tsx',
    linkTypes: '/example/zustand/server',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/zustand/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/zustand/server/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/example/zustand/server/view',
    fileName: 'src/app/example/zustand/server/view/page.tsx',
    linkTypes: '/example/zustand/server/view',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Layout',
          path: 'src/app/example/layout.tsx',
          children: [
            {
              type: 'Layout',
              path: 'src/app/example/zustand/layout.tsx',
              children: [
                {
                  type: 'Page',
                  path: 'src/app/example/zustand/server/view/page.tsx',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    href: '/signin',
    fileName: 'src/app/signin/page.tsx',
    linkTypes: '/signin',
    componentTreeJson: {
      type: 'Layout',
      path: 'src/app/layout.tsx',
      children: [
        {
          type: 'Page',
          path: 'src/app/signin/page.tsx',
        },
      ],
    },
  },
];
