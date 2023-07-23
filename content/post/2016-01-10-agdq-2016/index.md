---
title: "Video Games and Charity: Analyzing Awesome Games Done Quick 2016 Donations"
date: 2016-01-11T08:00:00-07:00
slug: agdq-2016
categories: [Data Science]
tags: [R, ggplot2]
comments: true
summary: "Were frames killed? Were animals saved?"
cover:
  image: featured.png
  relative: true
  hidden: true
---

[Awesome Games Done Quick](https://gamesdonequick.com), and its sister event Summer Games Done Quick, are a fundraising events that livestreams video game speedruns [live on Twitch](http://www.twitch.tv/gamesdonequick/profile) for charity. Beginning in January 2011, before Twitch was launched out from Justin.tv, [AGDQ was very small](https://en.wikipedia.org/wiki/Awesome_Games_Done_Quick_and_Summer_Games_Done_Quick#List_of_marathons) and only raised $52,519.83 for the [Prevent Cancer Foundation](http://preventcancer.org); now, in 2016, from January 3rd to January 10th, AGDQ [successfully raised](https://gamesdonequick.com/tracker/index/agdq2016) about $1.2 _million_ for the charity.

A [speedrun](https://en.wikipedia.org/wiki/Speedrun), as the name suggests, is the process of completing a video game as fast as possible, optionally with self-imposed challenges to make things more interesting. Speedruns can emphasize extreme player skill and/or clever glitch abuse. And unexpected mistakes which make the results hilarious.

One of the first runs of AGDQ 2016, [Super Monkey Ball](https://www.youtube.com/watch?v=jLlian3g7Gg), demonstrates all of these. (run starts at 5:57)

{{< youtube jLlian3g7Gg >}}

AGDQ 2016 also has fun with the concept of speedrunning. One of the best events of AGDQ 2016 was a blind speedrun of user-created [Super Mario Maker](https://www.youtube.com/watch?v=8qC584MWXO4) levels from top designers, in which hilarity ensued. (run starts at 27:41)

{{< youtube 8qC584MWXO4 >}}

It might be interesting to know _which_ video games lead to the achievement of over $1M donated to charity and the nature of the donations in general.

## Gaming Data

With a few quick scripts on Kimono to scrape data from the [AGDQ 2016 donation page](https://gamesdonequick.com/tracker/donations/agdq2016) (+ a _lot_ of postprocessing in R!), I obtained a dataset of all 30,528 donations, their donors, when they donated, during what speedrun they donated, and _why_ they donated. ([Google Sheets link](https://docs.google.com/spreadsheets/d/1yyfkS0jvRK1cWrQesYiBn1TMGC93lo1MqahcU3XeGIU/edit?usp=sharing) for all the data)

Here are the cumulative donations during AGDQ, color coded by day:

{{< figure src="agdq-1.png" theme="light" >}}

Cumulative donations were strong the entire run. On the second-to-last day, the donations rallied and increased exponentially, clearing $1M handily on the last day.

The donation amount minimum is $5, but the average is significantly higher at $39.62. What is the distribution of donations?

Here is a distribution of donations from $5 to $100 (for ease of visualization/interpretation), which account for 97% of all donations:

{{< figure src="agdq-2.png" theme="light" >}}

The median donation amount is $20. What's interesting is that donations occur at clear break points: not only are there many donations at multiple of $10, but there are many donations at $25 and $75 as well. The $50 and $75 points also potentially benefited for being the threshold for entry into a [grand prize raffle](https://gamesdonequick.com/tracker/prizes/agdq2016). I'll note off-chart that there is a spike in $1,000 donations, the threshold for the audience-clapping in celebration and the [top single donation](https://gamesdonequick.com/tracker/donation/212588) was made by an AGDQ sponsor, [The Yetee](https://www.theyetee.com/), at $18,225. The [top donation by a non-sponsor](https://gamesdonequick.com/tracker/donation/209613) is from Minecraft creator Notch at $8,000, which he [did twice](https://gamesdonequick.com/tracker/donation/234071).

Which games are the most popular and generated the most amount of money for the Prevent Cancer Foundation?

{{< figure src="agdq-4.png" theme="light" >}}

Unsurprisingly, Nintendo games are the most popular due to the nostalgia factor. In fairness, the top runs on this chart occur during the last two days of AGDQ 2016, which as mentioned previously may have been affected by a rally, so we cannot assert causality. The appearance of [Shovel Knight](http://yachtclubgames.com/shovel-knight/) and [Bloodborne](https://en.wikipedia.org/wiki/Bloodborne) as leading donation games, both relatively recently released, shows that speedrunning has more appeal than just retro games.

A popular technique in charity drives is donation incentives, which help bolster the number of donations total. The [AGDQ bid incentives](https://gamesdonequick.com/tracker/bids/agdq2016) can include bonus game segments, or certain game decisions, such as what name to give to a main character.

Any donation can optionally be assigned as a donation toward an incentive. Which run received the most money toward incentives?

{{< figure src="agdq-5.png" theme="light" >}}

Super Metroid donations incentives accounted for nearly _1/4th_ of all the money raised at AGDQ. Final Fantasy IV accounted for a large amount as well, however, in both cases, the rally effect may apply. {% comment %}The Super Mario Maker Custom Level Blind Race which I showcased above benefits from donation incentives with bonus races, and the results show that the incentive was worthwhile.{% endcomment %}

Speaking of the Super Metroid donation incentives, it should be noted that this particular incentive is one of the most culturally-important incentives in the show. Super Metroid has an optional objective to Save The Animals from planetary destruction, but this costs time, and time is important for a speedrun. Or the speedruner can Kill The Animals through inaction for efficiency, "Saving the Frames."

What is the split of these incentive choices?

{{< figure src="agdq-6.png" theme="light" >}}

Yes, the animals were killed (specifically, they were **REKT**, in the words of a last-minute donator). Both bonus games and vanity naming were popular, but nothing compared to the Save the Animals / Kill the Animals bid war.

Lastly, people can leave comments with donations, and these comments are usually read on-stream when possible, as you've likely noticed if you're watched the videos above.

Here's a fun, nonscientific word cloud of those comments:

{{< figure src="agdq-7.png" theme="light" >}}

Lots of positivity, aside from the whole "Kill the Animals" thing. After all, the event is all about preventing cancer.

While this post isn't an academic analysis, it's neat to see to see what kinds of things drive donation to charity. This model of livestreaming and charitable applications is very successful, and important given the renewed attention toward livestreaming with the rise of Twitch to mainstream attention, alongside the rise of personal streaming with apps like Periscope. Donation incentives are a _very_ successful technique for facilitating donations.

It will be interesting to see if Twitch and events like AGDQ can leverage charitable livestreaming, or if another startup/organization beats them first. Bidding-Wars-for-Deciding-the-Fate-of-Fictional-Animals-as-a-Service has a nice ring to it.

---

_You can access a Jupyter notebook with the data processing and chart processing code [in this GitHub repository](https://github.com/minimaxir/agdq-2016). If you use the processed donation data or visualization designs contained within this article, it would be greatly appreciated if proper attribution is given back to this article and/or myself. Thanks! :)_

_Note for donation incentive statistics: the user can theoretically split their donation among multiple incentives; unfortunately I assumed at time of scrape that all the money could only go toward one bid. All donations I investigated from the source data were toward a single incentive except two donations from The Yetee which I fixed manually. If there are any data discrepancies, that is the likely cause._
