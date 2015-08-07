---
layout: post
title: "How To Kill The Reader Comments Of A Popular Tech Blog"
date: 2013-01-23 21:38
comments: true
categories: [Blogging]
image: ToKillACommentsSection.png
summary: "I\'m honestly afraid that the switch from Facebook Comments could kill quality comments on TechCrunch completely."
---

In March of 2011, [TechCrunch implemented][1] the just-announced Facebook Comments functionality on their blog. The [Facebook Comments Box][2] is an official plugin from Facebook which allows users who are logged into Facebook to instantly comment on a blog post or article; no registration needed. Adding a Facebook Comments Box to a website is simple, it provides a visual style that can work with any blog design, and it can have users share their posts on Facebook, which leverages the commenter's friends to drive more traffic to the blog.

I first began commenting on TechCrunch in July of the same year, mostly to test out the full functionality of Facebook Comments, after having spent a lot of time experimenting with [Disqus][3] and Gawker's custom comment system (I talk about it [here][4]). During that time, my comments began to make me rather infamous, both in good ways, and surprisingly bad. (once, a well-respected entrepreneur messaged me saying "I've talked to VCs and they've said they will never invest in you because of your comments. FYI.")

Fast forward to 2012. Other blogs on the Aol blogging network, such as Engadget, Joystiq, and TechCrunch itself, have [decided][5] to [migrate][6] to [LiveFyre][7], another blog commenting system which allows readers to comment using their social identities, in addition to a few flashy Web 2.0 features. I figured it was a matter of time until TechCrunch implemented it themselves. And in January 2013, [they did][8].

At first, I thought I would like the change. Facebook Comments has their own problems that a switch to Livefyre could solve. I was wrong. The stated reasons for the change were "we want more comments," but a large amount of low-value comments (and images), with no way to identify good ones, along with the increased hassle of commenting, will end up backfiring. I'm honestly afraid that the switch from Facebook Comments could kill quality comments on TechCrunch completely.

<!-- more -->

## The Pros and Cons of Facebook Comments

As said earlier, Facebook comments excel in their ease of implementation, light aesthetic, and zero-click registration. More importantly, it lends a lot of credibility to the comments, as they have (usually) been authenticated as a real person. Whenever a *real* person likes or comments on your own comment, it is very satisfying.

{% img /img/alexia.png %}

That said, there are a few unobvious nuances:

*   For most blog systems, you receive a notification whenever someone replies to your post. In the original implementation of FB Comments, you receive one whenever someone likes or replies to your comment, in the same manner you're notified on a typical Facebook status. This has changed recently: now, you don't receive notification for likes/replies on your comment, and instead you ***only receive notifications when other people comment on the same post***. I haven't figured out if this is a bug or a feature.
*   **There is no spam filter.** As many can attest, Facebook has been terrible at combating spam both on the main website and off. All spam cleaning must be done *ad hoc*, which can be time-consuming.
*   **Virtually no customization for the comments**. On the administrative side, the only significant options you have for commenting are how many comments appear initially, and the default sort order. It makes sense for Facebook to limit customization to protect their own branding, but it's frustrating for both the admin and readers.
*   **Commenters do not have access to a list of comments that they've made.** This one in particular upset me, which is one of the reasons I've aggregated all my comments [here][10].
*   **Facebook's count of comments lies. **The count provided by Facebook does *not* include replies to comments, unlike every blog comment system since the beginning of time.

There have been zero improvements to Facebook Comments since 2011. It's disappointing, but there's not much that can be done... except considing competitors.

## LiveFyre Makes Comments BURN!

LiveFyre, on a typical blog like this one, has quite a few perks that Facebook Comments does not. It allows users to comment just by linking a social identity, such as Facebook or Twitter. Or you can remain anonymous. You receive notifications by email. Images and video are embedded into posts. Posts appear in real time, increasing the interaction for live events. And, you have a profile which lists all the comments you've ever made.

LiveFyre also has comment editing and an indicator of how many users are viewing the current blog post, but for some reason, the implementation of LiveFyre on TechCrunch disabled these features. Hmm.

