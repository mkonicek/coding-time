---
title: Making Pull Requests Easy to Review
description: >-
  Better code, quicker.
date: "2021-12-22T00:00:00.000Z"
categories: [engineering]
keywords: []
slug: /code-review
---

This is a post on authoring pull requests. The tricks below will help you achieve the following:

- The pull request gets a thorough review.
- The reviewer can understand the pull request quickly.

This leads to:

- Higher quality code.
- Less rebasing, code ships faster. 🚢

### Trick 1 - Add inline comments

You should add inline comments to your pull requests. This will make it easy to understand why you're making the change:

![Inline comment - using this class in the test](./comment-1a.png)

![Inline comment - description is now part of the node](./comment-rm-1.png)

Without comments like that, the reviewer has to spend time scrolling up and down to figure out the reason for the change. If the change is more complex, the reviewer will write a comment asking for an explanation which adds delays both for you and them.

#### “This code moved”

Explaining a piece of code moved is often a nice time saver.

![Inline comment - explaining code move](./comment-mv-1.png)

Without the comment it looks like the code was deleted. It is not clear why. The reviewer will have to realize the exact same code appeared in a different file.

Adding comments like those shown above is quick and easy. Right when you open the pull request you have all the context fresh in memory. It only takes a few minutes to type some comments. You will be rewarded with less back and forth communication and hopefully a quick accept! ✅

### Trick 2 - Add comments in code

This one is quite obvious. Sometimes a comment belongs in code:

```js
if (selectedFonts.length === 1) {
  // Only show the remove button if a single font is selected.
  // When multiple fonts are selected it was too easy to accidentally
  // click the button and remove all.
  return <RemoveButton />
}
```

A well known wisdom says: Every comment should explain **why** you did something. This way everyone will be able to understand the code later without having to ask questions.

### Trick 3 - Multiple commits

Some pull requests end up large and complex which makes them very difficult to review.

![Sarah Drasner: Most of my work as an engineering manager has been teaching people how to scope work to smaller bits. So any time you have a big honking PR it's a nightmare to review - either too much discussion or none because no one can get their head around it.](./sarah2.png)

If you've ever had to read through a pull request with 20 changed files I'm sure you can imagine how much easier it would be to review smaller, logically separate pieces. Consider splitting the work into multiple commits:

![Commits](./commits.png)

A good way to split work into commits is:

1. Implement an MVP
2. Improve it

### Trick 4 - Multiple pull requests

This trick is similar to the multiple commits mentioned above, except you make one pull request per logically separate piece of your work.

![Stack of pull requests](./stack.png)

Notice the number of comments on each pull request above: 28 comments, 9 comments, 20 comments. I could have made a single pull request called "Optimize performance". Managing the discussion about various parts of that pull request would be a pain for me and the reviewer.

The advantages of splitting work into multiple pull requests are:

- The discussions are nicely separated.
- Each pull request can get approved separately and ship quicker.
- Each pull request has its own [Test Plan](/what-is-a-test-plan).

### Trick 5 - Before you open a pull request

You don't want to spend a few days writing code only to finally open a pull request and find out there was a much easier approach. For complex pull requests it is often wise to set up a meeting and write a design document before writing code.

### Summary

If you remember only one thing from this post, start **adding comments to your own pull requests**. This is the action which costs you virtually no effort and pretty much guarantees the reviewer will understand your code better and quicker.

As the next level, try to **scope work into smaller bits**. You don't have to find the perfect split. Any progress towards the goal helps. This will only get easier over time.
