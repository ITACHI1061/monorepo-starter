import '~/store/counter.ts';
import '~/store/text.ts';
import '~/style.css';
import { setupCounter } from './counter.ts';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';

// typescript string 에서 html 하이라이팅 & 자동완성 사용하기 위한 주석 설정
// (vscode extension: Tobermory.es6-string-html)
document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* html */ `
  <div>
    <div class="flex items-center justify-center gap-4">
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      </a>
    </div>

    <h1>Vite + TypeScript</h1>

    <div class="card">
      <button id="counter" type="button"></button>
    </div>

    <div class="flex flex-col items-center gap-4">
      <h2>Zustand Counter</h2>
      <div class="mb-4 flex items-center justify-stretch gap-2">
        <button class="zustand-counter-decrement border border-sky-200" type="button">-</button>
        <span class="w-15 zustand-counter-value rounded-lg bg-slate-200 p-2"></span>
        <button class="zustand-counter-increment border" type="button">+</button>
      </div>

      <h2>Zustand Text</h2>
      <div class="flex items-center justify-center gap-2">
        <input
          type="text"
          class="zustand-text-input h-10 rounded border border-slate-400 p-2"
          placeholder="input text"
        />
        <button class="zustand-text-reset" type="button">reset</button>
        <button class="zustand-text-update" type="button">update</button>
        <button class="zustand-text-setstate" type="button">setstate</button>
        <span class="zustand-text-value rounded-lg bg-slate-200 p-2 text-slate-400"></span>
      </div>
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
