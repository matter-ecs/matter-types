export type AnyComponent = Component<unknown>;

export type ComponentBundle = Array<AnyComponent>;

type Id<T> = T;
type PatchOverride<Base, Overrides> = Id<{
	[K in keyof Base | keyof Overrides]: K extends keyof Overrides
		? Overrides[K]
		: K extends keyof Base
		? Base[K]
		: "never";
}>;

export class Component<T> {
	/*@internal */
	public internal: T;

	public constructor(data: T);

	public patch<U>(data: U): Component<PatchOverride<T, U>>;
}

export function newComponent<T>(name?: string): {
	(): Component<T>;
};
