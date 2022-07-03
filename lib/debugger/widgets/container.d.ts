import Plasma from "@rbxts/plasma";

declare function container(
	plasma: typeof Plasma,
): (fn: Callback, options?: { padding?: number; marginTop?: number; direction?: Enum.FillDirection }) => Frame;

export = container;
