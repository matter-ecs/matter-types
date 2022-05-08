import {
	AnyComponent,
	ComponentBundle,
	ComponentCtor,
	DynamicBundle,
	GenericOfComponent,
	InferComponents,
	NullableComponents,
} from "./Component";

export type Entity<T extends ComponentBundle> = number & {
	/**
	 * @hidden
	 */
	readonly __nominal_entity: T
}

export type GenericOfEntity<T> = T extends Entity<infer a> ? a : never

export type AnyEntity = Entity<ComponentBundle>;

type Equals<A1, A2> = (<A>() => A extends A2 ? 1 : 0) extends <A>() => A extends A1 ? 1 : 0 ? 1 : 0;

type Includes<T, V> = T extends [infer F, ...infer R] ? (Equals<F, V> extends 1 ? true : Includes<R, V>) : false;

type IncludesAll<T extends ReadonlyArray<unknown>, S extends ReadonlyArray<unknown>> = Equals<
	{ [P in keyof S]: Includes<T, S[P]> }[number],
	true
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

	public get<a extends AnyEntity, T extends ComponentCtor>(entity: a, only: T): Includes<GenericOfEntity<a>, ReturnType<T>> extends true ? 
		ReturnType<T> 
		: ReturnType<T> | undefined

	public get<a extends AnyEntity, T extends DynamicBundle, C extends InferComponents<T>>(entity: a, ...bundle: T): a extends Entity<C> ?
		IncludesAll<Iterate<C>, T> extends true
		? LuaTuple<C>
		:never 
		: LuaTuple<NullableComponents<C>>
	
	public query<T extends DynamicBundle>(...dynamic_bundle: T): QueryResult<InferComponents<T>>;

	public queryChanged<C extends ComponentCtor, T extends DynamicBundle>(
		mt: C,
		...dynamic_bundle: T
	): IterableFunction<LuaTuple<[Entity<[ReturnType<C>]>, { new: ReturnType<C> | undefined; old: ReturnType<C> | undefined }, ...InferComponents<T>]>>;

	public insert(id: AnyEntity, ...dynamic_bundle: ComponentBundle): void;

	public remove<T extends DynamicBundle>(id: AnyEntity, ...dynamic_bundle: T): T;

	public size(): number
}

export type Iterate<A extends ComponentBundle> = A extends []
	? A
	: A extends [infer F, ...infer B]
	? F extends AnyComponent
		? B extends ComponentBundle
			? [GenericOfComponent<F>, ...Iterate<B>]
			: never
		: never
	: never;

type QueryResult<T extends ComponentBundle> = IterableFunction<LuaTuple<[Entity<T>, ...T]>> & {
	without: (this: QueryResult<T>, ...components: DynamicBundle) => QueryResult<T>
	next: (this: QueryResult<T>) => LuaTuple<[Entity<T>, ...T]>
};

export type FilterOut<T extends Array<unknown>, F> = T extends [infer L, ...infer R]
	? [L] extends [F]
		? [...FilterOut<R, F>]
		: [L, ...FilterOut<R, F>]
	: [];
