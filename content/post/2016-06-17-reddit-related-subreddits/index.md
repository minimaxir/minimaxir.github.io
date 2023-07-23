---
title: "Methods for Finding Related Reddit Subreddits with Simple Set Theory"
date: 2016-06-20T08:20:00-07:00
slug: reddit-related-subreddits
categories: [Data Science, Big Data]
tags: [R, ggplot2, Reddit]
summary: "Fancy machine learning approaches may not be required to help Redditors discover new things."
cover:
  image: featured.png
  relative: true
  hidden: true
---

I recently [wrote a post](http://minimaxir.com/2016/05/reddit-graph/) on how to visualize [network graphs](https://en.wikipedia.org/wiki/Graph_theory) of [Reddit](https://www.reddit.com) subreddits.

One of the reasons I've been researching the topic is to find a good way to facilitate discovery of lesser-known subreddits, as Reddit is doing a terrible job at it (although they have been trying a [few new experiments](https://www.reddit.com/r/changelog/comments/4o4qjh/more_small_tests_to_improve_user_experience_live/d49leyu?context=2) _very recently_). As it turns out, invoking graph theory is overkill. Even fancy machine learning approaches like [collaborative filtering](https://en.wikipedia.org/wiki/Collaborative_filtering), while powerful, may not be required to help Redditors discover new things.

## Finding Related Subreddits

Let's say we have two sets: Set _A_, where _A_ represents the number of active users in a given subreddit, and set _B_, where _B_ is the set of active users in a subreddit. The intersection of Sets _A_ and _B_ (A ∩ B) represents users who are active in _both_ subreddits.

Using [BigQuery](https://cloud.google.com/bigquery/), I can get the comment data from **ALL** public Reddit subreddits, as otherwise this technique would not work well using any smaller subset. The network graph edgelist conveniently gives (A ∩ B), obtained [as described in my previous post](http://minimaxir.com/2016/05/reddit-graph/), which calculates the number of active users for all pairs of subreddits (defining "active users" as users who have made a comment in at least 5 unique threads in a given subreddit within the past 6 months).

{{< figure src="active-edge.png" theme="light" >}}

In this case, we can filter the edgelist to only allow intersections where there are at least 10 active users; this prevents including dead and personal subreddits.

We can run another similar query to get the number of active users for each subreddit.

{{< figure src="active-users.png" theme="light" >}}

After that, for a given subreddit _A_, find:

(A ∩ B) / (B)

for all subreddits _B_ where (A ∩ B) > 0 (i.e. only neighbors of _A_). This computation takes less than a second. Additionally, the output is always a percentage between 0% and 100%. For the visualizations, we plot the Top 15 subreddits with the highest overlap of the specified subreddit _A_ (and color the bars with a nice [viridis palette](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html) to provide another easy way to perceive relative magnitude of relatedness).

The methodology may sound arbitrary, but the results are very interesting. Here's a chart of the top related subreddits for [/r/aww](https://www.reddit.com/r/aww), one of the most popular places on the internet for cat pictures.

{{< figure src="aww-related.png" theme="light" >}}

I have honestly _never_ heard of any of these subreddits before. But yet, by analyzing public user activity alone, I found a few new places to get more cute pics.

This methodology is excellent for finding subreddit-specific subsubreddits which may not be documented. The related subreddits for [/r/buildapc](https://www.reddit.com/r/buildapc) offer more places to get PC building advice.

{{< figure src="buildapc-related.png" theme="light" >}}

Related subreddits for sport-specific subreddits, like [/r/cfb](https://www.reddit.com/r/cfb) (college football) include the corresponding teams.

{{< figure src="cfb-related.png" theme="light" >}}

[/r/food](https://www.reddit.com/r/food) related subreddits list a surprising number of subreddits dedicated to specific foods.

{{< figure src="food-related.png" theme="light" >}}

There is a surprising amount of depth to the [/r/me_irl](https://www.reddit.com/r/me_irl) network.

{{< figure src="me_irl-related.png" theme="light" >}}

The chart for [/r/programming](https://www.reddit.com/r/programming) can tell you which subreddits exist for specific programming languages and technologies.

{{< figure src="programming-related.png" theme="light" >}}

The methodology can also reveal a _lack_ of related subreddits, by the large contrast between subreddits with high relatedness and low relatedness. For example, while /r/cfb may have large numbers of obviously-related subreddits as a sports subreddit, [/r/golf](https://www.reddit.com/r/golf) has only 2.

{{< figure src="golf-related.png" theme="light" >}}

You can view Related Subreddit charts for the Top 200 Subreddits [in this GitHub repository](https://github.com/minimaxir/subreddit-related/tree/master/related).

## Finding Similar Subreddits

Another method for finding related subreddits would be to find subreddits with similar communities. An academic approach to finding similarity between sets is the [Jaccard Index](https://en.wikipedia.org/wiki/Jaccard_index). Using the same set A and set B definitions above, the formula now becomes:

(A ∩ B) / [(A) + (B) - (A ∩ B)]

which outputs the Jaccard Index, between 0 and 1. This formula only requires a few tweaks to the original code. The results from this computation tell a different story.

Here are the most-similar subreddits to /r/aww:

{{< figure src="aww-jaccard-nondefault.png" theme="light" >}}

In this implementation, the [default Reddit subreddits](https://www.reddit.com/r/defaults/comments/4l3svc/list_of_default_subreddits_usa_26_may_2016/) must be removed from the results, as the communities of default subreddits are largely similar to most others by design. Even former defaults like [/r/adviceanimals](https://www.reddit.com/r/adviceanimals) and [/r/technology](https://www.reddit.com/r/technology) still have large amounts of holdout users which skew the results. As [/r/aww](https://www.reddit.com/r/aww) is a mass-appeal subreddit, it makes sense that the communities are similar to other mass-appeal subreddits.

The magnitude of the Jaccard Index measures the strength of the similarity. Most subreddit relationships have a low Jaccard Index, but the relative magnitude between all subreddit neighbors illustrate comparisons for potential related subreddits regardless (this is also the reason why the x-axis is not fixed across plots). The subreddit relationship with the highest absolute similarity is [/r/arrow](https://www.reddit.com/r/arrow) and [/r/flashtv](https://www.reddit.com/r/flashtv) at 0.345, which make sense given the massive overlap between the two CW television shows.

{{< figure src="arrow-jaccard-nondefault.png" theme="light" >}}

The Jaccard Index is more useful for finding similar subreddits to niche subreddits. Let's try a few of the subreddits mentioned previously and see how the results changed.

/r/buildapc is a niche, and the output identifies well-established subreddits, unlike with the previous related-subreddit methodology.

{{< figure src="buildapc-jaccard-nondefault.png" theme="light" >}}

The subreddit most similar to /r/cfb (college football) is [/r/collegebasketball](https://www.reddit.com/r/collegebasketball)!

{{< figure src="cfb-jaccard-nondefault.png" theme="light" >}}

The subreddit most similar to /r/food is [/r/cooking](https://www.reddit.com/r/cooking)!

{{< figure src="food-jaccard-nondefault.png" theme="light" >}}

The subreddit most similar to /r/programming is [/r/linux](https://www.reddit.com/r/linux)! (of course)

{{< figure src="programming-jaccard-nondefault.png" theme="light" >}}

You can view the Similar Subreddit charts for the Top 200 Subreddits [in this GitHub repository](https://github.com/minimaxir/subreddit-related/tree/master/similar).

Again, Reddit has significantly better internal data for identifying user activity between subreddits, such as voting patterns and clickthrough tracking. But the results shown using these two set methodologies are pretty good for using public data. In fact, these two set approaches can theoretically work with _any_ set of categorized, settable data, which may give me a few ideas for new blog posts in the future.

And there's still the fancy machine learning approaches to try.

---

_As always, the full code used to process the comment data and generate the visualizations is available in [this Jupyter notebook](https://github.com/minimaxir/subreddit-related/blob/master/find_related_subreddits.ipynb), open-sourced [on GitHub](https://github.com/minimaxir/subreddit-related)._

_If you do find any other interesting trends in the related/similar charts of other subreddits and write about it, it would be greatly appreciated if proper attribution is given back to this post and/or myself. Thanks!_
