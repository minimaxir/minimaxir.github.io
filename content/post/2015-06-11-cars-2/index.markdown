---
title: "Why is the Most-Viewed Gaming Video on YouTube About Cars 2?"
date: 2015-06-15T08:00:00-07:00
slug: cars-2
comments: true
categories: [Data Science, Big Data]
tags: [R, ggplot2, YouTube]
summary: "No, this is not an error. You can watch the video yourself on YouTube and verify the view count."
cover:
  image: featured.jpg
  relative: true
  hidden: true
---

Last month, [YouTube](https://www.youtube.com/), in celebration of its 10-year anniversary, [released a report](http://kotaku.com/the-10-most-popular-games-on-youtube-1704234763) of the Top 10 most-watched video game franchises on YouTube:

```txt
1. Minecraft
2. Grand Theft Auto (series)
3. League of Legends
4. Call of Duty (series)
5. FIFA (series)
6. Garry’s Mod
7. The Sims (series)
8. Five Nights at Freddy’s (series)
9. Puzzles & Dragons
10. Dota 2
```

There aren't many surprises on the list. [Minecraft](https://minecraft.net/) and [League of Legends](http://na.leagueoflegends.com/) have become incredibly huge in such a short time, although [Five Nights as Freddy's](https://en.wikipedia.org/wiki/Five_Nights_at_Freddy%27s) position is impressive given that it started _a year ago_.

After [renewed public interest](http://www.reddit.com/r/dataisbeautiful/comments/38rghg/the_30_mostviewed_youtube_videos_oc/) in YouTube data, I decided to take a poke at the [YouTube API](https://developers.google.com/youtube/) to see if I can determine which Gaming videos are the most-viewed. It turns out that the API makes it simple, by allowing you to query on a specific category and sort by the number of views the video has received.

{{< figure src="youtube_gaming_all.png" theme="light" >}}

There's lots of Minecraft, and even lots of Angry Birds in the top-viewed videos.

...but why is a mundane Cars 2 video from an unknown video channel the most-viewed video of all time?!

No, this is not an error. [You can watch the video yourself on YouTube](https://www.youtube.com/watch?v=urHuO7Zbhhw) and verify the view count.

## Vroom Vroom

{{< figure src="Cars_2_Poster.jpg" theme="light" >}}

[Cars 2](https://en.wikipedia.org/wiki/Cars_2) is a CGI movie about talking cars by Pixar which premiered in June 2011. It is, of course, the sequel to [Cars](https://en.wikipedia.org/wiki/Cars_%28film%29), and received more critical reviews compared to its predecessor.

As with many movies, Cars 2 received a tie-in game, [most of which are mediocre](http://tvtropes.org/pmwiki/pmwiki.php/Main/TheProblemWithLicensedGames) due to mandatory deadlines and lower budgets. However, [Gamespot gave the game a 7.5](http://www.gamespot.com/reviews/cars-2-review/1900-6321632/) out of 10, which is pretty good for a licensed game. The fact that it's a cart racer like Mario Kart helps too.

It's not Minecraft or League of Legends though. Why would a video about it be the most-viewed gaming video of all time?

## Statistical Shenanigans

Popular YouTube videos are often suspected of having their viewcounts manipulated, since making videos appear more popular than they actually are can help lead to genuine virality. Could this be the case with the Cars 2 video?

I did a few simple diagnostics of the top 1,000 Gaming videos to determine if the Cars 2 video had an statistically unusual view count.

Modern YouTube videos have a Like/Dislike bar, which counts the number of Likes and Dislikes given by viewers of the video. If someone is rigging the view count, the ratio of Likes+Dislikes to the given viewcount should be much lower than for a genuine video with genuine user reactions.

{{< figure src="youtube_gaming_interaction.png" theme="light" >}}

However, for all videos with incredibly large view counts, the ratio of Likes+Dislikes to Views is incredibly low. The line represents the predicted mean for a [generalized additive model](http://www.inside-r.org/r-doc/mgcv/gam), with the shaded area representing a 95% confidence interval for the mean. The Cars 2 data point falls directly on the line, so we cannot safely say that Cars 2 is an outlier from this diagnostic.

Another aspect to check is the ratio of Likes to Dislikes. If a bad video has a manipulated view count, we would expect much fewer Likes and many more Dislikes because viewers may become mislead by the content, especilaly those with misleading titles/thumbnails. In general, the % of people who Liked a video should be high for all videos.

{{< figure src="youtube_gaming_like_ratio.png" theme="light" >}}

Almost all of the Top 1,000 gaming videos have Like Ratio greater than 50% (i.e. more Likes than Dislikes). However, the Cars 2 video data point falls outside the 95% confidence interval for the regression model. Therefore, it's worth looking into as a possible outlier.

## Plan B

On the Statistics tab of all public YouTube videos, you can see the number of views a video has received over time. Here is the daily number of views for the Cars 2 video:

{{< figure src="cars_daily_views.png" theme="light" >}}

The video was released in August 2011 (about a month after the release of the movie), but the video didn't become viral and spike in views until sometime early 2012, many months later.

I [made a submission](http://www.reddit.com/r/Games/comments/38xjhp/i_created_a_list_of_the_top_mostviewed_gaming/) to the [games subreddit on Reddit](http://www.reddit.com/r/Games/) to see if there was any ideas as to why Cars 2 is at the top. /u/ Sureiyaa [had a good theory](http://www.reddit.com/r/Games/comments/38xjhp/i_created_a_list_of_the_top_mostviewed_gaming/crypxn5):

> Remember, this video was posted in August 2011, two months after the movie was released. It's also titled "Cars 2 HD xxx xxx" and is rather lengthy. It would make sense if people searched for "Cars 2" or even all of "Cars 2 HD" and stumbled on this video thinking that someone had uploaded the movie for them to watch, especially when you consider that it was a movie aimed at kids who may not pay attention to everything in the title.

> With those initial views, it probably became one of the top results if you searched for Cars 2. With that, it grew from there and is probably getting views from being a high-ranking result when searching for games videos in general.

Accidental SEO could explain it. Indeed, the first result on Google for "Cars 2 HD" is the video in question. Although, in that case, why would the spike happen in 2012? (the DVD/Blu-Ray came out October 2011, so a 2012 spike is late even by lazy movie pirate standards)

Another factor is the fact that that Cars franchise appeals to young children, which are _very_ plentiful. This does bring up a [valid counterargument](http://www.reddit.com/r/Games/comments/38xjhp/i_created_a_list_of_the_top_mostviewed_gaming/cryreaw) though: why Cars 2, and not more popular franchises like [Frozen](https://en.wikipedia.org/wiki/Frozen_%282013_film%29) or any other Disney franchise that's more kid-oriented? (for the record, there _is_ a [Frozen video](https://www.youtube.com/watch?v=VQ7GLnRaeHM) at #163 in Gaming, although it's blatantly miscategorized)

The Cars 2 video uploader eventually [replied to the Reddit thread](http://www.reddit.com/r/Games/comments/38xjhp/i_created_a_list_of_the_top_mostviewed_gaming/crzrbdd) suggesting the children-theory as well:

> You're indeed right about it blowing up, mainly from mobile device views, which I'm guessing was kids watching it. I remember seeing comments from users saying their kids love to watch the video.

There's also the factor of YouTube/Google's recommendation algorithms working in mysterious ways and providing video recommendations based on user interests/age/location/etc. Unfortunately, the impact of those can't easily be quantified.

Looking into the view count of the Cars 2 video in Gaming YouTube videos only raises more questions than answers.

---

_You can view the metadata for the Top 500 Gaming videos on YouTube at [this Google Sheet](https://docs.google.com/spreadsheets/d/1fy2-9c5HORwvhvAljEG6LvyrM3zG5YnWnalvepX3eV8/edit?usp=sharing)._
