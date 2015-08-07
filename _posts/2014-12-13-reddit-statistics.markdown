---
layout: post
title: "A Statistical Analysis of 142 Million Reddit Submissions"
date: 2014-12-16 08:00
comments: true
categories: [Data]
summary: "I constructed a database to store all Reddit Submissions from November 2007 to the end of October 2014: 142,159,793 submissions in total. And this data is very curious and very, *very* memetic."
image: growth_rate_reddit.png
---

{% img /img/reddit-statistics/reddit_logo.jpg %}

Reddit, the "front page of the Internet", is well-deserving of that title. Founded in 2005 for the more tech-savvy crowd, [Reddit](http://reddit.com) is a news aggregator where users can submit links to interesting websites and other media, and form communities on specific interests which are known as "subreddits." Since 2008, its popularity has grown exponentially.

{% img /img/reddit-statistics/all_cumsub_reddit.png %}

More impressively, the number of new submissions each month to Reddit increases, with slight declines offset by large gains in the next month.

{% img /img/reddit-statistics/growth_rate_reddit.png %}


Although Reddit first launched in 2005, it didn't hit mainstream until much later. At first, Reddit was at peace. But everything changed when the Digg Nation attacked.  [Digg](http://digg.com/), which was the leading news aggregator at the time, [announced a redesign in March 2010](http://www.wired.com/2010/03/digg-redesign-social-web/) which rolled out that summer. The redesign was profit-maximizing, which massively irritated Digg's userbase. The majority of these users ended up flocking to Reddit, drastically changing its userbase and affecting Reddit's submissions as a whole. As a result, it's required to look at Reddit's entire history if possible when analyzing any statistical analysis of it. (although, as a warning, [correlation does not imply causation](http://en.wikipedia.org/wiki/Correlation_does_not_imply_causation)).

I, [/u/minimaxir](http://www.reddit.com/user/minimaxir), have personally been a redditor for 3 years. I've previously done statistical analyses of Reddit data before, such as looking at which [subreddits are the largest](http://minimaxir.com/2013/11/subreddit-size/) or determining which sites on Reddit are [the most-frequently submitted](http://minimaxir.com/2013/09/reddit-imgur-youtube/), but those were written with incomplete data. Thanks to [Reddit Analytics](http://redditanalytics.com), I have obtained a data dump and I subsequently constructed a database to store all Reddit Submissions from November 2007 to the end of October 2014: 142,159,793 submissions in total. And this data is very curious and very, *very* memetic.

# <i class="fa fa-reddit"></i> A Quick Glance At Reddit

{% img /img/reddit-statistics/reddit_sample.png %}

Reddit ranks submissions through a combination of upvotes from users, downvotes, and age of submission. The average score of a submission, which is the number of upvotes minus the number of downvotes, has changed throughout the years.

{% img /img/reddit-statistics/all_score_reddit.png %}

The average score of a submission was relatively constant until the Digg announcement, then it started to increase, as the number of potential upvoters for a submission also increased. Interestingly the score, has decreased in recent months; it is entirely possible that the average is decreasing due to an increase in low-scoring posts.

Let's look at the average scores of Top 100 subreddits by submission volume to see which are the most well-received.

{% img /img/reddit-statistics/top_score_reddit.png %}

***Note**: The shaded areas in charts for this article represent 95% percent confidence intervals for the true average of a given month/subreddit. Since there is a *lot* of submission data, the confidence intervals are usually incredibly narrow.*

Image subreddits, such as [/r/gifs](http://reddit.com/r/gifs), [/r/cringepics](http://reddit.com/r/cringepics), and [/r/reactiongifs](http://reddit.com/r/reactiongifs) are clearly the most well-received on Reddit. (I plan to do a more in-depth analysis of this behavior in another blog post).

Users can also leave comments on submissions to add insight and jokes. How has the Digg announcement affected the number of comments?

{% img /img/reddit-statistics/all_comments_reddit.png %}


As it turns out, there's a *very* significant change in the average number of comments pre and post-Digg announcement. From April 2010 to August 2010, the average number of comments increased from 4.79 to 7.91, nearly doubling the number of comments in less than half a year.

Many top subreddits encourage more discussion than others.

{% img /img/reddit-statistics/top_comments_reddit.png %}

[/r/IAmA](http://reddit.com/r/IAmA) is Reddit's flagship subreddit (which [has its own official app](http://www.redditblog.com/2014/09/announcing-official-reddit-ama-app_2.html)!), where users can ask questions to noteworthy people: it's not surprising to see it far at the top. Sports and video games are the top topics for discussion on Reddit.

# <i class="fa fa-comments"></i> reddit.self

{% img /img/reddit-statistics/reddit_self.png %}

An alternate form on Reddit is the self-post, where the user submits text instead of a link to an external website or image. These posts are used to make announcements and encourage discussion on a specific topic. Some large subreddits have even switched to "self-post only" mode.

The popularity of self-posts has risen significantly over the year, and new submissions of self-posts now account for nearly half of all the new submissions on Reddit! (45.3% in October 2014)

{% img /img/reddit-statistics/self_proportion_reddit.png %}

In theory, self-posts make subreddits contain higher-quality content. How do the scores of self-posts compare to that of normal posts?

{% img /img/reddit-statistics/self_score_reddit.png %}

Before the Digg announcement, self-submissions were more noteworthy than regular submissions. Afterwards, self submissions receive about 1/4th of the score of a normal submission on average. This is likely related to the substantial increase in self posts seen above: the rise of self-posts also leads to a rise in low-quality self-posts, which will reduce the average.

But have the self-posts succeeded in encouraging more discussion on posts?

{% img /img/reddit-statistics/self_comments_reddit.png %}

Yes. They have. Despite having 1/4th of the score, self-submissions receive about twice as many comments on average.

# <i class="fa fa-ban"></i> Not Safe For Procrastinating At Work

*[Sample image omitted for obvious reasons.]*

Reddit has received an infamous reputation for being the internet's primary source of Not Safe for Work (NSFW) images and links with an age limit of 18+. Not all of the content is sexual; occasionally, shockingly violent yet important images are submitted to the primary subreddits as well.

The proportion of new NSFW content submitted to Reddit each month has increased gradually over the years, but it's still in the minority of submissions. (7.5% of all submissions in October 2014)

{% img /img/reddit-statistics/nsfw_proportion_reddit.png %}

If the proportion of NSFW content is relatively low, then how has it achieved such a reputation? How well does NSFW content score relative to non-NSFW content?

{% img /img/reddit-statistics/nsfw_score_reddit.png %}

NSFW content scores are nearly double that of non-NSFW content. Higher community approval of sexual content as opposed to nonsexual content isn't too surprising.

Reddit's community operates on pseudonyms instead of tying users to a real identity. Do users comment on NSFW submissions as often as normal submissions?

{% img /img/reddit-statistics/nsfw_comments_reddit.png %}

The number of comments on NSFW submissions is only slightly less than that on average, but there's a larger amount of uncertainty for that particular average due to the smaller proportion. Most internet users are lurkers and not contributors; it's likely that NSFW media is a more noninteractive experience. (*ahem*)

# <i class="fa fa-globe"></i> Reddit In The City

{% img /img/reddit-statistics/reddit_sf.png %}

Reddit users visit the site from all over the world. Although we cannot determine the location from where a user makes a submission, we can look at subreddits whose primary focus is a given location to see if there are any geographic trends.

I took a list of the [most popular city subreddits](http://www.reddit.com/comments/joqru/a_list_of_the_most_popular_city_reddits/), such as [/r/toronto](http://reddit.com/r/toronto) and [/r/sanfrancisco](http://reddit.com/r/sanfrancisco) and compared the average score of their submissions.

{% img /img/reddit-statistics/city_score_reddit.png %}

[/r/Seattle](http://reddit.com/r/Seattle) has an unusually high average score of 24.7 per submission and [/r/montreal](http://reddit.com/r/montreal) has an unusually low average score of 10.7. There does not be any clear geographic trends in the data: [/r/losangeles](http://reddit.com/r/losangeles) and [/r/bayarea](http://reddit.com/r/bayarea) are at the top but [/r/sandiego](http://reddit.com/r/sandiego) is at the bottom, plus [/r/Dallas](http://reddit.com/r/Dallas) and [/r/Austin](http://reddit.com/r/Austin) are on the opposite areas of the chart too. As a Pennsylvania native, I find it funny that [/r/pittsburgh](http://reddit.com/r/pittsburgh) and [/r/philadelphia](http://reddit.com/r/philadelphia) are next to each other.

Are the average number of comments affected by geography?

{% img /img/reddit-statistics/city_comments_reddit.png %}

There are a few more parings here than with average scores: [/r/montreal](http://reddit.com/r/montreal)  and [/r/toronto](http://reddit.com/r/toronto) are paired as non-US cities, [/r/Portland](http://reddit.com/r/Portland) and [/r/Seattle](http://reddit.com/r/Seattle) are paired as West Coast cities, [/r/Austin](http://reddit.com/r/Austin) and [/r/houston](http://reddit.com/r/houston) are paired as Texas cities, and all of [/r/bayarea](http://reddit.com/r/bayarea), [/r/sanfrancisco](http://reddit.com/r/sanfrancisco), and [/r/sandiego](http://reddit.com/r/sandiego) are paired as California cities. It's still not a perfect relationship, however.

# <i class="fa fa-meh-o"></i> Positivity and Negativity

{% img /img/reddit-statistics/reddit_neg.png %}

Reddit also has a reputation of being both positive and negative. You have communities like [/r/aww](http://www.reddit.com/r/aww) which share cute cat photos, and then you have communities like [/r/conspiracy](http://www.reddit.com/r/conspiracy) which...don't.

I took the top 100 subreddits by # of all-time submissions and found which ones were the most positive and negative. This was calculated by comparing each word of the submission title against a lexicon of positive/negative words, and count the number of review words in the lexicon. In this case, I use the lexicons compiled by [UIC professor Bing Liu](http://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html). A normalized positivity/negativity score is calculated by taking the average number of positive/negative words for the subreddit and dividing it by the average number of words in titles for submissions to the subreddit.

{% img /img/reddit-statistics/all_sentiment_reddit.png %}

Both positivity and negativity have been pretty equal for Reddit's entirety, but that doesn't mean that Reddit is neutral.

Let's look at the most positive of the top Reddit communities:

{% img /img/reddit-statistics/reddit_subreddit_positivity.png %}

The top communities are the communities which rely on community and general good feelings (this includes /r/nsfw, *ahem*). [/r/CookingRecipesStuff](http://www.reddit.com/r/cookingrecipesstuff) has the greatest positivity because it's apparently run by a spammer who sent enough submissions to become one the Top 100 subreddits by trying to abuse Reddit for [SEO backlinks](http://en.wikipedia.org/wiki/Backlink).

Huh, that wasn't expected.

The most negative subreddits are more intuitive.

{% img /img/reddit-statistics/reddit_subreddit_negativity.png %}

[/r/fffffffuuuuuuuuuuuu](http://www.reddit.com/r/fffffffuuuuuuuuuuuu) and [/r/offmychest](http://www.reddit.com/r/offmychest) were subreddits designed for ranting so negativity is expected. Many news subreddits have a high negativity (and comparatively little positivity). The presence of [/r/Health](http://www.reddit.com/r/Health) and [/r/techsupport](http://www.reddit.com/r/techsupport) as negative subreddits is appropriate.

This article is only *scratching the surface* of the information contained in Reddit's history, and I hope to explore more in the future. The Digg redesign announcement is only one of many events in Reddit's history, and there are still other aspects of self posts, NSFW submissions, and city subreddits that make me want to take a closer look. Reddit has been a primary source for images and video which go viral around the web, and unlocking that information may just help understand *how* things go viral.

---
* *All charts were made using 100% [R](http://www.r-project.org/) and [ggplot2](http://docs.ggplot2.org/current/), with extensive theme customization/hacks for the latter. No external photo-editing software used at all.*
* *You can access a copy of the data used to make most of the charts [in this Google Sheet](https://docs.google.com/spreadsheets/d/1qfyOdEP3NDnb6MEoUqiEK88Uv4X4tfkSfVqynylVGaE/edit?usp=sharing).*
* *Thanks to [/r/TheoryOfReddit](http://reddit.com/r/theoryofreddit) for [giving me ideas](http://www.reddit.com/r/TheoryOfReddit/comments/2p0dc2/i_have_a_database_of_all_reddit_submissions_what/) for interesting quantitative analyses of Reddit data.*