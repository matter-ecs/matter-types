import { AnySystem, Loop } from "../Loop";

import Plasma, { Widgets } from "@rbxts/plasma";

declare class Debugger {
	public enabled: boolean;
	public authorize?: (player: Player) => boolean;

	public constructor(plasma: Plasma);

	public show(): void;

	public hide(): void;

	public toggle(): void;

	public connectPlayer(): void;

	public disconnectPlayer(): void;

	public autoInitialize(loop: Loop<Array<unknown>>): void;

	public replaceSystem(oldSystem: AnySystem, newSystem: AnySystem): void;

	public switchToServerView(): void;

	public switchToClientView(): void;

	public draw<T extends Array<unknown>>(loop: Loop<T>): void;

	public getWidgets(): Widgets;
}

export = Debugger;
