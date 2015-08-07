---
layout: post
title: "Which Universities Produce the Most Successful Startup Founders?"
date: 2013-07-20 10:00
comments: true
categories: [Startups, Data]
summary: "Do the tech universities produce more funded graduates than the Ivy League universities? Do the founders from Ivy League Universities receive more funding than those from the top tier tech universities?"
image: sum-funding.png
---

If you read startup funding announcements on tech blogs frequently, you've may have noticed that these startup founders have often attended prestigious universities. Founders who have graduated from Ivy League schools, such as Harvard, Yale and Princeton, unsurprisingly raise millions for their startups. Of course, top tier tech schools such as Stanford, MIT, and Carnegie Mellon foster a strong technical and entrepreneurial background: attributes which venture capitalists seek when investing in a startup founder. *(Disclosure: I'm a Carnegie Mellon alumnus)*

Do the tech universities produce more funded graduates than the Ivy League universities? Do the founders from Ivy League Universities receive more funding than those from the top tier tech universities?

Using TechCrunch's [CrunchBase](http://www.crunchbase.com/) API, I obtained the data of about 2,500 startup founders in the United States who have created a startup which has received investment from venture capitalists.

With that data, I found some rather interesting trends.

<!-- more -->

# Which universities produced the most amount of graduates who have received funding? #

Thousands of university graduates attempt to make a startup, but most will not succeed. Are the graduates of some universities more frequently successful?

Here are the Top 16 universities with the most number of successfully-funded graduates:

{% img /img/founder-colleges.png %}

Stanford has the most amount of funded graduates, which is unsurprising as it's located in the Silicon Valley heart of venture capital.

Seven out of the eight Ivy League Universities (colored green on the chart) are present, but most of the Ivies are  in the middle of the chart. MIT and UC Berkeley each have nearly *double* the amount of successful graduates from Yale and Columbia.

It's worth noting that Tel Aviv University, an Israeli university, ties Duke University at 21.

# Which university's graduates have cumulatively raised the most amount of total funding? #

Another way to measure success is through the success of the founders' subsequent startups and the amount of venture capital they have raised.

Here are the Top 8 universities whose graduates have received the most amount of funding:

{% img /img/sum-funding.png %}

Harvard and Stanford graduates are very close in terms of total funding raised. However, there's a clear [Power Law](http://en.wikipedia.org/wiki/Power_law) in effect, as those two along with UC Berkeley, have  produced founders who've generated much, much more venture funding than those of the other universities.

# Which university's graduates raise the most amount of money in their first round of funding on average? #

Startup founders with big, world changing ideas need lots of venture capital. Only the founders with *good* ideas will actually receive it.

Here are the average amount of first-round funding for the top 16 universities with the most number of successfully-funded graduates:

{% img /img/avg-first-raised.png %}

Carnegie Mellon and Princeton, which had a relatively low number of funded founders and a relatively low number of total capital raised, instead have a *significantly* higher amount of average first funding. UCLA also placed. Perhaps the students from these three universities tend to have more ambitious startup ideas? 

At first glance, Stanford and Harvard appear to be the kings of startups. They have the most amount of graduates, and the most amount of total venture capital raised. The tech blogs would surely consider that a success, but could the greater funding for CMU/Princeton lead to the creation of the next billion-dollar startup? We can only wait and see.

*UPDATE: As pointed out by robotcookies on the [corresponding Hacker News thread](https://news.ycombinator.com/item?id=6075862), I missed UCLA in the first draft, which had 29 funded graduates. The charts have been updated.*

----------
You are welcome to use the founder data from CrunchBase by [viewing the data on Google Drive](https://docs.google.com/spreadsheet/ccc?key=0AjPFdCURhZvddEV1LUpaQUVsdmJYcERoM0FNU3lPcVE&usp=sharing), or by [downloading the raw CSV](https://www.dropbox.com/s/3jz2wsr4d6fc4t6/founders_w_college.csv).

*Notes:*

*  *University data was standardized to make analysis easier (e.g. for Carnegie Mellon, the founders who listed their institution as "Carnegie Mellon University", "Carnegie Mellon," and "CMU," all had their institution changed to be "CMU".)*
* *Chart #1 measures unique founders, so it does not double-count a founder who has founded more than one  funded startup.*
* *Chart #2 assumes equal contribution of each founder to the funding: if a startup has a total funding of $100,000 with 2 founders, the amount used for the chart will be $50,000 for each founder.*
* *Chart #3 ignores startup data for the chart which has a Series B, Series C, or Series D listed as their first round on CrunchBase, or if the amount raised was not provided.*


