import { type Metadata } from 'next';
import { Article } from '~/components/common/article';

export const metadata: Metadata = {
  title: 'Code Block',
};

export default function CodeBlockLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
