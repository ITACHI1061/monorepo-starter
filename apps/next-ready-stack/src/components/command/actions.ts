'use server';

import { copyToClipboardCommand, openInEditorCommand } from '@monorepo-starter/utils/commands';
import { devLog } from '@monorepo-starter/utils/console';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import { env } from '~/env';

export async function openInIde(fileName: string) {
  try {
    execSync(openInEditorCommand(env.CODE_EDITOR, fileName, 1));
  } catch (error) {
    devLog('error', error);
  }
}

export async function readCodeFromFile(fileName: string) {
  try {
    return fs.readFileSync(fileName, 'utf8');
  } catch (error) {
    devLog('error', error);
    return '';
  }
}

export async function copyToClipboard(text: string) {
  try {
    execSync(copyToClipboardCommand(process.platform, os.release(), text));
  } catch (error) {
    devLog('error', error);
  }
}
