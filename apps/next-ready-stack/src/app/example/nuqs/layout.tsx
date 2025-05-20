import type { Metadata } from 'next';
import { Article } from '~/components/common/article';

export const metadata: Metadata = {
  title: 'Nuqs',
};

export default async function NuqsLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
