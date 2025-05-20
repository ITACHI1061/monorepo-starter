import type { Metadata } from 'next';
import { Article } from '~/components/common/article';

export const metadata: Metadata = {
  title: 'Zustand',
};

export default async function ZustandLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
