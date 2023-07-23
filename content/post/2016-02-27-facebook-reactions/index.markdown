---
title: "Facebook Reactions and the Problems With Quantifying Likes Differently"
date: 2016-02-29T08:00:00-07:00
slug: facebook-reactions
categories: [Data Science, Thought Piece]
tags: [R, ggplot2]
summary: "Apparently, there is little statistical relationship between things that are cute and things that make you go YAAASS."
cover:
  image: featured.png
  relative: true
  hidden: true
---

Facebook added [Facebook Reactions](http://newsroom.fb.com/news/2016/02/reactions-now-available-globally/), allowing users to do more than just "Like" posts and statuses as they have done for the past decade. Likes were the universal symbol of approval on social media. Now, Facebook users can apply more granular responses, from positive emotions like **Love**, to negative emotions such as **Angry**. This was widely believed to be Facebook's compromise instead of adding a Dislike button.

{{< figure src="facebook_react.png" >}}

Of course, there's an ulterior motive. The use of reactions provides organic data on the sentiment of a status, which is helpful for numerous marketing and statistical applications. As [BuzzFeed notes](http://www.buzzfeed.com/alexkantrowitz/facebook-reactions-launch-today), Facebook ads may be able "to write one product message for someone who mostly uses **Sad** and another who mostly uses **Wow** or **Love.**"

However, this isn't the first time a big social network has tried implementing reactions alongside Likes/Dislikes. Four years ago, YouTube added [Reaction buttons](http://googlesystem.blogspot.com/2011/06/youtube-reactions.html) to their comments section:

{{< figure src="youtube-reactions.png" >}}

...and removed them sometime after without fanfare, replacing it with the simple Like/Dislike bar.

Presumably, YouTube implemented the buttons for the similar reason as Facebook. What makes things different now, if anything?

## A Quantitative Approach to Feeling

Even after YouTube's failure, another data-driven website implemented reaction buttons: BuzzFeed (who else?). At the end of each article (in most categories), registered users can select a quirky reaction to indicate how they felt about the article.

{{< figure src="buzzfeedreactions.png" >}}

The heart represents **Love** internally and is by-far the most-used reaction on BuzzFeed posts. When I started scraping BuzzFeed data in 2014 [to analyze clickbait](http://minimaxir.com/2015/01/linkbait/), I made sure to grab the reaction data of other reactions as well to see if there are any interesting trends or correlations between reactions. A cursory glance at the scraped reaction data revealed a problem that forced me to disregard it.

An important part of variable selection for analysis and modeling is avoiding _redundant_ features, as that can cause issues such as [multicollinearity](https://en.wikipedia.org/wiki/Multicollinearity) and [overfitting](https://en.wikipedia.org/wiki/Overfitting). For Facebook, avoiding adding redundant Reactions was an [explicit design goal](https://medium.com/facebook-design/reactions-not-everything-in-life-is-likable-5c403de72a3f) of the feature, but the positive emotions such as **Like** and **Wow** might be overly similar regardless (I believe it fair to compare the behavior of BuzzFeed users with the average Facebook user, given that they hit the same demographics). Do BuzzFeed readers use specific positive reactions differently? Did they use specific negative reactions?

I rechecked my 2014 data in light of Facebook Reactions. The scraped dataset contains reaction data from 9,883 BuzzFeed articles in the Celebrity, Animals, Books, Longform, and Business categories. From that, I made a [pairs plot](http://vita.had.co.nz/papers/gpp.pdf) for the counts of all the _positive_ reactions on the articles to illustrate all bivariate relationships:

- The lower half of the pairs plot is a scatterplot for the two reactions; the axes represent the number of votes for a given reaction on a BuzzFeed article (both axes are scaled logarithmically), color intensity indicates the number of articles at that X/Y combo, and the line is a linear trendline of least-squares.
- The diagonal of the pairs plot represents the density distribution of reaction vote counts for that reaction. (also logarithmically scaled on the X axis)
- The upper half of the pairs plot illustrates the Pearson correlation between the non-log quantities of the two reaction variables. The stars represent statistical significance of the correlation test; since the data set is large, all correlations are statistically significant (rejection of null hypothesis of no correlation) at p < 0.001.

{{< figure src="buzzfeed-pos.png" theme="light" >}}

All of the bivariate correlations of positive reactions are _moderately or strongly positively correlated_, which is problematic for analysis (except one: apparently, there is little statistical relationship between things that are cute and things that make you go YAAASS). So why not just use the **Love** reaction, since articles tend to get about 100 Loves, while other reactions get around 10?

Does the same hold for negative reactions? Relatedly, we would also expect a negative correlation between the number of **Love** reactions and negative reactions, right?

{{< figure src="buzzfeed-neg.png" theme="light" >}}

All negative reactions are positively correlated, as expected, but there is a weak _positive_ correlation between **Love** and **Hate**, which is definitely not right. There isn't an ideal "negative" reaction, since all have similar distributions.

Why does Facebook have 6 different responses to gauge positivity or negativity when one reaction for each would be both more accurate and more intuitive for the user?

## Conceal, Don't Feel

There are other qualitative issues with Facebook's current implementation of Reactions. Apparently, Likes and Reactions are treated _differently internally_. As a result, you get separate notifications for Likes and Reactions.

{{< figure src="facebook_react2.png" >}}

Why? No idea. There is enough Notification spam on Facebook, I don't need _double notifications_ in my Notification feed for every status I make.

What's important to note is that a user cannot both Like and React to a status; only one or the other. As a result, the number of Likes on statuses overall will drop, and this is a _major_ problem for businesses who are dependent on measuring the number of Likes for engagement.

I took a look at the Facebook Graph API endpoint for [Facebook Page Posts](https://developers.facebook.com/docs/graph-api/reference/v2.5/post) (same endpoint I use for my [Facebook Page Data Scraper](https://github.com/minimaxir/facebook-page-post-scraper)), and I can confirm that the API can only report the number of Likes on a status; not the number of Likes + Reactions, or number of Likes + number of each Reaction.

{{< figure src="cnn_fb.jpg" >}}

There is no way currently to automate the retrieval of Reactions data from Facebook posts, which is an unfortunate oversight (especially considering how Twitter [handled the transition](https://blog.twitter.com/2015/hearts-for-developers) from Favorites to Likes easily).

The example [CNN story](https://www.facebook.com/cnn/posts/10154506885211509) I used for that screenshot is anecdotally one of the very few examples I've noticed where the number of Likes is _almost equal_ to negative emotions, a relationship which should be weakly correlated and therefore this knowledge may be useful to isolate the story as unusual (and serve ads accordingly). At Facebook's immense scale, identifying a relatively small proportion of unusual stories might be enough to justify adding Reactions.

Or maybe this feature is just the harbinger of a new generation of emotionally-charged linkbait. Perhaps there is more to this Facebook Reactions data than what meets the eye, and I'll update my scripts and do further statistical analysis when able. But given what has happened with Reactions data before with YouTube, I am unconvinced and I still believe the functionality as a whole is a usability regression that won't last.

A Dislike button would have been better, just saying.

---

_You can view the code and data used to generate the BuzzFeed Reaction data visualizations [in this Jupyter notebook](https://github.com/minimaxir/facebook-reactions/blob/master/buzzfeed_reactions.ipynb), [open-sourced on GitHub](https://github.com/minimaxir/facebook-reactions), or you can [view as a PDF](https://github.com/minimaxir/facebook-reactions/raw/master/reactions_pdf.pdf), which is better if you are on a mobile device._
