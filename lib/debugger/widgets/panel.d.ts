import Plasma from "@rbxts/plasma";

declare function panel(
	plasma: typeof Plasma,
): (children: () => void, options?: { fullHeight?: boolean }) => LuaTuple<[Frame, ScrollingFrame]>;

export = panel;
