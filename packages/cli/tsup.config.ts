// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts', '!src/*.test.ts'],
  outDir: 'dist',
  format: ['esm'],
  external: ['ts-morph', '@clack/prompts', 'fast-glob'],
  splitting: true,
  clean: true,
  treeshake: true,
  // dts: {
  //   compilerOptions: {
  //     rootDir: 'src',
  //   },
  // },
});
