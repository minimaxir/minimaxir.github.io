---
title: "A Role-Playing Game With an Easily Exploitable Random Number Generator"
date: 2013-05-23T20:26:00-07:00
slug: guaranteed-to-be-random
categories: [Gaming, Journalism]
summary: "The Golden Sun RNG is so poorly implemented that players have found out how to make events with 1/256 probability occur one hundred percent of the time."
#image: kiku.png
cover:
  image: kiku.png
  relative: true
---

When the Game Boy Advance was released in June 2001, Nintendo promised that the handheld device would be capable of delivering a home gaming console experience on-the-go. [Golden Sun](http://en.wikipedia.org/wiki/Golden_Sun), developed by Camelot and published by Nintendo a few months after the console's release, exemplified the GBA's full capabilities with its hand-drawn environments, flashy battle effects, and _very_ difficult dungeon puzzles which undoubtedly resulted in the sale of many strategy guides.

In Golden Sun, you play as a group of teenage mages called Adepts, who wield the power of the four elements (Earth, Fire, Wind, and Water) by casting spells with Psynergy. The antagonists of the game are a pair of jerks who are attempting to reawaken a dangerous and sealed power, and only four kids can stop them from destroying the world. Released two years later, [Golden Sun: The Lost Age](http://en.wikipedia.org/wiki/Golden_Sun:_The_Lost_Age) takes place immediately after the conclusion of the first game with a different quartet of Adepts and a new pair of jerks. In this sequel, it is revealed that the jerks who keep trying to kill you are not the bad guys and the whole conflict is just one big misunderstanding! Yes, the plot is very reminiscent of other Japanese-developed RPGs such as [Final Fantasy][1] and [Chrono Trigger](http://en.wikipedia.org/wiki/Chrono_Trigger), but it's still impressive for a game I typically played in the backseat of a car.

Like Final Fantasy and Chrono Trigger, Golden Sun has an inventory system where players earn new weapons and items by purchasing them at a store or by finding them as loot from defeating enemies in the world. The most powerful weapons, naturally, only drop from enemies at the end of the game with odds of less than 0.01% per kill. If you killed [such enemies 100 times](http://www.wolframalpha.com/input/?i=binomial+distribution%28100%2C1%2F256%29), for example, you would only have a 32% expected chance of seeing a rare drop among all the kills. And killing that many enemies could take hours. It depends on the almighty will of Golden Sun's Random Number Generator.

As it turns out, the [Golden Sun RNG](http://goldensun.wikia.com/wiki/Random_Number_Generator) is so poorly implemented that players have found out how to make events with 1/256 probability occur _one hundred percent_ of the time.

## You Make Your Own Luck

{{< figure src="random_number.png" theme="light" caption="http://xkcd.com/221/">}}

Soon after the first Golden Sun was released, players discovered that the first random enemy encounter the player enters after turning the GBA on was always a First Strike, where the player's party gets a free turn. Was this a cute gameplay mechanic intended to give the player a quick advantage, or was it indicative of a flaw in the game's RNG?

Most modern RNGs are partially seeded and randomized using a timer, i.e. the current time of the computer in microseconds. This makes it infeasable to reproduce the output of the RNG reliably.

However, the GBA does not have an internal clock, so time-based methods of seeding aren't possible. By the time the sequel was released in 2003, the
[entire Golden Sun RNG](http://www.goldensunrealm.com/gs/nickpresta_rng-guide.txt) was reverse-engineered:

> Golden Sun uses the ANSI-C standard rand function as its Pseudo-Random Number
> Generator.
>
> There is one difference: Golden Sun's RNG uses an unsigned 4-byte number and
> returns it with no shifting, so you'd replace "return ((next >>16) & 32757);"
> with "return (next & 4294967295);"
>
> This, ordinarily, is a perfectly capable RNG, but there is one flaw with what
> Golden Sun does with it.
>
> It only makes a new random number when something random happens. What's more,
> it uses _two_ copies of the RNG to create two random numbers, and the
> first RNG only handles battle situations.
>
> As such, it is easy to control when a new random number is generated.
>
> On top of this, the RNGs are seeded with 0 when the GBA is reset, and because
> of the way the game has been programmed, the RNG controlling battle events will
> _continue_ to be 0 even when you load the game...

Golden Sun's Random Number Generator isn't "random" at all. It's manipulated _entirely_ from player-controlled actions, from the moment the Game Boy Advance is turned on.

## Get Lucky

{{< figure src="kiku.png" >}}

One of Golden Sun's contributions to the typical RPG character class customization is the [Djinn system](http://goldensun.wikia.com/wiki/Djinn). In the game lore, Djinn are impish creatures that grant enhanced powers to Adepts. There are four types of Djinn, one for each element, that can be found in the overworld, and each Djinni can be used to either increase a character's statistics, or Unleashed to provide a powerful spell effect. Also, as with many other RPGs, Golden Sun implements an elemental rock-paper-scissors combat system: enemies are weak to an element and resistant to another.

A [GameFAQs](http://www.gamefaqs.com/) forum user by the name of "darkpanther" discovered that using a Djinn Unleash with an element that is the enemy's weakness will not only increase the amount of Experience and Coins earned, but also _quadruple_ the chance of the enemy dropping a rare item. (this fact is neither hinted anywhere in the game nor stated in any strategy guides)

This is essential toward manipulating the RNG. Normally, the rarest items such as [Tisiphone Edge](http://goldensun.wikia.com/wiki/Tisiphone_Edge) and [Lachesis' Rule](http://goldensun.wikia.com/wiki/Lachesis%27_Rule) have an "Item-Class Chance" of 9, meaning the item has a 1/(2<sup>9-1</sup>) = 1/256 chance of dropping per enemy kill. The "DP Method" decreases the ICC by 2, meaning the new drop rate becomes 1/(2<sup>7-1</sup>) = 1/64. But:

> As 'unpredictable' as RNGs seem to be, if they are always seeded to the same
> value and do not use a timer-based response, they will become predictable by
> anyone who is good at noticing patterns. One pattern being, for example, that
> the 31st random number that is calculated - 33727075 - will drop _any_ item if
> the enemy dying when this random number was called was just killed by an
> elemental Djinn attack that it is weak to.

Calculating the 31st random number would fail against an ICC9 item, but now works against an ICC7 item. (and all items of lower ICC too)

Therefore, **in order to guarantee that an item drops, kill the appropriate enemy with an element-advantage Djinni such that the 30th random number is generated**. (the 31st random number is generated on the enemy's death)

How do you ensure that you only create 31 random numbers? From the Golden Sun Wikia:

> Save the game and do a hard reset in the area where the monster that drops the item you need appears. Run around to get in a battle. If the encounter consists of a formation of 2 monsters, with at least one of them being the monster you want, proceed. If not, do another hard reset and try again.
>
> During battle, have the entire party use multi-targetting Psynergy on the targets in the first turn, and since a battle right after a hard reset always involve your party attacking first where possible, the monsters will not be able to act. During the second turn, use two multi-targetting Psynergy on the enemies, and have the third party member (or fourth, if one of the three party members that act before uses Defend) unleash an attack Djinni of the element the monster is weak to on the monster. If by this point, the monster flashes in colour and dies, you will obtain the drop of that monster at the end of the battle, however rare it is. If the monster does not die then (either dies too soon or doesn't die by this step), adjust the power of your attacks until you get it just right.

{{< youtube UCJzuSBQ1hU >}}

Moral of story: if you're making a video game, seed your RNGs with an algorithm that players can't manipulate 100%. Otherwise, hilarity will inevitably ensue. I forgive Camelot for implementing a simplistic RNG though; the two games' [awesome](http://www.youtube.com/watch?v=DaxYYwMqiso&list=PL8C84ECF55B28DC74) [soundtrack ](http://www.youtube.com/watch?v=M31afGXIGpQ&list=PL586792F46D5A35D4&index=13) more than makes up for it.

[1]: http://en.wikipedia.org/wiki/Final_Fantasy_(video_game)
