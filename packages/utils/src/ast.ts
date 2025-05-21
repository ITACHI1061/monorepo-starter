import { ObjectLiteralExpression, SyntaxKind } from 'ts-morph';

// 재귀적으로 객체로 변환
/**
 * 객체 리터럴을 재귀적으로 파싱하여 객체로 변환
 * @param expr - 파싱할 객체 리터럴
 * @returns 파싱된 객체
 * @example
 * ```ts
 * // 코드 내에서 export const metadata = "..." 변수 찾기
 * const metadataVar = sourceFile
 *   .getVariableDeclarations()
 *   .find(
 *     (decl) =>
 *       decl.getName() === 'metadata' &&
 *       decl.getVariableStatement()?.getDeclarationKind() === 'const' &&
 *       decl.isExported,
 *   );
 *
 * const objLiteral = metadataVar?.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
 * if (!objLiteral) return;
 *
 * const metadata = parseObjectLiteral(objLiteral); // { title: '...' }
 * ```
 */
export function parseObjectLiteral(expr: ObjectLiteralExpression) {
  const obj: Record<string, any> = {};

  function parseInitializer(initializer: any): any {
    if (initializer.isKind(SyntaxKind.StringLiteral) || initializer.isKind(SyntaxKind.NumericLiteral)) {
      return initializer.getLiteralValue();
    }

    if (initializer.isKind(SyntaxKind.TrueKeyword) || initializer.isKind(SyntaxKind.FalseKeyword)) {
      return initializer.getText() === 'true';
    }

    if (initializer.isKind(SyntaxKind.ObjectLiteralExpression)) {
      return parseObjectLiteral(initializer);
    }

    if (initializer.isKind(SyntaxKind.TemplateExpression)) {
      return initializer.getText();
    }

    if (initializer.isKind(SyntaxKind.Identifier)) {
      return initializer.getText();
    }

    return initializer.getText(); // fallback
  }

  for (const prop of expr.getProperties()) {
    if (!prop.isKind(SyntaxKind.PropertyAssignment)) continue;

    const name = prop.getName();
    const initializer = prop.getInitializerOrThrow();

    obj[name] = parseInitializer(initializer);
  }
  return obj;
}
