import { createStore } from 'zustand/vanilla';

export const countStore = createStore<{
  count: number;
  increment: () => void;
  decrement: () => void;
}>((set) => {
  const count = Number(window.localStorage.getItem('count') || '0');
  return {
    count,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  };
});

window.addEventListener('DOMContentLoaded', () => {
  const { getState, subscribe } = countStore;
  const { increment, decrement, count } = getState();

  document.querySelector('.zustand-counter-increment')!.addEventListener('click', (e) => {
    e.preventDefault();
    increment();
  });

  document.querySelector('.zustand-counter-decrement')!.addEventListener('click', (e) => {
    e.preventDefault();
    decrement();
  });

  document.querySelector('.zustand-counter-value')!.innerHTML = `${count}`;
  subscribe((nextState) => {
    document.querySelector('.zustand-counter-value')!.innerHTML = `${nextState.count}`;
  });
});

window.addEventListener('beforeunload', () => {
  window.localStorage.setItem('count', countStore.getState().count + '');
  window.localStorage.setItem('event', 'beforeunload');
});

window.addEventListener('pagehide', () => {
  window.localStorage.setItem('count', countStore.getState().count + '');
  window.localStorage.setItem('event', 'pagehide');
});
