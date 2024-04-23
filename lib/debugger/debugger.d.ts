import { Loop, System } from "../Loop";

import Plasma, { Widgets } from "@rbxts/plasma";
import panel from "./widgets/panel";
import selectionList from "./widgets/selectionList";
import container from "./widgets/container";
import frame from "./widgets/frame";
import link from "./widgets/link";
import realmSwitch from "./widgets/realmSwitch";
import tooltip from "./widgets/tooltip";
import entityInspect from "./widgets/entityInspect";
import valueInspect from "./widgets/valueInspect";
import worldInspect from "./widgets/worldInspect";
import hoverInspect from "./widgets/hoverInspect";
import { AnyEntity } from "../World";

declare namespace Debugger {
	interface CustomWidgets {
		panel: typeof panel;
		selectionList: typeof selectionList;
		container: typeof container;
		frame: typeof frame;
		link: typeof link;
		realmSwitch: typeof realmSwitch;
		valueInspect: typeof valueInspect;
		worldInspect: typeof worldInspect;
		entityInspect: typeof entityInspect;
		tooltip: typeof tooltip;
		hoverInspect: typeof hoverInspect;
	}
}

declare class Debugger<T extends Array<unknown>> {
	public enabled: boolean;
	public authorize?: (player: Player) => boolean;
	public componentRefreshFrequency?: number;
	public findInstanceFromEntity?: (id: AnyEntity) => Instance | undefined;

	public constructor(plasma: Plasma);

	public show(): void;

	public hide(): void;

	public toggle(): void;

	public connectPlayer(): void;

	public disconnectPlayer(): void;

	public autoInitialize(loop: Loop<T>): void;

	public replaceSystem(oldSystem: System<T>, newSystem: System<T>): void;

	public switchToServerView(): void;

	public switchToClientView(): void;

	public draw<T extends Array<unknown>>(loop: Loop<T>): void;

	public getWidgets(): Widgets;
	
	public loopParameterNames: Array<string>;
}

export = Debugger;
