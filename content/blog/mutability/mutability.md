---
title: Mutability can be OK
description: >-
  When limited in scope, mutability can be useful to improve performance.
date: "2022-01-22T12:57:16.474Z"
categories: [engineering]
keywords: []
slug: /mutability
---

Just a quick check both versions find the exact same numbers:

```ts
for (const { nodeCount, tree } of balancedTrees.slice(0, 2)) {
  const resultImmutable = findImmutable(80, tree)
  const resultMutable = findMutable(80, tree)

  console.log(`${nodeCount} nodes - Immutable: ${resultImmutable}`)
  console.log(`${nodeCount} nodes - Mutable:   ${resultMutable}`)
}
```

Prints:

```txt
30 nodes - Immutable: 86,100,83,82,95
30 nodes - Mutable:   86,100,83,82,95
```

Results:

```txt
2k nodes - Immutable: Sum of 382 numbers = 34594. Spent 0.9ms.
2k nodes - Mutable:   Sum of 382 numbers = 34594. Spent 0.8ms.

200k nodes - Immutable: Sum of 40095 numbers = 3627581. Spent 59.2ms.
200k nodes - Mutable:   Sum of 40095 numbers = 3627581. Spent 4.2ms.

400k nodes - Immutable: Sum of 79930 numbers = 7233851. Spent 122.5ms.
400k nodes - Mutable:   Sum of 79930 numbers = 7233851. Spent 8.3ms.

...

2m nodes - Immutable: Sum of 399881 numbers = 36186296. Spent 628.8ms.
2m nodes - Mutable:   Sum of 399881 numbers = 36186296. Spent 45.5ms.
```
