import Plasma from "@rbxts/plasma";
import Debugger from "../debugger";

declare function entityInspect(plasma: Plasma): (myDebugger: Debugger) => void;

export = entityInspect;
