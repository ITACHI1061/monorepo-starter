import { type Metadata } from 'next';
import { Article } from '~/components/common/article';

export const metadata: Metadata = {
  title: 'Cache',
};

export default function CacheLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
