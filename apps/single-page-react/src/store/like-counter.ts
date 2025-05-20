import { create } from 'zustand';

type Store = {
  count: Record<string, number>;
  inc: (id: string) => void;
  dec: (id: string) => void;
};

/**
 * @example
 * const { count, inc } = useCountStore();
 * <button onClick={inc}>Increment</button>
 * <p>Count: {count}</p>
 */
export const useCountStore = create<Store>()((set) => ({
  count: {},
  inc: (id) => set((state) => ({ count: { ...state.count, [id]: (state.count[id] || 0) + 1 } })),
  dec: (id) => set((state) => ({ count: { ...state.count, [id]: (state.count[id] || 0) - 1 } })),
}));
