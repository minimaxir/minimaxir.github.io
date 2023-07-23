---
title: "A Statistical Analysis of All Hacker News Submissions"
date: 2014-02-24T08:00:00-07:00
slug: hacking-hacker-news
comments: true
categories: [Data Science]
tags: [R, ggplot2, Hacker News]
summary: "After downloading all 1,265,114 Hacker News submissions from the official Hacker News API, I gathered a few interesting statistics which show the true impact of Hacker News."
cover:
  image: featured.png
  relative: true
  hidden: true
---

[Hacker News](https://news.ycombinator.com/news) is a very popular link aggregator for the technology and startup community. Officially titled [by Paul Graham in 2007](http://ycombinator.com/hackernews.html), Hacker News began mostly as a place where the very computational-savvy could submit stories around the internet and discuss the latest computing trends.

{{< figure src="hn-wordcloud-2007i.png" theme="light" >}}

Back then, people were talking about networking, software users, and a little up-and-coming startup known as "[Twitter](https://twitter.com/)."

Six years later, during the new renaissance of computing accessibility and startup entrepreneurship, not much has changed.

{{< figure src="hn-wordcloud-2013i.png" theme="light" >}}

Hacker News, from 2007 to 2014, always illustrates what's "new" in technology. After downloading all 1,265,114 Hacker News submissions from the official [Hacker News API](https://hn.algolia.com/api), I gathered a few interesting statistics which show the true impact of Hacker News.

## How many stories are submitted to Hacker News?

In the past few years, Hacker News has had an interesting growth pattern.

{{< figure src="hn-monthly-submissions.png" theme="light" >}}

From the beginning of 2010 with 12k monthly submissions to to the end of 2011 with 31k monthly submissions, the amount of monthly submissions to Hacker News nearly tripled. It's a similar growth rate to that of the startups that Y Combinator typically funds.

What's _really_ interesting is that the end of 2011 is the peak: since then, the amount of submissions has been trending downward. Is Hacker News dying?

I don't think so. Hacker News implements a proprietary anti-spam algorithm which "kills" submissions, and moderators can kill submissions manually if necessary. Killed articles do not appear in the submission count, so a change in policy would cause the discrepancy. At the least, it helps improve the quality of discussion.

_UPDATE (2/28): Paul Graham, in the [corresponding HN thread](https://news.ycombinator.com/item?id=7291531), made a [comment](https://news.ycombinator.com/item?id=7292094) that the anti-spam algorithm did indeed increase spam detection and number of article killed at the end of 2011._

## How many submissions receive large amounts of points?

On Hacker News, users are able to upvote submissions. The more upvotes a submission has, the higher the position that it appears on the front page of the main site. A simple heuristic for calculating exposure from a Hacker News front page submission is 100 page views per point minimum, which means a submission that earns hundreds of points can go viral very quickly!

{{< figure src="hntop.png" theme="light" >}}

But how many submissions actually make it to the front page, and how many actually make it to the top?

{{< figure src="hn-points-hist.png" theme="light" >}}

On a logarithmic scale, it's evident that the vast majority of Hacker News submissions don't even hit 10 points. (the average amount of points for a submission is 9.51). Usually, hitting 10 points is the sign that you've appeared on the front page atleast briefly; there, the submission either receives voting momentum or dies quickly due to other rising stars.

But how many submissions _do_ receive hundreds of points? Here's a chart of submissions by month which have received more than 100 points:

{{< figure src="hn-monthly-submissions-front.png" theme="light" >}}

The growth rate of top-scoring submissions is correlated with the growth rate of Hacker News submissions themselves, which is not surprising. The number of points a post receives is also dependent on the number of users; as Hacker News grows, the number of users grows as well. Even though the front page cycles frequently, there is still room for great content.

## When is the best time to submit to Hacker News?

The age old question. What is the best time to post such that your post makes it to the front page?

First, let's see when Hacker News has the most activity by observing the average number of submissions for each combination of submission hour and weekday:

{{< figure src="hn-submissions.png" theme="light" >}}

Hacker News activity is most active at around 12 PM EST / 9 AM PST at about 40 submissions per hour, when hackers on the East Coast submit just before eating lunch, and hackers on the West Coast submit just after getting to work. Weekends, unsurprisingly, are completely dead.

If you submitted your link at 12 PM, you'd have a lot competition, but it would be easier to get upvotes since there would be more people visiting the site. If you submitted your post on the weekend, there would be no competition, but would be harder to make the front page.

What is the best weekday + hour to submit such that your submission goes viral? An easy way to estimate the best time is to analyze the times of submission of previous posts with large amounts of points; with enough data (we have enough), it'll provide a strong guess.

{{< figure src="hn-front-page.png" theme="light" >}}

As it turns out, the submission times of posts are _uncorrelated_ with the number of viral posts. There are _slightly_ more when submitting at peak activity (weekdays at 12 PM EST / 9 AM PST), but it won't make-or-break an article's success on HN.

Having good content is more important to having a post get to the top of Hacker News. Although you probably shouldn't submit an article when there's a major tech event. (e.g. Facebook's WhatsApp Purchase)

_UPDATE (2/28): It's been pointed out that measuring the proportion of viral posts (number of viral submissions / number of total submissions) would be a better indicator of odds of article success. Since the number of viral submissions is similar across all time zones, the proportion of viral posts would be greatest on the weekends, since there are dramatically fewer total submissions. However, this logic isn't perfectly correct due to how the article discovery and upvoting system works. I may cover this in a future post._

## Do Y Combinator startup announcements score better on HN?

One of the main benefits of Hacker News is to showcase the startups which Y Combinator has funded. Links about YC Startups contain the YC class name of that startup in their title, such as "[Watsi (YC W13) raises $1.2M first-of-its-kind philanthropic seed round](https://news.ycombinator.com/item?id=6103506)." Do these links perform better than the typical links submitted to Hacker News?

{{< figure src="hn-points-class-hist.png" theme="light" >}}

As it turns out, yes. For normal posts, the average number of points is 9.5 points, but for YC class announcements, the average is 41.7 points (from 1,745 submissions analyzed).

For fun, which YC classes perform the best on Hacker News?

{{< figure src="hn-top-class.png" theme="light" >}}

W06 placed first because of [two](https://news.ycombinator.com/item?id=2481576) [announcements](https://news.ycombinator.com/item?id=2481610) about Wufoo, and S11 placed second because of [CryptoSeal](https://news.ycombinator.com/item?id=6585071) and [Parse](https://news.ycombinator.com/item?id=2846725).

## Who are the best submitters on Hacker News?

Like all popular link aggregators, Hacker News has many spammers who submit large amounts of low quality content. Who are the users who submit quality content?

Calculating the average points of a user's submitted content isn't an accurate measurement, since that can be heavily skewed by one viral post. Therefore, I created a Hacker News "[batting average](http://en.wikipedia.org/wiki/Batting_average)" statistic: which posters have the highest proportion of posts that make it to the front page vs. the total number submitted? (for posts since 2010 and number of submitted posts >= 10)

{{< figure src="hn-top-submitters.png" theme="light" >}}

It should be no surprise that most of the people on the list are startup founders. It's also not surprising that most of those founders, such as [mwseibel](https://news.ycombinator.com/user?id=mwseibel), [rahulvohra](https://news.ycombinator.com/user?id=rahulvohra) and [tikhon](https://news.ycombinator.com/user?id=tikhon) also founded a Y Combinator startup. (although Paul Graham [himself](https://news.ycombinator.com/user?id=pg) only has a 0.856 average).

## What are Hacker News' favorite programming languages?

One of the infamous memes about Hacker News is programming language elitism, with favoritism for languages such as Lisp and Erlang.

But what programming languages are indeed the most popular on Hacker News?

{{< figure src="hn-lang-num-submissions.png" theme="light" >}}

Javascript is very popular, especially with the rising popularity of node.js. Go is unexpectedly frequently submitted for being such a new language. (although it's possible for "go" to be used in a context outside of a programing language.) Lisp and Erlang are indeed obscure, which might discredit the meme.

Which programming languages are most well-liked on HN?

{{< figure src="hn-lang-avg-submissions.png" theme="light" >}}

...so Lisp and Erlang _are_ well-liked on HN.

At the least, in both cases, no one on Hacker News likes PHP.

## Snowden and Bitcoin

Edward Snowden's leaks in June 2013 about the NSA and PRISM affected the entire tech industry, including Hacker News. How did Hacker News react to the leaks?

{{< figure src="hn-snowden.png" theme="light" >}}

Strongly.

But after the June spike, discussion about the NSA decreased significantly, but it's still a popular topic.

Bitcoin is more interesting since it has had three distinct surges:

{{< figure src="hn-bitcoin.png" theme="light" >}}

The June 2011 spike was due to the theft of [25,000 Bitcoin](https://bitcointalk.org/index.php?topic=16457.0), the April 2013 spike happened during the first rise-and-fall from $200/BTC, and the November 2013 spike happened during the second rise-and-fall from $1,000/BTC.

Hacker News is a great model for a link aggregator. It emphasizes more on quality content than the quantity of content, and it has paid off over the years.

---

_Code for getting all the HN submissions is [available on GitHub](https://github.com/minimaxir/hacker-news-download-all-stories). Unfortunately, the Hacker News data is too large to distribute freely. [Contact me](http://minimaxir.com/contact/) if you want the raw data or any data to reproduce the charts._

_Note: there appear to be [some gaps in the data](https://docs.google.com/spreadsheets/d/1Zdex42KE-8DFIHujhVWjJ3yqilJSws2EbT8VAARPYgE/edit?usp=sharing) for dates before 2010. This appears to be caused by the API server: for example, compare the [number of submissions as reported by HN for top user liebke](https://news.ycombinator.com/submitted?id=liebke) (21) and the [number of submissions as reported by the API](https://hn.algolia.com/api/v1/search_by_date?tags=story,author_liebke) for liebke (14, with the last 7 submitted stories missing relative to the HN output). Also, number of stories (1,265,114) in the output data and the [server data](https://hn.algolia.com/) (~1,267,000 as of publishing) are very close, making the discrepancy unlikely caused by client error. As a result, any chart that is based on a time series does not start earlier than 2010._
