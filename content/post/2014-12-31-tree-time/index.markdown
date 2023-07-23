---
title: "Locating All the Christmas Trees on Instagram"
date: 2015-01-01T09:00:00-07:00
slug: tree-time
categories: [Data Science]
tags: [R, ggplot2, GeoViz]
summary: "I downloaded *hundreds of thousands* of #tree images and found 25,432 images which were taken on Christmas, have a #tree, and, most importantly, contain location data where the photo was taken."
cover:
  image: featured.png
  relative: true
  hidden: true
---

Everyone enjoys taking photos of their Christmas trees, usually at their own home of their relatives. [Instagram](http://instagram.com/) allows users to quickly upload any photo and share it socially to the world. On Christmas Eve, privacy author Tommy Collison [published a warning about this behavior](http://www.tommycollison.com/blog/2014/12/24/christmas-geotagging), noting that if a user tags a photo with #tree to tag their Christmas tree, for example, _anyone_ will be able to see it, and if the user attached their location to the photo, anyone could theoretically find where they live.

How practical is this concern? Instagram [offers an API](http://instagram.com/developer/) of all recent photos for a given #tag so developers can download pictures and their corresponding metadata, such as geolocation, in bulk. (Up to _165,000_ Instagram images can be processed per hour!)

I downloaded _hundreds of thousands_ of #tree images and found 25,432 images which were taken on Christmas, have a #tree, and, most importantly, contain location data where the photo was taken. From that, I created an [interactive map](https://www.google.com/fusiontables/DataSource?docid=1J3RQB6MuFbZvA_WcCVHlKAzDBUppxFBQ3LA054RL) showing the location of all these images worldwide using [Google Fusion Tables](https://support.google.com/fusiontables/answer/2571232?hl=en). You can click-and-drag to move the map all over the world, and you can click on a marker on the map to see the Instagram image taken at that location! (note that if you're on a mobile device, the embedded map may work better on a desktop browser)

I found a few interesting things while playing with this map.

## Christmas Trees in the USA

A downside of the interactive map is that quantifying the relative number of photos between dense areas (e.g. cities) can be misleading as the opaque markers overlap. Here is a static map of all of the Instagram photos in the United States, with each translucent point representing an image:

{{< figure src="instagram_treemap_state.png" theme="light" >}}

The number of photos is densest near the large cities, which is what you would expect.

A way to calculate the relative proportion of the number of #tree photos between states is to use a type of chart known as a [treemap](http://en.wikipedia.org/wiki/Treemapping) (pun _very_ much intended).

{{< figure src="treemap-state.png" theme="light" >}}

In this treemap, the relative area of each block corresponds to the number of photos taken in the state; therefore, the combination of all the blocks represents 100% of the #tree photos taken in the USA. If two blocks are the same size (e.g. New York and Florida), then they have the same number of #tree photos.

As you may have noticed from these two charts, these data represented by these two charts is approximately the same as the [population density in the United States](http://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population). Although this touches on the [infamous statistical problem](http://xkcd.com/1138/) of heat maps resembling population maps, in this case, it's what would be expected.

Looking at all the #tree photos in the world may tell a different story.

## Christmas Trees in the World

Christmas is a holiday for only one religion with a [low presence in Asia and northern Africa](http://en.wikipedia.org/wiki/Christianity_by_country), so it would be expected that the locations of Christmas trees worldwide do _not_ correlate with population, which makes the analysis more interesting.

{{< figure src="instagram_world_map.png" theme="light" >}}

The prevalence of Christmas trees is most prominent in the United States and Europe, with relatively few in Asia, where the majority of the world's population is located. Italy has Christmas trees _uniformly_ throughout the entire country, which is an interesting behavior.

{{< figure src="treemap-world.png" theme="light" >}}

The treemap confirms that Asian and African countries like China, India, and Nigeria do not have as many Christmas trees than [what their large populations would suggest](http://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population). Italy, however has a [population of 60 million](http://en.wikipedia.org/wiki/Demographics_of_Italy) (the same as the United Kingdom) which is about 1/5th of the population of United States; the fact that Italy has more than half of the number of Christmas Trees than the United States is very unusual and should be questioned.

Italy _may_ have a high number of Christmas trees since Vatican City is the seat of the papacy, but perhaps data _itself_ should be questioned too.

## "Christmas Trees" in the World

If you check the photos in Italy, you many notice that many of them have a photo caption similar to this one:

{{< figure src="christmas_tagsforlikes.png" >}}

There's obviously no Christmas tree in that photo. But there are a _lot_ of tags.

Many Instagram photos use a service called [TagsForLikes](http://www.tagsforlikes.com/), which complies a list of popular hashtags that other users are able to see. Users can then then copy/paste them into the photo caption to spam hashtags increase the photo exposure, which, as I've shown [in a previous blog post](http://minimaxir.com/2014/03/hashtag-tag/), does in fact increase the number of Likes the photo receives from other users.

{{< figure src="tags4likes.png" theme="light" >}}

Notice a resemblance between this list and the photo caption?

Fortunately, all the TagsForLikes hashtag lists contain #TagsForLikes as a branding trick, which makes such photos extremely easy to detect. Here's what the world map looks like if all the potentially spam photos were colored red:

{{< figure src="instagram_world_spamnonspam.png" theme="light" >}}

Italy looks a _lot_ different now! There is red in other counties, but it's not easily visible at a glance.

The treemap of photos, when seperated between spam and non-spam photos, tells the full story:

{{< figure src="treemap-spam-nonspam.png" theme="light" >}}

About 20% of all the #tree photos are spam photos, and about half of those were taken by people in Italy. As a result, Italy has _more spam #tree photos than nonspam #tree photos!_ This is an interesting cultural phenomenon that I have no guesses as to why it occurs. All other countries have significantly smaller numbers of spam photos relatively non-spam photos.

For non-spam photos, the number of #tree photos in Italy now matches the number of non-spam photos in the UK, which correlates with their populations, making the removal of spam photos a sane move.

Is it possible to track people in their homes via Instagram tags? Definitely. If you do care privacy and your Instagram account is not set to Private, I recommend not geotagging your photos. If you're interested in looking at such photos, ensure that the the tag is relevant for the given photo.

---

_All graphics were generated using R. The maps were created using [ggplot2](http://ggplot2.org/) and the world map provided with the [rworldxtra](http://cran.r-project.org/web/packages/rworldxtra/index.html) package. The treemaps were created using the [treemap](http://cran.r-project.org/web/packages/treemap/index.html) package._

_The source data is included with a seperate tab in Google Fusion Tables [along with the interactive map](https://www.google.com/fusiontables/DataSource?docid=1J3RQB6MuFbZvA_WcCVHlKAzDBUppxFBQ3LA054RL)._
