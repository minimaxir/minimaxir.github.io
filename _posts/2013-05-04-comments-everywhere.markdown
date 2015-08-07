---
layout: post
title: "A Blog Comment System That Steals Comments From Facebook"
date: 2013-05-04 21:59
comments: true
categories: [Blogging, Comments]
image: liveFyreSync.png
summary: "Those comments become LiveFyre comments. And the Facebook user has no input, nor any notification that their comments are being used this way."
---

I'm not a fan of the LiveFyre comments system for blogs. As I've talked about before, LiveFyre is difficult to use, and actually hurts blogs more than it helps. But more and more blogs, such as CNet and AllThingsD, have switched to LiveFyre.

AllThingsD's [reasons][1] for switching to LiveFyre from the widely-used Disqus are interesting. Under LiveFyre, users can "more readily share comments to Facebook and Twitter" which Disqus already did; "tag friends and draw them into the stream" which increases clutter; and "accurately flag other comments as spam or offensive" which flat-out doesn't work, if the spam on TechCrunch is any indication. Additionally, they can "follow conversations across multiple platforms," which the post doesn't elaborate upon. Does it aggregate social media which links to the parent post, a la Disqus?

No, it's something much more important.

<!-- more -->

## Comments From Everywhere!

{% img /img/liveFyreSync.png %}

Recently, LiveFyre implemented a [comment feature][2] called SocialSync:

With Livefyre SocialSync, the conversation happening on Facebook and Twitter automatically syncs directly to your content, where it belongs. SocialSync comments can be replied to and interacted with just like any other comment, including being automatically posted back to Twitter or Facebook.

Currently, this feature is enabled for TechCrunch and Mashable.* Let's say a Facebook user comments on one of TechCrunch's [Facebook posts][3]. Those comments are synchronized to the LiveFyre comments for the [linked post][4].

Those comments become LiveFyre comments. And the Facebook user has no input, nor any notification that their comments are being used this way.

## SocialSync's Flat-Out Lie

In LiveFyre's own words, the conversations "sync" across platforms. [Synchronization][5] implies a two-way interation, i.e. actions on one platform affect the other. In this example, there are four use cases for the interaction to be called "sync":

1.  Comments on Facebook should appear on LiveFyre.
2.  Comments on LiveFyre should appear on Facebook.
3.  Replies and Likes on comments on Facebook should appear on the corresponding comment in LiveFyre.
4.  Replies and Likes on comments on LiveFyre should appear on the corresponding comment in Facebook.

Out of those four scenarios, only #1 is true, and even more importantly, #2, #3, and #4 are impossible to implement.

LiveFyre doesn't know what your Facebook account is and cannot perform actions on your behalf on Facebook unless you register solely with that account. Therefore, your comments won't sync to the Facebook comment thread if you use any other login type. (the ability to use multiple types of logins being another touted feature of LiveFyre, of course). Likewise, Likes on Facebook Comments can't translate to LiveFyre Likes if the users don't have a LiveFyre account.

The lack of connection also breaks notifications of replies. Since there's no way to ensure the two accounts are linked, there's no way to notify a Facebook user when their synced comment on LiveFyre has a reply. This has two effects: a) the Facebook user won't continue the discussion and b) the replier is wasting his time making a comment to a person who likely won't ever read it. Both result in less fruitful discussions.

SocialSync is broken and impossible to fix. Also, the lag from when comments are synced from Facebook to LiveFyre takes about 10-20 minutes, making sync worthless on highly-discussed event blogs posts anyways..

## Who Owns Your Facebook Comments?

When I said that LiveFyre "steals" Facebook comments in the headline, I wasn't being facetious. It's not obvious that this feature even exists in the first place, especially if you're not a comment addict (I sent a [tweet][6] to the TechCrunch head editor to confirm that this was intended behavior). How is the typical person supposed to know what their comments are being used for?

Yes, your comments on TechCrunch's Facebook wall post that are synced to LiveFyre are Public to everyone, and there is no expectation of privacy. But who owns those comments?

The comments appear in LiveFyre matching the style and functionality of any other LiveFyre comment, except with a "from Facebook" designation. For all intents and purposes, it's a LiveFyre comment that you have no controll over. It's worth noting that since LiveFyre doesn't know your Facebook account, you can't even delete the syndicated comment in LiveFyre . LiveFyre comments on the post have greater SEO than Facebook comments, so hopefully you don't say anything embarrassing on the Facebook page. LiveFyre is in control of your destiny.

What are the benefits to SocialSync anyways, when it barely works? Bigger numbers for the comment count of a post? That's irrelevant when the comments on the Facebook posts are made spur-of-the-moment, and are usually very low quality.

The idea of sync between isn't terrible in itself. Facebook Comments and the recently announced Google%2B Comment System essentially does sync by blurring the lines between a Google%2B post and a comment, but unlike LiveFyre, the user still retains control over the comment, receives reply notifications, and can delete their comment when necessary.

At the least, I've stopped posting on TechCrunch's Facebook page. That's not a good thing for either TechCrunch or LiveFyre.

* Interestingly, SocialSync is not enabled on CNet or AllThingsD's implementations of LiveFyre.

 [1]: http://allthingsd.com/20130330/introducing-livefyre-commenting-at-allthingsd/?mod=atd-desktop
 [2]: http://www.livefyre.com/comments/
 [3]: https://www.facebook.com/photo.php?fbid=10151659746677952&set=a.114456157951.118433.8062627951&type=1
 [4]: http://techcrunch.com/2013/05/02/smartphonetographers/
 [5]: http://en.wikipedia.org/wiki/Synchronization
 [6]: https://twitter.com/minimaxir/status/311959448694435840  