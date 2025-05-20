export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { generateAll } = await import('@monorepo-starter/utils/codegen');
    generateAll();
  }
}
