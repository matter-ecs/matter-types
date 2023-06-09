import { AnyComponent, ComponentBundle, ComponentCtor, DynamicBundle, InferComponents } from "./component";

/**
 * Nominal type to describe an entity with an expressed set of associated components.
 * @typeParam T - Bundle of component values
 */

export type Entity<T extends ComponentBundle> = number & {
	/**
	 * @hidden
	 */
	readonly __nominal_entity: T;
};

export type GenericOfEntity<T> = T extends Entity<infer a> ? a : never;

/**
 * AnyEntity is a plain number, and can be used as such or be casted back and forth, however it upholds a type contract that prevents accidental misuse by enforcing
 * developers to think about what they really wanted to use.
 */
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
	 * @see {@link id Entity}
	 */
	public spawnAt<T extends ComponentBundle>(id: number, ...component_bundle: T): Entity<T>;
	/**
	 * Replaces a given entity by ID with an entirely new set of components.
	 * Equivalent to removing all components from an entity, and then adding these ones.
	 * @param id - The entity ID
	 * @param component_bundle {@link ComponentBundle ComponentBundle} - The component values to spawn the entity with.
	 * @see {@link id AnyEntity}
	 */
	public replace<T extends ComponentBundle>(id: AnyEntity, ...component_bundle: T): Entity<T>;

	/**
	 * Despawns a given entity by ID, removing it and all its components from the world entirely.
	 * @param id - The entity ID
	 * @see {@link id AnyEntity}
	 */
	public despawn(id: AnyEntity): void;

	/**
	 * Removes all entities from the world.
	 * @remarks
	 * Removing entities in this is not reported by {@link queryChanged queryChanged}
	 */
	public clear(): void;

	/**
	 * Checks if the given entity ID is currently spawned in this world.
	 *
	 * @param id number - The entity ID
	 * @returns boolean - `true` if the entity exists
	 * @see {@link AnyEntity AnyEntity}
	 */
	public contains(id: AnyEntity): boolean;

	/**
	 * Gets a specific component from a specific entity in this world.
	 *
	 * @param entity - The entity ID
	 * @param only - The component to fetch
	 * @returns Returns the component values in the same order they were passed to.
	 * @remarks
	 * Component values returned are nullable if the components used to search for aren't associated with the entity (in real-time).
	 */
	public get<a extends AnyEntity, T extends ComponentCtor>(
		entity: a,
		only: T,
	): Includes<GenericOfEntity<a>, ReturnType<T>> extends true ? ReturnType<T> : ReturnType<T> | undefined;

	/**
	 * Gets a specific set of components from a specific entity in this world.
	 *
	 * @param entity - The entity ID
	 * @param bundle - The components to fetch
	 * @returns Returns the component values in the same order they were passed to.
	 * @remarks
	 * Component values returned are nullable if the components used to search for aren't associated with the entity (in real-time).
	 */
	public get<a extends AnyEntity, T extends DynamicBundle>(
		entity: a,
		...bundle: T
	): LuaTuple<a extends Entity<InferComponents<T>> ? InferComponents<T> : NullableArray<InferComponents<T>>>;

	/**
	 * Performs a query against the entities in this World. Returns a [QueryResult](/api/QueryResult), which iterates over
	 * the results of the query.

	 * Order of iteration is not guaranteed.
	 * @param dynamic_bundle
	 * @returns QueryResult - See {@link QueryResult QueryResult}
	 */
	public query<T extends DynamicBundle, a extends InferComponents<T>>(...dynamic_bundle: T): QueryResult<a>;

	public queryChanged<C extends ComponentCtor>(
		mt: C,
	): IterableFunction<
		LuaTuple<[Entity<[ReturnType<C>]>, { new: ReturnType<C> | undefined; old: ReturnType<C> | undefined }]>
	>;

	public insert(id: AnyEntity, ...dynamic_bundle: ComponentBundle): void;

	public remove<T extends DynamicBundle>(id: AnyEntity, ...dynamic_bundle: T): LuaTuple<InferComponents<T>>;

	public size(): number;

	public optimizeQueries(): void;
}

