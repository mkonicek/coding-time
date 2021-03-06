---
title: Hello World!
description: New year, new blog 🎉
date: "2021-01-01T00:00:00.000Z"
categories: []
keywords: []
slug: /hello-world
---

![New horizons](./ocean.jpeg)

I finally got around to moving my blog from Medium to Gatsby.

The name "Coding time" goes back to my very first blog from a decade ago. It is inspired by the flow when you focus and everything else disappears.

Setting up [Gatsby](https://www.gatsbyjs.com/) and migrating content from Medium was ridiculously easy thanks to a [great article](https://www.no.lol/2019-03-16-medium-to-gatsby/) by [Lauren Tan](https://twitter.com/sugarpirate_). Already going with the hype thanks to Gatsby I even threw in [Vercel](https://vercel.com/). Vercel builds the blog after every commit and [serves the content from a CDN](https://vercel.com/docs/edge-network/caching). Soon I had the site up and running at [coding-time.vercel.app](https://coding-time.vercel.app). Apparently Vercel handles 4.5 billion requests a week.

![Not bad!](./not-bad.png)

Then I bought the domain and in the domain management interface, pointed the DNS record for `coding-time.co` at the IP address shown in the Vercel admin interface.

All of the above took about two hours. Then I manually fixed the formatting in some of the generated markdown and copied images over, often looking for better, higher-quality versions of the images in my Dropbox or online. This was straightforward and took a few hours.

It feels great to have a new blog with no paywall, no signups, no ads. Writing in markdown and publishing with `git push` is great. The main thing missing compared to Medium are comments.

This new blog contains almost all of the posts from my Medium blog. Here is some feedback I received on the blog in the past:

- People from the Medium publication [The Startup](https://medium.com/swlh) with 700k+ followers reached out and published a few of my articles, such as [Meetings](../meetings) and [Why Demand for Software Engineers Will Stay High](../software-engineers-demand).
- Someone used my article [Playing with Word Vectors](../playing-with-word-vectors) when teaching a high school programming class.
- A colleague shared the article [How to Slack](../how-to-slack) with the rest of the company.

I even brought back a few posts from my original blog "Coding time", the one before Medium:

- [Covariance and Contravariance](../covariance-contravariance)
- [Transactions and Event Sourcing](../transactions-event-sourcing)

![Fireworks](./fireworks.jpeg)

Happy new year! 🎉
