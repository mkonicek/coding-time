type TreeNode = {
  value: number
  children: TreeNode[]
}

function randomNumber(min: number, max: number) {
  return min + Math.floor(Math.random() * max)
}

function makeBalancedTree(nodeCount: number): TreeNode {
  const node: TreeNode = {
    value: randomNumber(1, 100),
    children: [],
  }
  if (nodeCount > 1) {
    const childCount = 8
    const nodesPerChild = Math.floor((nodeCount - 1) / childCount)
    const remaining = (nodeCount - 1) % childCount
    for (let i = 0; i < childCount; i++) {
      const subtreeSize = i < remaining ? nodesPerChild + 1 : nodesPerChild
      if (subtreeSize > 0) {
        node.children.push(makeBalancedTree(subtreeSize))
      }
    }
  }
  return node
}

const balancedTrees = [
  { nodeCount: 2000, tree: makeBalancedTree(2000) },

  { nodeCount: 200 * 1000, tree: makeBalancedTree(200 * 1000) },

  { nodeCount: 400 * 1000, tree: makeBalancedTree(400 * 1000) },

  { nodeCount: 600 * 1000, tree: makeBalancedTree(600 * 1000) },

  { nodeCount: 800 * 1000, tree: makeBalancedTree(800 * 1000) },

  { nodeCount: 1000 * 1000, tree: makeBalancedTree(1000 * 1000) },

  { nodeCount: 1200 * 1000, tree: makeBalancedTree(1200 * 1000) },

  { nodeCount: 1400 * 1000, tree: makeBalancedTree(1400 * 1000) },

  { nodeCount: 1600 * 1000, tree: makeBalancedTree(1600 * 1000) },

  { nodeCount: 1800 * 1000, tree: makeBalancedTree(1800 * 1000) },

  { nodeCount: 2000 * 1000, tree: makeBalancedTree(2000 * 1000) },
]

// Immutable version

function findImmutable(val: number, tree: TreeNode): number[] {
  const fromChildren = tree.children.flatMap(child => findImmutable(val, child))
  return tree.value > val ? [tree.value, ...fromChildren] : fromChildren
}

// Mutable version

function findMutable(val: number, tree: TreeNode) {
  const results: number[] = []
  findMutableHelper(val, tree, results)
  return results
}

function findMutableHelper(val: number, tree: TreeNode, results: number[]) {
  if (tree.value > val) {
    results.push(tree.value)
  }
  for (const child of tree.children) {
    findMutableHelper(val, child, results)
  }
}

// Sanity check

const smallTree = makeBalancedTree(30)
console.log(`30 nodes - Immutable: ${findImmutable(80, smallTree)}`)
console.log(`30 nodes - Mutable:   ${findImmutable(80, smallTree)}\n`)

// Benchmark

function formatSum(numbers: number[]) {
  return `Sum of ${numbers.length} numbers = ${numbers.reduce(
    (a, b) => a + b,
    0
  )}`
}

for (const { nodeCount, tree } of balancedTrees) {
  const iterations = 10

  let time = Date.now()
  let resultImmutable: number[] = []
  for (let i = 0; i < iterations; i++) {
    resultImmutable = findImmutable(80, tree)
  }
  const immutableMs = (Date.now() - time) / iterations

  time = Date.now()
  let resultMutable: number[] = []
  for (let i = 0; i < iterations; i++) {
    resultMutable = findMutable(80, tree)
  }
  const mutableMs = (Date.now() - time) / iterations

  console.log(
    `${nodeCount} nodes - Immutable: ${formatSum(
      resultImmutable
    )}. Spent ${immutableMs}ms.`
  )
  console.log(
    `${nodeCount} nodes - Mutable:   ${formatSum(
      resultMutable
    )}. Spent ${mutableMs}ms.\n`
  )
}
