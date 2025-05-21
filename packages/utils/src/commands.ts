import os from 'node:os';

export type EditorType =
  | 'cursor'
  | 'vscode'
  | 'windsurf'
  | 'webstorm'
  | 'intellij'
  | 'neovim'
  | 'sublimetext'
  | 'emacs';

export function openInEditorCommand(editor: EditorType, fileName: string, lineNumber?: number) {
  switch (editor) {
    case 'cursor':
      return `cursor --goto ${fileName}:${lineNumber}`;

    case 'windsurf':
      return `windsurf ${fileName}:${lineNumber}`;

    case 'vscode':
      return `code -g ${fileName}:${lineNumber}`;

    case 'webstorm':
      return `webstorm --line ${lineNumber} ${fileName}`;

    case 'intellij':
      return `idea --line ${lineNumber} ${fileName}`;

    case 'neovim':
      return `nvim +${lineNumber} ${fileName}`;

    case 'sublimetext':
      return `subl ${fileName}:${lineNumber}`;

    case 'emacs':
      return `emacs +${lineNumber} ${fileName}`;

    default:
      throw new Error(`Unsupported editor: ${editor}`);
  }
}

export function copyToClipboardCommand(text: string) {
  try {
    const platform = os.platform();
    const release = os.release();

    if (platform === 'darwin') {
      return `echo "${text}" | pbcopy`;
    } else if (platform === 'win32') {
      return `echo ${text} | clip`;
    } else if (platform === 'linux') {
      const isWSL = release.toLowerCase().includes('microsoft');
      if (isWSL) {
        return `echo "${text}" | clip.exe`;
      } else {
        // xclip 또는 wl-copy 중 설치된 것 사용
        try {
          return `echo "${text}" | wl-copy`;
        } catch {
          return `echo "${text}" | xclip -selection clipboard`;
        }
      }
    } else {
      throw new Error('Unsupported platform');
    }
  } catch {
    throw new Error('Failed copy to clipboard');
  }
}
