---
layout: post
title: "A Statistical Analysis of Medium.com Submissions to Hacker News"
date: 2013-07-02 8:00
comments: true
categories: [Startups, Blogging]
summary: "I analyzed the submissions of links under the medium.com domain to Hacker News to see just how Medium keeps surging in popularity. The results, as always, are very revealing."
image: medium-top-submitters.png
---

[Medium](https://medium.com/), a relatively new startup by Twitter cofounder Evan Williams, is a blog network that emphasizes simplicity and quality above everything else. Writers on the invite-only platform typically post stories about deeply personal topics, such as fighting adversity, never giving up your dreams, changing flawed systems, and other things that make the readers feel happy. One of my favorite articles on Medium, [Choosing Minecraft Over Disney](https://medium.com/editors-picks/57a0128b53c9), describe how a parent's children chose technology over television.

As of recently, the frequency of links to Medium posts on the popular tech-oriented link aggregator [Hacker News](https://news.ycombinator.com/news) has been increasing at an alarming rate. Since Medium's tales of triumph appeal to the ambitious entrepreneurs and startup founders of HN, the submissions are usually rapidly upvoted and easily make the front page, with  muted text helpfully noting that the link goes to medium.com. As a result, there has been [cognitive](https://news.ycombinator.com/item?id=5968593) [dissonance](https://news.ycombinator.com/item?id=5974209) on Hacker News whether Medium has too strong a presence on the aggregator, or worse,  potentially gaming the system.

Using the [HNSearch API](https://www.hnsearch.com/api), I analyzed the submissions of links under the medium.com domain to Hacker News to see just how Medium keeps surging in popularity. The results, as always, are very revealing.

<!-- more -->

The collected data is a sample of 1,000 links (out of 1,355 total) submitted to Hacker News under the medium.com domain.  Each data point contains the Title of the article, the HN user who submitted it, the amount of upvotes it received, the time it was posted (in PST), and links to both the article and the HN comments thread for reference. You can view the [data on Google Drive](https://docs.google.com/spreadsheet/ccc?key=0AjPFdCURhZvddDBPNFlMQUYyX1FhUkVVY2g1TmVLM1E&usp=sharing), or download [the raw CSV](https://www.dropbox.com/s/xnktwi9kheyqf6v/medium.csv) and play with the data yourself.

What does the data tell us about Medium?


----------


# How quickly has medium.com grown in popularity in the past few months? #

{% img /img/medium-month.png %}

Medium was launched [in August 2012](http://techcrunch.com/2012/08/01/medium-obvious/), and received relatively little attention as evidenced by the graph. But 8 months later, the frequency of medium.com submissions hockey-sticked, receiving almost 5x growth from March 2013 to April 2013. That certainly explains one of the reasons why the rise in medium.com links is just being noticed now.


----------


# When are medium.com posts being written and submitted to HN? #

{% img /img/medium-by-hour.png %}

The time of day a blog post is submitted makes all the difference in the world, especially if your blog platform targets readers in a specific region. Medium links are frequently posted and submitted around 10am PST / 1pm EST, which is smart as it's relatively early in the day for those living in the United States, and your potential readers would be more likely to read your post, and HN users are more likely to upvote.


----------


# Who are the Hacker News users who most frequently submit medium.com articles? #

{% img /img/medium-top-submitters.png %}

Of the 1,000 submissions, there were only 622 unique submitters of medium.com links, each submitting an average of 1.61 posts. Most only post their own articles, but others, like [rpsubhub](https://news.ycombinator.com/submitted?id=rpsubhub), [mrbird](https://news.ycombinator.com/submitted?id=mrbird), and [nvk](https://news.ycombinator.com/submitted?id=nvk) submit Medium.com links more often. However, none of those users appear to be associated with Medium; they just submit links rather frequently.


----------


# What are the types of articles on medium.com submitted to Hacker News? #

{% img /img/medium-wordcloud.png %}

Medium's category system is somewhat obtuse, so I parsed the keywords from the titles of the submissions (using a method similar to [my last post](http://minimaxir.com/2013/06/big-social-data/)) in order to get an idea what type of content is submitted most from Medium. There are lots of posts that ask rhetorical questions (**What?**, **How?**, **Why?**), and even more posts about the personal self with **I**. Not only is Medium using the right language to facilitate interaction, it's also hitting the interests of HNers with keywords such as **Design** and **Facebook**.


----------



# How successful *are* medium.com articles on Hacker News? #

{% img /img/medium-front-page.png %}

Out of the 1,000 submissions, only 158 had atleast 10 upvotes, which is enough to get the link to the front page, but not necessarily enough to keep it there. The graph is heavily right-skewed, with only 38 submissions getting above 100 points. It shows that medium.com links so not guarantee success, and even if you hit the front page, you have a low chance of hitting the coveted #1 ranking.



----------


Medium is definitely growing. HN is receiving more and more submissions which appeal to the average HN user, and posts are being submitted at all hours of the day. However, having a post at medium.com is not a panacea that will make your blog post be seen by thousands of people; you still need to write something interesting.

Time will tell. But if HN does indeed get bored of Medium, I believe the problem will correct itself.
