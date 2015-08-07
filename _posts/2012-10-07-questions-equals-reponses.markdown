---
layout: post
title: "Does Asking Questions To Readers Increase Response Rate? - And Other TechCrunch Analyses"
date: 2012-10-07 21:19
comments: true
categories: [Facebook, Data]
summary: "After collecting about 2,500 posts - 12 months of data - I analyzed the data conditional on whether or not the post was a question, among other things. The results surprised me."
image: tcfb1.png
---

A long-standing trend in blogging is having the writer ask the readers what they think about your post and having the readers letting the writers know in the comments. Websites such as [TVGuide][1] and [Mashable][2] have such requests in nearly *every* article. Reminding users to respond so frequently makes it seems insincere and deliberate, so I personally have been skeptical of the practice.

Recently, I've noticed more and more brands on their Facebook posts asking their readers for their own opinions on news. Anecdotally, I've also observed that those same posts have more comments than usual. This technique **must** increase the social response rate, I thought, otherwise media companies wouldn't do it.

Like any math nerd, I wasn't comfortable with simple circumstantial evidence. When I [asked on Facebook][3] if there is any statistical data indicating that including a question to the community at the end of a blog post / Facebook post increases the response rate, TechCrunch writer and Facebook specialist Josh Constine responded and linked to[ a Facebook report][4] stating that such posts have double the comments and significantly greater feedback.

I decided to put that to the test. I wrote a quick script in R that parses the Facebook page of a brand and extracts the number of likes for all of their posts, the number of comments on all posts, and whether or not each post contained a question. The brand I chose for my testing is none other than [TechCrunch][5], because [its Facebook page][6], managed by the wonderful [Elin Blesner][7], has large sample sizes in terms of both unique postings and response rates on each post, ensuring that the analysis of the data is statistically significant. Additionally, having a*nother* perspective on TechCrunch to comment about certainly doesn't hurt either.

After collecting about 2,500 posts - 12 months of data - I analyzed the data conditional on whether or not the post was a question, among other things. The results surprised me.

<!-- more -->

**tl;dr: Asking a question to the readers in a Facebook post *does* increase the number of comments very significantly, but *decreases* the number of Likes!**

## How many Comments and Likes do TechCrunch posts receive?

Since the data goes back a year, we can more easily detect seasonal trends in the data. First, let's see the real world numbers as a sanity check.

![It's much more than you may think.][8]

The number of Likes per month appears to be positively correlated with the number of comments, which is to be expected. Some months have significantly more activity than others; September 2012 had the most because of TechCrunch Disrupt SF. (interestingly, there wasn't such a spike in May 2012 with Disrupt NYC) The average number of likes/comments per post per month, as opposed to the sum, is a more consistent measurement, so we will be using that going forward. 
## How many Comments and Likes do TechCrunch Facebook posts receive on average?

![Triple-Digit Likes and double-digit Comments. Not too shabby.][9]

Overall average is 162 Likes and 30 Comments per post. The average number of Likes/Comments are consistent across the past year, with growth in the last few months. Nothing too surprising here. ## Does the time of day of a Facebook posting affect the number of Likes/Comments it receives?

Here's a fun measurement I decided to analyze. TechCrunch makes postings at all hours as it's a globally-targeted blog, but readers in the US may be asleep at the time. This could be a possible confounding variable (social activity may be correlated with geographic location), so it's best to see whether or not we can rule it out.

![The spike in average comments at 4AM PST / 7AM EST is interesting. European workday?][10]

As it turns out, time of day does **not** appear to have an effect on number of Likes/Comments received for TechCrunch!

## How many TechCrunch Facebook posts ask a question, relative to the ones that do not?

Here's the main question that began this entire investigation. Has the TechCrunch Facebook been writing posts that ask questions more frequently?

![TechCrunch-themed columns!][11]

As it turns out, no, TechCrunch has asked the same proportion of questions on their Facebook page, as there is no change in trend. Overall average is 31.38% of TC's posts ask a question. (about a third of the posts)

## Does including a question to the community increase the number of Likes/Comments on the post?

And here's the analysis of the main hypothesis. The results were quite surprising.

![Now with more DROP SHADOWS!][12]

The average amount of Likes for a post that asked a question is *lower* than a post that does not! (141 Likes for post that asks question, 172 for post that does not, a 18% decrease) That's unexpected!

For Comments, the average amount of Comments for a post that asked a question is significantly higher than a post that does not (45 Comments for a post that asks question, 23 comments for post that does not, a 97% increase). This is nearly double, which is what the Facebook report had stated.

What could explain this behavior? A quick theory is that Liking and Commenting on a brand post are mutually exclusive; asking a question in the post drives the user to comment, but not to Like the post, but since the user has already acknowledged the post socially, there's no need for the user to Like it. This follows my personal behavior on brands; if I comment, I usually do not like the post as it seems redundant.

Regardless, I will now admit that there are benefits to asking your users questions in your Facebook or blog posts. Although there appears to be a drop in Likes by asking users what their opinions are, the increase in comments more than counteracts it.

This data raises an interesting dilemma: let's say everyone catches on and *most* of the top brands start asking their users questions. It'll quickly become an cliche, as it is essentially a subliminal form of the infamous Facebook News Feed spam. Would that cause brands to stop asking questions? If so, how long would it take for the brands to switch back to asking their users questions?

Who knew that social media marketing involved game theory?

-Max

*(Since all the data is public anyways, [I am releasing my data and graphs][13] for your perusal. If you decide to use it and find something else interesting, please let me know!)*

 

EDIT: One more.

## Do photo posts have greater response rates than posts without photos?

![14]

 

Yep. Not too surprising. It's why Facebook bought Instagram! (although I'm curious what happened in April...)

 [1]: http://www.tvguide.com/
 [2]: http://mashable.com/
 [3]: http://www.facebook.com/max.woolf/posts/10151223309670450
 [4]: http://www.facebook.com/notes/facebook-journalists/study-how-people-are-engaging-journalists-on-facebook-best-practices/245775148767840
 [5]: http://www.techcrunch.com/
 [6]: http://www.facebook.com/techcrunch
 [7]: https://twitter.com/elinblesener
 [8]: /img/tcfb1.png "How many Comments and Likes do TechCrunch posts receive?"
 [9]: /img/tcfb2.png "How many Comments and Likes do TechCrunch posts receive on average?"
 [10]: /img/tcfb3.png "Does the time of day of a Facebook posting affect the number of Likes/Comments it receives?"
 [11]: /img/tcfb4.png "How many TechCrunch Facebook posts ask a question, relative to the ones that do not?"
 [12]: /img/tcfb5.png "Does including a question to the community increase the number of Likes/Comments on the post?"
 [13]: https://dl.dropbox.com/u/2017402/TechCrunch%20Facebook%20Data%20Analysis.xlsx
 [14]: /img/tc-graph.png  