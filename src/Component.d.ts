export type AnyComponent = Component<{ [index: string]: unknown }>;

export type ComponentBundle = Array<AnyComponent>;

type Id<T> = T;
type PatchOverride<Base, Overrides> = Id<{
	[K in keyof Base | keyof Overrides]: K extends keyof Overrides
		? Overrides[K]
		: K extends keyof Base
		? Base[K]
		: "never";
}>;

export class Component<T extends { [index: string]: unknown }> {
	/*@internal */
	public internal: T;

	public constructor(data: T);

	public patch<U>(data: U): Component<PatchOverride<T, U>>;
}

export function newComponent<T extends { [index: string]: unknown }>(
	name?: string,
): {
	(): Component<T>;
};
