import { notFound } from 'next/navigation';
import { Article } from '~/components/common/article';
import { i18n, type Locale } from '~/lib/i18n/config';
import AppLangProvider from './provider';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AppLangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (!i18n.locales.includes(lang)) {
    notFound();
  }

  return (
    <Article>
      <AppLangProvider lang={lang}>{children}</AppLangProvider>
    </Article>
  );
}
