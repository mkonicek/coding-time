---
title: Making Pull Requests Easy to Review
description: >-
  How to get useful and timely feedback on pull requests.
date: "2021-12-22T00:00:00.000Z"
categories: [engineering]
keywords: []
slug: /code-review
---

This document contains Tips & Tricks for authoring pull requests. The tricks in this document help you achieve the following:

- The pull request gets a thorough review, with useful feedback.
- The reviewer can understand the pull request. It doesn’t take too long to understand it.

This leads to:

- You get higher quality code - easier to maintain, fewer bugs.
- Code gets reviewed quicker. This is good both for the author and the reviewer.

### Trick 1 - Add inline comments

Yes, I almost always comment on my own pull requests. The idea is to help the reviewer as much as possible:

#### “This code has moved”

Explaining a piece of code has simply moved is usually a time saver. It looks like the code is getting deleted and it is not clear why. However, thanks to a comment the reviewer can skip right over it.

Adding comments is very quick as you have all the context fresh in memory.

### Trick 2 - Add comments in code

This one is quite obvious. Sometimes a comment belongs in the code:

### Trick 3 - Multiple commits

Some pull requests end up large and complex which makes them very difficult to review. At the very least, add inline comments.

Better, consider splitting the work into multiple commits.

Reading each commit separately makes the pull request easier to understand.

### Trick 4 - Multiple pull requests

This final trick is similar to the multiple commits above, except you make one pull request per logically separate part of your work.

“Stacking” pull requests like this is possible with GitHub. The advantages are:

- The discussions are nicely separated.
- Each PR can get approved separately and ship quicker.
- Each PR has its own [Test Plan](/what-is-a-test-plan).
