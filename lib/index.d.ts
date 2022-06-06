import { AnyComponent, Component, newComponent, InferComponents, GenericOfComponent} from "./component";
import { useDeltaTime } from "./hooks/useDeltaTime";
import { useEvent } from "./hooks/useEvent";
import { useThrottle } from "./hooks/useThrottle";
import { Loop } from "./Loop";
import { None, merge } from "./immutable";
import { useHookState } from "./topoRuntime";
import { AnyEntity, Entity, World , Iterate } from "./World";

export { 
    World, 
    newComponent as component, 
    Loop, 
    useEvent, 
    useDeltaTime, 
    useThrottle, 
    useHookState, 

    merge,
    None,
};

export type { Entity, AnyEntity, Component, AnyComponent, InferComponents, GenericOfComponent, Iterate};
