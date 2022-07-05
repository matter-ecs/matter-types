import Plasma from "@rbxts/plasma";

declare namespace panel {
	interface PanelOptions {
		fullHeight?: boolean;
	}
}
declare function panel(plasma: Plasma): (children: () => void, options?: panel.PanelOptions) => void;

export = panel;
