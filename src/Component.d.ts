export type AnyComponent = Component<unknown>;

export type ComponentBundle = Array<AnyComponent>;

type OptionalPropertyNames<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: L[P] | Exclude<R[P], undefined> };

type Id<T> = { [K in keyof T]: T[K] };

type Spread<L, R> = Id<
	Pick<L, Exclude<keyof L, keyof R>> &
		Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
		Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
		SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export class Component<T> {
	/*@internal */
	public internal: T;

	public constructor(data: T);

	public patch<U>(data: U): Component<Spread<T, U>>;
}

export function newComponent<T>(name?: string): {
	(): Component<T>;
};
