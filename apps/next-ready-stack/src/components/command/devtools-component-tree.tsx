'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { toast } from 'sonner';
import { type ComponentTreeJson } from '~/app-path-types';
import { copyToClipboard, openInIde, readCodeFromFile } from './actions';

const classNames = {
  row: cn(``),
  token: cn(`text-zinc-300`),
  component: cn(`text-yellow-200`),
  attrebuteName: cn(`text-orange-300/80`),
  link: cn(`text-green-400`),
};

export function ComponentTree({ componentTreeJson }: { componentTreeJson: ComponentTreeJson }) {
  const handleOpenInIde = (path: string) => () => {
    openInIde(path);
  };

  const handleCopyToClipboardPath = (path: string) => async () => {
    await copyToClipboard(path);
    toast.success('Path copied to clipboard', { duration: 1000 });
  };

  const handleCopyToClipboardCode = (path: string) => async () => {
    const code = await readCodeFromFile(path);
    if (!code) {
      return;
    }

    await copyToClipboard(code);
    toast.success('Code copied to clipboard', { duration: 1000 });
  };

  const LinkSpan = ({ path, children }: { path: string; children: React.ReactNode }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className={classNames.link}>{children}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleOpenInIde(path)}>Open in IDE</DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyToClipboardPath(path)}>Copy Path</DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyToClipboardCode(path)}>Copy Code</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  if (!componentTreeJson) return null;

  const path = componentTreeJson.path;

  if (componentTreeJson.type === 'Page') {
    return (
      <div className={classNames.row}>
        <OpenTag component={componentTreeJson.type} selfClosing>
          <Attribute name="src" value={<LinkSpan path={path}>{path}</LinkSpan>} />
        </OpenTag>
      </div>
    );
  }

  return (
    <div className={classNames.row}>
      <OpenTag component={componentTreeJson.type}>
        {componentTreeJson.fallback ? (
          <Attribute
            name="fallback"
            valueType="object"
            value={
              <OpenTag component={componentTreeJson.fallback} selfClosing>
                <Attribute name="src" value={<LinkSpan path={path}>{path}</LinkSpan>} />
              </OpenTag>
            }
          />
        ) : (
          <Attribute name="src" value={<LinkSpan path={path}>{path}</LinkSpan>} />
        )}
      </OpenTag>

      {componentTreeJson.children && componentTreeJson.children.length > 0 && (
        <div className="pl-4">
          {componentTreeJson.children.map((child) => (
            <ComponentTree key={child.path} componentTreeJson={child} />
          ))}
        </div>
      )}

      <CloseTag component={componentTreeJson.type} />
    </div>
  );
}

function OpenTag({
  component,
  selfClosing = false,
  children = null,
}: {
  component: string;
  selfClosing?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="inline-flex whitespace-nowrap">
      <span className={classNames.token}>{`<`}</span>
      <span className={classNames.component}>{component}</span>
      {children}
      <span className={classNames.token}>{selfClosing ? '/>' : '>'}</span>
    </div>
  );
}

function CloseTag({ component }: { component: string }) {
  return (
    <div className="inline-flex whitespace-nowrap">
      <span className={classNames.token}>{`</`}</span>
      <span className={classNames.component}>{component}</span>
      <span className={classNames.token}>{`>`}</span>
    </div>
  );
}

function Attribute({
  name,
  value,
  valueType = 'string',
}: {
  name: string;
  value: React.ReactNode;
  valueType?: string;
}) {
  return (
    <div className="inline-flex pl-1">
      <span className={classNames.attrebuteName}>{name}</span>
      <span className={classNames.token}>=</span>
      <div className={cn(valueType === 'string' && `text-green-600`, valueType === 'object' && `text-blue-400`)}>
        {valueType === 'object' && '{ '}
        {valueType === 'string' && '"'}
        {value}
        {valueType === 'string' && '"'}
        {valueType === 'object' && ' }'}
      </div>
    </div>
  );
}
