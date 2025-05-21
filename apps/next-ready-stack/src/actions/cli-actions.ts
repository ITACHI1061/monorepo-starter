'use server';

import { copyToClipboardCommand, openInEditorCommand } from '@monorepo-starter/utils/commands';
import { devLog } from '@monorepo-starter/utils/console';
import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import { env } from '~/env';

// 코드 저장
export async function saveCodeToFile(fileName: string, code: string) {
  if (fileName.startsWith('~/')) {
    fileName = fileName.replace('~/', './src/');
  }

  try {
    await fs.access(fileName);
    await fs.writeFile(fileName, code, 'utf-8');
  } catch (error) {
    devLog('error', error);
  }
}

// 코드 가져오기
export async function getCodeFromFile(fileName: string) {
  if (fileName.startsWith('~/')) {
    fileName = fileName.replace('~/', './src/');
  }

  return await fs.readFile(fileName, 'utf-8');
}

// 코드 편집기 열기
export async function openInEditor(fileName: string) {
  console.log(fileName);

  if (fileName.startsWith('~/')) {
    fileName = fileName.replace('~/', './src/');
  }

  try {
    execSync(openInEditorCommand(env.CODE_EDITOR, fileName, 1));
  } catch (error) {
    devLog('error', error);
  }
}

// 코드 복사
export async function copyCodeToClipboard(fileName: string) {
  const code = await getCodeFromFile(fileName);
  execSync(copyToClipboardCommand(code));
}
