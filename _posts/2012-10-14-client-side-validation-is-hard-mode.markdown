---
layout: post
title: "Electronic Arts \"Gives Away\" Thousands Of Free Games Due To No Server-Side Validation"
date: 2012-10-14 21:21
comments: true
categories: [Gaming, Technology]
summary: "Gamers noted that simply inputting the code while logged-out allows them to use the promo code an *unlimited* amount of times. Needless to say, hilarity ensued."
image: origin.png
---

Early Saturday morning, [various gaming forums][1] (and, more importantly, [Reddit][2]) obtained a promotional code from mega gaming company Electronic Arts for their Origin gaming distribution service. This code entitled the user to purchase any EA published or developed game for $20 off, and if the game was less than $20, the game was free. [Games that were made free][3] using this coupon included hit series such as Dead Space, Mass Effect, Dragon Age, and Battlefield, so the rewards for the coupon were actually pretty worthwhile. Best of all, there are no catches and no gimmicks; input promo code OS3874XVC, get game.

The code was apparently rewarded after taking a survey regarding Origin, with the reward being one free game. The operative word being "one." Some gamers, out of curiosity, discovered that by entering the code via both the store browser-interface and the store client-interface, they could get a free game twice. Gamers inferred the logical technical conclusion; EA was not checking server-side that the code was only being used once. Later, gamers noted that [simply inputting the code while logged-out][4] allows them to use the promo code an *unlimited* amount of times.

Needless to say, hilarity ensued.

<!-- more -->

## What Went Wrong

{% img /img/origin.png %}

Even the most amateur web developer knows to follow three important rules for data validation:

1.  Never trust the client.
2.  Never trust the client.
3.  **Never trust the damn client!**

The proper way to implement a promo code is logical: when the user attempts to apply a promo code, the server checks, *has the user used this promo code before?* by querying* SELECT FROM transactions WHERE user\_id = current\_user AND promo_code = "OS3874XVC"*. If the result set is empty, then the user hasn't used the code, and everything's good to go. Otherwise, then that user has used the promo code before, and an appropriate error should be thrown are displayed to the user. This would be repeated at the checkout phase when the server actually charges the credit card, to ensure that the correct amount is charged and that the user has not committed and shenanigans in the meantime. All would be well. *****

For some reason, inputting the code in different clients (which should validate against the same backend database) still allowed the code to be input twice. And, for a very confusing reason, a workflow exists that allows the user to input a promo code while logged out, with presumably the intention of it being validated when the user eventually logs in (which it isn't).

## Aftermath

The exploit was closed at around 1AM PST, 18 hours after its discovery (which, to be honest, it pretty embarrassing for an exploit that causes a significant amount of lost potential revenue). Here's where it gets interesting.

A little background: in the gaming community, EA is not the most liked company; in fact, it was voted [the worst company in America][7] due to a very large number of privacy, security, and ethical debacles. Last year, EA launched its own digital distribution service, Origin, which would compete with Valve's Steam service by being the sole provider of high-profile EA-published games, including Battlefield 3 and Mass Effect 3. (the former being the only reason I downloaded Origin). Speaking from experience, Origin is very buggy and unpolished compared to Steam, and actually drains system resources when idle.

{% img /img/origin2.png %}

According to [another Reddit thread][8], when news of this exploit hit, many gamers went on a downloading spree, and downloaded nearly every free game possible for two reasons. One, if EA is technically incompetent enough to allow such a severe bug to exist, they won't have the technical skills to discern who used the promo code more than once. Two, *it is retribution for EA being a terrible company*.

What will EA do to punish people who exploited? Are the users at fault here since it's very possible to accidently use the code twice? If so, is it fair to ban *ever*y*one* who has used multiple promo codes if innocent people might be banned?

UPDATE (10/15 1:14AM): EA will ["honor all sales made with the coupon code,"][9]  implying that they will **not** ban people who utilized the exploit.

If the promo was a marketing tactic from Electronic Arts to promote Origin usage, it failed immensely on their end, due to a trivial amount missing lines of code on their server.

-Max

*PS: I downloaded exactly one game through the promo code as was intended and stated by a [forum user's chat log with Origin Support][10]; I did not attempt to reproduce the exploit itself for verification purposes due to the potential consequences. I like my Battlefield 3!*

 

* **I admit that the SQL pseudocode provided here is an oversimplified, general **solution for the validation issue**, since that I do not have knowledge of EA's database structure and scale.**

**** Discussion on Hacker News [here][11]!**

**\***| Discussion on Reddit [here][12] and [here][13].**

 [1]: http://www.gamefaqs.com/boards/916373-pc/64312901
 [2]: http://www.reddit.com/r/GameDeals/comments/11ewb0/use_the_code_os3874xvc_to_get_20_off_origin/
 [3]: http://www.gamers-association.com/2012/10/free-game-from-eas-origin/
 [4]: http://www.overclock.net/t/1315674/free-20-in-origin-code/410#post_18359737
 [5]: http://i1.wp.com/minimaxir.com/wp-content/uploads/2012/10/origin.png
 [6]: http://i0.wp.com/minimaxir.com/wp-content/uploads/2012/10/origin2.png
 [7]: http://www.forbes.com/sites/erikkain/2012/04/09/why-ea-won-the-worst-company-in-america-award/
 [8]: http://www.reddit.com/r/gaming/comments/11ggi2/reddit_during_the_recent_origin_discount_coupon/
 [9]: http://forum.ea.com/eaforum/posts/list/60/9040620.page
 [10]: http://i.imgur.com/4zg7X.jpg
 [11]: http://news.ycombinator.com/item?id=4652129
 [12]: http://www.reddit.com/r/technology/comments/11hem0/electronic_arts_gives_away_thousands_of_free/
 [13]: http://www.reddit.com/r/Games/comments/11h9nj/electronic_arts_gives_away_thousands_of_free/  