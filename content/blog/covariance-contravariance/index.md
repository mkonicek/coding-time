---
title: Covariance and Contravariance
description: >-
  Short explanation of covariance and contravariance
  with simple examples in Scala.
date: "2011-05-01T00:00:00.000Z"
categories: [engineering, scala]
keywords: []
slug: /covariance-contravariance
---

This is a very concise tutorial on covariance and contravariance. In 10 minutes you'll understand what these concepts are and how to use them. The examples are in Scala but apply to Java and C# as well.

#### Covariance

Assuming `Apple` is a subclass of `Fruit`, covariance lets you treat say `List[Apple]` as `List[Fruit]`.

```scala
def processList(list: List[Fruit]) = {
  // ...
}

val apples = List(new Apple(), new Apple())
processList(apples)
```

This seems obvious - indeed, a list of apples is a list of fruit, right?

The surprise comes when we find out this does not work with arrays.

```scala
val a = Array(new Apple(), new Apple())
// Compile error
processArray(a)
```

Why is that so? Because you could do the following:

```scala
def processArray(array: Array[Fruit]) = {
  // Adding an Orange into array of Apples!
  array(1) = new Orange()
}
```

The main difference between `List` and `Array` here is that the `List` is immutable (you cannot change its contents) while the `Array` is mutable. As long as we are dealing with immutable types everything is OK (as in the first example).

So how does the compiler know that `List` is immutable? Here is the declaration of `List`:

```scala
sealed abstract class List[+A]
```

The `+A` type parameter says "List is covariant in A". That means the compiler checks that there is no way to change contents of the list, which eliminates the problem we had with arrays.

Simply put, a covariant class is a class from which you can read stuff out, but you can't put stuff in.

#### Contravariance

Now when you already understand covariance, contravariance will be easier - it is exactly the opposite in every sense.

You can put stuff in a contravariant class, but you can never get it out (imagine a `Logger[-A]` - you put stuff in to be logged). That doesn't sound too useful, but there is one particularly useful application: functions. Say you've got a function taking a `Fruit`:

```scala
// isGoodFruit is a func of type Fruit=>Boolean
def isGoodFruit(f: Fruit) = f.ageDays < 3
```

and filter a list of Apples using this function:

```scala
val list: List[Apple] = List(
  new Apple(),
  new Apple()
)
// filter expects a func Apple=>Boolean
//        we pass a func Fruit=>Boolean
list.filter(isGoodFruit)
```

So a _function on Fruits is a function on Apples_. We can pass in an `Apple` and `isGoodFruit` will know how to handle it.

The type of `isGoodFruit` is actually `Function[Fruit, Boolean]` - yes, in Scala even functions are traits, declared as:

```scala
trait Function[-A,+B]
```

The declaration says functions are contravariant in their parameter types and covariant in their return types.

This is the minimal explanation I wanted to cover.
