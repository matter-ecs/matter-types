export function useEvent<T extends RBXScriptSignal>(
	inst: Instance,
	event: T,
): () => LuaTuple<[number, ...Parameters<Parameters<T["Connect"]>[0]>]>;
