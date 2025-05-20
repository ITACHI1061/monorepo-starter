export function parseEnvToJson(raw: string) {
  const lines = raw.split('\n');
  const result: Record<string, string> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key) {
      result[key] = rest.join('=').replace(/^['"]|['"]$/g, '');
    }
  }

  return result;
}

export function convertJsonToEnv(json: Record<string, string>) {
  const lines = Object.entries(json).map(([key, value]) => `${key}=${String(value)}`);
  return lines.join('\n');
}
