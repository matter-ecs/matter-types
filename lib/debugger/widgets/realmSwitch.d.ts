import Plasma from "@rbxts/plasma";

declare namespace realmSwitch {
	interface RealmSwitchOptions {
		left?: string;
		right?: string;
		isRight?: boolean;
	}

	interface RealmSwitchHandle {
		clicked(): boolean;
	}
}
declare function realmSwitch(
	plasma: Plasma,
): (options?: realmSwitch.RealmSwitchOptions) => realmSwitch.RealmSwitchHandle;

export = realmSwitch;
