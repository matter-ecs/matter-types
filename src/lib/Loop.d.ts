type System<T extends Array<unknown>> = (
	...args: T
) => void | { system: (...args: T) => void; event?: string; priority: number; after: undefined | {} };

export class Loop<T extends Array<unknown>> {
	public constructor(...dynamic_bundle: T);

	public scheduleSystems<S extends Array<System<T>>>(systems: S): void;

	public scheduleSystem(system: System<T>): void;

	public begin<T extends { [index: string]: RBXScriptSignal }>(events: T): { [P in keyof T]: RBXScriptConnection };

	public addMiddleware(fn: (nextFn: () => void) => () => void): void;
}
