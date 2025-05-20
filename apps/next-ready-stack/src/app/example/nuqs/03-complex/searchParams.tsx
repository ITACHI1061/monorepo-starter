import {
  createSearchParamsCache,
  createSerializer,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  type UrlKeys,
} from 'nuqs/server';

export const literals = ['apple', 'banana', 'orange', 'strawberry', 'watermelon'] as const;

export type Literal = (typeof literals)[number];

// 1. 파서 정의
export const parsers = {
  str: parseAsString.withDefault(''),
  int: parseAsInteger.withDefault(100),
  bool: parseAsBoolean.withDefault(false),
  literal: parseAsStringLiteral(literals).withDefault('apple'),
  float: parseAsFloat.withDefault(45.18),
};

// 2. URL 키 정의
export const urlKeys: UrlKeys<typeof parsers> = {
  literal: 'ltr',
  float: 'f',
};

// 3. 캐시 생성
export const cache = createSearchParamsCache(parsers, {
  urlKeys,
});

// 4. 직렬화 생성
export const serialize = createSerializer(parsers, {
  urlKeys,
  clearOnDefault: true,
});
