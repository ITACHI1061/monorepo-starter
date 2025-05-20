import { CodeInteractivePanel } from '@monorepo-starter/ui/composites/code-editor/code-interactive-panel';
import { ButtonDemo } from './button-demo';
import { copyCodeToClipboard, getCodeFromFile, openInCursorEditor, saveCodeToFile } from './editorActions';

export default async function CodePage() {
  return (
    <div className="*:data-editor-wrapper:shadow *:data-editor-wrapper:not-first:mb-4 *:data-editor-wrapper:rounded-lg pb-4">
      <h1>파일시스템 기반 코드 에디터</h1>
      <ul>
        <li>컴포넌트 렌더링 포함</li>
        <li>컴포넌트 렌더링 미포함</li>
        <li>코드 에디팅</li>
        <li>코드 하이라이팅</li>
        <li>복사</li>
        <li>에디터로 열기</li>
        <li>파일 저장</li>
      </ul>

      <h3>컴포넌트 렌더링 포함</h3>

      <div className="not-prose overflow-auto rounded border p-4" data-editor-wrapper>
        <CodeInteractivePanel
          filePath="~/app/example/code-block/05-editor-fs/button-demo.tsx"
          Component={<ButtonDemo />}
          getCodeFromFilePath={getCodeFromFile}
          copyCodeToClipboard={copyCodeToClipboard}
          openInCursorEditor={openInCursorEditor}
          saveCodeToFile={saveCodeToFile}
        />
      </div>

      <h3>컴포넌트 렌더링 미포함</h3>
      <div className="not-prose rounded border p-4" data-editor-wrapper>
        <CodeInteractivePanel
          filePath="~/app/example/code-block/05-editor-fs/radio-group-demo.tsx"
          Component={<p>This is radio group demo</p>}
          getCodeFromFilePath={getCodeFromFile}
          copyCodeToClipboard={copyCodeToClipboard}
          openInCursorEditor={openInCursorEditor}
          saveCodeToFile={saveCodeToFile}
        />
      </div>
    </div>
  );
}
