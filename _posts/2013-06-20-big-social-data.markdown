---
layout: post
title: "Predicting the Number of Likes on a Facebook Status With Statistical Keyword Analysis"
date: 2013-06-22 10:00
comments: true
categories: [Facebook, Data]
summary: "The language used in a Facebook Status *does* help predict the number of Likes a status receives, and actually could help brands learn much more about their fans."
image: cnn_Wordcloud.png
---

What makes people click the Like button on Facebook Statuses? Does the status say something funny? Does it contain a cool link or a funny photo? Does the status actively engage its readers?

Needless to say, brands on Facebook want to know the answers to these questions. The more people that Like their statuses on their Facebook Pages, the more exposure they gain, and the more money they earn. Many, many companies have been created for the sole purpose of maximizing the number of Facebook Likes.

By 2013, most brands have realized that photo posts and statuses that ask a question [will generate *much* higher numbers](http://minimaxir.com/2012/10/questions-equals-reponses/) of Likes. Personally, that's not why *I* like a given Facebook status: I Like statuses that contain new and exciting things that are relevant to my interests. The first thing I read in a status is the Message: if the message is boring and uninteresting, then there's no reason for me to Like the status needlessly.

Can the keywords and language in a Facebook Status predict the number of Likes the status receives?

Running multivariate regressions on keywords from thousands of Facebook statuses, I've discovered that the language used in a status *does* help predict the number of Likes a status receives, and actually could help brands learn much more about their fans.

<!-- more -->

# Setup #

{% img /img/rdataset.png %}

In order to draw accurate conclusions from the analysis, large amounts of data are needed (and there's no such thing as too much data).

I decided to analyze the Facebook Pages of 3 extremely popular News sources: [CNN](https://www.facebook.com/cnn), the [New York Times](https://www.facebook.com/nytimes), and [BBC World News](https://www.facebook.com/bbcworldnews). All three Pages have millions of fans, post the same types of Facebook statuses, and post statuses extremely frequently to Facebook (around 8-9 times a day). The statuses analyzed will be from June 1st 2012 to June 1st 2013, in order to both gather a large sample size (~3,000  statuses from each Page) and a ensure a consistent apples-to-apples comparison between the three sources. 

The raw data, code, and a detailed technical explanation of the statistical techniques used to process the data can be found in [this GitHub repository](https://github.com/minimaxir/facebook-keyword-regression-analysis). (tl;dr, it's an optimized [least squares](http://en.wikipedia.org/wiki/Least_squares) regression)

*Can the keywords and language in a Facebook Status predict the number of Likes the status receives?* We're ready to test this hypothesis.


----------

# CNN #

{% img pull-right hidden-tablet /img/cnn_Wordcloud.png %}



    				+Likes			P-Val
    Bourdain		1962.98			0
    NEWS			1272.64			0
    Photo			1154.6			0
    Barack			1002.45			0
    City			851.82			0
    Monday			705.42			0
    Obama			632.2			0
    United			578.77			0
    Mitt			562.29			0.01
    South			508.43			0.03
    America			505.83			0.01
    Watch			470.51			0
    Boston			398.13			0.05
    New				326.74			0.03
    ET				-433.96			0
    North			-467.05			0.02
    Check			-503.5			0
    Travel			-988.99			0.02


## Analysis ##

- The most impactful keywords for CNN are political keywords.
- **NEWS** ("BREAKING NEWS") predicts more Likes than **Photo** (i.e. [Travel Photo of the Day](http://www.facebook.com/5550296508/posts/10151626042186509)).
- **Bourdain** refers to Anthony Bourdain, who very recently began [a food and travel show](http://en.wikipedia.org/wiki/Anthony_Bourdain:_Parts_Unknown) on CNN. I assume that targets CNN's primary demographic.
- The presence of **Barack** (Barack Obama) predicts more likes than just **Obama**.
- The presence of **Monday** predicts more likes most other keywords. Garfield would be disappointed.
- The presence of **North** (North Korea) predicts a *decrease* in Likes from the average. Is North Korea boring?
- The presence of **Check** ("Check this out!") also predicts a decrease in Likes from the average. This is interesting because this call-to-action is usually associated with the other keywords. Perhaps it's not necessary?


----------

# NYTimes #

{% img pull-right hidden-tablet /img/nytimes_Wordcloud.png %}

    				+Likes			P-Val
    Mills			1022.9			0
    Democratic		496.32			0
    Krugman			456.31			0
    Senate			431.05			0
    London			373.67			0.01
    Oscar			367.64			0.01
    Sandy			364.61			0
    Olympics		339.15			0.01
    Sunday			317				0
    Clinton			314.64			0.02
    You				247.07			0
    Obama			237.98			0
    Opinion			221				0
    Michael			204.2			0.03
    Credit			191.92			0.05
    Tuesday			187.22			0.03
    Times			178.69			0
    See				160.12			0.01
    Romney			157.66			0.04
    Ed				140.86			0.01
    Read			-101.23			0.05
    Here			-182.72			0.04
    Facebook		-187.75			0.02
    Are				-216.3			0.01
    While			-293.77			0.04
    Quotation		-322.29			0.02
    House			-362.1			0.01
    Thanksgiving	-369.88			0.05
    Convention		-448.34			0.01
    Jersey			-505.98			0

## Analysis ##

- The most impactful keywords for NYTimes are political keywords and current events, such as Hurricane **Sandy** and the **London** **Olympics**.
- **Mills** refers to Doug Mills, [photographer](http://www.facebook.com/5281959998/posts/10150252479219999) for the New York Times. The power of photos!
- **You** and **See** are impactful call-to-action keywords, even though they don't ask any questions. (Interestingly, **Are**, which implicitly asks a question, predicts a decrease in Likes. Maybe people don't Like questions?)
- **Clinton** has a bigger impact than **Obama**.
- No one likes **Jersey**.


----------

# BBC World News #

{% img pull-right hidden-tablet /img/bbcworldnews_Wordcloud.png %}

    
    				+Likes			P-Val
    Malala			488.1			0
    Japan			186.32			0
    Britain			167.25			0.01
    That			155.01			0.01
    AFP				154.97			0.02
    Travel			153.41			0
    Now				148.39			0.02
    Would			146.45			0.03
    Delhi			137.85			0.04
    Let				134.93			0.03
    Future			127.49			0.02
    Barack			125.79			0.02
    An				122.18			0.03
    David			111.78			0.04
    Do				111.13			0
    Israel			101.31			0.04
    Impact			87.94			0.05
    South			78.62			0.03
    It				62.7			0.01
    The				55.7			0
    US				-47.84			0.02
    On				-86.22			0.04
    BBC				-103.58			0
    Sunday			-117.01			0.03
    After			-122.38			0.05
    Thursday		-143.91			0.03
    Twitter			-144.55			0
    City			-147.16			0.02
    Hi				-149.85			0.03
    BBCNewsUS		-150.48			0.03
    House			-176.86			0.01
    California		-187.57			0

## Analysis ##

- The most impactful keywords for BBC World News are keywords describing news around the world. Unlike CNN and NYTimes, there are very few impactful keywords related to domestic politics (such as Prime Minister **David** Cameron, and even **Barack** is more impactful than him.)
- **Malala** refers to [Malala Youdsfzai](http://en.wikipedia.org/wiki/Malala_Yousafzai), a Pakistani activist who survived an assassination attempt.
- Implicit question keywords such as **Let**, **Do**, and **Would** are all very effective.
- The simple salutation of **Hi** predicts a decrease in Likes. There's a British joke here somewhere.


----------

The language used in Facebook Statuses can be very useful in identifying what words Fans like, and what words will be most useful in generating the most exposure. While my analysis can't predict the *exact* number of Likes a Status receives, and I likely [broke a few rules of statistics](http://xkcd.com/882/) in the process of making this post, the impact of language and specific keywords on social media interaction is an endeavor worth pursuing.