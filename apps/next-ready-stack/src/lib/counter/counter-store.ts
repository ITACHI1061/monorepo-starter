import { createStore } from 'zustand/vanilla';

type CounterState = {
  count: number;
};

type CounterActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export const initCounterStore = () => {
  return { count: new Date().getFullYear() } as CounterState;
};

export const createCounterStore = (initState: CounterState = initCounterStore()) => {
  return createStore<CounterState & CounterActions>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));
};
