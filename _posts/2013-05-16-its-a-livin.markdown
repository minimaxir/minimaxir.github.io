---
layout: post
title: "A Profanity-Laced Video Game Password That Breaks Everything"
date: 2013-05-16 20:50
comments: true
categories: [Gaming, Hacks]
summary: "Most of these passwords were gibberish that required a pen-and-paper to write down and remember. One password, however, is more memorable, and much more sinister."
image: metroidpassgen.png
---

{% img pull-right /img/metroidboxart.jpg %}

If you're a fan of video games, you've likely heard of the Metroid franchise. Released for the NES in 1986 by Nintendo, Metroid set a new standard for 2-D exploration in video games with its expansive power-up system, well-hidden secrets, and polished platforming controls. Due to its popularity, Metroid has been rereleased multiple times: as an unlockable in [Metroid Prime](http://en.wikipedia.org/wiki/Metroid_Prime), an unlockable in the remake [Metroid: Zero Mission](http://en.wikipedia.org/wiki/Metroid_Zero_Mission), a [standalone game](http://en.wikipedia.org/wiki/Classic_NES_Series) on the Game Boy Advance, the Wii Virtual Console, and the 3DS Virtual Console.


You play as Samus Aran, an armored bounty hunter who has infiltrated the base of the dreaded Space Pirates on Planet Zebes. Samus must defeat the leaders of the Space Pirates: the dinosaur Kraid, the dragon and memetic badass of the series [Ridley][1], and the AI construct [Mother Brain][2]. Additionally, Samus must find a way to defeat the Metroids, which are nearly-indestructible parasites that threaten all life. Yes, this was a plot written in the 80's.

Since the NES Metroid cartridge did not have the ability to save games, and the game itself took awhile to complete, Nintendo developed a password system to allow players to continue at a later time. Upon death, the player received a 24-character alphanumeric password that could be entered to restore all items the player has unlocked and remember which bosses the player has defeated. Most of these passwords were gibberish that required a pen-and-paper to write down and remember.

One password, however, is more memorable, and much more sinister.

<!-- more -->

# The Password is Always Swordfish #

Even before the days of the internet and personal computing, players [found passwords](http://metroid.wikia.com/wiki/List_of_Metroid_passwords) with unique properties.

The [Narpas Sword password](http://metroid.wikia.com/wiki/Narpas_Sword):

{% img /img/narpassword.png %}

is essentially the debug mode for the game, with all items unlocked, infinite health, and infinite health for Samus.


Another, more revealing password is the [Justin Bailey password](http://metroid.wikia.com/wiki/Justin_Bailey):

{% img /img/justinbailey.png %}

This password starts the game with most unlockables obtained, but more notably, it changes Samus's sprite from an armored powersuit to a bikini swimsuit. 

One password, discovered over 20 years later, long after the Metroid password system had been completely reverse-engineered, does not grant you all items. *This* password just crashes and resets the game:

{% img /img/engageridley.png %}

# WTF? #

On a NES and various other rereleases, inputting that code will cause the game to either simply reset or transform the game into a glitched wonderland:

{% youtube x3UyVylP7AI %}

But what happens when you enter the password on an emulated Virtual Console, where the game environment is sandboxed? In the case of the 3DS Virtual Console, the *3DS completely crashes*:

{% youtube pjQ7SjB_6a8 %}

# Rated E for Everyone? #

You may be asking "did someone at Nintendo actually program a consequence for profanity in the game? Is the glitching and crashing a punishment for the perverse player?" In truth, the password is merely a coincidence.

As mentioned earlier, the password algorithm for Metroid has been reverse-engineered, and you can actually download a program to both generate and interpret such passwords [here](http://games.technoplaza.net/mpg/).

{% img center /img/metroidpassgen.png %}

The profane password is indeed a legitimate password (in which Ridley is already defeated, ironically enough). But why does it crash the game? The [Metroid Password Format Guide](http://games.technoplaza.net/mpg/password.txt) explains the secret:

>  There are five valid start locations. They are specified using bits 64-66.
>   To start in Brinstar, all the bits should be off. Norfair, Kraid's Lair, and
>   Ridley's Lair can be specified by turning their bit on and leaving the others
>   off. Tourian is specified by turning on Norfair and Kraid's Lair
>   simultaneously. Any other combination of these three bits is invalid and will
>   cause Metroid to reset.
>   
>   The reset bit is part of the start location. There are 16 possible values,
>   but only 5 valid ones. Turning on the reset bit will produce and invalid
>   start location and cause Metroid to reset. This is why it is called it is
>   called the reset bit, because it guarantees an invalid password.


For the profane password, the reset bit is turned on, so it will always cause a reset. And that's why the weird behavior happens.

If you manually disable the reset bit using this tool in order to make the password valid, the new password becomes:

{% img center /img/metroidpassgen2.png %}

Not as catchy, unfortunately.

In fact, the Justin Bailey password is also a completely coincidental password. Sometimes, passwords can just do very unexpected things.

[1]: http://en.wikipedia.org/wiki/Ridley_(Metroid)
[2]: http://en.wikipedia.org/wiki/Mother_Brain_(Metroid)