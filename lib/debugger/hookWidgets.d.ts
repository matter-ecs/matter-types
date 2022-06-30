import { PatchOverride } from "@rbxts/plasma/out/Style"
import { Widgets } from "@rbxts/plasma/out/widgets"

export type HookWidgets = PatchOverride<Widgets, {
        checkbox: () => {
            clicked(): boolean
            checked(): boolean
        },
        button: () => {
            clicked(): boolean
        },
        slider: (n: number) => number
    }>