type SystemFn <T extends Array<unknown>>= (...params: T) => void

type SystemStruct<T extends Array<unknown>> = {system: SystemFn<T>, event?: string, priority?: number, after?: Array<SystemFn<T> | SystemStruct<T>>}

type System<T extends Array<unknown>> = SystemFn<T> | SystemStruct<T>

export class Loop<T extends Array<unknown>> {
	public constructor(...dynamic_bundle: T);

	public scheduleSystems<S extends Array<System<T>>>(systems: S): void;

	public scheduleSystem(system: System<T>): void;

	public begin<T extends { [index: string]: RBXScriptSignal }>(events: T): { [P in keyof T]: RBXScriptConnection };

	public addMiddleware(fn: (nextFn: () => void) => () => void): void;
}
