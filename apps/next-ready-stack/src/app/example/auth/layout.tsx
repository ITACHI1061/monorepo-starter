import { type Metadata } from 'next';
import { Article } from '~/components/common/article';

export const metadata: Metadata = {
  title: 'Auth',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Article>{children}</Article>;
}
