declare class Component<T> {
	/*@internal */
	public internal: T;

	public constructor(data: T);

	public patch(data: T): Component<T>;
}

declare function newComponent(name: string): {
	<T>(data: T): Component<T>;
};
