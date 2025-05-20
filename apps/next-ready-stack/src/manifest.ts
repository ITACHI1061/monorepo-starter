import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next Ready Stack',
    short_name: 'Next Ready Stack',
    description: 'Next Ready Stack',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
