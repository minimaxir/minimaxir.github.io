---
layout: post
title: "The Wikipedia Entries Which Are Most-Edited by Members of the U.S. Congress"
date: 2014-07-15 8:30
comments: true
categories: [Data, Comedy]
summary: "Saying that the results were surprising would be the understatement of the century."
image: senate-wikipedia.png
---

Last week, the Twitter account [@congressedits](https://twitter.com/congressedits) launched. This account is a bot that tweets edits to Wikipedia that were made by members of the U.S. Congress, in order to help [facilitate transparency](http://inkdroid.org/journal/2014/07/10/why-congressedits/). The account [works](https://github.com/edsu/anon) by automatically tweeting any Wikipedia edits made by anonymous contributors with IP addresses between the known IP address blocks of the [U.S. Senate](http://whois.arin.net/rest/org/USSAA/nets) or the [House of Representatives](http://whois.arin.net/rest/org/ISUHR/nets).

Google's [BigQuery](https://developers.google.com/bigquery/) tool has a [sample dataset](https://developers.google.com/bigquery/docs/dataset-wikipedia) of Wikipedia data, representing the data on 314 million article edits up to April 2010. Out of curiosity, I wrote a query which returns the top 100 pages with the most amount of edits by Wikipedia contributors in the U.S. Senate's IP block.

{% img /img/caucus-needed/senate-query.png %}

Using this query for the Senate's IP block, and a similar one for the House of Representatives IP blocks, I retrieved the most-edited entries for both entities. You can access the spreadsheet of this data by [downloading a .pdf](https://dl.dropboxusercontent.com/u/2017402/Congress_Wikipedia_Edits.pdf) or by viewing the data online with [Numbers for iCloud](https://www.icloud.com/iw/#numbers/BALY8siqBP4jYZq5E2OB20P-wlPpyXdycqqF/Congress_Wikipedia_Edits), both of which contain high-resolution charts and clickable Wikipedia links. A [Google Sheets](https://docs.google.com/spreadsheets/d/1qfFEwzNzc4KL4gqe2i4IoMO0ksmoYndCK0O0m46n37I/edit?usp=sharing) version is also available.

Here are the Top 10 Wikipedia entries with the most amount of edits by members of the Senate:

{% img /img/caucus-needed/senate-wikipedia.png %}

Wait a minute. Hawk from G.I. Joe?!

Saying that the query results were surprising would be the understatement of the century.

Two of the top-edited entries are directly pertaining to the U.S. Senate, which helps prove that the IP block is indeed the Senate's IP block. Both Kappa Upsilon Chi and [Beta Upsilon Chi](http://en.wikipedia.org/wiki/Beta_Upsilon_Chi) are Christian fraternities. (however, the Kappa Upsilon Chi Wikipedia entry no longer exists for some reason)

The edits corresponding to actual people are ones which are the most interesting. [William Swain Lee](http://en.wikipedia.org/wiki/William_Swain_Lee) is a Delaware politician whose entry was [created and edited](http://en.wikipedia.org/w/index.php?title=William_Swain_Lee&diff=prev&oldid=31202175) by a [user in the Senate IP block](http://en.wikipedia.org/wiki/Special:Contributions/156.33.148.107). OrangePie is  a user who, [according to his talk page](http://en.wikipedia.org/wiki?curid=7319910), was criticized for repeatedly recreating an entry for "Michael Hardaway" after deletion, who coincidentally worked for the Senate [according to his Twitter bio](https://twitter.com/michaelhardaway). In journalist [Paul D. Thacker's](http://en.wikipedia.org/wiki?curid=8593106) entry, one Senate editor [replaced a paragraph](http://en.wikipedia.org/w/index.php?title=Paul_D._Thacker&diff=311839513&oldid=311689066) of Thacker's biography with the word "anus?". Jay Rockefeller is an [actual U.S. Senator](http://en.wikipedia.org/wiki?curid=337026), so the edits are definitely a conflict of interest. The [user who made the edits](http://en.wikipedia.org/wiki/Special:Contributions/156.33.96.28) apparently also removed [information about a government investigation](http://en.wikipedia.org/w/index.php?title=Jay_Rockefeller&diff=prev&oldid=33857327) into the Senator.

I have nothing to add for [Hawk from G.I. Joe](http://en.wikipedia.org/wiki?curid=2814171).

Other interesting frequently-edited Wikipedia entries from members of the U.S. Senate are [Primetime Emmy Award for Outstanding Supporting Actor – Comedy Series](http://en.wikipedia.org/wiki?curid=3626593) (11 edits), [Wikipedia:Introduction](http://en.wikipedia.org/wiki?curid=1226609) (5 edits) and [Crash (2004 film)](http://en.wikipedia.org/wiki?curid=1749535) (5 edits)

The Wikipedia entries with the most amount of edits by members of the House of Representatives are somehow even *weirder*, and that's quite an accomplishment.

{% img /img/caucus-needed/house-wikipedia.png %}

Well, if *anyone* in the entire United States would be experts on the topics of [cleft chins](http://en.wikipedia.org/wiki?curid=2352587) and [dimples](http://en.wikipedia.org/wiki?curid=1924543), it would be the members of the House of Representatives.

Again, one of the most-edited entries corresponds to a House of Representatives topic, which helps validate the IP blocks. The [Cerritos, California](http://en.wikipedia.org/wiki?curid=107610) location had [neutral edits](http://en.wikipedia.org/w/index.php?title=Cerritos,_California&diff=21384826&oldid=21363395) made by a [rather dedicated Wikiuser](http://en.wikipedia.org/wiki/Special:Contributions/143.231.249.141). Wynne, Arkansas and Michelle Ye's edits were made by the same dedicated Wikiuser. [Waverly, Pennsylvania](http://en.wikipedia.org/wiki?curid=1143590) was edited by a [user](http://en.wikipedia.org/wiki/Special:Contributions/137.18.255.33) who's [really passionate about Doc's Deli](http://en.wikipedia.org/w/index.php?title=Waverly,_Pennsylvania&diff=7763793&oldid=7761053). [Luis Fortuno](http://en.wikipedia.org/wiki?curid=1129560), former governor of Puerto Rico, had his [history excised](http://en.wikipedia.org/w/index.php?title=Luis_Fortu%C3%B1o&diff=prev&oldid=134653411) by [another user](http://en.wikipedia.org/wiki/Special:Contributions/143.231.249.137). [Betty Sutton](http://en.wikipedia.org/wiki?curid=6260346), however, is a actual Representative from Ohio, representing another conflict of interest, as another [user](http://en.wikipedia.org/wiki/Special:Contributions/143.228.129.9) constructed [most of her entry](http://en.wikipedia.org/w/index.php?title=Betty_Sutton&diff=303743778&oldid=296652449).

I have nothing to add regarding [effeminacy](http://en.wikipedia.org/wiki?curid=862471) in the House of Representatives.

Other interesting edits by members of the House include [Apocalypse Now](http://en.wikipedia.org/wiki?curid=18951054) (10 edits), [History of Italy as a monarchy and in the World Wars](http://en.wikipedia.org/wiki?curid=1161298) (9 edits), and [Whitney Houston](http://en.wikipedia.org/wiki?curid=34071) (9 edits)

In the end, the members of the U.S. Congress have the same peculiar interests as typical Americans. However, when these people edit entries on topics in which they are directly involved, the potential bias threatens the integrity of all Wikipedia. And this is just the tip of the iceburg.