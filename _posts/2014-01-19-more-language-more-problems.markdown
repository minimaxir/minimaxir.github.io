---
layout: post
title: "A Thoughtful Analysis of the Most Poorly-Designed Chart Ever"
date: 2014-01-20 08:00
comments: true
categories: [Data, Comedy]
summary: "The good thing about the chart? The data is properly cited. The bad? EVERYTHING ELSE."
image: dev-graph-3.png
---

Last week, I was surfing Reddit and came across an [interesting infographic](http://www.reddit.com/r/ProgrammerHumor/comments/1ur3ny/unnecessary_graph_of_most_desired_skills_in_2013/) within the [ProgrammerHumor subreddit](http://www.reddit.com/r/ProgrammerHumor/). The infographic, as compiled by tech blog [ReadWrite](http://readwrite.com/), depicts the Top 10 Most In-Demand Developer Skills of 2013, as compiled by [Stack Overflow](http://stackoverflow.com/) through keyword searches.

<!-- more -->

{% img /img/infographic-1.jpg %}

Take a look at the chart. What’s good and bad about it?

# The Good #

The data is properly cited.

# The Bad #

**EVERYTHING ELSE.**

What’s terrible about the graph? Let me count the ways:

- Using discrete values in the X-Axis for a continuous measurement (i.e. the percentage). And not only that, discrete values with two significant figures, which make the X-Axis unusually cluttered.

- The Y-Axis is Language. This implies that some programming languages are more language than others.  ([to be fair](https://www.facebook.com/photo.php?fbid=10152166149970450&set=a.432190050449.225968.582270449&type=1&stream_ref=10), Java is more language than Android)

- Not all entries on the chart are programming languages. (Android, for example, is an operating system.)

- The 45-degree line in the chart implies that the relationship between language and %-of-searches is perfectly linear, where in reality the data has an upward-parabolic shape.

- No relative proportions between the programming languages. We can't accurately see the increase in language Java has relative to Android just by looking at the graph.

- Cannot easily associate a language with the given X-Axis value. The logos representing the programming language oscillate around the line, and it's hard to see at a glance which percentage corresponds to which language.


# Fixing the Chart #

This isn’t one of those blog posts that make snarky criticism without offering any constructive input. (those will be posted next week). How can we make the chart somewhat logical?

The easiest way to improve the chart is to convert the chart from a line chart to a column chart. Here’s a column chart that keeps the intended impression of the original chart:

{% img /img/dev-graph-1.png %}

A much bigger improvement, although unfortunately without the cool hand-drawn logos. The axes are no longer illogical and it’s easy to determine the relative impact of each language (e.g. Java is clearly, clearly at the top). However, the large amount of text can clutter the bars, and it can be difficult to correlate the raw percentage with the scale at a glance.

Another option is to rotate the chart and use bars instead of columns:

{% img /img/dev-graph-2.png %}

This fixes the text issue by giving more room for text with most of the factors, but the Java text clips outside the chart. The correlation issue between language and percent value persists.

A best-of-both-worlds approach is to display the language on the Y-Axis and the raw percent value on the corresponding bar itself, allowing us to forgo the percent metric axis entirely.

{% img /img/dev-graph-3.png %}

There we go. Minimalist, fixes both the text and correlation issues, and gets the point across effectively.

All of these charts were created using R and ggplot2, and you can download the R code in [this GitHub repository](https://github.com/minimaxir/developer-graphs). I wish the [orginal ReadWrite article](http://readwrite.com/2014/01/08/in-demand-tech-skills-of-2013-java) used a chart like the last one and…

Wait, they changed the infographic?

{% img /img/infographic-2.jpg %}

Hey, they fixed the chart, and it’s using a similar design as mine! What a crazy random happenstance!

The article was appended with an update:

> An earlier version of the infographic in this story presented the StackOverflow data in a confusing and conceptually problematic fashion. It has been updated.

"Problematic" is the world's biggest understatement.


