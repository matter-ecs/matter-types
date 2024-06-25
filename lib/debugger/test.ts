import { World } from "World";
import { component } from "index";

const [id, a] = new World().query(component<{ foo: string }>()).next();

if (id !== undefined) {
	a.patch({
		foo: "test",
	});
}