{% img /img/comments2.png %}

The core features good on paper. The problem is with the implementation. [This comment][12] does a good summary, but here's the gist when compared to Facebook Comments:

*   **Anonymous comments are *usually* low-quality comments. **With Facebook Comments, rational people will not make stupid comments that are tied with their real name. With anonymous comments, people can troll as much as they want without any repercussions.  Yes, with more accessible to comments leads to a higher chance of quality comments by the [law of large numbers][13], but that is completely irrelevant because...
*   **There is no way to sort by high-quality comments**. Facebook Comments, by default, sorts comments by the number of likes that they have received: more likes, the higher up they are in the comment thread. LiveFyre only allows sorting in chronological order and reverse chronological order. No exception. This strongly reduces the *motivation* for high-quality posts.
*   **New comments that are loaded live forcibly scroll down all comments.** Imagine: you're reading a good comment, and a new comment loads and *pushes* the comment away. With spam. You'll become frustrated very quickly. This may not be a concern for blogs with low user-bases, but for popular blogs, this can become irritating very quickly.
*   **Images and video appear in-line, and are very large.** This makes them more visible, which is a good thing, *unless* they're memes and spam. Then it's terrible. And since people can comment anonymously, there's a significant risk factor. Images/video, due to their size, cause comment scrolling even faster!

## The impact of LiveFyre on TechCrunch

{% img pull-right /img/ToKillACommentsSection.png %}

LiveFyre works on a typical WordPress blog, but when applied to large sites such as Engadget and TechCrunch, whose size attracts trolls, it can be crippling. It's like [Dunbar's Number][15] on a macro scale: there's a mathematical limit on the number of people who visit one place on the internet until it degenerates into madness and memes.

Even with the criticisms above, I still prefer Facebook Comments, and I implement it on my own site, as zero-click registration and real name validation is paramount. It's definitely the lesser of two evils.

The main argument TechCrunch used to justify the switch from Facebook Comments to LiveFyre is that users aren't commenting as much. That's a given, since you can't comment anonymously. It's the old debate of quantity vs. quality: in the case of comments, however, it's *always* in favor of quality. I'd rather read a comments section with one or two comments than a comments section consisting of 90% anonymous spammers who make me lose faith in humanity. Losing faith in humanity is not healthy.

I'll probably be toning down my comments on TechCrunch even moreso. My [primary motivation for commenting][4] was, and still is, making people laugh and smile. But if other readers have to dig through anonymous spam just to find my comments, then there's not much point. I could spam my comments to my Facebook profile every time I make one, but that would cause the *opposite* issue.*  
*

I realize that this is a first-world problem. Even more of a first world problem than [auto-downloading pictures of cute puppies][16]. I'm not mad.

I'm just sad. :(

<hr>

**EDIT (May 2013)**: When this article was published, this blog was using Facebook Comments, however I switched the comments system to Disqus just to try it out.

 [1]: http://techcrunch.com/2011/03/01/facebook-rolls-out-overhauled-comments-system-try-them-now-on-techcrunch/
 [2]: http://developers.facebook.com/docs/reference/plugins/comments/
 [3]: http://disqus.com/
 [4]: http://www.quora.com/Online-Commenting/Whats-the-deal-with-Max-Woolf-on-TechCrunch-AOL-comments
 [5]: http://www.engadget.com/2012/10/11/engadget-livefyre-commenting-system/
 [6]: http://www.joystiq.com/2012/04/04/joystiqs-new-commenting-system-is-live/
 [7]: http://www.livefyre.com/
 [8]: http://techcrunch.com/2013/01/22/we-want-you-back/
 [10]: http://minimaxir.com/category/blog-comments/
 [12]: http://fyre.it/u2jnrP
 [13]: http://en.wikipedia.org/wiki/Law_of_large_numbers
 [15]: http://en.wikipedia.org/wiki/Dunbar's_number
 [16]: http://minimaxir.com/2013/01/if-cute-then-happiness/
 [17]: http://i2.wp.com/minimaxir.com/wp-includes/