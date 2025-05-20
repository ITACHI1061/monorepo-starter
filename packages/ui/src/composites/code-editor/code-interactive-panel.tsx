'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@monorepo-starter/ui/components/dialog';
import { Kbd } from '@monorepo-starter/ui/components/kbd';
import { Tooltip, TooltipContent, TooltipTrigger } from '@monorepo-starter/ui/components/tooltip';
import { CodeEditor } from '@monorepo-starter/ui/composites/code-editor/editor';
import { highlight } from '@monorepo-starter/ui/composites/code-highlight/highlight-jsx';
import { Copy, FileCode2, FileTerminal, SquarePen } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

type CodeInteractivePanelProps = {
  Component?: React.ReactNode;
  children?: React.ReactNode;
  filePath: string;
  getCodeFromFilePath: (filePath: string) => Promise<string>;
  copyCodeToClipboard: (filePath: string) => Promise<void>;
  openInCursorEditor: (filePath: string) => Promise<void>;
  saveCodeToFile: (filePath: string, code: string) => Promise<void>;
};

export function CodeInteractivePanel({
  Component,
  children,
  filePath,
  getCodeFromFilePath,
  copyCodeToClipboard,
  openInCursorEditor,
  saveCodeToFile,
}: CodeInteractivePanelProps) {
  const dev = process.env.NODE_ENV !== 'production';
  const Comp = Component || children;
  const [code, setCode] = useState('');
  const [nodes, setNodes] = useState<JSX.Element | null>(null);
  const [codeEditorOpen, setCodeEditorOpen] = useState(false);

  // 코드 편집기 모달 열림/닫힘 이벤트
  const handleOpenChangeCodeEditor = (open: boolean) => {
    setCodeEditorOpen(open);
  };

  // 코드 복사
  const handleClickCopyCode = async () => {
    await copyCodeToClipboard(filePath);
  };

  // 코드 편집기 열기
  const handleClickOpenInEditor = async () => {
    await openInCursorEditor(filePath);
  };

  // 코드 저장
  const handleSave = async () => {
    await saveCodeToFile(filePath, code);
  };

  // 코드 새로고침
  const handleRefresh = async () => {
    const code = await getCodeFromFilePath(filePath);
    setCode(code);
  };

  // 코드 저장 단축키
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Ctrl/Cmd + S: Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
      return;
    }
  };

  // 코드 가져오기
  useEffect(() => {
    const getCode = async () => {
      handleRefresh();
    };

    getCode();
  }, [filePath]);

  // 코드 하이라이트 처리
  useEffect(() => {
    void highlight(code, 'tsx').then(setNodes);
  }, [code]);

  return (
    <div onKeyDown={handleKeyDown}>
      <div className="flex items-center justify-end gap-0 pb-3 *:cursor-pointer">
        {/* Monaco Editor */}
        {dev && (
          <Dialog onOpenChange={handleOpenChangeCodeEditor} open={codeEditorOpen}>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="size-8">
                    <SquarePen strokeWidth={1.5} className="size-4" />
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>Code Editor Modal</TooltipContent>
              <DialogContent className="sm:max-w-[57rem]">
                <DialogHeader>
                  <DialogTitle className="text-sm">{filePath}</DialogTitle>
                  <p className="text-muted-foreground flex items-center gap-4 text-sm">
                    <span>
                      Save: <Kbd>⌘S</Kbd> / <Kbd>CTRL+S</Kbd>
                    </span>
                    <span>
                      Undo: <Kbd>⌘Z</Kbd> / <Kbd>CTRL+Z</Kbd>
                    </span>
                    <span>
                      Redo: <Kbd>⌘Y</Kbd> / <Kbd>CTRL+Y</Kbd>
                    </span>
                    <span>
                      AutoComplete: <Kbd>CTRL+SPACE</Kbd>
                    </span>
                  </p>
                  <p className="text-muted-foreground text-sm">코드 수정은 개발 모드에서만 가능</p>
                </DialogHeader>
                <DialogDescription aria-hidden="true" aria-label="Code Editor Modal" />
                <CodeEditor language="typescript" onChange={setCode}>
                  {code}
                </CodeEditor>
              </DialogContent>
            </Tooltip>
          </Dialog>
        )}

        {/* Shiki Code Viewer */}
        <Dialog>
          <Tooltip>
            <DialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="size-8">
                  <FileCode2 strokeWidth={1.5} className="size-4" />
                </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent>Open Code Viewer Modal</TooltipContent>
            <DialogContent className="sm:max-w-[70rem]">
              <DialogHeader>
                <DialogTitle>{filePath}</DialogTitle>
              </DialogHeader>
              <DialogDescription aria-hidden="true" aria-label="Code Block" />
              <div className="max-h-[500px] overflow-auto">{nodes}</div>
            </DialogContent>
          </Tooltip>
        </Dialog>

        {/* Copy Code */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleClickCopyCode} variant="ghost" className="size-8">
              <Copy strokeWidth={1.5} className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy Code</TooltipContent>
        </Tooltip>

        {/* Open Code In Editor */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleClickOpenInEditor} variant="ghost" className="size-8">
              <FileTerminal strokeWidth={1.5} className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open Code In Editor</TooltipContent>
        </Tooltip>
      </div>
      <div className="max-w-full overflow-auto">{Comp}</div>
    </div>
  );
}
