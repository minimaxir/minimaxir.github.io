---
title: "Mapping Where Arrests Frequently Occur in San Francisco Using Crime Data"
date: 2015-12-07T08:00:00-07:00
slug: sf-arrest-maps
categories: [Data Science, Big Data]
tags: [R, ggplot2]
summary: "Let's plot 587,499 arrests on top of a map of San Francisco for fun and see what happens."
cover:
  image: featured.png
  relative: true
  hidden: true
---

In my previous post, [Analyzing San Francisco Crime Data to Determine When Arrests Frequently Occur](http://minimaxir.com/2015/12/sf-arrests/), I found out that there are trends where SF Police arrests occur more frequently than others. By processing the [SFPD Incidents dataset](https://data.sfgov.org/Public-Safety/SFPD-Incidents-from-1-January-2003/tmnf-yvry) from the [SF OpenData portal](https://data.sfgov.org), I found that arrests typically occur on Wednesdays at 4-5 PM, and that the type of crime is relevant to the frequency of the crime. (e.g. DUIs happen late Friday/Saturday night).

However, I could not understand _why_ Wednesday/4-5PM is a peak time for arrests. In addition to analyzing _when_ arrests occur, I also looked at _where_ arrests occur. For example, perhaps more crime happens as people are leaving work; in that case, we would expect to see crimes downtown.

## Making a Map of SF Arrests

Continuing from the previous analysis, I have a data frame of all police arrests that have occurred in San Francisco from 2003 - 2015 (587,499 arrests total).

{{< figure src="arrests.png" theme="light" >}}

What is the most efficient way to make a map for the data? There are too many data points for rendering each point in a tool like [Tableau](http://www.tableau.com) or [Google Maps](https://www.google.com/maps). I can use `ggplot2` again as I did [to make a map of New York City](http://minimaxir.com/2015/11/nyc-ggplot2-howto/) manually, but as noted in that article, the abstract nature of the map may hide information.

Enter `ggmap`. ggmap, an [R package by David Kahle](https://github.com/dkahle/ggmap), is a tool that allows the user to retrieve a map image from a number of map data providers, and integrates seamlessly with ggplot2 for simple visualization creation. Kahle and Hadley Wickham (the creator of ggplot2) [coauthored a paper](https://journal.r-project.org/archive/2013-1/kahle-wickham.pdf) describing practical applications of ggmap.

I will include most of the map generation code in-line. _For more detailed code and output, a [Jupyter notebook](https://github.com/minimaxir/sf-arrests-when-where/blob/master/crime_data_sf.ipynb) containing the code and visualizations used in this article is available open-source on GitHub._

By default, you can ask ggmap just for a location using `get_map()`, and it will give you an approximate map around that location. You can configure the zoom level on that point as well. Optionally, if you need precise bounds for the map, you can set the bounding box manually, and the [Bounding Box Tool](http://boundingbox.klokantech.com) works extremely well for this purpose, with the CSV coordinate export already being in the correct format.

ggmap allows maps from sources such as [Google Maps](https://www.google.com/maps) and [OpenStreetMap](http://www.openstreetmap.org/#map=5/51.500/-0.100), and the maps can be themed, such as a color map of a black-and-white map. A black-and-white minimalistic map would be best for readability. A [Reddit submission by /u/all_genes_considered](https://www.reddit.com/r/dataisbeautiful/comments/3ule41/mapping_restaurants_in_san_francisco_by_health/) used [Stamen maps](http://maps.stamen.com/#terrain/12/37.7706/-122.3782) as a source with the toner-lite theme, and that worked well.

Since we've identified the map parameters, now we can request an appropriate map:

```r
bbox = c(-122.516441,37.702072,-122.37276,37.811818)

map <- get_map(location = bbox, source = "stamen", maptype = "toner-lite")
```

Plotting the map by itself results in something like this:

{{< figure src="sf-arrest-where-0.png" theme="light" >}}

On the right track (aside from two Guerrero Streets), but obviously it'll need some aesthetic adjustments.

Let's plot all 587,499 arrests on top of the map for fun and see what happens.

```r
plot <- ggmap(map) +
            geom_point(data = df_arrest, aes(x=X, y=Y), color = "#27AE60", size = 0.5, alpha = 0.01) +
            fte_theme() +
            theme(...) +
            labs(title = "Locations of Police Arrests Made in San Francisco from 2003 – 2015")
```

- `ggmap()` sets up the base map.
- `geom_point()` plots points. The data for plotting is specified at this point. "color" and "size" parameters do just that. An alpha of 0.01 causes each point to be 99% transparent; therefore, addresses with a lot of points will be more opaque.
- `fte_theme()` is my theme based on the FiveThirtyEight style.
- `theme()` is needed for a few additional theme tweaks to remove the axes/margins
- `labs()` is for labeling the plot (_always_ label!)

Rendering the plot results in:

<a href="http://i.imgur.com/Xu8wXzc.png" target=_blank>{{< figure src="sf-arrest-where-1.png" theme="light" >}}</a>

_NOTE: All maps in this article are embedded at a lower size to ensure that the article doesn't take days to load. To load a high-resolution version of any map, click on it and it will open in a new tab._

_Additionally, since ggmap forces plots to a fixed ratio, this results in the "random white space" problem mentioned in the NYC article, for which I still have not found a solution, but have minimized the impact._

It's clear to see where arrests in the city occur. A large concentration in the Tenderloin and the Mission, along with clusters in Bayview and Fisherman's Wharf. However, point-stacking is not helpful when comparing high-density areas, so this visualization can be optimized.

How about faceting by type of crime again? We can render a map of San Francisco for each type of crime, and then we can see if the clusters for a given type of crime are different from others.

```r
plot <- ggmap(map) +
            geom_point(data = df_arrest %>% filter(Category %in% df_top_crimes$Category[2:19]), aes(x=X, y=Y, color=Category), size=0.75, alpha=0.05) +
            fte_theme() +
            theme(...) +
            labs(title = "Locations of Police Arrests Made in San Francisco from 2003 – 2015, by Type of Crime") +
            facet_wrap(~ Category, nrow = 3)
```

Again, only one line of new code for the facet, although the source data needs to be filtered as it was in the previous post.

Running the code yields:

<a href="http://i.imgur.com/6NgzV3k.jpg" target=_blank>{{< figure src="sf-arrest-where-2.png" theme="light" >}}</a>

This is certainly more interesting (and pretty). Some crimes, such as Assaults, Drugs/Narcotics, and Warrants, occur all over the city. Other crimes, such as Disorderly Conduct and Robbery, primarily have clusters in the Tenderloin and in the Mission close to the 16th Street BART stop. (Prostitution notably has a cluster in the Mission and a cluster _above_ the Tenderloin.)

Again, we can't compare high-density points, so now we should probably normalize the data by facet. One way to do this is to weight each point by the reciprocal of the number of points in the facet (e.g. if there are 5,000 Fraud arrests, assign a weight of 1/5000 to each Fraud arrest), and aggregate the sums of the weights in a geographical area.

We can reuse the normalization code from the previous post, and the hex overlay code from my NYC taxi plot post as well:

```r
sum_thresh <- function(x, threshold = 10^-3) {
    if (sum(x) < threshold) {return (NA)}
    else {return (sum(x))}
}

plot <- ggmap(map) +
            stat_summary_hex(data = df_arrest %>% filter(Category %in% df_top_crimes$Category[2:19]) %>% group_by(Category) %>% mutate(w=1/n()), aes(x=X, y=Y, z=w), fun=sum_thresh, alpha = 0.8, color="#CCCCCC") +
            fte_theme() +
            theme(...) +
            scale_fill_gradient(low = "#DDDDDD", high = "#2980B9") +
            labs(title = "Locations of Police Arrests Made in San Francisco from 2003 – 2015, Normalized by Type of Crime") +
            facet_wrap(~ Category, nrow = 3)
```

- `sum_thresh()` is a helper function that aggregates the sums of weights, but will not plot the corresponding hex if there is not enough data at that location.
- `scale_fill_gradient()` sets the gradient for the chart. If there are few arrests, the hex will be gray; if there are many arrests, it will be deep blue.

Putting it all together:

<a href="http://i.imgur.com/LXKPseq.jpg" target=_blank>{{< figure src="sf-arrest-where-3.png" theme="light" >}}</a>

This confirms the interpretations mentioned above.

Since the code base is already created, it is very simple to facet on any variable. So why not create a faceted map for _every conceivable variable_?

How about checking arrest locations by Police Districts?

<a href="http://i.imgur.com/i82wsIZ.png" target=_blank>{{< figure src="sf-arrest-where-4.png" theme="light" >}}</a>

The map shows that the hex plotting works correctly, at the least. Notably, the Central, Northern, and Southern Police Districts end up making a large proportion of their arrests nearby the Tenderloin/Market Street instead of anywhere else in their area of perview.

Is the location of arrests seasonal? Does it vary by the month the arrest occured?

<a href="http://i.imgur.com/u2eQMZf.png" target=_blank>{{< figure src="sf-arrest-where-5.png" theme="light" >}}</a>

Nope. Still Tenderloin and Mission.

Maybe the locations of arrests have changed over time, as legal polices changed. Let's facet by year.

<a href="http://i.imgur.com/x4SRnkU.png" target=_blank>{{< figure src="sf-arrest-where-6.png" theme="light" >}}</a>

Here things are _slightly_ different across each facet; Tenderloin had a much higher concentration of arrests peaking in 2009-2010, and the concentration of yearly arrests in the Tenderloin has decreased relative to everywhere else in the city.

Does the location of arrests vary by the time of day? As noted earlier, there could be more arrests downtown during working hours.

<a href="http://i.imgur.com/cDKo8Lt.png" target=_blank>{{< figure src="sf-arrest-where-7.png" theme="light" >}}</a>

Higher relative concentration in Tenderlion/Mission during work hours, lesser during the night.

Last try. Perhaps the day of week leads to different locations, especially as people tend to go out to bars all across the city.

<a href="http://i.imgur.com/tNBRilL.png" target=_blank>{{< figure src="sf-arrest-where-8.png" theme="light" >}}</a>

_Zero_ difference. Eh.

We did learn that there is certainly a lot of arrests in the Tenderloin and 16th Street/Mission BART stop, though. However, that doesn't necessarily mean there is more _crime_ in those areas (correlation does not imply causation), but it is something worth noting when traveling around the San Francisco.

## Bonus: Do Social Security payments lead to an increase in arrests?

In response to my previous article, [Redditor /u/NowProveIt hypothesizes](https://www.reddit.com/r/sanfrancisco/comments/3vfgg2/analyzing_san_francisco_crime_data_to_determine/cxn29wd) that the spike in Wednesday arrests could be attributed to [Social Security disability](https://www.ssa.gov/kc/rp_paybenefits.htm) (RDSI) payments. The [Social Security Benefit Payments schedule](https://www.socialsecurity.gov/pubs/EN-05-10031-2015.pdf) is typically every second, third, and fourth Wednesday of a month.

Normally, you would expect that the arrest behavior for any Wednesday in a given month to be independent from each other. Therefore, if the arrest behavior for the _first_ Wednesday is different than that for the secord/third/fourth Wednesday (presumably, the First Wednesday has fewer arrests overall), then we might have a lead.

Through more `dplyr` shenanigans, I am able to filter the dataset of arrests to Wednesday arrests only, and classify each Wednesday as the first, second, third, or fourth of the month. (there are occasionally fifth Wednesdays but no one cares about those).

{{< figure src="ordinal.png" theme="light" >}}

We can plot a single line chart for each ordinal of the number of arrests over the day. We are looking to see if the First Wednesday has different behavior than the other Wednesdays.

{{< figure src="ssi-crime-1.png" theme="light" >}}

...and it doesn't.

Looking at locations data doesn't help either.

<a href="http://i.imgur.com/wTDKjOm.png" target=_blank>{{< figure src="ssi-crime-2.png" theme="light" >}}</a>

Oh well, it was worth a shot.

As always, all the code and raw images are available [in the GitHub repository](https://github.com/minimaxir/sf-arrests-when-where). Not many more questions were answered by looking at the location data of San Francisco crimes. But that's OK. There's certainly other cool things to do with this data. Kaggle, for instance, is creating [a repository of scripts](https://www.kaggle.com/c/sf-crime/scripts) which play around with the Crime Incident dataset.

But for now, at least I made a few pretty charts out of it.

---

_If you use the code or data visualization designs contained within this article, it would be greatly appreciated if proper attribution is given back to this article and/or myself. Thanks!_
