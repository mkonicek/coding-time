---
title: Implementation of Lambdas in C#
description: >-
  How closures in C# are compiled to bytecode.
date: "2009-11-01T00:00:00.000Z"
categories: [engineering, c-sharp]
keywords: []
slug: /c-sharp-lambdas
---

What is the output of the following program?

```cs
int x = 1;
Action action = (() => { Console.WriteLine(x); });
x = 2;
action();
```

The output is of course 2, because delegates capture references to outer variables.

I was curious how this was implemented in the compiler.

The compiler rewrites the code above to something like this:

```cs
Scope s = new Scope();
scope.x = 1;
scope.x = 2;
scope.Call();
```

and defines the `Scope` class like this:

```cs
private sealed class Scope
{
    public int x;
    public Scope();

    public void Call()
    {
        Console.WriteLine(this.x);
    }
}
```

As we would expect, the is no way to create a reference to eg. an int in IL, so this is solved naturally - the int is wrapped inside Scope class and all accesses are done through the wrapper.
The wrapper also defines the `Call` method, which is exactly the body of the anonymous delegate.

Actually, the compiler generated name for our Scope class is `<>__DisplayClass1`, and the `Call` method is named `<Main>b__0`.

For a little more complex example, see [this post on StackOverflow](https://stackoverflow.com/questions/742365/how-captured-value-in-anonymous-methods-are-implemented-in-net).
