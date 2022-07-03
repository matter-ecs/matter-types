import Plasma from "@rbxts/plasma";

declare function selectionList(
	plasma: typeof Plasma,
): (items: Array<{ text: string; selected: boolean; icon: string }>) => { selected(): boolean };
