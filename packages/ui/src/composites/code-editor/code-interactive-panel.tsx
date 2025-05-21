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
import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@monorepo-starter/ui/components/tooltip';
import { CodeEditor } from '@monorepo-starter/ui/composites/code-editor/editor';
import { highlight } from '@monorepo-starter/ui/composites/code-highlight/highlight-jsx';
import { Check, Copy, FileCode2, FileTerminal, Loader2, SquarePen } from 'lucide-react';
import { useTheme } from 'next-themes';
import { JSX, useEffect, useState } from 'react';

type CodeInteractivePanelProps = {
  Component?: React.ReactNode;
  children?: React.ReactNode;
  filePath: string;
  getCodeFromFilePath: (filePath: string) => Promise<string>;
  copyCodeToClipboard: (filePath: string) => Promise<void>;
  openInEditor: (filePath: string) => Promise<void>;
  saveCodeToFile: (filePath: string, code: string) => Promise<void>;
};

export function CodeInteractivePanel({
  Component,
  children,
  filePath,
  getCodeFromFilePath,
  copyCodeToClipboard,
  openInEditor,
  saveCodeToFile,
}: CodeInteractivePanelProps) {
  const dev = process.env.NODE_ENV !== 'production';
  const Comp = Component || children;
  const [code, setCode] = useState('');
  const [nodes, setNodes] = useState<JSX.Element | null>(null);
  const [codeEditorOpen, setCodeEditorOpen] = useState(false);
  const [isCopied, setIsCopied] = useState<'pending' | 'success' | 'none'>('none');
  const [isRunning, setIsRunning] = useState<'pending' | 'success' | 'none'>('none');
  const fileName = filePath.split('/').pop();
  const { theme } = useTheme();

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 코드 편집기 모달 열림/닫힘 이벤트
  const handleOpenChangeCodeEditor = (open: boolean) => {
    setCodeEditorOpen(open);
  };

  // 코드 복사
  const handleClickCopyCode = async () => {
    setIsCopied('pending');
    await copyCodeToClipboard(filePath);
    setIsCopied('success');
    await delay(1000);
    setIsCopied('none');
  };

  // 코드 편집기 열기
  const handleClickOpenInEditor = async () => {
    setIsRunning('pending');
    await openInEditor(filePath);
    setIsRunning('success');
    await delay(1000);
    setIsRunning('none');
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

  // 단축키 할당
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
      await handleRefresh();
    };

    getCode();
  }, [filePath]);

  // 코드 하이라이트 처리
  useEffect(() => {
    void highlight(code, 'tsx', theme === 'light' ? 'one-dark-pro' : 'vitesse-black').then(setNodes);
  }, [code, theme]);

  return (
    <div onKeyDown={handleKeyDown} className="relative">
      <div className="border-muted-foreground/30 absolute right-0 top-0 rounded border px-1 *:cursor-pointer">
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
                  <DialogTitle className="font-mono text-sm">{fileName}</DialogTitle>
                  <DialogDescription aria-hidden="true" aria-label="Code Editor Modal">
                    코드 수정은 development 모드에서만 가능합니다.
                  </DialogDescription>
                </DialogHeader>
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
            <DialogContent className="sm:max-w-[75vw]">
              <DialogHeader>
                <DialogTitle className="font-mono text-sm">{fileName}</DialogTitle>
                <DialogDescription aria-hidden="true" aria-label="Code Block" />
              </DialogHeader>
              <ScrollArea className="max-h-[80vh] max-w-[calc(75vw-3rem)]">
                <div className="flex flex-col gap-2">{nodes}</div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </DialogContent>
          </Tooltip>
        </Dialog>

        {/* Copy Code */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleClickCopyCode} variant="ghost" className="size-8">
              {isCopied === 'pending' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : isCopied === 'success' ? (
                <Check className="size-4 text-green-600" />
              ) : (
                <Copy strokeWidth={1.5} className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy Code</TooltipContent>
        </Tooltip>

        {/* Open Code In Editor */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleClickOpenInEditor} variant="ghost" className="size-8">
              {isRunning === 'pending' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : isRunning === 'success' ? (
                <Check className="size-4 text-green-600" />
              ) : (
                <FileTerminal strokeWidth={1.5} className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open Code In Editor</TooltipContent>
        </Tooltip>
      </div>
      <div className="max-w-full overflow-auto">{Comp}</div>
    </div>
  );
}
