import { A, L } from "ts-toolbelt";

import {
	AnyComponent,
	Component,
	ComponentBundle,
	ComponentCtor,
	DynamicBundle,
	GenericOfComponent,
	InferComponents,
} from "./Component";

export type Entity<T extends ComponentBundle> = number & {
	/**
	 * @hidden
	 * @deprecated
	 */
	readonly _nominal_entity: T;
};

export type AnyEntity = Entity<ComponentBundle>;

type IsEqual<A, B> = (<T>() => T extends A ? true : false) extends <T>() => T extends B ? true : false ? true : false;

type Includes<T, V> = T extends [infer F, ...infer R] ? (IsEqual<F, V> extends true ? true : Includes<R, V>) : false;

type IncludesAll<T extends L.List, S extends L.List> = A.Equals<
	{ [P in keyof S]: L.Includes<T, S[P]> }[number],
	1
> extends 1
	? true
	: false;

export class World {
	public constructor();

	public spawn<T extends ComponentBundle>(...component_bundle: T): Entity<T>;

	public replace<T extends ComponentBundle>(id: AnyEntity, ...component_bundle: T): Entity<T>;

	public despawn(id: AnyEntity): void;

	public clear(): void;

	public contains(id: AnyEntity): boolean;

	public get<T extends ComponentBundle, C extends ComponentCtor>(
		id: Entity<T>,
		only: Includes<Iterate<T>, GenericOfComponent<ReturnType<C>>> extends true ? C : never,
	): ReturnType<C>;

	public get<C extends ComponentBundle, T extends DynamicBundle>(
		id: Entity<C>,
		...dynamic_bundle: IncludesAll<Iterate<C>, Iterate<InferComponents<T>>> extends true ? T : never
	): LuaTuple<InferComponents<T>>;

	public query<T extends DynamicBundle>(...dynamic_bundle: T): QueryResult<InferComponents<T>>;

	public queryChanged<C extends ComponentCtor, T extends DynamicBundle>(
		mt: C,
		...dynamic_bundle: T
	): IterableFunction<LuaTuple<[number, { new: C; old: C }, ...Iterate<InferComponents<T>>]>>;

	public insert(id: AnyEntity, ...dynamic_bundle: ComponentBundle): void;

	public remove<T extends DynamicBundle>(id: AnyEntity, ...dynamic_bundle: T): T;
}

type Iterate<A extends ComponentBundle> = A extends []
	? A
	: A extends [infer F, ...infer B]
	? F extends AnyComponent
		? B extends ComponentBundle
			? [GenericOfComponent<F>, ...Iterate<B>]
			: never
		: never
	: never;

type QueryResult<T extends ComponentBundle> = IterableFunction<LuaTuple<[Entity<T>, ...T]>> & {
	without: (this: QueryResult<T>, ...components: DynamicBundle) => IterableFunction<LuaTuple<[Entity<T>, ...T]>>;
};

export type FilterOut<T extends Array<unknown>, F> = T extends [infer L, ...infer R]
	? [L] extends [F]
		? [...FilterOut<R, F>]
		: [L, ...FilterOut<R, F>]
	: [];
