import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

/**
 * @see {@link https://nextjs.org/docs/app/api-reference/config/next-config-js NextConfig}
 */
const nextConfig: NextConfig = {
  devIndicators: {
    position: 'top-right',
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: false,
    },
  },
  output: process.env.STANDALONE ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  productionBrowserSourceMaps: true,
  serverExternalPackages: ['pino', 'pino-pretty'],
  transpilePackages: ['@monorepo-starter/utils', '@monorepo-starter/ui', '@t3-oss/env-nextjs', '@t3-oss/env-core'],
  experimental: {
    optimizePackageImports: ['@mantine/hooks'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
