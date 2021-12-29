export type AnyComponent = Component<{ [index: string]: unknown }>;
export type ComponentCtor = () => AnyComponent;

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
	public constructor(data: T);

	public patch<U>(data: U): Component<PatchOverride<T, U>>;
}

export type GenericOfComponent<T> = T extends Component<infer A> ? A : never;
export type InferComponent<T extends AnyComponent> = T & GenericOfComponent<T>;

export type DynamicBundle = Array<ComponentCtor>;

export type InferComponents<A extends DynamicBundle> = A extends []
	? A
	: A extends [infer F, ...infer B]
	? F extends ComponentCtor
		? B extends DynamicBundle
			? [InferComponent<ReturnType<F>>, ...InferComponents<B>]
			: never
		: never
	: never;

export function newComponent<T extends { [index: string]: unknown }>(
	name?: string,
): {
	(data?: T): Component<T>;
};
