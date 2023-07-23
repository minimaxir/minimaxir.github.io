---
title: "The Decline of Imgur on Reddit and the Rise of Reddit's Native Image Hosting"
date: 2017-06-20T08:00:00
slug: imgur-decline
categories: [Data Science]
tags: [R, ggplot2, Reddit]
summary: "Before Reddit added native image hosting, Imgur accounted for 15% of all submissions to Reddit. Now it's below 9%."
cover:
  image: featured.png
  relative: true
  hidden: true
---

Last week, Bloomberg [reported](https://www.bloomberg.com/news/articles/2017-06-17/reddit-said-to-be-raising-funds-valuing-startup-at-1-7-billion) that Reddit was raising about $150 Million in venture capital at a valuation of $1.7 billion. Since Reddit's data is [public on BigQuery](http://minimaxir.com/2015/10/reddit-bigquery/), I quickly checked if there were any recent user engagement growth spurts which could justify such a high worth. Here's an example BigQuery which aggregates the total number of Reddit submissions made for each month until the end of April 2017:

```sql
#standardSQL
SELECT DATE_TRUNC(DATE(TIMESTAMP_SECONDS(created_utc)), MONTH) as mon,
  COUNT(*) as num_submissions,
  FROM `fh-bigquery.reddit_posts.*`
  WHERE (_TABLE_SUFFIX BETWEEN '2016_01' AND '2017_04' OR _TABLE_SUFFIX = 'full_corpus_201512')
  GROUP BY mon
  ORDER BY mon
```

{{< figure src="reddit-1.png" theme="light" >}}

As it turns out, Reddit did indeed get a large boost in activity toward the end of 2016, likely due to the _heated_ discussions and events around the [U.S. Presidential Election](https://en.wikipedia.org/wiki/United_States_presidential_election,_2016). But Reddit has maintained the growth rate since then, which is very appealing to potential investors.

How are other sites benefiting from Reddit's growth? [Imgur](http://imgur.com), an image-host developed to be the _de facto_ image hosting service for Reddit, shared in Reddit's continual growth...

{{< figure src="reddit-2.png" theme="light" >}}

...until mid-2016, when Imgur submission activity abruptly dropped. What happened?

Coincidentally in mid-2016, Reddit [made itself](https://techcrunch.com/2016/05/25/reddit-image-uploads/) an image host for submissions to the site. Initially limited to uploads via the iOS/Android apps, Reddit then allowed desktop users to upload images through a [beta rollout](https://www.reddit.com/r/changelog/comments/4kuk2j/reddit_change_introducing_image_uploading_beta/) starting May 24th, and a full [sitewide release](https://www.reddit.com/r/announcements/comments/4p5dm9/image_hosting_on_reddit/) on June 21st.

How many Reddit-hosted image submissions are there compared to the number of Imgur submissions?

{{< figure src="reddit-3.png" theme="light" >}}

Wow, native Reddit images caught on.

## Market Share

{{< figure src="pics.png" theme="light" >}}

Did the rise of Reddit-hosted images cause the decline of Imgur on Reddit? Let's look at the daily number of Imgur submissions and Reddit-hosted Image submissions from December 2015 to April 2017, normalized by the total number of sitewide submissions on that day. This gives us a Reddit "market share" metric for both services.

Additionally, we can plot vertical lines representing the dates when Reddit-hosted images rolled out in the limited beta release and the full sitewide release to see if there is a link between those events and submission behavior.

{{< figure src="reddit-4.png" theme="light" >}}

Before Reddit added native image hosting, Imgur accounted for 15% of all submissions to Reddit. Now it's below 9%. More Reddit-hosted images are being shared on Reddit than images from Imgur.

Instead of looking at all of Reddit, where spam subreddits could skew the results, we can also look at the largest image-only subreddits: [/r/pics](https://www.reddit.com/r/pics/) and [/r/gifs](https://www.reddit.com/r/gifs/), both of which were a part of the beta rollout.

{{< figure src="reddit-5.png" theme="light" >}}

Here, the impact of the two rollouts is much noticeable, with immediate increases in Reddit-hosted image market share after each rollout, and proportional decreases in Imgur market share. The growth rate after the beta release is flat for both services, but when Reddit image hosting becomes sitewide, the market shares of Reddit-hosted/Imgur images increase/decrease linearly over time once users officially learn that the native image upload functionality exists. And these trends do not appear to be slowing down.

## A Silver Lining?

Obviously Imgur does not like losing a _large_ chunk of traffic, but there's a possibility that this outcome will be better for the business than what's implied from the charts above.

Hosting images on the internet isn't free, and bandwidth costs are the primary reason dedicated image hosts have died off over the years. Direct image links which show the user only the image and nothing else are convenient, but they are pure loss for the service. That's why image hosts encourage linking to the image on a landing page of the website, filled with ads which generate an expected revenue greater than the cost of serving the image.

After a user uploads an image to Imgur on the desktop, the user is given two share links that can be submitted to sites like Reddit: an image link that goes to the image + ads, and a direct link to the image.

{{< figure src="imgur_direct.png" theme="light" >}}

Recently, Imgur has [pushed app downloads](https://www.reddit.com/r/assholedesign/comments/5gs96k/just_show_me_the_fucking_image_imgur/) when visiting the site on an iOS/Android device, including [disabling uploads](https://www.reddit.com/r/assholedesign/comments/695efj/upload_image_on_imgur_mobile_has_been_replaced_by/) in the mobile browser. When sharing an image from the Imgur app, the _only_ way to share an image is through the image link, which could lead to an increase in the proportion of ad-filled Imgur image links on Reddit. Said increase could counteract the decrease in total Imgur submissions, and Imgur could actually come out ahead.

With BigQuery, we can check the percentage of all Imgur submissions to Reddit which are direct links and the percentage which are indirect/lead to a landing page, and see if the ratio changes along the same time horizon used above:

{{< figure src="reddit-6.png" theme="light" >}}

Welp. No significant change in the ratio over time, eliminating that possible silver lining.

## Conclusion

Note that the decline of Imgur on Reddit says nothing about Imgur as a business; it's entirely possible that Imgur's traffic on the main site itself is sufficient for growth. But the loss of Reddit traffic certainly can't be ignored, and it's interesting to visualize how quickly a service can be replaced when there's an equivalent native feature.

It's worth nothing that new competitors in the image space such as [Giphy](https://giphy.com) utilize image hosting as a _secondary_ service. Instead, they focus on building a repository of images which can be licensed and accessed programmatically by other services like Slack, Facebook, and Twitter. And Giphy has raised [$150 Million](https://www.crunchbase.com/organization/giphy#/entity) total with this approach, so perhaps the image hosting market itself has indeed changed.

---

_You can view the R, ggplot2 code, and BigQueries used to visualize the Reddit data in [this R Notebook](http://minimaxir.com/notebooks/imgur-decline/). You can also view the images/data used for this post in [this GitHub repository](https://github.com/minimaxir/imgur-decline)_.

_You are free to use the data visualizations from this article however you wish, but it would be greatly appreciated if proper attribution is given to this article and/or myself!_
