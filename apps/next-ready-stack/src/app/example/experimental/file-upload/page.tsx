'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Progress } from '@monorepo-starter/ui/components/progress';
import { round } from '@monorepo-starter/utils/math';
import { useRef } from 'react';
import { toast } from 'sonner';
import { useUploaderStore } from '~/lib/experimental-upload/uploader-store-provider';

export default function UploadPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    setFiles,
    files,
    setOverallProgress,
    overallPercent,
    setProgress,
    progress,
    setStatus,
    status,
    totalSize,
    totalUploaded,
  } = useUploaderStore((state) => state);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files ?? []));
  };

  const handleUpload = async () => {
    setStatus('uploading');
    const CHUNK_SIZE = 1024 * 1024; // 1MB

    // 전체 크기 계산
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    let uploaded = 0;
    setOverallProgress(0, totalSize);

    for (const file of files) {
      const totalSizeOfFile = file.size;
      const chunkCount = Math.ceil(totalSizeOfFile / CHUNK_SIZE);

      for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, totalSizeOfFile);
        const chunk = file.slice(start, end);

        await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'x-file-name': encodeURIComponent(file.name),
            'x-chunk-index': chunkIndex.toString(),
            'x-total-size': totalSizeOfFile.toString(),
          },
          body: chunk,
        });

        // 파일별 진행률
        const percent = Math.round(((chunkIndex + 1) / chunkCount) * 100);
        setProgress(file.name, percent);

        // 전체 진행률
        uploaded += chunk.size;
        setOverallProgress(uploaded, totalSize);
      }
    }

    if (fileRef.current) {
      fileRef.current.value = '';
    }

    setStatus('ready');
    toast.success('업로드 완료');
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">스트리밍 대용량 파일 업로드</h1>
      <div className="flex items-center gap-3 whitespace-nowrap text-sm">
        <span>{status}</span>
        <Progress value={overallPercent} />
        <span>{round(totalUploaded / 1024 / 1024, 2)} MB</span>
        <span> / </span>
        <span>{round(totalSize / 1024 / 1024, 2)} MB</span>
        <span>({overallPercent}%)</span>
      </div>
      <div>
        {files.map((file) => (
          <div key={file.name} className="flex items-center gap-1">
            {progress[file.name] && progress[file.name] === 100 ? (
              <div
                className="w-96 cursor-pointer truncate text-sm"
                onClick={() => {
                  window.open(`/api/upload?fileName=${file.name}`, '_blank');
                }}
              >
                {file.name}
              </div>
            ) : (
              <div className="w-96 truncate text-sm">{file.name}</div>
            )}
            <Progress value={progress[file.name] ?? 0} />
          </div>
        ))}
      </div>
      {status === 'ready' && (
        <div className="flex gap-2">
          <Input ref={fileRef} type="file" multiple accept="image/*,video/*" onChange={handleChangeFile} />
          <Button onClick={handleUpload} disabled={files.length === 0}>
            업로드
          </Button>
        </div>
      )}
    </div>
  );
}
