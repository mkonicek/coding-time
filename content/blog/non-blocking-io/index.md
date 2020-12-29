---
title: Non-blocking I/O
description: >-
  The difference between blocking and non-blocking I/O.
date: "2012-06-01T00:00:00.000Z"
categories: [engineering]
keywords: []
slug: /non-blocking-io
---

NOTE: This article was originally written in 2012 so it feels a bit dated.

This is an article about inner workings of non-blocking servers, that is servers that don't block a thread per connected client. The examples are in "pseudocode" resembling JS but not specific to any technology.

The basic component of non-blocking code is an event-like interface:

```js
// The examples below are "pseudocode", not specific to NodeJS.

onRequest: function(request) {
  response = ... // generate response
  respond(response)
}
```

The interesting part is what the underlying framework does to provide this interface. The answer is a message loop running under the covers:

```js
while (true) {
  connection = poll_connection_from_OS()
  request = read_request_from(connection)
  onRequest(request) // call user code
}
```

There two observations to make at this point:

- The server runs entirely on a single thread.
- If your onRequest code does something fast, only CPU bound, this approach is efficient.

In "traditional" blocking I/O (e.g. old C#, Java APIs) what you would usually do in your onRequest code is something like this:

```js
onRequest: function(request) {
  obj = db.read_object(request.param('id'))
  respond(json(obj))
}
```

The problem is that the `db.read_object` is a blocking call. There is no way the thread can continue, because the method must return the database object. And remember, we are still on the single thread running the message loop.

Therefore, if a thousand clients come at the same time, they will get served one-by-one, the last one waiting for the 999 database calls to complete. In other words, the throughput of our server is terribly low.

So what's the solution to this problem? Here it is:

```js
onRequest: function(request) {
  db.read_object(request.params("id"), function(obj) {
    respond(json(obj))
  })
  // Returns immediately!
}
```

The whole difference is in the db library being itself non-blocking. What `db.read_object` does is that it puts the passed callback function inside some data structure and returns immediately, so our (single!) main thread can happily continue accepting requests. The db object itself is then running its own message loop internally (on its own thread, so our server has two threads now). In its internal loop, the db object polls for responses from the external database and calls back our function.

Now, if thousand clients come at the same time, a thousand requests to the database will be fired almost instantly and remembered by the db object, and a response will be sent back to each individual client as soon as the database returns each one of the individual requested objects.

This is the awesome non-blocking IO that everyone is talking about. The server really is handling a thousand clients "in parallel" using only two threads.

Of course, there will still be one thousand open sockets but we managed to handle them all using only two threads.

#### Appendix - what to do when you only have a blocking client library

If the only API your client library gives you is 'obj = db.read_object(id)', you will essentially need to do the following:

```js
onRequest: function(request) {
  threadPool.queue(function() {
    obj = db.read_object(request.params("id"))
    respond(json(obj))
  }
}
```

This way you free the IO thread (the one running the message loop) for accepting more incoming requests, but your server is now blocking, since it uses one thread per client (each of those threads simply sits idle, waiting for the response from the database). If many requests come at once, the threadpool will start new threads. When a maximum number of threads is reached, the calls will be just queued, waiting for threads to complete and become available, therefore seriously limiting throughput.

The takeaway from this article is: in order for your request handling code to be non-blocking, it has to be composed entirely on non-blocking API calls. A "non-blocking" server toolkit by itself does not guarantee high concurrency/throughput.
