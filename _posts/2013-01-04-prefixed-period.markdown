---
layout: post
title: "Why Do Many Tweets Begin With A Period?"
date: 2013-01-04 21:30
comments: true
categories: [Startups, Twitter]
summary: "I eventually realized that beginning your reply Tweet with a period (.) allows it to be seen by all your followers."
image: twitter2.png
---

I'm not a Twitter fanatic. Although I do have [a Twitter account][1] with about 300 followers,  Facebook's Subscribe feature [on my Facebook profile][2] has met my use case for publishing sarcastic quips and cool links for a broad audience over the internet. I mostly use my Twitter account to read tweets from tech columnists, yet I don't even comment on their tweets because **tweets that are replies to someone are not visible in the home timeline of my followers**. I can understand the intuition behind this behavior: Twitter conversations can contain a lot of low-content tweets, and Twitter doesn't want its users to be spammed.

I've noticed that many tweets from actual Twitter fanatics begin with a prefixed period, such as *".@minimaxir wow funny joke!" *and *".@minimaxir is a huge dork!"*. I thought the dot was a typo, until I noticed many people also prefixing the period, seemingly randomly, in their own tweets. All of those tweets seemed like witty replies that begged for mass exposure, and so I eventually realized that beginning your reply Tweet with a period (.) allows it to be seen by all your followers. **Otherwise, only the replyee will receive notification of the reply.

Having your reply tweets appear to your followers only if you begin them with a prefixed period is not intuitive at all. And this particular behavior and its workaround are not documented in [Twitter's help docs][3]. And replying to tweets is a core feature of Twitter. How many users would be able to deduce this behavior? How many brands, who rely on user engagement, are even aware of this behavior?

As it turns out, I was only partially correct. It's even *less* intuitive.

<!-- more -->

## XY = @(Z)

{% img /img/twitter2.png %}

I recently saw [a tweet][5] in my timeline that had a prefixed period, but clearly was not a reply to anyone. Confused, I pointed out that prefixed periods aren't necessary if the tweet is not a reply. [Amy Quispe][6], founder of ScottyLabs and a CS senior at Carnegie Mellon University with much more startup knowledge than myself, pointed out that I was wrong, and **if the tweet begins with a @, it will not appear in your follower's timelines, regardless of whether it's a reply or a mention**.

Anyone who tweets, for example, "*@SHO_Dexter is my favorite television show! Season 7 was AWESOME!!!*", will likely not have that tweet seen by any of their followers. Therefore, it's incredibly easy, and incredibly likely, for that behavior to unintentionally trigger a false positive for spam. Again, would a person notice that one of his/her tweets is not being seen? It's bad for the user, and it's even bad for @SHO_Dexter, who misses out on the free advertising.

As it turns out, *that* *correction** was still only partially correct*, as there's one more important caveat:** if a tweet by X begins a tweet with an @ mention of Y, and if Z is a follower of *both* X and Y, then Z will see the tweet. If the second condition is not true, then Z will not see the tweet.**

Twitter is apparently a course in deductive reasoning. To be fair, this caveat is clearly stated in the help docs, and this behavior makes sense in the context of mutual friends among users. Nevertheless, it's not intuitive at all, and it's mostly irrelevant: a prefixed period tweet reaches all of your followers, 100% of the time.

## The Pestilent Prefixed Period Problem

Twitter users want maximum reach. Brands want maximum reach. Therefore, everyone will use the prefixed period for replies and mentions. Those who don't use prefixed periods on Twitter will be left behind in this cutthroat game of social media.

There are two problems with encouraging prefixed periods:

1.  It alienates newcomers to Twitter. Some online communities do have unwritten behaviors: [Reddit][7], for example, invokes "vote fuzzing" on popular posts, which disguises the true amount of upvotes and downvotes on any particular post by adding fake upvotes/downvotes. You won't find that in any Reddit documentation, which leads to the frequent outbursts of "WHO THE HELL WOULD DOWNVOTE THIS PUPPY?" Quirks like these don't make communities exclusive: it makes them insular.
2.  **It looks tacky and ugly**. That's not a trivial complaint. Every @mention tweet looks like someone made a typo. I don't think that's the brand image Twitter wants.

How could Twitter address this? An option would be to adopt a system similar to Facebook's *ad hoc* post visibility settings, and allow users to set the reach of an individual tweet as necessary. Another option is to have an *All your replies and @mentions are shown to all your followers* account option that is opt-in, and let the user's followers determine whether the content is spam.

Twitter, with an impending IPO, needs to help potential newcomers out in any way possible. Eliminating the need for prefixed periods is a great start to increasing accessibility.

*PS: I am not a huge dork.*

 [1]: https://twitter.com/minimaxir
 [2]: http://www.facebook.com/max.woolf
 [3]: https://support.twitter.com/groups/31-twitter-basics/topics/109-tweets-messages/articles/14023-what-are-replies-and-mentions
 [5]: https://twitter.com/ScottyLabs/status/286921265514700801
 [6]: https://twitter.com/amyquispe
 [7]: http://www.reddit.com/  