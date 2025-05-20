import { faker } from '@faker-js/faker/locale/ko';
import { notFound } from 'next/navigation';
import DetailFullPage from './full-page';
import DetailModal from './modal';

type Slug = [id: string, pageType: 'modal' | 'split' | 'full'];

export default async function DetailPage({ params }: { params: Promise<{ slug: Slug }> }) {
  const { slug } = await params;
  const [id, pageType] = slug;

  if (!id || !pageType) {
    notFound();
  }

  if (pageType === 'modal') {
    return (
      <DetailModal>
        <div className="detail-page flex-1">
          <h1>Detail Page</h1>
          <p>ID: {id}</p>
          <p>TYPE: {pageType}</p>
        </div>
      </DetailModal>
    );
  }

  if (pageType === 'full') {
    return <DetailFullPage>{faker.lorem.paragraphs(20)}</DetailFullPage>;
  }

  return (
    <div className="detail-page bg-foreground/10 shadow-foreground/30 h-full flex-1 rounded border p-4 shadow">
      <h1>Detail Page</h1>
      <p>{id}</p>
      <p>{pageType}</p>
    </div>
  );
}