type Query<T extends ComponentBundle> = IterableFunction<LuaTuple<[Entity<T>, ...T]>>;

/**
 * @class QueryResult
 *
 * A result from the {@link query World.query} function.
 *
 * @remarks
 * Calling the table or the `next` method allows iteration over the results. Once all results have returned, the
 * QueryResult is exhausted and is no longer useful
 */
type QueryResult<T extends ComponentBundle> = Query<T> & {
	/**
	 * Returns an iterator that will skip any entities that also have the given components.
	 *
	 * @remarks
	 * This is essentially equivalent to querying normally, using `World:get` to check if a component is present,
	 * and using Lua's `continue` keyword to skip this iteration (though, using `:without` is faster).
	 *
	 * This means that you should avoid queries that return a very large amount of results only to filter them down
	 * to a few with `:without`. If you can, always prefer adding components and making your query more specific.
	 *
	 * @param ...components - The component types to filter against.
	 * @returns IterableFunction<LuaTuple<[Entity<ComponentBundle>, ...ComponentBundle]>> - Iterator of entity ID followed by the requested component values
	 *
	 * ```ts
	 * for (const [id] of world.query(Target).without(Model)) {
	 *     // Do something
	 * }
	 * ```
	 */
	without: (this: Query<T>, ...components: DynamicBundle) => Query<T>;
	/**
	 * Returns the next set of values from the query result. Once all results have been returned, the
	 * QueryResult is exhausted and is no longer useful.
	 *
	 * @remarks
	 * This function is equivalent to calling the QueryResult as a function. When used in a for loop, this is implicitly
	 * done by the language itself.
	 *
	 * ```ts
	 * // Using world.query in this position will make Lua invoke the table as a function. This is conventional.
	 * for (const [id, enemy, charge, model] of world.query(Enemy, Charge, Model)) {
	 *     // Do something
	 * }
	 * ```
	 *
	 * If you wanted to iterate over the QueryResult without a for loop, it's recommended that you call `next` directly
	 * instead of calling the QueryResult as a function.
	 * ```lua
	 * const [id, enemy, charge, model] = world.query(Enemy, Charge, Model).next()
	 * const [id, enemy, charge, model] = world.query(Enemy, Charge, Model)() -- Possible, but unconventional
	 * ```
	 * @returns A LuaTuple of an entity followed with queried components
	 * @See {@link Entity Entity}
	 */
	next: (this: Query<T>) => LuaTuple<[Entity<T>, ...T]>;
	/**
	 * Creates a "snapshot" of this query, draining this QueryResult and returning a list containing all of its results.
	 * 
	 * By default, iterating over a QueryResult happens in "real time": it iterates over the actual data in the ECS, so
	 * changes that occur during the iteration will affect future results.
	 * 
	 * By contrast, `QueryResult:snapshot()` creates a list of all of the results of this query at the moment it is called,
	 * so changes made while iterating over the result of `QueryResult:snapshot` do not affect future results of the
	 * iteration.

	 * Of course, this comes with a cost: we must allocate a new list and iterate over everything returned from the
	 * QueryResult in advance, so using this method is slower than iterating over a QueryResult directly.

	 * The table returned from this method has a custom `__iter` method, which lets you use it as you would use QueryResult
	 * directly:
	 * ```ts
	 * for (const [entityId, health, player] of world.query(Health, Player).snapshot()) {
     * 
	 * }
	 * However, the table itself is just a list of sub-tables structured like `[entityId, component1, component2, ...etc]`
	 * @returns ReadonlyArray<[Entity<ComponentBundle>, ...ComponentBundle]>
	```

	However, the table itself is just a list of sub-tables structured like `{entityId, component1, component2, ...etc}`.
	 */
	snapshot: (this: Query<T>) => ReadonlyArray<[Entity<T>, ...T]>;
};

export type FilterOut<T extends Array<unknown>, F> = T extends [infer L, ...infer R]
	? [L] extends [F]
		? [...FilterOut<R, F>]
		: [L, ...FilterOut<R, F>]
	: [];
