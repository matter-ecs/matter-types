import { None } from "./immutable";

export type AnyComponent = Component<object>;
export type ComponentCtor = () => AnyComponent;

export type ComponentBundle = Array<AnyComponent>;

type Id<T> = T;

type PatchOverride<Base, Overrides> = Id<{
	[K in keyof Base | keyof Overrides]: K extends keyof Overrides
		? Overrides[K]
		: K extends keyof Base
		? Base[K]
		: never;
}>;

type OptionalKeys<T> = { [K in keyof T]: T[K] | None };
type RemoveNoneKeys<T extends object> = { [K in keyof T]: T[K] extends None ? "a" : K };

export type Component<T extends object> = { readonly [K in keyof T]: T[K] } & {
	patch<U extends OptionalKeys<Partial<T>>>(data: U): Component<ExcludeMembers<PatchOverride<T, U>, None>>;
};

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
	: never;

export function newComponent<T extends object>(
	name?: string,
	defaultData?: Partial<T>,
): {
	(data?: T): Component<T>;
};
