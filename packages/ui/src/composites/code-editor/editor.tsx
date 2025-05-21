'use client';

import { Editor, Monaco, OnMount } from '@monaco-editor/react';
import { emmetJSX } from 'emmet-monaco-es';
import { Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';

type Props = {
  language: 'typescript' | 'javascript' | 'json' | 'yaml';
  children: string;
  onChange?: (value: string) => void;
  theme?: 'light' | 'vs-dark';
  width?: string | number;
  height?: string | number;
};

/**
 * Monaco 코드 에디터
 */
export function CodeEditor({
  language,
  children,
  onChange,
  theme = 'vs-dark',
  height = '600px',
  width = '100%',
}: Props) {
  const [code, setCode] = useState(children);
  const monacoRef = useRef<Monaco>(null);

  // monaco 에디터 설정 세팅
  const handleBeforeMount = async (monaco: Monaco) => {
    // tsconfig 설정
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2017,
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      incremental: true,
      allowNonTsExtensions: true,
      reactNamespace: 'React',
      types: ['react'],
    });

    // 추가: 진단 기능 비활성화
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    });

    // Worker 설정
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.typescriptDefaults.setMaximumWorkerIdleTime(-1);

    // emmet 설정
    emmetJSX(monaco, ['typescript']);
  };

  // monaco ref 값 초기화
  const handleOnMount: OnMount = (_editor, monaco) => {
    monacoRef.current = monaco;
  };

  // 코드 변경 이벤트 핸들러
  const handleOnChange = (value: string = '') => {
    setCode(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div style={{ height }}>
      <Editor
        loading={<Loader2 className="size-4 animate-spin" />}
        width={width}
        height="100%"
        theme={theme} // 주의: Monaco 에디터는 전역 인스턴스를 사용
        language={language}
        value={code}
        onChange={handleOnChange}
        beforeMount={handleBeforeMount}
        onMount={handleOnMount}
        options={{
          fontSize: 13,
          fontLigatures: true,
          fontFamily: 'D2Coding',
          readOnly: false,
          lineHeight: 18,
          wordWrap: 'off',
          padding: {
            top: 20,
            bottom: 10,
          },
          matchBrackets: 'always',
          minimap: {
            enabled: false,
          },
          bracketPairColorization: {
            enabled: true,
          },
          cursorBlinking: 'blink',
          formatOnPaste: true,
          suggest: {
            showFields: false,
            showFunctions: false,
          },
          tabSize: 2,
          lineNumbersMinChars: 4,
          scrollBeyondLastLine: false, // 마지막 줄 이상 스크롤 방지
          rulers: [
            {
              color: theme === 'light' ? '#ddd' : '#36353b',
              column: 80,
            },
            {
              color: theme === 'light' ? '#bb7' : '#36353b',
              column: 120,
            },
          ],
          stickyScroll: {
            maxLineCount: 2,
          },
          suggestSelection: 'first',
        }}
      />
    </div>
  );
}
