---
title: "When Uninstalling A PC Game Erases the Entire Hard Drive"
date: 2013-06-05T08:00:00-07:00
slug: working-as-intended
comments: true
categories: [Gaming, Journalism]
summary: "A poorly coded PC game uninstaller could delete not just the game, but the *entire hard drive*. That would be a problem."
cover:
  image: featured.jpg
  relative: true
  hidden: true
---

There are many legitimate reasons for users to uninstall programs on their computer, such as freeing hard-disk space and lowering CPU overhead. A decade ago, when excessive hard-drive space was a luxury, avid PC gamers would frequently uninstall large, multi-gigabyte games that they were no longer playing in order to make space for new games.

Obviously, developers would prefer that their users not uninstall the software that they spent years creating. Regardless, developers should ensure that the uninstall process works properly.

Otherwise, a poorly coded PC game uninstaller could delete not just the game, but the _entire hard drive_. That would be a problem.

## Ragnarok

{{< figure src="pennyarcademyth2.jpg" caption="http://www.penny-arcade.com/comic/1999/01/06">}}

In late 1998, Bungie (which would later create the [Halo](http://www.halowaypoint.com/en-us/) series) released [Myth II: Soulblighter](http://mythipedia.wikia.com/wiki/Myth_II:_Soulblighter) for Windows. Myth II, a real-time tactics game, was received with great reception and highly-positive reviews.

But before the worldwide release, a Bungie employee [uninstalled version 1.0](http://halo.bungie.net/inside/history.aspx?link=juggernougat) of Myth II, and afterwards, her PC refused to reboot:

> It was discovered by a very nice young lady in a Japanese office as she worked on the Asian versions of Myth – just as she was trying out the final build. She attempted to uninstall it from the main root folder of her hard drive – not brilliant, but pretty common practice – and perfectly fine for most games. The game proceeded to eat her hard drive like a fresh Bento Box.

The Myth II Uninstaller worked by deleting the folder which contained the game files. However, this implementation assumed that the user installed Myth II in the default directory. (i.e. C:\Program Files\Myth II). If the user installed Myth II in a _different_ directory, such as the _system root C:\\_, then when the user uninstalled the game, **all the files in the C drive were deleted.** Boom.

As Bungie later explained [in a press release](http://www.macobserver.com/news/98/december/981229/bungierecall.html):

> In certain unusual cases, using the Uninstaller can cause problems. If a user chooses an installation directory other than the default directory, they should NOT use the Uninstaller but should manually drag the Myth II folder into the Recycle bin and delete it.
>
> Anyone who has the game but has not yet installed it is asked to wait for a new version of the Installer which we will release shortly. If you have already installed the game, there is no harm in playing it, but players should be careful not to use the Uninstall executable. If you have already Uninstalled and not experienced obvious problems, there is nothing to worry about.

Calling the potential obliteration of an operating system a "problem" is an understatement.

Although the issue was not widespread, Bungie decided to do a recall of all Myth II CDs and redistribute a version 1.1, eliminating most of the game's profits in the process.

You could say that the Myth II version 1.0 uninstaller worked exactly as intended: it did indeed uninstall the game. It just worked _too_ well.

---

**UPDATE October 2014**: A year after this article was posted, someone submitted this article to the Reddit subreddit [todayilearned](http://www.reddit.com/r/todayilearned/), where it [subsequently went viral](http://www.reddit.com/r/todayilearned/comments/2ka43x/til_that_in_the_game_myth_ii_soulblighter_due_to/). In the comments, Reddit user rdmartell, a [former developer at Bungie](https://www.freelancer.com/u/rdmartell.html), posted more insight into the glitch:

> So I wrote the Myth TFL installer (not this one). The reason this happened is because you could install other maps and whatnot, and to make the uninstall clean, we had to recursively delete your data folder.
> In the sequel, somehow that code (which did sanity checks) was used to delete the applications directory, instead of just the data directory in the applications directory.
> So if you installed it on C:/, it would delete everything recursively from there.
> Nowadays, uninstall usually leaves any user installed files (like saves or downloaded content) but at the time, as the article suggests, hard drive space was more precious. Also, I wasn't there for this issue, so I don't know the above for sure, but having written the previous installer, I'm pretty confident that's what happened.

Later in the thread:

> I actually think the bug was only there if you installed directly to root; not even in a folder. As I recall, that was the only way it deleted your entire HDD.
> Unless it was discovered later by going into the uninstalled code that it could happen in other cases (which I never heard about), I think the issue was a bit overblown by the media. Still, the last thing you want to be responsible for is nuking a customer's hard drive.

Small world.
