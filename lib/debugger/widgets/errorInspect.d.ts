import Plasma from "@rbxts/plasma";
import Debugger, { CustomWidgets } from "../debugger";

declare function errorInspect(plasma: Plasma): (myDebugger: Debugger, custom: CustomWidgets) => void;

export = errorInspect;
