import { AnySystem, Loop } from "../Loop";

import Plasma from "@rbxts/plasma";
import { HookWidgets } from "./hookWidgets";

declare class Debugger {
	public enabled: boolean;

	public constructor(plasma: typeof Plasma);

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

	public getWidgets(): HookWidgets;
}

export = Debugger;
