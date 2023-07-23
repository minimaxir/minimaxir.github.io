---
title: "Visualizing One Million NCAA Basketball Shots"
date: 2018-03-19T09:20:00-07:00
slug: basketball-shots
categories: [Data Science, Data Visualization, Big Data]
tags: [R, ggplot2]
summary: "Although visualizing basketball shots has been done before, this time we have access to an order of magnitude more public data to do some really cool stuff."
cover:
  image: featured.png
  relative: true
  hidden: true
---

So [March Madness](https://www.ncaa.com/march-madness) is happing right now. In celebration, [Google](https://www.google.com) uploaded [massive basketball datasets](https://console.cloud.google.com/launcher/details/ncaa-bb-public/ncaa-basketball) from the [NCAA](https://www.ncaa.com) and [Sportradar](https://www.sportradar.com/) to [BigQuery](https://cloud.google.com/bigquery/) for anyone to query and experiment. After learning that the [dataset had location data](https://www.reddit.com/r/bigquery/comments/82nz17/dataset_statistics_for_ncaa_mens_and_womens/) on where basketball shots were made on the court, I played with it and a couple hours later, I created a decent heat map data visualization. The next day, I [posted it](https://www.reddit.com/r/dataisbeautiful/comments/837qnu/heat_map_of_1058383_basketball_shots_from_ncaa/) to Reddit's [/r/dataisbeautiful subreddit](https://www.reddit.com/r/dataisbeautiful) where it earned about **40,000 upvotes**. (!?)

Let's dig a little deeper. Although visualizing basketball shots has been [done](http://www.slate.com/blogs/browbeat/2012/03/06/mapping_the_nba_how_geography_can_teach_players_where_to_shoot.html) [before](http://toddwschneider.com/posts/ballr-interactive-nba-shot-charts-with-r-and-shiny/), this time we have access to an order of magnitude more public data to do some really cool stuff.

## Full Court

The Sportradar play-by-play table on BigQuery `mbb_pbp_sr` has more than 1 million NCAA men's basketball shots since the 2013-2014 season, with more being added now during March Madness. Here's a heat map of the locations where those shots were made on the full basketball court:

{{< figure src="ncaa_count_attempts_unlog.png" theme="light" >}}

We can clearly see at a glance that the majority of shots are made right in front of the basket. For 3-point shots, the center and the corners have higher numbers of shot attempts than the other areas. But not much else since the data is so spatially skewed: setting the bin color scale to logarithmic makes trends more apparent and helps things go viral on Reddit.

{{< figure src="ncaa_count_attempts.png" theme="light" >}}

Now there's more going on here: shot behavior is clearly symmetric on each side of the court, and there's a small gap between the 3-point line and where 3-pt shots are typically made, likely to ensure that it it's not accidentally ruled as a 2-pt shot.

How likely is it to score a shot from a given spot? Are certain spots better than others?

{{< figure src="ncaa_count_perc_success.png" theme="light" >}}

Surprisingly, shot accuracy is about _equal_ from anywhere within typical shooting distance, except directly in front of the basket where it's much higher. What is the [expected value](https://en.wikipedia.org/wiki/Expected_value) of a shot at a given position: that is, how many points on average will they earn for their team?

{{< figure src="ncaa_count_avg_points.png" theme="light" >}}

The average points earned for 3-pt shots is about 1.5x higher than many 2-pt shot locations in the inner court due to the equal accuracy, but locations next to the basket have an even higher expected value. Perhaps the accuracy of shots close to the basket is higher (>1.5x) than 3-pt shots and outweighs the lower point value?

Since both sides of the court are indeed the same, we can combine the two sides and just plot a half-court instead. (Cross-court shots, which many Redditors [argued](https://www.reddit.com/r/dataisugly/comments/839rax/basketball_heat_map_shows_an_impressive_number_of/) that they invalidated my visualizations above, constitute only _0.16%_ of the basketball shots in the dataset, so they can be safely removed as outliers).

{{< figure src="ncaa_count_attempts_half_log.png" theme="light" >}}

There are still a few oddities, such as shots being made _behind_ the basket. Let's drill down a bit.

## Focusing on Basketball Shot Type

The Sportradar dataset classifies a shot as one of 5 major types: a **jump shot** where the player jumps-and-throws the basketball, a **layup** where the player runs down the field toward the basket and throws a one-handed shot, a **dunk** where the player slams the ball into the basket (looking cool in the process), a **hook shot** where the player close to the basket throws the ball with a hook motion, and a **tip shot** where the player intercepts a basket rebound at the tip of the basket and pushes it in.

{{< figure src="ncaa_types_prop_attempts.png" theme="light" >}}

However, the most frequent types of shots are the less flashy, more practical jump shots and layups. But is a certain type of shot "better?"

{{< figure src="ncaa_types_perc.png" theme="light" >}}

Layups are safer than jump shots, but dunks are the most accurate of all the types (however, players likely wouldn't attempt a dunk unless they knew it would be successful). The accuracy of layups and other close-to-basket shots is indeed more than 1.5x better than the jump shots of 3-pt shots, which explains the expected value behavior above.

Plotting the heat maps for each type of shot offers more insight into how they work:

{{< figure src="ncaa_count_attempts_half_types_log.png" theme="light" >}}

They're wildly different heat maps which match the shot type descriptions above, but show we'll need to separate data visualizations by type to accurately see trends.

## Impact of Game Elapsed Time At Time of Shot

A NCAA basketball game lasts for 40 minutes total (2 halves of 20 minutes each), with the possibility of overtime. The [example BigQuery](https://bigquery.cloud.google.com/savedquery/4194148158:3359d86507814fb19a5997a770456baa) for the NCAA-provided data compares the percentage of 3-point shots made during the first 35 minutes of the game versus the last 5 minutes: at the end of the game, accuracy was lower by 4 percentage points (31.2% vs. 35.1%). It might be interesting to facet these visualizations by the elapsed time of the game to see if there are any behavioral changes.

{{< figure src="ncaa_types_prop_type_elapsed.png" theme="light" >}}

There isn't much difference between the proportions within a given half, but there is a difference between the first half and the second half, where the second half has fewer jump shots and more aggressive layups and dunks. After looking at shot success percentage:

{{< figure src="ncaa_types_perc_success_type_elapsed.png" theme="light" >}}

The jump shot accuracy loss at the end of the game with Sportradar data is similar to that of the NCAA data, which is a good sanity check (but it's odd that the accuracy drop only happens in the last 5 minutes and not elsewhere in the 2nd half). Layup accuracy increases in the second half with the number of layups.

We can also visualize heat maps for each combo of shot type with time elapsed bucket, but given the results above, the changes in behavior over time may not be very perceptible.

{{< figure src="ncaa_count_attempts_half_interval_log.png" theme="light" >}}

## Impact of Winning/Losing Before Shot

Another theory worth exploring is determining if there is any difference whether a team is winning or losing when they make their shot (technically, when the delta between the team score and the other team score is positive for winning teams, negative for losing teams, or 0 if tied). Are players more relaxed when they have a lead? Are players more prone to making mistakes when losing?

{{< figure src="ncaa_types_prop_type_score.png" theme="light" >}}

Layups are the same across all buckets, but for teams that are winning, there are fewer jump shots and **more dunkin' action** (nearly double the dunks!). However, the accuracy chart illustrates an issue:

{{< figure src="ncaa_types_perc_success_type_score.png" theme="light" >}}

Accuracy for most types of shots is much better for teams that are winning...which may be the _reason_ they're winning. More research can be done in this area.

## Conclusion

I fully admit I am not a basketball expert. But playing around with this data was a fun way to get a new perspective on how collegiate basketball games work. There's a lot more work that can be done with big basketball data and game strategy; the NCAA-provided data doesn't have location data, but it does have **6x more shots**, which will be very helpful for further fun in this area.

---

_You can view the R code, ggplot2 code, and BigQueries used to create the data visualizations in [this R Notebook](http://minimaxir.com/notebooks/basketball-shots/). You can also view the images/code used for this post in [this GitHub repository](https://github.com/minimaxir/ncaa-basketball)_.

_You are free to use the data visualizations from this article however you wish, but it would be greatly appreciated if proper attribution is given to this article and/or myself!_

_Special thanks to Ewen Gallic for his implementation of a [basketball court in ggplot2](http://egallic.fr/en/drawing-a-basketball-court-with-r/), which saved me a lot of time!_
