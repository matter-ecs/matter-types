type SystemFn <T extends Array<unknown>> = (...params: T) => void

type SystemStruct<T extends Array<unknown>> = { system: SystemFn<T>, event?: string, priority?: number, after?: Array<SystemFn<T> | SystemStruct<T>>}

type System<T extends Array<unknown>> = SystemFn<T> | SystemStruct<T>

/**
 * @class Loop
 * 
 * The Loop class handles scheduling and *looping* (who would have guessed) over all of your game systems.
 *
 * Yielding is not allowed in systems. Doing so will result in the system thread being closed early, but it will not
 * affect other systems.
 */
export class Loop<T extends Array<unknown>> {
	/**
	 * Creates a new loop. `Loop.new` accepts as arguments the values that will be passed to all of your systems.
	 *
	 * So typically, you want to pass the World in here, as well as maybe a table of global game state.
	 *
	 * ```typescript
	 * const world = new World()
	 * const gameState = {}
	 *
	 * const loop = new Loop(world, gameState)
	 * ```
	 *
	 * @param ...dynamic_bundle - Values that will be passed to all of your systems
	 * @return Loop
	 */
	public constructor(...dynamic_bundle: T);

	/**
	 * Schedules a set of systems based on the constraints they define.
	 *
	 * Systems may optionally declare:
	 * - The name of the event they run on (e.g., RenderStepped, Stepped, Heartbeat)
	 * - A numerical priority value
	 * - Other systems that they must run *after*
	 *
	 * If systems do not specify an event, they will run on the `default` event.
	 *
	 * Systems that share an event will run in order of their priority, which means that systems with a lower `priority`
	 * value run first. The default priority is `0`.
	 *
	 * Systems that have defined what systems they run `after` can only be scheduled after all systems they depend on have
	 * already been scheduled.
	 *
	 * All else being equal, the order in which systems run is stable, meaning if you don't change your code, your systems
	 * will always run in the same order across machines.
	 *
	 * It is possible for your systems to be in an unresolvable state. In which case, `scheduleSystems` will error.
	 * This can happen when your systems have circular or unresolvable dependency chains.
	 *
	 * If a system has both a `priority` and defines systems it runs `after`, the system can only be scheduled if all of
	 * the systems it depends on have a lower or equal priority.
	 *
	 * Systems can never depend on systems that run on other events, because it is not guaranteed or required that events
	 * will fire every frame or will always fire in the same order.
	 *
	 * `scheduleSystems` has to perform nontrivial sorting work each time it's called, so you should avoid calling it multiple
	 * times if possible.
	 *
	 * @param systems - Array of systems to schedule.
	 */
	public scheduleSystems<S extends Array<System<T>>>(systems: S): void;

	/**
	 * Schedules a set of systems based on the constraints they define.
	 *
	 * Systems may optionally declare:
	 * - The name of the event they run on (e.g., RenderStepped, Stepped, Heartbeat)
	 * - A numerical priority value
	 * - Other systems that they must run *after*
	 *
	 * If systems do not specify an event, they will run on the `default` event.
	 *
	 * Systems that share an event will run in order of their priority, which means that systems with a lower `priority`
	 * value run first. The default priority is `0`.
	 *
	 * Systems that have defined what systems they run `after` can only be scheduled after all systems they depend on have
	 * already been scheduled.
	 *
	 * All else being equal, the order in which systems run is stable, meaning if you don't change your code, your systems
	 * will always run in the same order across machines.
	 *
	 * It is possible for your systems to be in an unresolvable state. In which case, `scheduleSystems` will error.
	 * This can happen when your systems have circular or unresolvable dependency chains.
	 *
	 * If a system has both a `priority` and defines systems it runs `after`, the system can only be scheduled if all of
	 * the systems it depends on have a lower or equal priority.
	 *
	 * Systems can never depend on systems that run on other events, because it is not guaranteed or required that events
	 * will fire every frame or will always fire in the same order.
	 *
	 * `scheduleSystems` has to perform nontrivial sorting work each time it's called, so you should avoid calling it multiple
	 * times if possible.
	 *
	 * @param system - System to schedule.
	 */
	public scheduleSystem(system: System<T>): void;

	/**
	 * Schedules a single system. This is an expensive function to call multiple times. Instead, try batch scheduling
	 * systems with [Loop:scheduleSystems] if possible.
	 * @param system - System to evict from loop.
	 */
	public evictSystem(system: System<T>): void

	/**
	 * Replaces an older version of a system with a newer version of the system. Internal system storage (which is used
	 * by hooks) will be moved to be associated with the new system. This is intended to be used for hot reloading.
	 * @param oldSystem - The old system to be replaced.
	 * @param newSystem - The new system to replace with.
	 */
	public replaceSystem(oldSystem: System<T>, newSystem: System<T>): void

	/**
	 *
	 * Connects to frame events and starts invoking your systems.
	 *
	 * Pass a table of events you want to be able to run systems on, a map of name to event. Systems can use these names
	 * to define what event they run on. By default, systems run on an event named `"default"`. Custom events may be used
	 * if they have a `Connect` function.
	 *
	 * ```typescript
	 * loop.begin({
	 *   default: RunService.Heartbeat,
	 *   Heartbeat: RunService.Heartbeat,
	 *   RenderStepped: RunService.RenderStepped,
	 *   Stepped: RunService.Stepped,
	 * })
	 * ```
	 *
	 * &nbsp;
	 *
	 * Events that do not have any systems scheduled to run on them **at the time you call `Loop:begin`** will be skipped
	 * and never connected to. All systems should be scheduled before you call this function.
	 *
	 * Returns a table similar to the one you passed in, but the values are `RBXScriptConnection` values (or whatever is
	 * returned by `:Connect` if you passed in a synthetic event).
	 *
	 * @param events - A map from event name to event objects.
	 * @return A map from your event names to connection objects.
	 */
	public begin<T extends { [index: string]: RBXScriptSignal }>(events: T): { [P in keyof T]: RBXScriptConnection };

	/**
	 * Adds a user-defined middleware function that is called during each frame.
	 *
	 * This allows you to run code before and after each frame, to perform initialization and cleanup work.
	 *
	 * ```typescript
	 * loop.addMiddleware((nextFn) => {
	 *   return () => Plasma.start(plasmaNode, nextFn)
	 * })
	 * ```
	 *
	 * You must pass `addMiddleware` a function that itself returns a function that invokes `nextFn` at some point.
	 *
	 * The outer function is invoked only once. The inner function is invoked during each frame event.
	 *
	 * Middleware added later "wraps" middleware that was added earlier. The innermost middleware function is the internal
	 * function that actually calls your systems.
	 * @param middleware - (nextFn: () => void) => () => void
	 */
	public addMiddleware(middleware: (nextFn: () => void) => () => void): void;
}
