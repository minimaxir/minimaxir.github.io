---
title: "Quantifying the Clickbait and Linkbait in BuzzFeed Article Titles"
date: 2015-01-15T08:30:00-07:00
slug: linkbait
comments: true
categories: [Data Science, Comedy]
tags: [R, ggplot2, BuzzFeed]
summary: "You probably do not know that the 3 most interesting things I found will blow your mind."
cover:
  image: featured.png
  relative: true
  hidden: true
---

_**UPDATE**: I became a data scientist at BuzzFeed in August 2017. My thoughts about BF have changed significantly in the years since this was published in 2015!_

[BuzzFeed](http://www.buzzfeed.com/) is one of the most significant sources of journalistic content on the entire internet. Of course, that depends on your definition of "journalistic": BuzzFeed is one of the first organizations to leverage both social media and the power of language as an editorial business model.

{{< figure src="buzzfeed_fb.png" theme="light" >}}

BuzzFeed has popularized the use of the "listicle" as [seen above](http://www.buzzfeed.com/lyapalater/group-projects-should-be-wiped-off-the-face-o): a bulleted list of text blurbs and/or photos that fits the length and depth of a normal blog article. Additionally, BuzzFeed was one of the first news sources to use non-neutral headlines that deliberately invoke a reaction in the reader which then subsequently tempts them to click on the article in an attempt to promote virality. These "[clickbait](http://en.wikipedia.org/wiki/Clickbait)" and "[linkbait](http://mashable.com/2013/07/12/linkbait-content-marketing/)" techniques have been responsible for BuzzFeed receiving [$50 million in venture capital](http://www.nytimes.com/2014/08/11/technology/a-move-to-go-beyond-lists-for-content-at-buzzfeed.html), and has spawned entire startups and job positions designed solely to emulate BuzzFeed's success.

I decided to determine which phrases in BuzzFeed headlines are the most successful in order to see if it's possible to reverse-engineer BuzzFeed's business model. Therefore, I scraped BuzzFeed's website ([after initial frustration](http://minimaxir.com/2014/09/buzzscrape/)) and obtained 60,378 distinct articles and the corresponding number of Facebook Shares for each article. From there, I decomposed each headline into its [component n-grams](http://en.wikipedia.org/wiki/N-gram), allowing me to perform quantitative analysis for each possible permutation of words in the article titles. You probably don't know that the 3 most interesting things I found will blow your mind.

## The Rise of the Listicle

{{< figure src="buzzfeed_listicle.png" theme="light" >}}

Listicles almost always begin with a numeral as the first or second word. Out of the 60,378 articles I obtained, 26% of them (15,656 articles) are listicles. BuzzFeed clearly believes they are successful, as the proportion of listicles to normal articles has increased over the years.

{{< figure src="buzzfeed-listicle-proportions.png" theme="light" >}}

Listicles can be of any size. The distibution of listicle sizes is centered at the median of 19 entries.

{{< figure src="buzzfeed-listicle-histogram.png" theme="light" >}}

Surprisingly, there is a positive correlation between listicle size and the number of Facebook shares it receives: A 30-size listicle receives many-multiples of shares more than 10-size listicles. (note the logarithmic scale for FB Shares)

{{< figure src="buzzfeed-listicle-scatterplot.png" theme="light" >}}

BuzzFeed has many different types of listicles to appeal to a wide crowd, including _[X] reasons_, _[X] books_, _[X] movies_, etc, where _[X]_ is any 1 or 2-digit numeral. However, BuzzFeed's go-to listicle phrase has changed over the years. Here are the most-used listicle phrases for each month since 2012:

<iframe style="width: 100%; max-width: 450px; height: 300px" src="https://docs.google.com/spreadsheets/d/1U9SWJsmepYdb6YjWCFzM0gsuuDC5PBeFJZkTmJ568fs/pubhtml?gid=1424838564&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

In 2012 and 2013, BuzzFeed's listicles began with _the [X]_; in 2014, BuzzFeed's most-used listicles began with _[X] things_. The "the" is technically redundant; perhaps BuzzFeed decided to make the listicle schema cleaner and _less_ formal. It may be possible that _[X] things_ performs better on average than _the [X]_.

Which types of listicles are the most successful on Facebook? Which types of listicles receive the most amount of Facebook shares?

Here's a chart of of the Top 30 types of listicles by the number of Facebook shares those articles have received on average (with a minimum of 50 articles of that listicle type):

{{< figure src="buzzfeed-shares-listicles.png" theme="light" >}}

A few notes on the chart: the gray bars on each average bar represent a **95% confidence interval** for the true value of each average, where the confidence interval is obtained through 10,000 iterations of [bootstrap resampling](http://en.wikipedia.org/wiki/Bootstrapping_%28statistics%29). The dashed vertical line represents the **population average** of all distinct BuzzFeed articles, at 6,657 Facebook shares, and helps visualize the relative impact of having these words in the title compared to a normal BuzzFeed article.

The most-posted listicle types mentioned above are _not_ the types of listicles are most shared, however _[X] things_ does indeed perform slightly better than _the [X]_ on average. Emotional words, such as _insanely_, _awesome_, and _probably_, which you would never see in a more serious journalistic publication, are some of the key drivers of shares.

Let's look into these keywords more to see if there are any other trends.

## Key Keywords

{{< figure src="buzzfeed_1gram.jpg" theme="light" >}}

Specific keywords may be more informative. Here's the most popular keywords over time, ignoring common [stop words](http://en.wikipedia.org/wiki/Stop_words) and listicle words:

<iframe style="width: 100%; max-width: 450px; height: 300px" src="https://docs.google.com/spreadsheets/d/1U9SWJsmepYdb6YjWCFzM0gsuuDC5PBeFJZkTmJ568fs/pubhtml?gid=1106341985&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

Like most journalistic news sources, BuzzFeed tends to write more frequently toward then-current events. 2012 for example had many articles about the 2012 election, while April 2013 consisted of many articles about the Boston Marathon bombings.

Which keywords encouraged the most Facebook shares on average?

{{< figure src="buzzfeed-shares-1gram.png" theme="light" >}}

There's a more uncertainty in the accuracy of the average on keywords, especially with the #1 word, _career_. There's a strong focus on nostalgia, with _toys_, _childhood_, and _80s_. Certain brands (_potter_ and _disney_) fit the nostalgia too.

High words with a relatively small confidence interval and _which_ and _character_. These are likely caused by [BuzzFeed's quizzes](http://www.buzzfeed.com/quizzes), which have been incredibly popular. Analyzing full phrases is necessary to get a bigger picture.

## 3-Word Phrases

{{< figure src="buzzfeed_3gram.png" theme="light" >}}

After careful analysis, I found that 3-word phrases (trigrams) provided more helpful information than phrases of other lengths. Over time, there are similarities with the popular phrases; they both relate to then-current event and occasionally contain listicles.

<iframe style="width: 100%; max-width: 450px; height: 300px" src="https://docs.google.com/spreadsheets/d/1U9SWJsmepYdb6YjWCFzM0gsuuDC5PBeFJZkTmJ568fs/pubhtml?gid=249061324&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

The average shares of articles based on phrases in their titles, however, tell the full story.

{{< figure src="buzzfeed-shares-3gram-v2.png" theme="light" >}}

Now we can clearly see some the infamous phrases traditionally associated with clickbait.

Indeed, _character are you_, a frequent phrase in quizzes, is what leads to the most virality. (It's worth nothing that these perform 3-4 times better than the best listicles on average). Likewise, you may notice a few phrases are redundant and subset of a bigger phrase (e.g. _things you probably_, _you probably don't_, _probably don't know_), but since the averages FB shares aren't identical, it's not a perfect subset, and therefore the average is relevant. There's also a frequent appeal to _you_, the reader, with _you/your/you're_ appearing in about half of the top phrases.

Does clickbait work? Of course it does. Granted, there has been a lot of disenchantment with the rise of clickbait; that's why the parody Twitter account [@SavedYouAClick](https://twitter.com/SavedYouAClick) was created and hit 182K followers in months. It's also the reason why [Facebook will now be punishing clickbait](http://newsroom.fb.com/news/2014/08/news-feed-fyi-click-baiting/) and making them less public in a user's news feed, which will definitely hurt BuzzFeed. That's likely one of the reasons why they are pivoting to quizzes and video content instead.

I don't expect clickbait to disappear anytime soon; it's easy and provides a good return-on-investment, both of which are important to scrappy websites trying to market on social media. Or things could come full-circle and [BuzzFeed could publish clickbait about making the best clickbait](http://www.buzzfeed.com/tomphillips/photos-that-prove-game-of-thrones-happened-in-real-life).

---

_You can view and download all the BuzzFeed article data and metadata [in this Google Sheet](https://docs.google.com/spreadsheets/d/1WSx45rT4jZfysmZfzJtjaPO7AxW4XMaJYaCUd5HB2ns/edit?usp=sharing)._

_All graphics were generated using [R](http://www.r-project.org/). The charts were created using [ggplot2](http://ggplot2.org/) and the word clouds were created using the [wordcloud](http://cran.r-project.org/web/packages/wordcloud/index.html) package._
