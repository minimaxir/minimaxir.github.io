---
layout: post
title: "Which Subreddits on Reddit are the Largest?"
date: 2013-11-01 07:30
comments: true
categories: [Data, Graphs]
summary: "By tabulating the data of 37,561,369 sitewide Link submissions, I created a tree map of the Top 100 subreddits by the number of Link submissions to that subreddit."
image: subreddit-treemap.png
---

[Reddit's](http://www.reddit.com/) subreddits cover, quite literally, an infinite amount of different topics. But which of its subreddits are the biggest?

Sure, Reddit is known for subreddits such as /r/pics and /r/aww, but in actuality, many of the lesser-known subreddits are much bigger than you think.

By tabulating the data of 37,561,369 total sitewide Link submissions, from 12/18/2011 to 9/26/2013, I created a tree map of the Top 100 subreddits by the number of Link submissions to that subreddit.

<!-- more -->

{% img /img/subreddit-treemap.png  %}

In the tree map, the size of the rectangle and the saturation of the blue color indicate the relative size of the subreddit.

Unsurprisingly, the [default subreddits](http://blog.reddit.com/2013/07/new-default-subreddits-omgomgomg.html), which all new users are subscribed to, are ranked mostly at the top. However, subreddits such as /r/POLITICO, /r/leagueoflegends, and /r/trees are higher (no pun intended) than most of the default subreddits.

And then you have the meta subreddits such as /r/ModerationLog and /r/reportthespammers, showing that people spend a considerable amount of time talking about Reddit itself.

Gaming has a very significant presence as well, with /r/Minecraft, /r/DotA2, and /r/tf2. (notably for the latter two, the trading subreddits for the respective games have significantly more link submissions than the subreddits themselves.)

It's worth nothing that these Top 100 subreddits only account for **46.3% of all Reddit link submissions**. Even the Top 500 subreddits only account for 66.2% of all Reddit submissions. The density of link submissions clearly follows a [long-tail](http://en.wikipedia.org/wiki/Long_tail) distribution, where most of the content is centralized from the top subreddits. It'll be interesting to see if Reddit is able to utilize that treasure trove of links in the future.

---

*You can access the data for the Top 500 subreddits in  [this Google Spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0AjPFdCURhZvddGQzd0dIQkk1aXRRRkxEY3g0ZmQtWGc&usp=sharing), and you can see the code use to create the tree map in [this GitHub repository](https://github.com/minimaxir/treemap-of-reddit-top-subreddits).*

