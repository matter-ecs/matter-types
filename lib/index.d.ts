import { AnyComponent, Component, newComponent, InferComponents, GenericOfComponent } from "./component";
import useThrottle from "./hooks/useThrottle";
import useEvent from "./hooks/useEvent";
import useDeltaTime from "./hooks/useDeltaTime";
import { Loop, AnySystem, System, SystemFn, SystemStruct } from "./Loop";
import { None, merge } from "./immutable";
import { useCurrentSystem, useHookState } from "./topoRuntime";
import { AnyEntity, Entity, World, Iterate } from "./World";
import Debugger from "./debugger/debugger";
import { Widgets } from "@rbxts/plasma";
import log from "./hooks/log";

export {
	World,
	Loop,
	newComponent as component,
	useEvent,
	useDeltaTime,
	useThrottle,
	log,
	useHookState,
	useCurrentSystem,
	merge,
	None,
	Debugger,
};

export type {
	Entity,
	AnyEntity,
	Component,
	AnyComponent,
	InferComponents,
	GenericOfComponent,
	Iterate,
	System,
	SystemFn,
	SystemStruct,
	AnySystem,
	Widgets as DebugWidgets,
};
