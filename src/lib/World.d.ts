import { AnyComponent, ComponentBundle, DynamicBundle, InferComponent, InferComponents } from "./Component";

export class World {
	public constructor();

	public spawn(...dynamic_bundle: Array<AnyComponent>): number;

	public replace(id: number, ...dynamic_bundle: Array<AnyComponent>): number;

	public despawn(id: number): void;

	public clear(): void;

	public contains(id: number): boolean;

	public get<C extends () => AnyComponent>(id: number, only: C): InferComponent<ReturnType<C>>;

	public get<T extends DynamicBundle>(id: number, ...dynamic_bundle: T): LuaTuple<Iterate<InferComponents<T>>>;

	public query<T extends DynamicBundle>(...dynamic_bundle: T): QueryResult<InferComponents<T>>;
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
	without: <e extends DynamicBundle>(...components: e) => QueryResult<T>;
};
