/**
 * 현재는 `unused-import` 기능만 구현되어 있지만, `importMap`을 활용하여 다양하게 확장 가능
 * @example
 * pnpm cli unused-import apps/next-ready-stack
 */
import { intro, outro, select } from '@clack/prompts';
import { difference } from '@monorepo-starter/utils/array';
import { devLog } from '@monorepo-starter/utils/console';
import FastGlob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import { Project } from 'ts-morph';

// 현재 파일의 실행 경로를 프로젝트 루트로 변경
process.chdir(path.join(import.meta.dirname, '../../..'));

// Run
void main();

async function main() {
  const workspace = await findWorkspace();
  await findAllFiles(workspace);
}

async function findWorkspace() {
  let workspace = '';
  if (process.argv.length === 3) {
    workspace = process.argv[2] as string;
  } else {
    intro('Pick a workspace');
    const workspaceList = await FastGlob('apps/*', { onlyDirectories: true });
    const selectedWorkspace = await select({
      message: 'Pick a workspace',
      options: workspaceList.map((pathName) => ({ value: pathName })),
    });
    outro(`Workspace: ${selectedWorkspace.toString()}`);
    workspace = selectedWorkspace.toString();
  }

  try {
    fs.accessSync(path.join(workspace, 'tsconfig.json'));
    return workspace;
  } catch (error) {
    process.exit(0);
  }
}

function findAllFiles(workspace: string) {
  devLog('info', `Workspace: ${workspace}`);
  devLog('info', `process.cwd(): ${process.cwd()}`);
  devLog('process', `Start unused-import...`);
  const tsConfigPath = path.join(workspace, 'tsconfig.json');

  try {
    fs.accessSync(tsConfigPath);
  } catch {
    throw new Error(`Workspace ${workspace} not found`);
  }

  const project = new Project({ tsConfigFilePath: tsConfigPath, skipAddingFilesFromTsConfig: true });

  let findPathGlob: string[] = [];
  try {
    fs.accessSync(path.join(workspace, 'src'));
    findPathGlob = [`${workspace}/src/**/*.{ts,tsx}`];
  } catch {
    findPathGlob = [`${workspace}/**/*.{ts,tsx}`, `!${workspace}/{node_modules,public}/**`];
  }

  project.addSourceFilesAtPaths(findPathGlob);
  devLog('process', `add files to ${workspace}...`);

  const localImportMap: { filePath: string; imports: string[] }[] = [];

  devLog('process', `find files..`);
  project.getSourceFiles().forEach((sourceFile) => {
    const filePath = sourceFile.getFilePath();
    const relativePath = path.relative(workspace, filePath);

    const localResult = {
      filePath: relativePath,
      imports: [],
    } as {
      filePath: string;
      imports: string[];
    };

    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
      const importFullPath = importDeclaration.getModuleSpecifierSourceFile()?.getFilePath();
      if (!importFullPath) {
        return;
      }

      const relativeImportFullPath = path.relative(workspace, importFullPath);
      // 외부 라이브러리 사용 Skip
      if (relativeImportFullPath.startsWith('../../node_modules')) {
        return;
      }

      // 워크스페이스 패키지 사용 Skip
      if (relativeImportFullPath.startsWith('../../packages/')) {
        return;
      }

      // 로컬 파일만 추가
      localResult.imports.push(relativeImportFullPath);
    });
    localImportMap.push(localResult);
  });

  const unusedImport = findUnusedImport(localImportMap);
  devLog('success', `Search Files: ${localImportMap.length}`);
  devLog('success', `Unused Import: ${unusedImport.length}`);
  unusedImport.forEach((filePath) => {
    devLog('info', `${workspace}/${filePath}`);
  });
}

function findUnusedImport(localImportMap: { filePath: string; imports: string[] }[]) {
  const filePathList = new Set<string>();
  const importPathList = new Set<string>();

  localImportMap.forEach((item) => {
    filePathList.add(item.filePath);
    item.imports.forEach((importPath) => {
      importPathList.add(importPath);
    });
  });

  const diff = difference([...filePathList], [...importPathList]);

  const regExpList = [
    /(src\/)?((manifest|mdx-components|middleware|instrumentation|instrumentation-client)\.(ts|tsx))$/,
    /(src\/)?app\/.*((layout|page|loading|not-found|error|global-error|default|route|template|default)\.(ts|tsx))$/,
  ];

  // next.js 파일 제외
  return diff.filter((pathName) => {
    if (regExpList.some((regExp) => pathName.match(regExp))) {
      return false;
    }

    return true;
  });
}

export { findUnusedImport, main };
