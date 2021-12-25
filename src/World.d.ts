import { Component } from "Component";

export class World {
	public constructor();

	public spawn(...dynamic_bundle: Array<unknown>): number;

	public replace(id: number, ...dynamic_bundle: Array<unknown>): number;

	public despawn(id: number): void;

	public clear(): void;

	public contains(id: number): boolean;

	public get<T extends Array<Component<unknown>>>(id: number, ...dynamic_bundle: T): LuaTuple<Iterate<T>>;

	public query<T extends Array<Component<unknown>>>(...dynamic_bundle: T): QueryResult<T>;
}

type ComponentBundle = Array<Component<unknown>>;

type Iterate<A extends ComponentBundle> = A extends []
	? A
	: A extends [infer F, ...infer B]
	? F extends Component<unknown>
		? B extends ComponentBundle
			? [Data<F>, ...Iterate<B>]
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
