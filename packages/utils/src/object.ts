/**
 * Given a union of indexable types `T`, we derive an indexable type
 * containing all of the keys of each variant of `T`. If a key is
 * present in multiple variants of `T`, then the corresponding type in
 * `Pathable<T>` will be the intersection of all types for that key.
 *
 * @example
 *    type T1 = Pathable<{a: number} | {a: string; b: boolean}>
 *    // {a: number | string; b: boolean}
 *
 *    type T2 = Pathable<{a?: {b: string}}
 *    // {a: {b: string} | undefined}
 *
 *    type T3 = Pathable<{a: string} | number>
 *    // {a: string}
 *
 *    type T4 = Pathable<{a: number} | {a: string} | {b: boolean}>
 *    // {a: number | string; b: boolean}
 *
 * This type lets us answer the questions:
 * - Given some object of type `T`, what keys might this object have?
 * - If this object did happen to have a particular key, what values
 *   might that key have?
 */
type Pathable<T> = { [K in AllKeys<T>]: TypesForKey<T, K> };

type AllKeys<T> = T extends infer I ? keyof I : never;
type TypesForKey<T, K extends PropertyKey> = T extends infer I ? (K extends keyof I ? I[K] : never) : never;

// Like Required<T>, but also removes explicit null and undefined typings */
type StrictlyRequired<T> = { [K in keyof T]-?: NonNullable<T[K]> };

/**
 * Given some `A` which is a key of at least one variant of `T`, derive
 * `T[A]` for the cases where `A` is present in `T`, and `T[A]` is not
 * null or undefined.
 */
type PathValue1<T, A extends keyof Pathable<T>> = StrictlyRequired<Pathable<T>>[A];
/** All possible options after successfully reaching `T[A]`. */
type Pathable1<T, A extends keyof Pathable<T>> = Pathable<PathValue1<T, A>>;

/** As `PathValue1`, but for `T[A][B]`. */
type PathValue2<T, A extends keyof Pathable<T>, B extends keyof Pathable1<T, A>> = StrictlyRequired<Pathable1<T, A>>[B];
/** As `Pathable1`, but for `T[A][B]`. */
type Pathable2<T, A extends keyof Pathable<T>, B extends keyof Pathable1<T, A>> = Pathable<PathValue2<T, A, B>>;

/** As `PathValue1`, but for `T[A][B][C]`. */
type PathValue3<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>,
  C extends keyof Pathable2<T, A, B>,
> = StrictlyRequired<Pathable2<T, A, B>>[C];

/**
 * Gets the value at `path` of `object`. If the resolved value is `null` or `undefined`, the `defaultValue` is returned in its place.
 *
 * @param object - The target object.
 * @param path - The path of the property to get.
 * @param defaultValue - The default value.
 * @signature R.pathOr(object, array, defaultValue)
 * @example
 *    R.pathOr({x: 10}, ['y'], 2) // 2
 *    R.pathOr({y: 10}, ['y'], 2) // 10
 * @dataFirst
 * @category Object
 */
export function get<T, A extends keyof Pathable<T>>(
  object: T,
  path: readonly [A],
  defaultValue: PathValue1<T, A>,
): PathValue1<T, A>;

export function get<T, A extends keyof Pathable<T>, B extends keyof Pathable1<T, A>>(
  object: T,
  path: readonly [A, B],
  defaultValue: PathValue2<T, A, B>,
): PathValue2<T, A, B>;

export function get<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>,
  C extends keyof Pathable2<T, A, B>,
>(object: T, path: readonly [A, B, C], defaultValue: PathValue3<T, A, B, C>): PathValue3<T, A, B, C>;

/**
 * Type-Safe get
 */
export function get(data: unknown, path: ReadonlyArray<PropertyKey>, defaultValue: unknown): unknown {
  let current = data;
  for (const prop of path) {
    if (current === null || current === undefined) {
      break;
    }
    current = (current as Record<PropertyKey, unknown>)[prop];
  }

  return current ?? defaultValue;
}

/**
 * Type-Safe set
 */
export function set(data: unknown, path: ReadonlyArray<PropertyKey>, value: unknown): unknown {
  const [pivot, ...rest] = path;
  if (pivot === undefined) {
    return value;
  }

  if (Array.isArray(data)) {
    const copy = [...data];
    copy[pivot as number] = set(data[pivot as number], rest, value);
    return copy;
  }

  const { [pivot]: currentValue, ...remaining } = data as Record<PropertyKey, unknown>;

  return {
    ...remaining,
    [pivot]: set(currentValue, rest, value),
  };
}
