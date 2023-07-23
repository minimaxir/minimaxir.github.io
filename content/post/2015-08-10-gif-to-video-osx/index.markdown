---
layout: "post"
title: "Making a Video-to-GIF Right-Click Menu Item in OS X"
categories: [Tools]
published: false
date: 2015-08-13T08:00:00-07:00
slug: gif-to-video-osx
summary: "The terminal commands for making GIFs are very generic. What if I could easily automate these steps for any video on my Mac?"
cover:
  image: featured.png
  relative: true
  hidden: true
---

_TL;DR: To set up the Convert Video to GIF tool, download the "Convert Video to GIF" Service [from this GitHub Repository](https://github.com/minimaxir/video-to-gif-osx) and follow the install instructions in the README._

Last weekend, I was working on making a [Big List of Naughty Strings](https://github.com/minimaxir/big-list-of-naughty-strings) for user-data testing. (now up to 4,000+ GitHub Stars!) For the README, I needed a visual example to demonstrate why testing bad strings is important. I easily made a video of an internal server error on Twitter using [Quicktime](http://www.apple.com/quicktime/) and its [Screen Recording feature](https://support.apple.com/kb/PH5882?locale=en_US) to record, crop, and trim the event. But videos cannot render on GitHub; only GIFs can. And ideally I would not include a 807KB file everytime a user loads the GitHub page.

Websites that offer online Video-to-GIF converters are often seedy and create low quality, low frame-rate GIFs. I did some research and eventually I tried [Gifrocket](http://www.gifrocket.com), a recently-released tool that promises effortless drag-and-drop video-to-GIF-conversion.

![](/img/video-to-gif-osx/zerowidthedit_gifrocket.gif)

The quality is not terrible, although the ghosting is _weird_, and the framerate is choppy when the cursor moves. Unfortunately, I can't optimize any settings. File Size is 534KB, which is a slight compression but not great.

As a result, I gave [MoviePy](http://zulko.github.io/moviepy/), a Python API for manipulating videos another try, as I had used it for other posts on this blog to [good](http://minimaxir.com/2014/02/moved-temporarily/) [success](http://minimaxir.com/2014/03/hashtag-tag/). However, I had to shrink them significantly to keep load times down; something I would prefer not to do with my internal server error GIF in order to maximize readability. On the [blog post announcing GIF support](http://zulko.github.io/blog/2014/01/23/making-animated-gifs-from-video-files-with-python/), the core developer [relayed an interesting comment](http://zulko.github.io/blog/2014/01/23/making-animated-gifs-from-video-files-with-python/#comment-1216274781) from another reader that "mencoder/ImageMagick/gifsickle is a winning trio for Gif making."

I've heard of ImageMagick before: it's the tool that drives nearly all image manipulation on the internet (it's also what Gifrocket uses). But what was mencoder and gifsickle?

Some searching led to this [2012 Reddit comment](https://www.reddit.com/r/reactiongifs/comments/x55z9/after_i_learned_how_to_make_large_well_compressed/c5jbq7c) in the /r/reactiongifs subreddit. That's where everything clicked.

## Shell Games

The linked Reddit post conveiently uses the same three tools by the commenter on MoviePy. I ran the terminal commands on my video, with a little tweaking.

The first command uses the `mencoder` functionality of [mplayer](http://www.mplayerhq.hu/design7/news.html) to render each frame of the video to PNGs:

```bash
mplayer -ao null -vo png:z=1:outdir=gif -vf scale=608:454 zerowidthedit.mov
```

I set the size to a width of 608px since it was exactly 50% of the width of the raw video, but I could set it to whatever I want, although it would be ideal to keep the aspect ratio the same.

The second command uses [ImageMagick](http://www.imagemagick.org/script/index.php)'s famously robust `convert` comand to convert the rendered frames in to a GIF, with two optimization passes for lower file size and ~16.6ms delay, which is equivalent to 60 frames per second.

```bash
convert +repage -fuzz 1.6% -delay 1.7 -loop 0 gif/*.png -layers OptimizePlus -layers OptimizeTransparency Almost.gif
```

This results in a 156KB image; much, much better than the 534KB from Gifrocket, and at a much higher framerate too.

Lastly, the GIF is further optimized with [gifsicle](http://www.lcdf.org/gifsicle/), which also limits the color pallete to 256 colors for even lower file size.

```bash
gifsicle -O3 --colors 256 Almost.gif > Done.gif
```

This results in a 107KB KB, a 31% savings over the already-optimized GIF, without any discernable loss! Here is the final result:

![](/img/video-to-gif-osx/zerowidthedit_final.gif)

Much, _much_ better. No ghosting, 60 FPS, 1/8th of the original video file size, and 1/5th of the file size of the Gifrocket GIF!

Then I realized; aside from the output GIF resolution in from `mencoder`, the terminal commands for making GIFs are very generic. What if I could easily automate these steps for any video on my Mac?

## Full Automatic

I decided to make a OS X [Service](http://www.computerworld.com/article/2476298/mac-os-x/os-x-a-quick-guide-to-services-on-your-mac.html), which can be used to automate actions for a specified file type in the form of a right-click menu option. Services can be created using [Automator](https://en.wikipedia.org/wiki/Automator_%28software%29), which is included in all OS X installations. In my case, I want to create a Service for movie files; and when the Service runs, it should Run a Shell Script with the above three commands.

![](/img/video-to-gif-osx/service.png)

After writing the script, which incorporates a maximium GIF width of 480px and will resize larger GIFs to that size while maintaining the aspect ratio, the Service is complete and I can right-click any Movie file and get an optimized GIF!

![](/img/video-to-gif-osx/convert_to_gif.gif)

Yes, even a 41.6MB 720p video file, which most GIF converter sites would never let you upload, becomes a [relatively reasonable 1.3MB GIF](http://i.imgur.com/0dU3A6o.gif)!

This approach also has an unexpected benefit; the script support batch conversion, meaning you can convert as many videos as you want at the same time!

As usual, my code is [open sourced on GitHub](https://github.com/minimaxir/video-to-gif-osx) with a MIT license, with instructions on how to set up the tool. The repository also includes two bonus utilities; a Shell Script to run the conversion from the command line and an Application which prompts you for movie files instead of needing to right-click. Install the three command-line applications and convert away! Or fork the repository and make an even _better_ Video-to-GIF conversion tool!
