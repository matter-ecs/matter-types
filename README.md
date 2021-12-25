
```ts
import { component, Loop, World } from "@rbxts/matter"

const world = new World()

const Amount = component<number>()
const Name = component<string>()
const WantsMoney = component<boolean>()

const Marcus = world.spawn(Amount(1000), Name("Marcus"), WantsMoney(true))
const Jade = world.spawn(Amount(7400), Name("Jade"), WantsMoney(false))

for (const [entity_id, amount, name, flag] of world.query(Amount, Name, WantsMoney)) {
  if (WantsMoney) Amount += 500
}

assert(world.get(Marcus, Amount) === 1500)
assert(world.get(Jade, Amount) === 7400)
```
