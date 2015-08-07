---
layout: post
title: "Creating a Startup Promo Video Using... PowerPoint?"
date: 2012-12-29 21:28
comments: true
categories: [Startups, Hacks]
summary: "PowerPoint video creation is feasible if you don\'t have or can'\t afford dedicated video software and need a promo video in a pinch, as may be the case with an actual startup."
image: "filtrzzz-ppt.png"
---

I noticed deep in the documentation for PowerPoint 2010 that it [supports video output][1] for presentations. Like a good nerd, I experimented to see what it could actually do. My first test of the functionality was a humor video about pitching a [hypothetical startup named NegaCycl][2], complete with animation and narration, which I trashed and eventually retooled because I'm bad at verbal comedic delivery. Interestingly, the output video was a 1:1 comparison to what was displayed on my own computer screen during the presentation. Naturally, I decided to test it even harder.

What I have here is another hypothetical, non-real startup named Filtrzzz (based on a [popular Facebook post][3] I made), animated and rendered using PowerPoint, with more complicated objects such as embedded audio and video, and an attempt to sync the presentation timing with the audio for dramatic effect. Plus sarcastic humor, of course.

PowerPoint video creation is feasible if you don't have or can't afford dedicated video software and need a promo video in a pinch, as may be the case with an actual startup.

<!-- more -->

{% youtube s2ZajsuPomg %}

The Filtrzzz video relies heavily on slide transitions (the "zoom" effects at the beginning), text animations (the fade in/fade out on the text at the end), and embedding of media (the background song and the product demos), all of which are very easy to implement, although as with any video, a little trial-and-error is necessary to get a good "feel" for effect duration, effect intensity, etc.

PowerPoint has the native ability to record timings (i.e. when to progress to the next slide/animation) and voice narrations on a per-slide basis in the Slide Show tab. You can either record the timings while running through a presentation normally (good for maintaining a consistent pace through animations), or record *ad hoc* per slide (good for voice narration, which is independent from other slides). If timings and narrations are present, when the presentation runs, it will use those timings and play in auto-pilot. When the presentation is exported as a video, it will follow these timings and include the spoken narrations.

The maximum quality output for video through PowerPoint is 720p WMV, which is sufficient for a startup video since users likely are watching the video YouTube-embedded in a webpage. For comparison, I video-captured the presentation using Camtasia at 1080p and rendered the final video as a high-bit rate MP4: the visual quality between the two versions is indistinguishable at non-full screen resolutions. (when watching a video in 1080p at small sizes, the quality is actually even worse!)

You can see the 1080p MP4 version of the Filtrzzz video [here][5].

If you're developing a startup promo video where you narrate a description of your product, include a few pictures, and add a few animations/transitions for added flare, PowerPoint videos might be an option to consider. At the least, it's a good introduction to those looking to break into organized video production.

* * *

*By the way, Filterzzz would never work as a real product (nor would I ever publicly post hypothetical startups that could actually be feasible business ideas) for a few reasons:*

1.  *The way the filters work depends on the internal design of the webpage. Since many websites have highly maverick designs, the filter isn't guaranteed to work 100% on all websites.*
2.  *As you saw in the video, the performance impact of the filters on browser speed varies, at least with my implementation. The performance would need to be consistent among all websites in order to avoid user outrage.*
3.  *The biggest point: reading text on a filtered background for long periods of time **hurts eyes**. Any startup which tried to promote this business idea would be sued into bankruptcy within a month.*

*Per #3 and the personal liability it poses, I won't be releasing my source code for the filters, but you can easily create your own by using the [Stylish extension for Chrome][6] and implementing [CSS filters][7] into a style.*

 [1]: http://office.microsoft.com/en-us/powerpoint-help/turn-your-presentation-into-a-video-HA010336763.aspx
 [2]: http://minimaxir.com/2012/12/totally-real-totally-serious/
 [3]: http://www.facebook.com/photo.php?fbid=10151356495205450&set=a.432190050449.225968.582270449&type=1
 [4]: http://i0.wp.com/minimaxir.com/wp-content/uploads/2012/12/filtrzzz-ppt.png?resize=625%2C288
 [6]: https://chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en
 [7]: http://www.html5rocks.com/en/tutorials/filters/understanding-css/  