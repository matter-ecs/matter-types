export {};
declare class World {
	public constructor();

	public spawn(...dynamic_bundle: Array<unknown>): number;

	public replace(id: number, ...dynamic_bundle: Array<unknown>): number;

	public despawn(id: number): void;

	public clear(): void;

	public contains(id: number): boolean;

	public get<T extends Array<Component<unknown>>>(id: number, ...dynamic_bundle: T): LuaTuple<Iterate<T>>;

	public query<T extends Array<Component<unknown>>>(...dynamic_bundle: T): Iterate<T>;
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

const world = new World();

const [a, b] = world.get(1, new Component("str"), new Component(false));

for (const [a] of world.query(new Component("str"))) {
}
