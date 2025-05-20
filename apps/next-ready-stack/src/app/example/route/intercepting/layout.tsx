import { Article } from '~/components/common/article';

export default function AppInterceptingLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <Article>
      {children}
      {modal}
    </Article>
  );
}
