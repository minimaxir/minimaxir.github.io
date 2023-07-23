---
title: "The Quality, Popularity, and Negativity of 5.6 Million Hacker News Comments"
date: 2014-10-06T08:00:00-07:00
slug: hn-comments-about-comments
categories: [Data Science, Big Data]
tags: [R, ggplot2, Hacker News, Comments]
summary: "Hopefully, these comments will answer whether Hacker News is experiencing a rise in quality, or if the complaints levied against HN are valid."
cover:
  image: featured.jpg
  relative: true
  hidden: true
---

Last February, I [published an article](http://minimaxir.com/2014/02/hacking-hacker-news/) about [Hacker News](https://news.ycombinator.com/), a tech-oriented link aggregator run by startup accelerator [Y Combinator](http://www.ycombinator.com/). In that post, I analyzed all submissions to date, and noted that the site has a strong and active userbase.

In recent months, however, Hacker News has undergone criticism. A blog post by Danilo Campos titled "[Y Combinator and the negative externalities of Hacker News](http://danilocampos.com/2014/09/y-combinator-and-the-negative-externalities-of-hacker-news/)", notes that although Hacker News is a critical resource for young male techies based in Silicon Valley (_Disclosure: I am a young male techie based in Silicon Valley_), this has the consequence of excluding female hackers. Campos has even created a [#HNwatch](https://twitter.com/search?f=realtime&q=%23hnwatch&src=typd) hashtag to catalog sexist and insensitive comments made by Hacker News users. As a long-time [user on Hacker News](https://news.ycombinator.com/user?id=minimaxir), I unfortunately [agree with this assessment](https://twitter.com/minimaxir/status/468080907925340160) at times.

In fairness, such comments are in the minority on Hacker News. Or are they?

In order to better assess the quality, popularity, and negativity of Hacker News comments over the years, I've downloaded 5,592,362 comments from Hacker News, the maximum number of comments possible, from its beginnings in 2006 to October 2014. Hopefully, these comments will answer whether Hacker News is experiencing a rise in quality, or if the complaints levied against HN are valid.

Here's a [glance at Hacker News's best comments](https://docs.google.com/spreadsheets/d/1ZwonVX_KlDYhuhPnAAnVpdVRgu4LxldP74-c_kvOd5k/edit?usp=sharing), determined by the number of upvotes it receives from the Hacker News community, for each month since 2006:

<div><iframe width="100%" height="400px" src="https://docs.google.com/spreadsheets/d/1ZwonVX_KlDYhuhPnAAnVpdVRgu4LxldP74-c_kvOd5k/pubhtml?widget=true&amp;headers=false"></iframe></div>

There are interesting trends in this sample data set. The types of comments that became popular in 2006-2008 Hacker News were one-line quips, akin to those you would see in the comments on modern Reddit (which is a topic for another blog post). Highly-voted comments often come from the same people, especially those from Paul Graham (pg), Founder and then-President of Y Combinator.

{{< figure src="early_reddit.png" theme="light" >}}

This may indicate a bias or [halo effect](http://en.wikipedia.org/wiki/Halo_effect) where the commenter is more impactful than the comment itself. Additionally, some comments received many upvotes due to context: the top comment in December 2010 was simply "sad." in a thread about [Yahoo Shutting Down Delicious](https://news.ycombinator.com/item?id=2013248), but the comment was made by Joshua Schachter (joshu), the creator of Delicious.

Compare those older comments to those made between 2012-2014. Those comments are very long, insightful, and made by many different people. (including a [comment by Danilo Campos himself](https://news.ycombinator.com/item?id=4689643) in October 2012)

However, these are the good comments. The bad comments are _especially_ bad.

Here are a [set of Hacker News's worst comments](https://docs.google.com/spreadsheets/d/1IfbSDYVBXiHZCuMdHXgprhmeCVc4XDtOGizF9CSGyUo/edit?usp=sharing) from each month where the comment has received a score of -3 or -4, the lowest score before the comment is automatically killed. (_Warning: comments may cause you to lose faith in humanity and/or be unintentionally hilarious_)

<div><iframe width="100%" height="400px" src="https://docs.google.com/spreadsheets/d/1IfbSDYVBXiHZCuMdHXgprhmeCVc4XDtOGizF9CSGyUo/pubhtml?widget=true&amp;headers=false"></iframe></div>

The types of bad comments haven't changed over the years. Hostile comments are immediately downvoted. It's worth noting that on Hacker News, you can be downvoted for being factually wrong.

Some users are more active commenters than others. Out of Hacker News's 176,692 users who have made atleast 1 comment, only 48% of those commenters end up leaving two more comments, and only 6% of HN users end up leaving 100 or more comments total.

{{< figure src="n-comments.png" theme="light" >}}

However, as users comment more on Hacker News and learn the intricacies of HN's culture, they become more skilled at creating quality comments which receive higher scores, which serve as an indicator of quality. As Hacker News users comment more and more, the average expected comment score for each successive post increases.

{{< figure src="n-comments-practice.png" theme="light" >}}

_(The faded area for all charts in this article represents a 95% confidence interval for the average at a given point; all of the confidence intervals are very narrow due to the sheer quantity of data present. Whoo, big data!)_

What are the trends behind the Hacker News comments? First, we must see how Hacker News comments has changed over time.

## Hacking Through The Years

As one would expect, the number of new comments posted on Hacker News each month has been gradually increasing proportional to its popularity, although the number of new comments per month has decreased starting in 2014, which indicates a slowing growth rate.

{{< figure src="monthly_total_comments.png" theme="light" >}}

However, has Hacker News retained quality with its increasing notoriety? One way to check is to analyze the average amount of points of the comments. Hacker News comments start out at 1 point, and other users can upvote and downvote comments.

{{< figure src="monthly_average_points.png" theme="light" >}}

The minimum average points score of any given comment was about 2 points, meaning that all comments received atleast 1 upvote on average. This trend has been increasing until 2011 when it peaked at about 4.5 points. Since then, the average has trended downward, with a particularly large drop starting at 2014.

Therefore, starting in 2014, both quantity _and_ quality are on a downward trend.

Another way to gauge quality is to look at the average comment length. Are comments trending toward short quips, or are longform comments more popular?

{{< figure src="monthly_average_words.png" theme="light" >}}

The length of the average comment has increased by about 10% over the years, which shows a slight increase in the overall thoughtfulness of HN comments.

Has the average sentiment on Hacker News changed over the years? To gauge the relative sentiment of Hacker News comments, I compared each word of the comment against a lexicon of positive/negative words, and counted the number of review words in the lexicon. In this case, I used the [lexicons compiled by UIC professor Bing Liu](http://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html). This is the same method used in my [previous analysis of Yelp reviews](http://minimaxir.com/2014/09/one-star-five-stars/), where the technique was very effective. However, unlike Yelp, comments on Hacker News tend to make use of sarcasm, so this method may be less effective. (there isn't any easy method for detecting sarcasm, because who in the entire world would want an easy method for detecting sarcasm?)

From that, we can calculate average positivity and average negativity for a given comment by dividing the number of positive/negative words respectively by the approximate number of words in the comment. Both metrics have converged slightly over the years.

{{< figure src="monthly_average_positive_negative.png" theme="light" >}}

In September 2014, the average positivity of a comment is _3.2%_, while the average negativity of a comment is _2.3%_ (leading to a 0.9% net positive sentiment).

The nature of the comments Hacker News has definitely changed since the site's humble beginnings in 2006, but it's hard to determine if it's for the _better_.

Let's look more into the nature of the upvote system.

## Free Points

As mentioned, the number of points on a new Hacker News comment starts at 1 point. Anyone can give an upvote, which increases the points value by one. However, long-time HN users can downvote posts, decreasing the score by 1. Downvoting has another effect; comments with 0 or fewer points turn an aesthetically-displeasing gray, in an effort to both hide them from the public eye and encourage corrective upvotes if necessary from users with OCD. In all other cases, the points score of a comment is hidden from other users in order to help prevent bandwagoning and the upvoting of comments just because they have lots of upvotes.

{{< figure src="distribution_comment_points.png" theme="light" >}}

Over 50% of all comments simply have 1 or 2 points, with the proportion decreasing by a third for each successive point value. What's surprising is how few comments have 0 or fewer points: this shows that HN users do not like downvoting.

I mentioned earlier that comment length could be used a proxy for comment quality. Is there a relationship between the number of points a comment receives and the length of a comment?

{{< figure src="distribution_comment_points_words.png" theme="light" >}}

Surprisingly, yes! The effect of comment length on the number of points a comment received is likely not solely causal, but the correlation between the two values is helpful. (it is statistically unlikely to receive a lot of upvotes if your comment is short. The inverse is also true; a short comment is much more likely get downvoted.)

Is there a similar correlation between sentiment and the number of points a comment receives?

{{< figure src="distribution_comment_points_sentiment.png" theme="light" >}}

Nope. Both positivity and negativity are relatively static regardless of point values, although it's worth noting that comments with 0 or fewer points (downvoted comments) have a disproportionately high negativity.

## Tone and Tolerance on Hacker News

There's a big difference between the language used in a Hacker News comment on a typical submission, and the language used in Hacker News submissions about women and diversity.

{{< figure src="hn_2_gram_small.jpg" theme="light" >}}

This word cloud consists of bigrams made from 109k comments from HN submissions in September 2014, and from 21k comments in threads whose submission title contains "women", "female," or "diversity." The language in the former is more neutral and about the content of the article (apparently Hacker News users _really_ like to talk about Open Source software), while the submissions about gender and diversity trend to talk about tangent topics.

How does the tone differ between the two groups of articles? Here's the distribution of the average number of positive words in comments per submission in September 2014:

{{< figure src="density_september_2014_hn.png" theme="light" >}}

The average amount of positive words in a comment made in September 2014 is 2.16 words, and the average amount of negative words is 1.46, with both of those values being close to the respective statistical modes.

Let's compare that to the distribution of comments made on all submissions about women and diversity.

{{< figure src="density_women.png" theme="light" >}}

The average amount of positive words in a comment made in thread about gender and diversity is 2.48 words, a little higher than the average, and is also the most frequently occuring value. However, The average amount of positive words in a comment made in thread about gender and diversity is 2.10 words, a much higher increase. The average is to the right of the mode, indicating that the average is skewed-right by submissions with overly-negative comments. This may be why there is a greater perception of negativity for readers of comment threads about women and diversity.

One of the [stated goals of Hacker News](http://paulgraham.com/hackernews.html) is to avoid an [Eternal September](http://en.wikipedia.org/wiki/Eternal_September), where the quality of discourse drops and everyone leaves. It's clear that the quality of discourse has changed over the years: comments are longer, but not necessarily better. Positivity has decreased and negativity has increased. The difference between 2006 HN and 2014 HN is stark.

Hacker News isn't the perfect tech news aggregator. The issue of inclusion is real, and despite the fact that sexist comments are in the minority, they need to stop. In 2014, both quantity _and_ quality are decreasing. But since that Y Combinator has [committed to ending sexism in tech](http://blog.ycombinator.com/diversity-and-startups) and [appointed new moderators](http://blog.ycombinator.com/meet-the-people-taking-over-hacker-news) to control content quality, I'm confident that things will improve in the future for Hacker News.

---

- _Data was retrieved from Hacker News using [the official API](https://hn.algolia.com/api). The data was then stored in a PostgreSQL database, mostly so I could take advantage of that database's [window functions](http://www.postgresql.org/docs/9.1/static/tutorial-window.html) capability._
- _Charts, word clouds, and other miscellaneous data processing was done using R and ggplot2. Gathering the data from the API and extracting the bigrams for the word clouds was done using Python._
- _You can access the code used to process the data, chart the data, and extract bigrams from the comments in [this GitHub repository](https://github.com/minimaxir/hacker-news-comment-analysis). This does not include the code for retrieving the comments from the Hacker News API and storing it in PostgreSQL: that code will be in a separate repository if released._
