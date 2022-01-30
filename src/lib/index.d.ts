import { AnyComponent, Component, newComponent } from "./Component";
import { useDeltaTime } from "./hooks/useDeltaTime";
import { useEvent } from "./hooks/useEvent";
import { useThrottle } from "./hooks/useThrottle";
import { Loop } from "./Loop";
import { useHookState } from "./TopoRuntime";
import { AnyEntity, Entity, World } from "./World";

export { World, newComponent as component, Loop, useEvent, useDeltaTime, useThrottle , useHookState};
export type { Entity, AnyEntity, Component, AnyComponent };
