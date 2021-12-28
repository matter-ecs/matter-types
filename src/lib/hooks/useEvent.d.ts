type Event<T extends Instance, P extends keyof T> = T[P] extends RBXScriptSignal ? T[P] : never;

export function useEvent<I extends Instance, S extends keyof I, E extends Event<I, S>>(
	inst: I,
	event: S,
): IterableFunction<LuaTuple<[number, ...Parameters<GenericOfRBXScriptSignal<E>>]>>;

export function useEvent<I extends Instance, E extends RBXScriptSignal>(
	inst: I,
	event: E,
): IterableFunction<LuaTuple<[number, ...Parameters<GenericOfRBXScriptSignal<E>>]>>;

type GenericOfRBXScriptSignal<T> = T extends RBXScriptSignal<infer A> ? A : never;
