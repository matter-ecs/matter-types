# Matter [![CI status][ci-badge]][ci] [![Docs status][docs-badge]][docs] [![NPM package version][npm-badge]][package]

**Matter** is a modern ECS library for _[Roblox]_ with _[roblox-ts]_ typings.

[ci-badge]: https://github.com/matter-ecs/matter/actions/workflows/ci.yaml/badge.svg
[docs-badge]: https://github.com/matter-ecs/matter/actions/workflows/docs.yaml/badge.svg
[npm-badge]: https://img.shields.io/npm/v/%40rbxts/matter?color=34D058
[ci]: https://github.com/matter-ecs/matter/actions/workflows/ci.yaml
[docs]: https://matter-ecs.github.io/matter/
[package]: https://npmjs.org/package/@rbxts/matter
[roblox]: https://www.roblox.com/
[roblox-ts]: https://roblox-ts.com/

## Installation

Matter can be installed with [npm] in your project by running the following
command.

```sh
npm install @rbxts/matter
```

[npm]: https://www.npmjs.com/

## Usage

```ts
import { component, Loop, World } from "@rbxts/matter"

const world = new World()

const Balance = component<{ amount: number }>()
const Name = component<{ name: string} >()
const WantsMoney = component<{ flag: boolean }>()

const Marcus = world.spawn(Balance({ amount: 1000 }), Name({ name: "Marcus" }), WantsMoney({ flag: true }))
const Jade = world.spawn(Balance({ amount: 1000 }), Name({ name: "Jade" }), WantsMoney({ flag: false }))

for (const [entityId, bal, name, wantsMoney] of world.query(Balance, Name, WantsMoney)) {
  if (wantsMoney.flag) world.insert(entityId, bal.patch({ amount: bal.amount + 500 }))
}

assert(world.get(Marcus, Amount).amount === 1500)
assert(world.get(Jade, Amount).amount === 1000)
```

To see Matter used in a game, check out [For Animia].

[for animia]: https://github.com/ukendio/for-animia

## Contributing

Contributions are welcome, please make a pull request!

Only types should be contributed to this project. General changes should be made
to the [main project].

Please read our [contribution] guide and [code of conduct] when getting
involved.

[main project]: https://github.com/matter-ecs/matter
[contribution]: https://github.com/matter-ecs/matter/blob/main/CONTRIBUTING.md
[code of conduct]: https://github.com/matter-ecs/matter/blob/main/CODE_OF_CONDUCT.md

## License

Matter is free software available under the MIT license. See the [license] for
details.

[license]: LICENSE.md
