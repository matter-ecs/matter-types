type System = (
	...args: Array<never>
) => void | { system: (...args: Array<never>) => void; event?: string; priority: number; after: undefined | {} };

declare class Loop {
	public constructor(...dynamic_bundle: Array<never>);

	public scheduleSystems(systems: Array<System>): void;

	public scheduleSystem(): void;

	public begin<T extends { [index: string]: RBXScriptConnection }>(events: T): { [P in keyof T]: RBXScriptSignal };

	public addMiddleware(fn: (nextFn: () => void) => () => void): void;
}
