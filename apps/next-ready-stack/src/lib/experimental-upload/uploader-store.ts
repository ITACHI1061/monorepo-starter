import { createStore } from 'zustand/vanilla';

type UploaderState = {
  files: File[];
  status: 'ready' | 'uploading' | 'done';
  progress: Record<string, number>;
  totalUploaded: number; // 누적 업로드 바이트
  totalSize: number; // 전체 파일 크기
  overallPercent: number; // 전체 진행률
};

type UploaderActions = {
  setStatus: (status: UploaderState['status']) => void;
  setFiles: (files: File[]) => void;
  clearFiles: () => void;
  setOverallProgress: (uploaded: number, total: number) => void;
  setProgress: (fileName: string, percent: number) => void;
};

export const initUploaderStore = () =>
  ({
    files: [],
    progress: {},
    totalUploaded: 0,
    totalSize: 0,
    overallPercent: 0,
    status: 'ready',
  }) as UploaderState;

export const createUploaderStore = (initState = initUploaderStore()) =>
  createStore<UploaderState & UploaderActions>()((set) => ({
    ...initState,
    setStatus: (status: UploaderState['status']) => set({ status }),
    setFiles: (files) => set((state) => ({ files: [...state.files, ...files] })),
    clearFiles: () => set({ files: [] }),
    setOverallProgress: (uploaded, total) =>
      set(() => ({
        totalUploaded: uploaded,
        totalSize: total,
        overallPercent: total === 0 ? 0 : Math.round((uploaded / total) * 100),
      })),
    setProgress: (fileName, percent) =>
      set((state) => ({
        progress: { ...state.progress, [fileName]: percent },
      })),
  }));
