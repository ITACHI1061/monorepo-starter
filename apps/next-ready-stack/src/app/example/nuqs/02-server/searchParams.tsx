import {
  createLoader,
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

export const searchParams = {
  str: parseAsString.withDefault(''),
  int: parseAsInteger.withDefault(100),
  bool: parseAsBoolean.withDefault(false),
  literal: parseAsStringLiteral(literals).withDefault('apple'),
  float: parseAsFloat.withDefault(45.18),
};

export const urlKeys: UrlKeys<typeof searchParams> = {
  literal: 'lit',
};

export const loadSearchParams = createLoader(searchParams, {
  urlKeys,
});

export const serialize = createSerializer(searchParams, {
  urlKeys,
  clearOnDefault: true,
});
