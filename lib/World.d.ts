import {
	AnyComponent,
	Component,
	ComponentBundle,
	ComponentCtor,
	DynamicBundle,
	GenericOfComponent,
	InferComponents,
} from "./component";

export type Entity<T extends ComponentBundle> = number & {
	/**
	 * @hidden
	 */
	readonly __nominal_entity: T;
};

export type GenericOfEntity<T> = T extends Entity<infer a> ? a : never;

export type AnyEntity = Entity<ComponentBundle>;

type Equals<A1, A2> = (<A>() => A extends A2 ? 1 : 0) extends <A>() => A extends A1 ? 1 : 0 ? 1 : 0;

type Includes<T, V> = T extends [infer F, ...infer R] ? (Equals<F, V> extends 1 ? true : Includes<R, V>) : false;

type IncludesAll<T extends ReadonlyArray<unknown>, S extends ReadonlyArray<unknown>> = Equals<
	{ [P in keyof S]: Includes<T, S[P]> }[number],
	true
> extends 1
	? true
	: false;

type NullableArray<A extends Array<unknown>> = Partial<A> extends Array<unknown> ? Partial<A> : never;

/**
 * @class World
 *
 * A World contains entities which have components.
 * The World is queryable and can be used to get entities with a specific set of components.
 * Entities are simply ever-increasing integers.
 */

type A<T extends ComponentBundle> = { [index in keyof T]: T[index] };
type a = A<[Component<{ foo: "bar" }>]>;

export interface World extends IterableFunction<LuaTuple<[AnyEntity, Map<ComponentCtor, AnyComponent>]>> {}

export class World {
	public constructor();

	/**
	 * Spawns a new entity in the world with the given components.
	 * @param component_bundle - The component values to spawn the entity with.
	 * @return The new entity ID.
	 */
	public spawn<T extends ComponentBundle>(...component_bundle: T): Entity<T>;

	/**
	 * Spawns a new entity in the world with a specific entity ID and given components.
	 * The next ID generated from [World:spawn] will be increased as needed to never collide with a manually specified ID.
	 * @param id - The entity ID to spawn with.
	 * @param component_bundle - The component values to spawn the entity with.
	 */
	public spawnAt<T extends ComponentBundle>(id: number, ...component_bundle: T): Entity<T>;
	/**
	 * Replaces a given entity by ID with an entirely new set of components.
	 * Equivalent to removing all components from an entity, and then adding these ones.
	 * @param id - The entity ID
	 * @param component_bundle - The component values to spawn the entity with.
	 */
	public replace<T extends ComponentBundle>(id: AnyEntity, ...component_bundle: T): Entity<T>;

	/**
	 * Despawns a given entity by ID, removing it and all its components from the world entirely.
	 * @param id - The entity ID
	 */
	public despawn(id: AnyEntity): void;

	public clear(): void;

	public contains(id: AnyEntity): boolean;

	public get<a extends AnyEntity, T extends ComponentCtor>(
		entity: a,
		only: T,
	): Includes<GenericOfEntity<a>, ReturnType<T>> extends true ? ReturnType<T> : ReturnType<T> | undefined;

	public get<a extends AnyEntity, T extends DynamicBundle>(
		entity: a,
		...bundle: T
	): LuaTuple<a extends Entity<InferComponents<T>> ? InferComponents<T> : NullableArray<InferComponents<T>>>;

	public query<T extends DynamicBundle>(...dynamic_bundle: T): QueryResult<InferComponents<T>>;

	public queryChanged<C extends ComponentCtor>(
		mt: C,
	): IterableFunction<
		LuaTuple<[Entity<[ReturnType<C>]>, { new: ReturnType<C> | undefined; old: ReturnType<C> | undefined }]>
	>;

	public insert(id: AnyEntity, ...dynamic_bundle: ComponentBundle): void;

	public remove<T extends DynamicBundle>(id: AnyEntity, ...dynamic_bundle: T): T;

	public size(): number;

	public optimizeQueries(): void;
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
	without: (this: QueryResult<T>, ...components: DynamicBundle) => QueryResult<T>;
	next: (this: QueryResult<T>) => LuaTuple<[Entity<T>, ...T]>;
	snapshot: (this: QueryResult<T>) => Readonly<T>;
};

export type FilterOut<T extends Array<unknown>, F> = T extends [infer L, ...infer R]
	? [L] extends [F]
		? [...FilterOut<R, F>]
		: [L, ...FilterOut<R, F>]
	: [];
