'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createCounterStore, initCounterStore } from './counter-store';

type CounterStoreApi = ReturnType<typeof createCounterStore>;

const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export const CounterStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<CounterStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createCounterStore(initCounterStore());
  }

  return <CounterStoreContext.Provider value={storeRef.current}>{children}</CounterStoreContext.Provider>;
};

export const useCounterStore = <T,>(selector: (store: ReturnType<CounterStoreApi['getState']>) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);
  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
