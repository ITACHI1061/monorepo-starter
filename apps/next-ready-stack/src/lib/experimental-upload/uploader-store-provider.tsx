'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createUploaderStore, initUploaderStore } from './uploader-store';

type UploaderStoreApi = ReturnType<typeof createUploaderStore>;

const UploaderStoreContext = createContext<UploaderStoreApi | undefined>(undefined);

export const UploaderStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<UploaderStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createUploaderStore(initUploaderStore());
  }

  return <UploaderStoreContext.Provider value={storeRef.current}>{children}</UploaderStoreContext.Provider>;
};

export const useUploaderStore = <T,>(selector: (store: ReturnType<UploaderStoreApi['getState']>) => T): T => {
  const uploaderStoreContext = useContext(UploaderStoreContext);
  if (!uploaderStoreContext) {
    throw new Error(`useUploaderStore must be used within UploaderStoreProvider`);
  }

  return useStore(uploaderStoreContext, selector);
};
