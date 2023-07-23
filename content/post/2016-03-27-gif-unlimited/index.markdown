---
title: "Unlimited Data Storage Using Image Steganography and Cat GIFs"
date: "2016-03-29T08:00:00-07:00"
published: false
slug: gif-unlimited
categories: ["Idea", "Comedy", "Genius"]
summary: "tl;dr I was bored and decided to create infinite data in a way that makes people feel fuzzy inside."
cover:
  image: featured.png
  relative: true
  hidden: true
---

<span><style>
.suspicious-pregnant-pause {
padding: 60px 0;
}
</style></span>

In 2016, animated GIFs are absurdly popular. [Facebook Messenger](https://www.messenger.com), [Twitter](https://twitter.com), and [Slack](https://slack.com) now natively support GIF sharing, and startups which help facilitate GIF sharing such as [Giphy](http://giphy.com) and [Riffsy](https://www.riffsy.com) have received [_tens of millions_ of dollars](https://www.crunchbase.com/organization/giphy) in venture capital. I even built my own tool to [convert a video to a GIF](https://github.com/minimaxir/video-to-gif-osx) on OSX because [I wanted to be cool](http://minimaxir.com/2015/08/gif-to-video-osx/) too.

{% comment %}
For Reddit, the market share of GIFs (and its cousin GIFV, a wrapper created by Imgur to make GIFs more bandwidth-efficient) has been increasing over the years relative to other file formats such as PNG and JPEG.
{% endcomment %}

On [Reddit](https://www.reddit.com), GIFs are also popular for reactions, often containing submission titles with the phrase MRW ("my reaction when"). Here is a wordcloud of the titles of all GIF submissions to Reddit in 2015:

![](/img/gif-unlimited/reddit-gif-wordcloud-e.png)

Completely unrelated, [image steganography](https://en.wikipedia.org/wiki/Steganography) is a technique that allows the embedding of messages into the pixels of images themselves, allowing for the transmission of secret messages. Image steganography was popular on the internet in the early 2000's, but died out before image-sharing between peers was commonplace and information encryption became a hot political issue.

## It's a Secret to Everybody

In 2012, Zach Oakes created [PixelJihad](https://sekao.net/pixeljihad/), an [open-source](https://github.com/oakes/PixelJihad), client-side tool for image steganography using JavaScript and the HTML5 Canvas. This implementation embeds text messages by converting them into raw binary and modifying the least-significant bit (Aaron Miller wrote [an informative paper](http://www.aaronmiller.in/thesis/) on LSB encoding) of the red, blue, and green binary pixel values of the specified image to match the message (e.g. a white pixel with red, blue, and green values of `[255, 255, 255]` can be represented in binary form as `[11111111, 11111111, 11111111]`; LSB encoding changes the right-most bit to 0 or 1 for each pixel channel). Changing the last bit of a color channel will not result in a detectable visual change by the human eye.

The image pixels to-be-modified during encoding are selected according to a semirandom schedule. The message can then be decoded by reading the LSB of the changed pixels from the schedule and reconstructing the binary message, then converting back into text.

Since we can set 3 bits per physical pixel, the maximum amount of data (in bytes) that can be stored is equivalent to the width of an image (in pixels) multiplied by the height times 3, divided by 8.

Take the Reddit GIF wordcloud I posted above. If you download the image and load it into PixelJihad, you can see I hid a secret message showing how to get the Reddit word data using [BigQuery](https://cloud.google.com/bigquery/). The visualization is 600px by 400px, therefore it can store up to:

```
600 * 400 * 3 bits / 8 = 90000 Bytes / 1000 = 90 kB
```

The image itself is 257 kB, but a bonus 35% in data storage isn't bad.

PixelJihad only supports text messages with an artificial limit of 1,000 characters (~1 kB) for _sanity_, but I'm not fond of being sane. There is _nothing_ from a technical perspective stopping users from encoding larger text messages, or even raw file data as pure binary into images.

But embedding data into a _static_ image is boring. What happens when you embed data into _each frame of a GIF_? Just a thought.

## Meow!

Now, back to what you're reading this article for, who cares about all this stegosaurus crap. Here is a cute cat GIF [from Reddit](https://www.reddit.com/r/gifs/comments/256bir/abduction_cat_re_flying_cat_re_so_big/). Look at its cuteness.

![](/img/gif-unlimited/aliencat.gif)

Aww.

The GIF file size is 2.44 MB (sorry, readers on mobile devices!). The dimensions of the GIF are 300px by 399px. But if you open the GIF in Preview on OSX, you can see that the GIF is comprised of 72 frames.

![](/img/gif-unlimited/gif-finder-17.png)

Performing the same math:

```
300 * 399 * 72 frames * 3 / 8 = 3231900 / 1000000 = 3.23 MB
```

The potential amount of encodable data is larger than the file size of the image itself! Screw secret messages, we're literally _creating_ data storage out of nothing!

You know what this means? We can _embed the cat GIF into itself_ steganographically by splitting it over all 72 frames, and get 780 kB left over to store whatever we want.

And then we can _do it again_ to the newly-embedded image.

Infinitely.

780 kB free with each iteration.

Cat GIF recursion.

## Purrcursion

Let's say we want to embed a 10 MB music file into a GIF. Since 10000 kB / 780 kB = 12.82, we re-embed the cat GIF 13 times, including 1/13th of the music file as sidecar data with each iteration. And now we have a cat GIF that contains some pretty sweet tunes!

And not only do we have a magical cat GIF, the data is completely portable; you can simply e-mail the cat GIF to your friend and they can decode the high-fidelity music file out of the GIF using an app that implements this schema. Or you can post the cat GIF w/ music to Reddit for _double_ meaningless internet points.

The only limitation to the "infinitely" part is the increasing amount of CPU processing power for each decoding, but that's fixable since it's 2016 and smartphones have quad-core processors. Worth every ounce of battery life, in my opinion.

**tl;dr ** I was bored and decided to create infinite data in a way that makes people feel fuzzy inside. No big deal. Of course, I can't show _you_ a proof-of-concept of how this works. That would be silly. But if you're a venture capitalist who wants to invest more tens of millions of dollars into a clearly-sustainable GIF startup, feel free to email me at [max@minimaxir.com](mailto:max@minimaxir.com).

<div class="suspicious-pregnant-pause">...</div>

<div class="suspicious-pregnant-pause">...</div>

<div class="suspicious-pregnant-pause">...</div>

Yeah, infinite data via image steganography doesn't actually work. But the reasons it doesn't work are not obvious unless you have deep knowledge of how image compression reduces the file size of images, and conversely, how modifying images could cause them to become _larger_ in file size (I may or may not have spent several hours forking PixelJihad and adding modern features before realizing that I am not a data storage magician).

I will write a follow-up post soon detailing the steganographic gotchas. Until then, keep in mind that there is no such thing as a free cat GIF.
