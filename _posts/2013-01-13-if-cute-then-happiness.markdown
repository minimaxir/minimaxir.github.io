---
layout: post
title: "Auto-Save Images From Reddit To Computer Without Visiting The Site (Using IFTTT)"
date: 2013-01-13 21:32
comments: true
categories: [Startups, Hacks]
summary: "You can also save the top images on Reddit to your computer via any cloud storage service without ever visiting the website too!"
image: iftttrecipe.png
---

***TL;DR: Use this [IFTTT recipe][1], and change the subreddit value in the parameter of the Feed URL as needed.***

In [a previous post][2], I joked about a hypothetical social media strategy in which an automated script does Facebook brand management by stealing the top cute images from [Reddit][3] - an aggregator of trending topics and images -  and reposting them on the Facebook page, additionally adding a cute message encouraging users to LIKE, SHARE, and COMMENT!  We get easy social media fame for no monetary cost.

Out of curiosity, I wanted to see if it was feasible to create such a script. Both Reddit and Facebook indeed have APIs that make it easy. But then I have to set up a server to check Reddit periodically, ensure that no images are duplicated, etc., and that can take time to implement and ensure that it works correctly (*all* the images must be cute!). I looked into [IFTTT][4], a relatively new startup that talks between different popular web services to automate simple tasks, like posting to Twitter whenever you post to Facebook.

As it turns out, yes, this is possible, and you can also save the top images on Reddit to your computer via any cloud storage service without ever visiting the website too! Just use [this IFTTT recipe][1]! There are a few interesting caveats, though...

<!-- more -->

## Really Simple Syndication is...Really Simple?

{% img /img/redditrss2.png %}

IFTTT allows users to extract information from RSS feeds, which one might typically be used to read blogs and news articles. The RSS feed typically provides the title, author, date, and content of a post: the important things. However, RSS has more applications: it can distribute other data, such as weather and desktop wallpapers. IFTTT allows other apps to load image and audio files from an RSS feed, but only if the RSS feed link links to the content itself.

Unfortunately, this won't work on Reddit by default, as its RSS feeds do not contain a direct link to the photo and instead link to the Reddit comments on the image. Image-based websites, such as [BuzzFeed][6] and [InterfaceLift][7] also implement a similar system because they don't want their users just to use a script to download images and bypass the website and its lovely revenue-generating advertisements. Therefore, the RSS feed alone won't work with IFTTT.

During my research into my social media exploitation hypothesis, I found a [blog post by Steve Mould][8] that provides a way to translate data from Reddit's JSON API to an RSS feed using a service called [Yahoo Pipes][9]. This modified RSS feed, when given a subreddit and a score threshold, obtains the top Reddit posts in that subreddit above that karma threshold (upvotes - downvotes), and returns a feed item which contains direct link to the referenced URL.

Here is [my variation of his Reddit Pipe][10]. My script to process the API has a few changes (such as using Reddit's "hot" posts, instead of the top posts; hot posts update much more frequently). Testing it with r/aww and a threshold of 50 karma, I received 177 very cute pictures on my computer in a week.

{% img /img/redditcute.png %}
 
From that Pipe, you can get the data in a RSS feed URL. Right-click and copy that feed URL into a IFTTT recipe as the source. For the action, use the **{{EntryURL}}** variable to retrieve the image URL.

## With Great Power Comes Great Cuteness

Yes, you can save the Reddit images to your computer automatically using [Dropbox][12]. Or [Google Drive][13]. Or [SkyDrive][14]. Or even get a cute email every hour!

Thanks to IFTTT, there are many other creative things you can do with the feed that you can include in a recipe:

*   Auto-post the image to your Tumblr or WordPress blog. Easy cuteness, and you'll be the source!
*   Auto-curate the cute photos to your Facebook or Twitter account. All your friends will love you!
*   Get social media fame for no additional monetary cost by publishing the cute images to your Facebook Page, with an encouragement to LIKE SHARE and COMMENT! My original hypothesis was correct!

{% img /img/redditnega.png %}

## Caveats

One caveat in using Yahoo Pipes is that it is rate limited to 200 runs in a 10 minute interval, meaning that the IFTTT recipe provided will likely fail if more than 200 people use the feed. If that does happen, just clone my pipe, and use the RSS feed from the clone for your own personal recipe.

Also, there's no rate limiting on when recipes are triggered and images are posted/downloaded. You can trigger multiple images simultaneously, which may be considered spammy if you are posting to social media. In that case, increase the karma threshold to reduce the frequency of the postings and to maintain a high quality of the images.

{% img /img/iftttrecipe.png %}
 
Getting socially-vetted photos on your computer without any effort is a useful timesaver. A solution to a first world problem, perhaps, but it's the little things that count!

 [1]: https://ifttt.com/recipes/74285
 [2]: http://minimaxir.com/2012/12/totally-real-totally-serious/
 [3]: http://www.reddit.com/
 [4]: https://ifttt.com/
 [6]: http://www.buzzfeed.com/
 [7]: http://interfacelift.com/wallpaper/downloads/date/any/
 [8]: http://blog.stevemould.com/rss-feed-reddit-stories-score-threshold/
 [9]: http://pipes.yahoo.com/pipes/
 [10]: http://bit.ly/W1ypdf
 [12]: https://www.dropbox.com/
 [13]: https://drive.google.com
 [14]: https://skydrive.live.com/
