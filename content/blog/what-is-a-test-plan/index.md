---
title: What is a Test Plan?
description: >-
  When you make contributions to React Native we ask you to provide a Test Plan
  along with your pull request.
date: "2017-02-13T16:40:57.242Z"
categories: []
keywords: []
slug: /what-is-a-test-plan
---

When you make contributions to [React Native](https://github.com/facebook/react-native) we ask you to provide a Test Plan along with your pull request.

A test plan is a bit of text (sometimes with screenshots) that proves your code works. This post explains how to write test plans and why they are useful.

At Facebook every code change must be reviewed by at least one person and must have a test plan. Before joining Facebook I have never written test plans (or done code reviews for that matter). However, in my 3 years at Facebook I’ve learned that code reviews and test plans are worth it.

### **Example Pull Request**

Let’s say you’re working on a website called Imgur that allows people to share images. People can upload .jpg files and you’d like to support uploading .png files.

You write some code and try that it works. You run the website locally, click ‘Upload’ and see something like this:

![](https://cdn-images-1.medium.com/max/800/1*aLS9Br6b3LGrYJbv-vqNsw.png)

They you drag a .png file into the browser and see the file was uploaded and displayed. Great, your code works!

Now you send a pull request so team members can review your code. You explain two things:
\- Why should we merge this? (It’s a highly requested and useful feature)
\- **Is it safe to merge? (== Test Plan)**

Here’s what your pull request looks like:

![](https://cdn-images-1.medium.com/max/800/1*FyGwPq_AvAWoBBtM7DYkbg.png)

The test plan is there to **prove the code works.**

Thanks to the test plan, your teammates know they can merge the code **without breaking the product**.

### **Is this actually useful?**

Why not just say “My code works, I tried it locally”?

See the example test plan above. Besides trying the happy path (uploading a .png file), it also covers error handling (uploading an invalid file) and performance.

Showing you thought about error handling saves time answering followup questions by reviewers: “What happens if I upload an invalid file?”. It’s not enough to have a branch in the code handling invalid files, you should also invoke that branch, see that it works, and show reviewers you tried. Surprisingly, people sometimes write code but don’t test all the edge cases. Edge cases are an important source of bugs.

Here’s a comment from React Native showing how this can uncover bugs before they are committed into the codebase and ruin everyone else’s day:

![](https://cdn-images-1.medium.com/max/800/1*NiVWzfNyzmJA_Yrwr8XTJg.png)

### Common mistake — code breaks existing functionality

There’s an important thing missing in the test plan above.

Let’s say the list of changed files looks like this:

> (Modified) parseFileHeader.c
> (Modified) upload.js
> …

Uploading .png files works. However, by touching those files there is a real chance **.jpg upload is now broken**. Without also trying to upload a .jpg file locally, we cannot know. Therefore the test plan should also say:

> Also tried uploading a .jpg file, works as before.

### Checklist

These are the things to cover in any pull request:
\- Happy path
\- Error handling (uploading invalid file, uploading when offline, …)
\- Existing functionality still works

### **Test Plans and trust**

When you send your first pull request to a project, the test plan might be very long to prove the code is very solid. Once you’ve sent multiple changes and others know that your code has always been solid, it’s possible to relax the test plans a bit. For example you could leave out the screenshot. I like to include screenshots in any case to make it easier for reviewers to see how the feature works.

There are no hard rules and this depends on the team. A test plan should never ever look as follows, however:

> Test Plan: Ran locally.

Or this:

> Test Plan: #yolo

Every plan should at the very minimum have the simple checklist, no matter how long you’ve been on the project.

### Automated tests

Your project is likely to have unit tests and maybe also integration tests. It is likely, however, that not every code path is covered by integration tests. Normally you run the app and play with the UI, correct? Think about it this way: You wouldn’t write code locally, run tests, never run the app, and commit the code.

Automated tests are very useful and they will catch stuff that you forgot about. But at the same time they will miss things that you check manually. Tests are good and you should consider adding a test and saying:

> Besides the manual testing, also added an integration test.

How much you rely on automated tests depends on your project. Let’s say you work at Oracle on the database engine. Then every line of code is covered by tests. If you work on a database engine it might make sense to simply say “All tests passed”.

### Conclusion

Personally I’ve learned that code reviews and test plans are worth it. They help discover bugs and increase code quality.

Consider asking people on your team for a test plan and adding one to your next pull request.
