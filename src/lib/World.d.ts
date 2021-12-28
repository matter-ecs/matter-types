import {
	AnyComponent,
	ComponentBundle,
	ComponentCtor,
	DynamicBundle,
	InferComponent,
	InferComponents,
} from "./Component";

export class World {
	public constructor();

	public spawn(...component_bundle: Array<AnyComponent>): number;

	public replace(id: number, ...component_bundle: Array<AnyComponent>): number;

	public despawn(id: number): void;

	public clear(): void;

	public contains(id: number): boolean;

	public get<C extends ComponentCtor>(id: number, only: C): InferComponent<ReturnType<C>>;

	public get<T extends DynamicBundle>(id: number, ...dynamic_bundle: T): LuaTuple<Iterate<InferComponents<T>>>;

	public query<T extends DynamicBundle>(...dynamic_bundle: T): QueryResult<InferComponents<T>>;

	public queryChanged<C extends ComponentCtor, T extends DynamicBundle>(
		mt: C,
		...dynamic_bundle: T
	): IterableFunction<LuaTuple<[number, { new: C; old: C }, ...Iterate<InferComponents<T>>]>>;
}

type Iterate<A extends ComponentBundle> = A extends []
	? A
	: A extends [infer F, ...infer B]
	? F extends AnyComponent
		? B extends ComponentBundle
			? [InferComponent<F>, ...Iterate<B>]
			: never
		: never
	: never;

type QueryResult<T extends ComponentBundle> = IterableFunction<LuaTuple<[number, ...Iterate<T>]>> & {
	without: (...components: DynamicBundle) => QueryResult<T>;
};
