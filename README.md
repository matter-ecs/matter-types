
```ts
import { component, Loop, World } from "@rbxts/matter"

const world = new World()

const Amount = component<{ amount: number }>()
const Name = component<{ name: string} >()
const WantsMoney = component<{ flag: boolean }>()

const Marcus = world.spawn(Amount({ amount: 1000 }), Name({ name: "Marcus"}), WantsMoney({flag: true}))
const Jade = world.spawn(Amount({ amount: 1000 }), Name({name: "Jade"}), WantsMoney({ flag: false }))

for (const [entity_id, amount, name, flag] of world.query(Amount, Name, WantsMoney)) {
  if (WantsMoney.flag) Amount.amount += 500
}

assert(world.get(Marcus, Amount).amount === 1500)
assert(world.get(Jade, Amount).amount === 7400)
```
