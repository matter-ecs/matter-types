import Plasma from "@rbxts/plasma";

declare namespace codeText {
	interface CodeTextOptions {}
}

declare function codeText(plasma: Plasma): (text: string, options: codeText.CodeTextOptions) => void;

export = codeText;
