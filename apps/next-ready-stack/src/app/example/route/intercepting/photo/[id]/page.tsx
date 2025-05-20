import PhotoDetail from '../../photo-detail';

export default async function AppInterceptingPhotoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PhotoDetail id={id} />;
}
