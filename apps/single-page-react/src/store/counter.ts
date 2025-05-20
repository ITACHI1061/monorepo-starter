import { create } from 'zustand';

type Store = {
  count: number;
  inc: () => void;
  dec: () => void;
};

/**
 * @example
 * const { count, inc } = useCountStore();
 * <button onClick={inc}>Increment</button>
 * <p>Count: {count}</p>
 */
export const useCountStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));
