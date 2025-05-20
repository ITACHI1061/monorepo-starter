import { Toaster } from '@monorepo-starter/ui/components/sonner';
import { Viewport, type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { CommandProvider } from '~/components/command/command-provider';
import { CounterStoreProvider } from '~/lib/counter/counter-store-provider';
import { UploaderStoreProvider } from '~/lib/experimental-upload/uploader-store-provider';
import { getLocale } from '~/lib/i18n/locale';
import { WebPushProvider } from '~/lib/push/web-push-provider';
import { TanstackQueryProvider } from '~/lib/query/query-provider';
import './globals.css';

import '@monorepo-starter/ui/globals.css';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    default: 'Next Ready Stack',
    template: '%s | Next Ready Stack',
  },
  description: 'Next Ready Stack',
  appleWebApp: {
    title: 'Next Ready Stack',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  themeColor: '#000',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className={`${pretendard.variable} antialiased`}>
      <body>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
          <NuqsAdapter>
            <TanstackQueryProvider>
              <UploaderStoreProvider>
                <CounterStoreProvider>
                  <WebPushProvider>
                    <CommandProvider>{children}</CommandProvider>
                  </WebPushProvider>
                </CounterStoreProvider>
              </UploaderStoreProvider>
            </TanstackQueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
