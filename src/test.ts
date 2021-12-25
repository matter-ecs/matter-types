import { component } from "index";
import { Loop } from "Loop";
import { World } from "World";

const loop = new Loop(1, 2, 3);
loop.scheduleSystem((a, b, c) => {
	print(a); // 1
});

const Id = component<number>();
const Flag = component<boolean>();
const Name = component<string>();

const world = new World();

for (const [e, id, flag, name] of world.query(Id, Flag, Name)) {
}

for (const [e, record] of world.queryChanged(Name)) {
}
