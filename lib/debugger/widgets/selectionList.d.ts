import Plasma from "@rbxts/plasma";

declare namespace selectionList {
	interface SelectionListItem {
		text: string;
		selected: boolean;
		icon: string;
	}

	interface SelectionListOptions {
		width?: UDim2;
	}

	interface SelectionListHandle {
		selected(): boolean;
	}
}

declare function selectionList(
	plasma: Plasma,
): (
	items: ReadonlyArray<selectionList.SelectionListItem>,
	options?: selectionList.SelectionListOptions,
) => selectionList.SelectionListHandle;

export = selectionList;
