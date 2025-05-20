'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@monorepo-starter/ui/components/dialog';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import PhotoDetail from '../../../photo-detail';

export default function AppInterceptingPhotoDetailModalPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div>
          <PhotoDetail id={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
