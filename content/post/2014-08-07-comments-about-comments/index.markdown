---
title: "The Data From Our Comments to the FCC About Net Neutrality"
date: 2014-08-08T08:00:00-07:00
slug: comments-about-comments
categories: [Data Science]
tags: [R, ggplot2, Word Cloud]
summary: "The FCC released a dataset of about 450,000 comments against net neutrality. Looking at the data behind these comments, it is clear to see that the entire country is passionate against the rule changes to net neutrality."
cover:
  image: featured.png
  relative: true
  hidden: true
---

This year, the Federal Communications Commission, one of the governmental entities which polices the Internet in the United States, announced significant rule changes to the policy of "[Open Internet](http://www.fcc.gov/openinternet)." Open Internet, more commonly known as "[net neutrality](http://en.wikipedia.org/wiki/Net_neutrality)," helps businesses facilitate competition and promote innovation on the internet, which help improve the internet as a whole. However, the proposed rule changes allow internet service providers (ISPs) to discriminate between different types of internet traffic (a "fast lane" for video and social media, for example). Said pricing discrimination may end up affecting the consumers instead (e.g. paying $10/month for access to Facebook), which may reduce innovation due to increased costs to the consumers of internet bandwidth, i.e. the average American citizen.

The FCC recently [opened up a comment period](http://www.fcc.gov/comments), where the U.S. public can [send or e-mail comments](http://apps.fcc.gov/ecfs/upload/display?z=s6uf0) on the changes to this policy. Naturally, the consumers of the internet reacted strongly. By August 2014, over _1.1 million comments_ have been received by the FCC.

{{< figure src="fcc-words-small.png" theme="light" >}}

This week, the FCC [released a dataset](http://www.fcc.gov/blog/fcc-makes-open-internet-comments-more-accessible-public) of about [450,000 of these comments](http://www.fcc.gov/files/ecfs/14-28/ecfs-files.htm). Looking at the data behind these comments, it's clear to see that the entire country is passionate against the rule changes to net neutrality.

Here's a timeline of when comments about net neutrality were sent to the FCC:

{{< figure src="fcc-timeline-annotated.png" theme="light" >}}

There are clear spikes after important initiatives for awareness of the FCC's ruling. May 15th marked the [beginning of the Open Comment period](http://www.savetheinternet.com/net-neutrality-resources) for the FCC's new guidelines, June 3rd marked the week after an airing of Last Week Tonight with John Oliver, which contained an [anti-net-neutrality rant](https://www.youtube.com/watch?v=fpbOEoRrHyU) which went viral for the rest of the week. July 15th marked the close of the Open Comment period, which is why on July 14th, the internet rallied and sent in over a hundred thousand comments, which [crashed their servers](http://www.nydailynews.com/news/politics/fcc-extends-net-neutrality-open-comment-deadline-friday-article-1.1868238#kDMozMu84rJ5TPsl.97) and forced them to extend the deadline.

But as with many awareness campaigns over the internet, this campaign may have "[slacktivists](http://en.wikipedia.org/wiki/Slacktivism)", as evidenced by the flat lines after the events where people stopped writing comments. How much effort did the U.S. people actually put into their submissions? One way to tell is to check the length of the submissions.

{{< figure src="fcc-comment-length.png" theme="light" >}}

Many comments were one-liners at about 20 words each, and many comments were multiparagraph notes at about 180 words each. But why is there a giant spike at about 300 words?

As it turns out, there were over 100,000 comments with exactly 1,477 characters (approximately 290 words). That number of characters (before cleaning) corresponds to a comment following this template:

> Net neutrality is the First Amendment of the Internet, the principle that Internet service providers (ISPs) treat all data equally. As an Internet user, net neutrality is vitally important to me. The FCC should use its Title II authority to protect it.
>
> Most Americans have only one choice for truly high speed Internet: their local cable company. This is a political failure, and it is an embarrassment. America deserves competition and choice.
>
> Without net neutrality, a bad situation gets even worse. These ISPs will now be able to manipulate our Internet experience by speeding up some services and slowing down others. That kills choice, diversity, and quality.
>
> It also causes tremendous economic harm. If ISPs can speed up favored services and slow others, new businesses will no longer be able to rely on a level playing field. When ISPs can slow your site and destroy your business at will, how can any startup attract investors?
>
> My friends, family, and I use the Internet for conversation and fun, but also for work and business. When you let ISPs mess with our Internet experience, you are attacking our social lives, our entertainment, and our economic well being. We won't stand for it.
>
> ISPs are opposing Title II so that they can destroy the FCC's net neutrality rules in court. This is the same trick they pulled last time. Please, let's not be fooled again. Title II is the strong, legally sound way to enforce net neutrality. Use it.

This is the default template for a submission at the [Battle for Net Neutrality](https://www.battleforthenet.com) website. That means over about 1/4th of the comments in the dataset, and atleast 1/10th of all comments submitted, used this website's submission form.

## Comments Across the Nation

Net neutrality affects some individuals more than others. Not everyone in the U.S. may be as passionate over the issue, and many may not even be aware that such a threat to the modern internet even exists.

Which cities in the United States sent the most comments to the FCC?

{{< figure src="fcc-city.png" theme="light" >}}

Yes, Brooklyn, NY counts as a city according to the FCC.

It's not surprising that the three most populated cities in the U.S. (New York, Los Angeles, Chicago) top this chart due to the higher potential number of commenters. What is surprising yet important is that tech hubs with much fewer populations, such as San Francisco, Seattle, and Portland, all have extremely strong showings.

When you look at the distribution of comments by state of origin, it's even more apparent that California and Washington are some of the key drivers of the comments. (admittingly, it does resemble a [population map](https://xkcd.com/1138/))

{{< figure src="fcc-state-map.png" theme="light" >}}

What are the key words mentioned in the comments to the FCC?

The key players in who would benefit the most from the implementation of net neutrality are [Comcast](http://www.comcast.com/) and [Verizon](http://www.verizon.com/), two of the biggest ISPs in the country. Which states have been speaking out the most against these institutions?

{{< figure src="fcc-state-map-comcast.png" theme="light" >}}

{{< figure src="fcc-state-map-verizon.png" theme="light" >}}

Comcast is a frequent topic of discussion (5.2% of all comments about net neutrality contain atleast 1 mention of Comcast), especially on the West Coast. On the other hand, less than half as many talk about Verizon (2.0% of all comments), except on the East Coast.

Although not on the map, Washington, DC actually had the most to comment on these two topics, with 11.7% comments having atleast one mention of Comcast and 8.8% of comments having atleast one mention of Verizon.

[Netflix](http://www.netflix.com/), an internet video-streaming service which would likely be negatively impacted by the FCC ruling, was also discussed.

{{< figure src="fcc-state-map-netflix.png" theme="light" >}}

Discussion of Netflix from all around the country is very evenly distributed (2.1% of all comments), potentially because it's not location-specific as the presence of an ISP. (Montana apparently does not care much about Netflix.)

Another concern about net neutrality is the potential [fight against the First Amendment](https://www.aclu.org/net-neutrality) and free speech itself, as ISPs could theoretically restrict traffic to unfavorable websites under the system. Which states are most passionate about free speech?

{{< figure src="fcc-state-map-free-speech.png" theme="light" >}}

Much more activity in the Midwest and especially the North West than the previous maps. (2.1% of all comments discuss "free speech") North Dakota apparently is relatively indifferent about the freedom of speech.

Unfortunately, at this period of time, it's hard to guess if the hundreds of thousands of comments sent to the FCC will actually cause them to reconsider their plans. The sheer quantity of comments, at the least, lets the FCC know that Americans feel strongly about the issue. It's clear that in the worst-case scenario where the ISPs win the net neutrality battle, the consumers of the internet in the United States **will not remain passive**.

---

- _Charts were generated using R and ggplot2._
- _You can view the data aggregated by date, by state, and by city in [this Google Sheet](https://docs.google.com/spreadsheets/d/1D2T5Lg41IWfkQPEMLWq3fjU7_kJ8lDNc4H2wsbr4BbU/edit?usp=sharing). You can download a CSV of the original comment metadata [here](https://www.dropbox.com/s/7tzsk7kv7ctgydp/fcc_comments.zip). [7.6MB .zip]_
- _You can view a 3000px x 3000px image of the FCC comments word cloud [here](http://i.imgur.com/I0dpEA6.png)._

**\*EDIT: 8/9/14**: Per [comments on Hacker News](https://news.ycombinator.com/item?id=8153091), I've changed wording in a few paragraphs for clarification.\*
