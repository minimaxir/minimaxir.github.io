---
layout: post
title: "Diablo III Economy Broken by an Integer Overflow Bug"
date: 2013-05-07 21:53
comments: true
categories: [Gaming, Bugs]
summary: Diablo III, Blizzard's highly-awaited online-only Action RPG released almost a year ago to the day, has had its share of technical difficulties. From Error 37 to lag spikes that can cause hundreds of hours to go to waste, Blizzard has spent the past year improving the game backend to better accommidate the millions of active players.
image: diablo31.png
---

[Diablo III][1], Blizzard's highly-awaited online-only Action RPG released almost a year ago to the day, has had its share of technical difficulties. From [Error 37][2] to lag spikes that can cause hundreds of hours to go to waste, Blizzard has spent the past year improving the game backend to better accommidate the millions of active players.

Diablo III is also noted for its economy, with an emphasis on a region-wide auction house where players can trade one-in-a-million items for millions and billions of gold. (inflation is crazy). Additionally, Diablo III emphasized the use of a Real World Auction House, where players can sell gold or items for real world cash.

Today was the launch of [Patch 1.0.8][3], a patch which promised improvements to character progression. After spending a few weeks on a Public Test Realm, where players volunteered to tested the patch to ensure that there were game-breaking exploits, the patch released successfully.

Except for one patch note that was added last minute and not tested in the PTR. And it's a patch note that broke the economy to tiny pieces.

<!-- more -->

The patch notes from the final build contained this change:

> The stack size for gold sales on the auction house has been increased from 1 million to 10 million.

Normally, on the Real Money Auction House, the player can only sell money in 1 million gold increments. In 1.0.8, the player can sell it in 10 million increments. So, what happens when the player tries putting an absurd amount of money on the Auction House?

Reddit user tyropro [has a nice explanation][4]:

> The gold "dupe" involved creating a RMAH auction for billions of gold while staying under the $250 limit. The example I saw in a video was 6 billion gold (600 x 10,000,000 at $0.39 per stack, for $234). When they posted this auction only ~1.7 billion appeared to be for sale, with the rest "missing" until they sent it to their stash and ended up with more than they started with. The exact numbers from a duping video:
> 
>     Create RMAH auction for:            6,000,000,000 gold
>     Auction shows up as:                1,705,032,704 gold
>     This much is missing!               4,294,967,296 gold
>     The missing amount, divided by 2:   2,147,483,648 gold
>     
> 
> 2,147,483,648 (or 231) is the maximum value you can store in an int32 in programming. I'm no programmer, but I took one class in high school and was taught about the limits of different variable types. See:
> 
> Simply put, their RMAH gold selling code wasn't written to handle numbers over 2,147,483,648 properly, and the result was duplicate gold being added to people's stashes.

4,294,967,296 is also 232, or the bound on an [unsigned integer][5], which would be an interesting implementation choice on Blizzard's part.

And so, the dupers created these 6-billion-gold auctions which only appears to sell as 1.7 billion (and therefore only had 1.7 billion deducted from the current balance), canceled them, and were fully refunded the 6 billion for a net profit of the difference (4.2 billion). Repeat *ad nauseum*.

A popular game streamer showed off the exploit. Other streamers followed. It was easily reproducible and [everyone knew how to reproduce it][6].

Hilarity ensued.

![diablo31][7]

Yes, that's 420 *billion* gold.

After buying up all the duped items in the Auction House, the items were then sold on the Real Money Auction House. For real money. And people bought them.

This is the definition of a worst-case scenario for Diablo III. All because of an untested patch note. What could Blizzard do? Performing a roll-back would wipe all progress obtained by players for the patch day, which would result in a lot of bad PR. But leaving the economy as-is will devalue all items in the game (and Diablo III is all about getting items).

In the end, Blizzard [has not done a roll-back][8], but instead [banned anyone who duped][9], and [refunded][10] anyone who spent real money. The bug was temporarily fixed by reverting the patch note which caused the entire mess.

Let this be a lesson on what happens when you include an untested change at the last minute. You could break an entire economy. Eh, no big deal.

 [1]: http://us.battle.net/d3/en/
 [2]: http://knowyourmeme.com/memes/error-37
 [3]: http://us.battle.net/d3/en/blog/9647272/patch-108-now-live-5-7-2013
 [4]: http://www.reddit.com/r/Diablo/comments/1dx3wv/some_speculation_on_how_the_gold_bug_made_it_to/
 [5]: https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_long_integer_sizes
 [6]: http://www.reddit.com/r/Diablo/comments/1dw9kr/there_is_a_gold_dupe_on_na_currently_this_is_the/
 [7]: /img/diablo31.png
 [8]: http://www.reddit.com/r/Diablo/comments/1dx4a7/there_will_officially_be_no_rollback_after_the/
 [9]: http://www.reddit.com/r/Diablo/comments/1dwk6x/d3_inigomontoya_just_got_banned_for_real/
 [10]: http://i.imgur.com/x5S9Zcx.png  