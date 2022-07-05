import Plasma from "@rbxts/plasma";

declare namespace container {
	interface ContainerOptions {
		padding?: number;
		marginTop?: number;
		direction?: Enum.FillDirection;
	}
}
declare function container(plasma: Plasma): (fn: Callback, options?: container.ContainerOptions) => Frame;

export = container;
