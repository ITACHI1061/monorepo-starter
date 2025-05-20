import type { Metadata } from 'next';
import { Article } from '~/components/common/article';

export const metadata: Metadata = {
  title: 'Form',
};

export default async function FormLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
