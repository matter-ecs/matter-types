import { PatchOverride } from "@rbxts/plasma/out/Style"
import { Widgets } from "@rbxts/plasma/out/widgets"

export type HookWidgets = PatchOverride<Widgets, {
        checkbox: (title: string) => {
            clicked(): boolean
            checked(): boolean
        },
        button: (title: string) => {
            clicked(): boolean
        },
        slider: (n: number) => number
    }>