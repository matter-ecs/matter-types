import Plasma from "@rbxts/plasma";
import Debugger from "../debugger";
import { World, AnyEntity } from "../../World";

declare function hoverInspect(plasma: Plasma): (world: World, id: AnyEntity, custom: Debugger.CustomWidgets) => void;

export = hoverInspect;
