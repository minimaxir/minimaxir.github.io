---
title: "Making Magic: the GIFening"
date: 2017-11-07T08:10:00-07:00
slug: magic-the-gifening
categories: [Cool Stuff]
tags: [Python]
comments: true
summary: "As it turns out, creating a Twitter bot to tweet Magic card GIFs is easy to implement, but with a few interesting caveats."
cover:
  image: featured.png
  relative: true
  hidden: false
---

After working at [BuzzFeed](https://www.buzzfeed.com/) for a few months, I'm now an expert in the proper usage of GIFs. My favorite GIF tool is the [/giphy](https://giphy.com) command in [Slack](https://slack.com), which [puts a random GIF](https://get.slack.help/hc/en-us/articles/204714258-Add-Giphy-search-to-Slack) according to a given phrase into the chat, with better-than-expected appropriateness of the phrase to the GIF.

Completely unrelated, I recently rediscovered [MoviePy](https://github.com/Zulko/moviepy), a Python library for programmatically editing videos and GIFs without requiring an expensive and slow video editing program. I had played with MoviePy a bit in 2014 when it was [first released](http://zulko.github.io/blog/2014/01/23/making-animated-gifs-from-video-files-with-python/#) and [became viral](https://news.ycombinator.com/item?id=7121104), but couldn't think of a creative application for the library at the time.

On a boring weekend I had a silly idea: why not create a program to superimpose appropriate GIFs onto [Magic: the Gathering](https://magic.wizards.com/en) cards using these two tools? And even better, why not _automate_ both the creation of the card GIFs and the tweeting of a new GIF every few hours?

<span><blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/sxqKUYHmfv">pic.twitter.com/sxqKUYHmfv</a></p>&mdash; Magic: The GIFening (@MTGIFening) <a href="https://twitter.com/MTGIFening/status/913993793052880897?ref_src=twsrc%5Etfw">September 30, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </span>

As it turns out, creating a Twitter bot to tweet Magic card GIFs is [easy to implement](https://github.com/minimaxir/magic-the-gifening), but with a few interesting caveats. The end result is [@MTGIFening](https://twitter.com/MTGIFening). Here's how I typically create my crazy apps, step by step.

## Feasibility Analysis

Like all my data analysis projects, I checked if it's possible to complete the project in a way that won't suck up a lot of free time hacking out convoluted solutions.

**Can I easily get a list of all Magic cards?** Yes, via [MTG JSON](https://mtgjson.com), which has a downloadable JSON dump of all Magic cards.

**Can I easily get random GIFs from GIPHY?** Yes, there is a /random endpoint in the [GIPHY API](https://developers.giphy.com) which returns a random GIF for a specified phrase, like the /giphy Slack command. The GIPHY API requires registration, but has generous rate limits (10k requests/day).

**Can I easily composite a GIF onto an image with MoviePy?** Yes, compositing is a _primary use case_ for the library, with many tutorials in the documentation.

**Can I easily get an image for a specified Magic card?** Unsure. The official tool for viewing Magic card images is [Gatherer](http://gatherer.wizards.com/Pages/Default.aspx). After checking the image source for the cards, each card image in Gatherer has a URL that follows this schema: `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=XXXXX&type=card`. That's easy to understand, but what's a multiverseid?

**Is there a mapping of multiverseid to Magic cards from MTG JSON?** Yes, the multiverseid for each Magic card is [present as a field](https://mtgjson.com/documentation.html) in the "All Sets" dataset (but not the "All Cards" dataset oddly). A quick manual check showed that using the multiverseid from the MTG JSON dataset results in the correct image from Gatherer.

Everything looked good to me. Let's dive right in, [commit by commit](https://github.com/minimaxir/magic-the-gifening/commits/master).

## Implementing Magic: The GIFening

The first thing I did was process the Magic card data, although for this project I limit the type of cards to Instants and Sorceries, which in Magic game mechanics represent "actions" and are more suitable for GIFs. _For each set, retrieve the cards in the set; for each card, if it's an Instant/Sorcery, log its name and multiverseid_. Thanks to the magic of Python, this pseudocode is close to the [actual code](https://github.com/minimaxir/magic-the-gifening/commit/3f626ae5d49a567322c6237210ab554281d462f4).

The next objective was to implement the GIPHY API to get a GIF. The very first thing I did is add a local secrets file containing my personal API key for GIPHY, and _immediately_ log the secrets file in a `.gitignore` so I don't accidentally leak it. GIPHY has an [API Explorer](https://developers.giphy.com/explorer/) which allows developers to quickly test an example input phrase and see corresponding output from the API. For example, here's part of what the API returns for [Invert the Skies](http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=151108) (although since it's the /random endpoint, your results may vary):

```json
"image_url": "https://media1.giphy.com/media/plbsEwLwQvzLa/giphy.gif",
"image_mp4_url": "https://media1.giphy.com/media/plbsEwLwQvzLa/giphy.mp4",
"image_frames": "31",
"image_width": "480",
"image_height": "270",
```

The `image_url` corresponds to the [raw GIF](https://media1.giphy.com/media/plbsEwLwQvzLa/giphy.gif) unsurprisingly, but as a bonus, GIPHY also includes a link to a [MP4 video](https://media1.giphy.com/media/plbsEwLwQvzLa/giphy.mp4) of the GIF, which has a much smaller file size and is better to use for compositing. The API output also includes the width and height (in pixels) of the GIF. The art in a Magic card follows a 4:3 [aspect ratio](<https://en.wikipedia.org/wiki/Aspect_ratio_(image)>), i.e. the width divided by the height equals 1.33. If the dimensions of the GIF are too far outside that ratio, resizing the GIFs to fit the Magic art frame will result in noticeable distortion. I minimized this distortion by checking and seeing if the random GIF has a width:height ratio between 1.2 and 1.6 before accepting it. Since there's a chance for failure (along with potential unknown bugs that the random GIF could hit), I added a limit to the number of attempts to retrieve an appropriate GIF. All done in [one commit](https://github.com/minimaxir/magic-the-gifening/commit/c2e4b6b9d58d1aa360f6f67a049ec962d0430b91).

Getting the card image from Gatherer is [trivial](https://github.com/minimaxir/magic-the-gifening/commit/c92440cd459640da9346cf31a79e768ac8641ea9), so then I worked on combining the GIF and the card image. MoviePy has a [good tutorial](http://zulko.github.io/moviepy/getting_started/compositing.html) for specifying the position of one clip onto another by specifying the upper-left corner of the bottom-image where the GIF will be placed, while simultaneously resizing the GIF to a given width and height.

{{< figure src="videoWH.jpeg" theme="light" >}}

I manually zoomed into the card image using a photo editor ([Pixelmator](http://www.pixelmator.com/mac/)) to find the upper-left corner of the card art:

{{< figure src="zoomin.png" >}}

In this case, the pixel coordinates for the upper-left corner of the card art is `(17,35)` The upper-right and bottom-left corners can be used to determine the target width and height of the GIF respectively, and can be found the same way. Simply composite the Magic card with the resized-and-positioned GIF, set the duration of the "new" GIF to that of the source GIF, and `write_gif`. [That's that](https://github.com/minimaxir/magic-the-gifening/commit/55a52ddfc7f43d128c08c8a243254e08a171de5e)!

To finish things up, I wrote a script to load all the cards from the processed card list into memory, select a card at random, use the helper functions to retrieve a GIPHY GIF and composite it with the card, then upload the resulting GIF to Twitter. I haven't worked with the Twitter API in awhile; a quick Google search for a modern Twitter API client in Python returns [Twython](https://github.com/ryanmcgrath/twython), which conveniently includes an example on [how to upload an image to Twitter](https://twython.readthedocs.io/en/latest/usage/advanced_usage.html#updating-status-with-image)! And after running the script a few times, the full workflow indeed works!

Not bad for a couple hours of scripting. But I was not close to finished.

## The Endless Fun of QA

One of the reasons I enjoy doing silly projects (especially silly data projects) is because I tend to hit unsexy edge cases which typical development blogs and tutorials rarely discuss. In this case, I quickly found that the Twitter API has a [5 MB limit](https://developer.twitter.com/en/docs/media/upload-media/overview) on image uploads, which is a problem as the resulting GIFs are huge and often randomly exceed that limit (looking back on it, there is a different endpoint intended for GIF uploads, counterintuitively).

In actuality, GIFs on Twitter are actually displayed as videos, in order to save bandwidth. Since Twitter transcodes uploaded GIFs anyways, it makes more sense to upload _audioless videos_ instead of GIFs (and as a bonus, after the death of Vine, Twitter will auto-loop videos less than 6 seconds).

Creating videos is easy to do with MoviePy, just do a `write_videofile` instead of `write_gif`, and use Twython's video uploading example to upload. The result is an "unknown" error on upload. I verify by uploading the video manually to Twitter...and the Twitter UI fails to recognize it as a video. But the video itself plays fine in QuickTime. This is the annoying type of coding problem that's too specific for [Stack Overflow](https://stackoverflow.com) to provide help. After a bit of trial and error involving video codecs and settings, the solution was to pass a `-pix_fmt yuv420p` parameter to the video encoder because Twitter apparently only likes legacy video container formats. Oh well. It worked, and both Twitter manual and API uploads worked successfully.

I also ran into an issue where Twitter refused to accept supershort video, where the source GIF was only a couple frames. A solution is to loop the GIF to atleast 2 seconds if it's shorter, which somehow fixed that problem.

(As I was writing this post a month later, I discovered that both of these video upload constraints [are indeed covered in the Twitter documentation](https://developer.twitter.com/en/docs/media/upload-media/uploading-media/media-best-practices), which makes me look very silly in retrospect!)

These changes fixed most of the upload issues. However, when writing the initial script, I forgot that the borders of Magic cards have [changed over the years](https://mtg.gamepedia.com/Card_frame), which also changed the position and size of the card art. **Is there a way to check when a card was printed?** Yes, the "All Sets" dataset contains the release date of the set, so with that, I can [hard code](https://github.com/minimaxir/magic-the-gifening/commit/0dfb678f1955f50b54b632e57087df847ec16f05) the dates of sets where the borders changed, and note the border type at printing time. I then used Pixelmator again to note the new art dimensions for that type of border, and used conditional statements to retrieve the correct dimensions for the type of border when compositing.

Lastly, I added general `try/catch` error handling to prevent the script from breaking fatally and to try again with a different card if it does. That covers most of the edge cases!

## Results

After running the script many times after all the fixes in place, I felt the Twitter account was good to go. The initial results showed a lot of promise:

<span><blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/BsZ7eIcunl">pic.twitter.com/BsZ7eIcunl</a></p>&mdash; Magic: The GIFening (@MTGIFening) <a href="https://twitter.com/MTGIFening/status/913981726182981632?ref_src=twsrc%5Etfw">September 30, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></span>

<span><blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/picJJk6mBm">pic.twitter.com/picJJk6mBm</a></p>&mdash; Magic: The GIFening (@MTGIFening) <a href="https://twitter.com/MTGIFening/status/912525635632775168?ref_src=twsrc%5Etfw">September 26, 2017</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></span>

Surprisingly, the script was able to generate _visual puns_ in cards, completely by chance!

<span><blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/AnpzU8xVho">pic.twitter.com/AnpzU8xVho</a></p>&mdash; Magic: The GIFening (@MTGIFening) <a href="https://twitter.com/MTGIFening/status/913972922330497024?ref_src=twsrc%5Etfw">September 30, 2017</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></span>

<span><blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/01vGRcq2Mj">pic.twitter.com/01vGRcq2Mj</a></p>&mdash; Magic: The GIFening (@MTGIFening) <a href="https://twitter.com/MTGIFening/status/913987002235740160?ref_src=twsrc%5Etfw">September 30, 2017</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></span>

The next step was to automate the script to run and post Tweets at a specific time interval. After experimenting a bit, I found that [the best solution](https://github.com/minimaxir/magic-the-gifening/commit/f355d5e80503c67c6e1a0e5fd1b744faf3cf8223) was to use a [cron job](https://en.wikipedia.org/wiki/Cron) in a [Docker container](https://www.docker.com/what-docker) containing the script and its dependencies, for complicated reasons which will require another blog post to explain.

After letting Magic: the GIFening run for a few days without fatal issues, I decided to publicize the Twitter account and posted it to the [/r/MagicTCG subreddit](https://www.reddit.com/r/magicTCG/comments/7598g5/i_made_a_twitter_bot_which_tweets_magic_cards/) and [Hacker News](https://news.ycombinator.com/item?id=15449955). To my surprise, the project performed extremely well on both with 100+ upvotes on each, and the [GitHub repo](https://github.com/minimaxir/magic-the-gifening) itself received 100+ Stars.

In all, making Magic: the GIFening was a fun project. In retrospect, talking though the commits made me realize I performed many bad coding practices in a haste to get the project done ASAP (specifically, checking to see if certain edge cases are documented, violating [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), and forgetting to remove specific types of cards like [split cards](https://twitter.com/MTGIFening/status/924969160307744769)). Obviously there isn't a multimillion-dollar startup opportunity in creating random GIFs of Magic cards, but I'll fix a few remaining issues and keep the Twitter bot running.
