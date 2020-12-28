---
title: Implementation of Goroutines
description: >-
  How does a feature of the Go programming language
  work under the hood?
date: "2013-08-01T00:00:00.000Z"
categories: []
keywords: []
slug: /goroutines-implementation
---

I have been reading up on concurrency in Go. In particular, I have been wondering about the statement from a [presentation](https://talks.golang.org/2013/oscon-dl.slide#31) by [Brad Fitzpatrick](https://bradfitz.com/):

```go
n, err := io.Copy(dst, src)
```

- Copies n bytes from dst to src
- Synchronous (blocks)
- Go runtime deals with making blocking efficient

In some of the languages I have worked with like C, Java and Scala, a call that blocks the execution of the current function also blocks the current thread.

The question therefore is: What are the fundamental differences in the implementation of goroutines compared to OS threads that make goroutines so much more lightweight?

I have asked this question on the Go mailing list and the members of the Go team (notably Dmitry Vyukov and Ian Lance Taylor) have been incredibly helpful.

The summary is:

- Stack that grows and shrinks on demand
- Smaller context, easier to switch
- Cooperative scheduling at known points is less work (can make assumptions about CPU state)

Here is the [discussion](https://groups.google.com/g/golang-nuts/c/j51G7ieoKh4/m/wxNaKkFEfvcJ?pli=1).

Note: There are other languages (such as Haskell and Erlang) that also have the concept of lightweight "processes" that allow for blocking calls without blocking OS threads. The concept is sometimes referred to as [green threads](https://en.wikipedia.org/wiki/Green_threads).
