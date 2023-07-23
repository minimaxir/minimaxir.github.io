---
title: "How Many #nofilter Instagram Photos Actually Have No Filter?"
date: 2014-02-10T08:00:00-07:00
slug: the-filter-truth
categories: [Data Science, Comedy]
tags: [R, ggplot2]
summary: "Not all of them."
cover:
  image: nofilter.png
  relative: true
  hidden: true
---

Most [Instagram](http://instagram.com/) photos have filters applied to make them look more retro/cool. Instagram users are also able to apply tags to a photo to help categorize and promote them to the Instagram community. One such tag, #nofilter, is intended to emphasize such natural beauty that no filter is necessary to enhance the image. (or the photographer is just too lazy to decide on a filter)

But how many #nofilter images actually _have_ no filter?

As it turns not, not all of them.

After retrieving about 50,000 images through the Instagram API (code [available on GitHub](https://github.com/minimaxir/get-data-from-photos-from-instagram-tags)), here is the breakdown of filters on #nofilter-tagged Instagram images:

{{< figure src="nofilter.png" theme="light" >}}

Only 83% of #nofilter images have no filter?! You had one job, Instagram! :(

---

_The actual reason that this is happening is because Instagram rewards #tagspamming. More on that in a future blog post._
