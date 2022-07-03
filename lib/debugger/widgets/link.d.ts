import Plasma from "@rbxts/plasma";

declare function link(
	plasma: typeof Plasma,
): (text: string, options?: { disabled?: boolean; icon?: string }) => TextButton;

export = link;
