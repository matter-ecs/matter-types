# @rbxts/matter
[![NPM](https://nodei.co/npm/@rbxts/matter.png)](https://npmjs.org/package/@rbxts/matter)

Roblox-TS typings for Matter made by `@evaera` and `@lpghatguy`,

## Installation:

`npm i @rbxts/matter`

## Example Usage

```ts
import { component, Loop, World } from "@rbxts/matter"

const world = new World()

const Balance = component<{ amount: number }>()
const Name = component<{ name: string} >()
const WantsMoney = component<{ flag: boolean }>()

const Marcus = world.spawn(Balance({ amount: 1000 }), Name({ name: "Marcus" }), WantsMoney({ flag: true }))
const Jade = world.spawn(Balance({ amount: 1000 }), Name({ name: "Jade" }), WantsMoney({ flag: false }))

for (const [entity_id, bal, name, wants_money] of world.query(Balance, Name, WantsMoney)) {
  if (wants_money.flag) bal.patch({ amount: bal.amount += 500 })
}

assert(world.get(Marcus, Amount).amount === 1500)
assert(world.get(Jade, Amount).amount === 1000)
```


See [Evaera/Matter](https://eryn.io/matter/)

## Changelog

### 0.0.1

- Republished Matter V1.0.0 (from GitHub commit [d0df77f ](https://github.com/evaera/matter/commit/2205dc084c7ad090c671fa3853b69193652ff4c7))


