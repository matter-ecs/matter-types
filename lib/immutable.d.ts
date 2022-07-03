type None = {
	/**
	 * @hidden
	 * @deprecated
	 */
	readonly __llamaNone: unique symbol;
};

export const None: None;

export type NoneIfy<T> = Exclude<T, None>;

export function merge<T extends [object, object]>(...dictionaries: T): NoneIfy<UnionToIntersection<T[keyof T]>>;

export function toSet<Lt>(list: Lt[]): Set<Lt>;

export function values<D extends object>(dictionary: D): Array<D[keyof D]>;
