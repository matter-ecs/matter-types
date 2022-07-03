import { Widgets } from "@rbxts/plasma";
import { PatchOverride } from "@rbxts/plasma/out/Style";

export type HookWidgets = PatchOverride<
	Widgets,
	{
		checkbox: (title: string) => {
			clicked(): boolean;
			checked(): boolean;
		};
		button: (title: string) => {
			clicked(): boolean;
		};
		slider: (n: number) => number;
	}
>;
