import Plasma from "@rbxts/plasma";

declare namespace link {
	interface LinkOptions {
		disabled?: boolean;
		icon?: string;
	}

	interface LinkHandle {
		clicked(): boolean;
	}
}

declare function link(plasma: Plasma): (text: string, options?: link.LinkOptions) => link.LinkHandle;

export = link;
