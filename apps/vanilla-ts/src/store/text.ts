import { createStore } from 'zustand/vanilla';

export const textStore = createStore<{
  text: string;
  update: (text: string) => void;
  reset: () => void;
}>((set) => ({
  text: 'reset',
  update: (text: string) => set({ text }),
  reset: () => set({ text: 'reset' }),
}));

window.addEventListener('DOMContentLoaded', () => {
  const { getState, setState, subscribe } = textStore;
  const { reset, update } = getState();

  document.querySelector('.zustand-text-update')!.addEventListener('click', (e) => {
    e.preventDefault();
    /** @ts-ignore */
    const inputValue = document.querySelector('.zustand-text-input')!.value;
    update(inputValue);
  });

  document.querySelector('.zustand-text-setstate')!.addEventListener('click', (e) => {
    e.preventDefault();
    /** @ts-ignore */
    const inputValue = document.querySelector('.zustand-text-input')!.value;
    setState({ text: inputValue });
  });

  document.querySelector('.zustand-text-reset')!.addEventListener('click', (e) => {
    e.preventDefault();
    reset();
    /** @ts-ignore */
    document.querySelector('.zustand-text-input')!.value = 'reset';
  });

  subscribe((nextState) => {
    document.querySelector('.zustand-text-value')!.innerHTML = nextState.text;
  });
});
