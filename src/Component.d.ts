export type AnyComponent = Component<unknown>;

export type ComponentBundle = Array<AnyComponent>;

export class Component<T> {
	/*@internal */
	public internal: T;

	public constructor(data: T);

	public patch(data: T): Component<T>;
}

export function newComponent<T>(name?: string): {
	(): Component<T>;
};
