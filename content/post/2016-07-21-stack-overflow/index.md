---
title: "Visualizing How Developers Rate Their Own Programming Skills"
date: 2016-07-21T06:30:00-07:00
slug: stack-overflow
categories: [Data Science]
tags: [R, ggplot2, Stack Overflow]
comments: true
summary: "As it turns out, there is no correlation between programming ability and the frequency of Stack Overflow visits."
cover:
  image: featured.png
  relative: true
  hidden: true
---

[Stack Overflow](http://stackoverflow.com), the favorite destination for software developers when something breaks for no apparent reason, recently released their [2016 Stack Overflow Survey Results](http://stackoverflow.com/research/developer-survey-2016) with responses to the questions of "where they work, what they build, and who they are." You can download the released dataset containing all 56,030 cleaned responses [here](http://stackoverflow.com/research).

One variable present in the dataset but surprisingly unaddressed in the official Stack Overflow analysis is the `programming_ability` field — _On a scale of 1-10, how would you rate your programming ability?_

I took a look at the 46,982 users who identified their programming ability in the survey. On average, developers rate themselves 7.09 / 10. And like most 1-10 rating scales, the distribution of self-assessments is unimodal around 7 and 8, with relatively rare 9's and 10's.

{{< figure src="so-programming-0.png" theme="light" >}}

We can aggregate the programming ability data by other relevant metrics in the Stack Overflow dataset, such as experience and commit activity, and hopefully find interesting trends.

## Sanity Checking

I normally dislike working with survey data since there is a high possibility of [selection bias](https://en.wikipedia.org/wiki/Selection_bias) among the respondents. In Stack Overflow's case, their marketing of the survey on Facebook and Twitter may cause a high proportion of social-media savvy respondents and discount the insight of developers who are not likely to use those services. For this reason, I will show [confidence intervals](https://en.wikipedia.org/wiki/Confidence_interval) whenever possible to reflect the proportionate uncertainty for groupings with insufficient data, and to also account for possibility that a minority of respondents may be dishonest and nudge their programming ability a few points higher than the truth.

Let's compare programming skill to the developer's experience in the field. In the survey, the user could classify their IT / programming experience as a range, from "Less than 1 year", "1 - 2 years", "2 - 5 years", "6 - 10 years", and "11+ years." Since we would expect a positive correlation between skill and experience, identifying such a positive correlation visually gives a quick indication that the analysis is on the right track.

We can plot the average programming-ability rating for developers which fall into each of those five groups, and a confidence interval for that average. Additionally, we can make a [violin plot](https://en.wikipedia.org/wiki/Violin_plot) of each group to give a sense of the underlying distribution of ratings.

Putting it all together:

{{< figure src="so-programming-5.png" theme="light" >}}

The color dot for each group represents the average rating from the sample which the developers in the group give to themselves. The black error bars on the dot represent a 95% confidence interval for the true value of the average, obtained via [percentile bootstrap](http://minimaxir.com/2015/09/bootstrap-resample/) with 10,000 resamples of the dataset with replacement (since there is a large amount of source data, the confidence intervals end up being very narrow in most cases; this is one legitimate advantage of big data).

The violin plot for each group represents the normalized overall distribution of ratings. The narrowness of the per-value ratings reflect the amount of data available for that group: the more data available, the more narrow/precise the kernel smoothing is. Overall flat plots represent a wide selection of self-ratings, while an overall narrow plot represents a more-constrained selection (for the plot above, you can easily see the distribution shift to the right as the experience range increases).

Also, keep in mind that these groupings alone do not imply a **causal relationship** between the two variables. Employing traditional [regression analysis](https://en.wikipedia.org/wiki/Regression_analysis) to build a model for predicting programming ability would be tricky: does having more experience cause programming skill to improve, or does having strong innate technical skill cause developers to remain in the industry and grow?

Back to the plot at hand. We can easily confirm that a positive correlation exists between programming activity and experience, with newbie developers rating their skills 5.02 / 10 on average, and extremely experienced developers rating their skills three whole ranks higher at 8.13 / 10. What's also notable is the range of values selected: for developers with **less than 1 years** of experience, the distribution is almost completely flat between 1-7, showing that they are more honest with the self-assessment of their programming skills. Inversely, developers with **11+ years** of experience select 9 and 10 ratings almost as much as 7 and 8 ratings.

It's a good start. We can also compare developer skill to their age, which by construction (older developers have more experience) should have parallel behavior to experience levels.

{{< figure src="so-programming-4.png" theme="light" >}}

Yes, the plot is indeed similar, with average ratings ranging from 6 to about 8. What's interesting is the behavior for **> 60** vs. **50-59** is that the > 60 age programmers occasionally rate their skills at the low end of the scale, which is why the confidence interval is larger and the average is lower for that group.

Lastly, we can look at the salary the developer is paid (in USD) as a validation of skill. This particular chart will only focus on developers in the United States (n = 13,539), so that the salary follows expected behavior with the specified currency and cost-of-living. In this case, there are many more groups, but that makes the distribution shift more apparent, and more interesting.

{{< figure src="so-programming-6.png" theme="light" >}}

The large amount of >$100k earners in the dataset shows how the Stack Overflow demographic can skew toward Silicon Valley engineers. The $90k—$100k group serves as a convenient inflection point on how the distribution of self-ratings becomes a [Four Point Scale](http://tvtropes.org/pmwiki/pmwiki.php/Main/FourPointScale) between 7 and 10 for those who earn more than $100k.

## Do better developers rate themselves better?

So far, the data is internally consistent. There are a few other developer-relevant statistics are available in the dataset which can easily be aggregated. A good one is the _type_ of employment. For example, do **freelance / contract** developers believe they are better programmers than **full-time** developers?

{{< figure src="so-programming-7.png" theme="light" >}}

As it turns out, that guess is indeed the case, albeit it's only a slight difference (7.53 / 10 for **freelance / contract** vs. 7.29 / 10 for **full-time**).

What about repository commit activity by developers? Are developers who commit more better? One could argue that a developer who commits code often is either vigilant with accounting for functional code changes, or polluting the codebase in an attempt to show productivity.

{{< figure src="so-programming-8.png" theme="light" >}}

Yes, developers who commit lots of code rate themselves better.

Lastly, let's remember that the source of data is Stack Overflow. Are developers who use Stack Overflow as a resource better developers who know how to properly use external references in times of crisis, or are they developers who use it as a crutch to compensate for weak coding skills?

{{< figure src="so-programming-9.png" theme="light" >}}

As it turns out, there is **no correlation between programming ability and and the frequency of Stack Overflow visits**, as the averages and distributions are virtually identical across all groups.

There are many, many other answers available in the dataset; some allow multiple responses and are harder to parse, while others have zero correlation with programming ability as with the Stack Overflow visits, and therefore do not provide much additional insight. Although we cannot establish causal relationships with this methodology, there may be other important insights obtainable from aggregating programming ability data, but the charts presented in this post are a good start.

---

_As always, the full code used to process the comment data and generate the visualizations is available in [this Jupyter notebook](https://github.com/minimaxir/stack-overflow-survey/blob/master/stack_overflow_dev_survey.ipynb), open-sourced [on GitHub](https://github.com/minimaxir/stack-overflow-survey). The repository also contains a few unused bonus charts!_

_You are free to use the charts from this article however you wish, but it would be greatly appreciated if proper attribution is given to this article and/or myself!_
