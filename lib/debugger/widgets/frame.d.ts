import Plasma from "@rbxts/plasma";

declare function frame(
	plasma: typeof Plasma,
): (fn: Callback, options?: { padding?: number; marginTop?: number; direction?: Enum.FillDirection }) => Frame;

export = frame;
