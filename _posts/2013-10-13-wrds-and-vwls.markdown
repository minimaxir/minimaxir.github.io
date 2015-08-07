---
layout: post
title: "Do startups with short names containing few vowels raise more money?"
date: 2013-10-14 07:00
comments: true
categories: [Data, Startups]
summary: "tl;dr: No."
image: mean-startups-fund.png 
---

One reason startups use crazy and bizarre names like [NegaCycl](http://minimaxir.com/2012/12/totally-real-totally-serious/) and [Filtrzzz](http://minimaxir.com/2012/12/powerpoint-promo-party/) is to ensure that their name is unique, making it easier to acquire the .com domain name and Twitter handle for their startup. Another reason is to make their startup sound *kewl* and theoretically make the name more memorable in the minds of users and potential investors.

Dakwak, Wibki, Zeef, Funifi. These aren't random words: these are funded startups which were featured at [TechCrunch Disrupt Startup Alley 2013](http://startupalley.techcrunch.com/). And then you have startups such as Lyft, SCVNGR, and Fastly, which have all raised *tens of millions of dollars* in venture capital.

Do startups with these short, low-vowel names actually raise more money than startups with traditional names?

<!-- more -->

First, let's take a look at the association between the length of words in the English language and the number of vowels that they contain:

{% img center /img/english-words.png 600 600 %}

In the English language, the majority of the words have 8 letters, with 3 of those letters being vowels. (8,3) is also the center of the density distribution for the heat map, spreading outward.

Let's compare the vowel distribution of normal English words to the distribution of the names of startups that have successfully raised venture capital, in order to identify just how many funded startups have quirky names:

{% img center /img/count-startups.png 600 600 %}

Wait, the two distributions are nearly identical! Both graphs are centered at about (8,3), radiating outward. This implies that the number of startups with uniquely-constructed names are outliers and not the typical names for startups.

But that doesn't answer the core question: sure, fewer funded startups have weird names relative to the amount of total funded startups, but do they raise more money on average than startups with typical names?

{% img center /img/mean-startups-fund.png 600 600 %}

Nope.

There is no discernible pattern for the average amount raised, unlike with the previous two charts. For the vast majority of the possible combinations of name length and $ vowels, the range of capital raised is between $5M and $25M. There are higher values at the lower-end of the graph (low length, low vowels), but that can be attributed to the relatively low amount of startup data for those combinations to smooth out the average. (e.g. the $78M spike at 3 length, 2 vowels is due to the always-lovely [AOL](http://www.crunchbase.com/company/aol) and a [$1 billion investment from Google](http://googlepress.blogspot.com/2005/12/time-warners-aol-and-google-to-expand_20.html), and there are only 15 other startups in the segment.)

In fact, the statistical correlation between name length and funding, number of vowels and funding, and ratio of length to vowels and funding, are all effectively **zero**.

Sure, quirky startup names may make it easier to find a domain name, but it won't necessarily give an edge in the investment process.

---

*Data for English words from [Kevin's Word List Page](http://wordlist.sourceforge.net/), and data for the startup names/funding from [CrunchBase's September Data Export](http://info.crunchbase.com/about/crunchbase-data-exports/).*