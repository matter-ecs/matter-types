import None from "./None";

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

type OptionalKeys<T extends {[index: string]: unknown}> = { [K in keyof T]: T[K] | None }

export type Component<T extends { [index: string]: unknown }> = { readonly [K in keyof T]: T[K] } & {
	patch<U extends T>(data: Partial<OptionalKeys<U>>): Component<PatchOverride<T, U>>;
}

export type GenericOfComponent<T> = T extends Component<infer A> ? A : never;

export type DynamicBundle = Array<ComponentCtor>;

export type InferComponents<A extends DynamicBundle> = A extends []
	? A
	: A extends [infer F, ...infer B]
	? F extends ComponentCtor
		? B extends DynamicBundle
			? [ReturnType<F>, ...InferComponents<B>]
			: never
		: never
	: never;

export type NullableComponents<a extends ComponentBundle> = a extends []
	? a
	: a extends [infer F, ...infer B]
	? F extends AnyComponent
		? B extends ComponentBundle
			? [F | undefined, ...NullableComponents<B>]
			: never
		: never
	: never

export function newComponent<T extends { [index: string]: unknown }>(
	name?: string,
): {
	(data?: T): Component<T>;
};
