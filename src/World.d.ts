import { AnyComponent, ComponentBundle } from "Component";

export class World {
	public constructor();

	public spawn(...dynamic_bundle: Array<AnyComponent>): number;

	public replace(id: number, ...dynamic_bundle: Array<AnyComponent>): number;

	public despawn(id: number): void;

	public clear(): void;

	public contains(id: number): boolean;

	public get<C extends () => AnyComponent>(id: number, only: C): Data<ReturnType<C>>;

	public get<T extends DynamicBundle>(id: number, ...dynamic_bundle: T): LuaTuple<Iterate<InferComponent<T>>>;

	public query<T extends DynamicBundle>(...dynamic_bundle: T): QueryResult<InferComponent<T>>;

	public queryChanged<T, A extends DynamicBundle>(mt: T, ...adds: A): QueryResult2<[...InferComponent<A>]>;
}

type Iterate<A extends ComponentBundle> = A extends []
	? A
	: A extends [infer F, ...infer B]
	? F extends AnyComponent
		? B extends ComponentBundle
			? [Data<F>, ...Iterate<B>]
			: never
		: never
	: never;

type DynamicBundle = Array<() => AnyComponent>;

type InferComponent<A extends DynamicBundle> = A extends []
	? A
	: A extends [infer F, ...infer B]
	? F extends () => AnyComponent
		? B extends DynamicBundle
			? [ReturnType<F>, ...InferComponent<B>]
			: never
		: never
	: never;

type Data<T extends { internal: unknown }> = T["internal"];
type FilterOut<T extends Array<unknown>, F> = T extends [infer L, ...infer R]
	? [L] extends [F]
		? [...FilterOut<R, F>]
		: [L, ...FilterOut<R, F>]
	: [];

interface QueryResult<T extends ComponentBundle> extends IterableIterator<[number, ...Iterate<T>]> {
	without: <e extends Array<T[number]>>(...components: e) => QueryResult<FilterOut<T, e[number]>>;
}

interface QueryResult2<T extends ComponentBundle> extends IterableIterator<[number, {}, ...Iterate<T>]> {}
