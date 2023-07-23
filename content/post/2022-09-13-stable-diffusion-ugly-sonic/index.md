---
title: I Resurrected "Ugly Sonic" with Stable Diffusion Textual Inversion
date: 2022-09-19T08:45:00-07:00
slug: stable-diffusion-ugly-sonic
categories:
  - Stable Diffusion
  - Image Generation
  - AI
tags:
  - Stable Diffusion
  - Image Generation
  - Textual Inversion
  - Ugly Sonic
  - Humor
published: true
summary: The true dystopia of AI is that it can make Ugly Sonic look cool.
subtitle: The true dystopia of AI is that it can make Ugly Sonic look cool.
featured: false
highlight: false
cover:
  image: featured.png
  relative: true
  caption: Be careful who you call ugly in movie trailers.
---

So there's a new popular AI image generation tool named [Stable Diffusion](https://github.com/CompVis/stable-diffusion). But first, let's discuss why you really clicked on the link to this article: [Ugly Sonic](https://knowyourmeme.com/memes/ugly-sonic).

{{< figure src="ugly_sonic.png" caption="He's Sonic, but Ugly. via Paramount Pictures" >}}

A short background: [Sonic the Hedgehog](https://www.sonicthehedgehog.com) is one of the most iconic video game characters of all time.

{{< figure src="Sonic_-_Super_Smash_Bros._Ultimate copy.png" caption="Key art of \"Modern\" Sonic from Super Smash Brothers Ultimate. [via Nintendo](https://www.smashbros.com/en_US/fighter/38.html)" >}}

The initial movie trailer released in 2019 for the Sonic the Hedgehog movie included a peculiar _general-audience-friendly_ design for Sonic.

{{< youtube 4mW9FE5ILJs >}}

This was a more humanoid Sonic, with small eyes, blue furry arms, and _human teeth_. After backlash, Sonic was redesign to be closer to his modern game incarnation:

{{< figure src="new-vs-old-sonic-hedgehog.webp" caption="Comparison between the two designs. [via Newsweek](https://www.newsweek.com/sonic-hedgehog-redesign-movie-conspiracy-old-vs-new-comparison-1471620)" >}}

The movie itself turned out to be the best video-game movie ever, which sounds [damning by faint praise](https://tvtropes.org/pmwiki/pmwiki.php/Main/DamnedByFaintPraise) but it was an accurate assessment. Years later, a gag in the straight-to-Disney+ movie [Chip N' Dale: Rescue Rangers](https://www.imdb.com/title/tt3513500/) reintroduced this design as a gag, officially called Ugly Sonic.

{{< youtube uZzl3Y1HDAQ >}}

So why not see if AI can resurrect this Ugly Sonic? (that's a rhetorical question, please don't answer it)

I decided to use Ugly Sonic to test Stable Diffusion for three reasons: one, because he's a computer-generated character so it seems thematically appropriate; two, because there aren't many images of him in the training dataset so generated output should be truly unique; and three, because if Paramount wants to send me a cease and desist for besmirching the the Ugly Sonic brand, that would be objectively hilarious.

## Stable Diffusion is a Crazy Gadget

_All images generated by Stable Diffusion v1.4 in this post are generated with a classifier guidance of 7.5 with 50 denoising steps. Images are cherrypicked from 16 total generations from the prompt, as occasionally the prompt is misinterpreted by Stable Diffusion, or the generations aren't funny enough. Additionally, the NSFW filter was disabled during generation due to frequent false positives: none of the images used in this post are NSFW, although some may argue that Ugly Sonic himself is NSFL._

I've always had difficulty generating a normal Sonic the Hedgehog image with AI image generation. [DALL-E 2](https://openai.com/dall-e-2/), for example, just flat-out can't do it.

{{< figure src="a071601b4209bcd2.png" caption="`a portrait of Sonic the Hedgehog`, via DALL-E 2" >}}

Stable Diffusion does a tad better, capturing Sonic with a variety of styles and eras.

{{< figure src="d3bc427a63dad734.png" caption="`a portrait of Sonic the Hedgehog`, via Stable Diffusion" >}}

Indeed, there are [many images of Sonic](https://haveibeentrained.com/?search_text=sonic%20the%20hedgehog) in the training dataset, however the generated images do not verbatim reproduce or otherwise plagiarize results from the training set above (I checked each one).

By now, you probably already know that Stable Diffusion takes in text and generates an image from random latent noise. The text encoding is done through a large pretrained CLIP model. However, a new technique called [textual inversion](https://textual-inversion.github.io) can reverse engineer the 768D "encoding" of a concept with the CLIP encoding space given a few example images and without modifying the underlying image generation model, which can then be used with the model to generate more specific images.

{{< figure src="teaser.jpg" caption="Demo of textual inversion, via [the official project repo](https://textual-inversion.github.io)" >}}

Soon after, Hugging Face [released a Colab Notebook](https://twitter.com/psuraj28/status/1567212122970685442) that makes training the model to obtain the concept straightforward. From that, I trained an [Ugly Sonic object concept](https://huggingface.co/sd-concepts-library/ugly-sonic) on 5 image crops from the movie trailer, with 6,000 steps and 1 gradient accumulation step (on a T4 GPU, this took about 1.5 hours and cost about $0.21 on a GCP Spot instance). I then [customized the inference Colab notebook](https://colab.research.google.com/drive/1-Go3l9HpSIkjvDfR0gm8kWLPRnsaUIYd?usp=sharing) to more easily generate images from a new textual inversion.

The Ugly Sonic object concept, once loaded into the text encoder, can be invoked by including `<ugly-sonic>` in the prompt where you'd normally include an object. Let's test it out with a simple [VQGAN + CLIP-esque](https://minimaxir.com/2021/08/vqgan-clip/) prompt such as `a beautiful portrait of <ugly-sonic> by Leonardo Da Vinci` which should have a more expected output:

{{< figure src="8ed7ee0d3e25a187.png" caption="`a beautiful portrait of <ugly-sonic> by Leonardo Da Vinci`, via Stable Diffusion" >}}

😵‍💫

Apparently the textual inversion tokens can have an unexpectedly strong effect on the resulting output. Fortunately, there's a Stable Diffusion prompt hacking trick I [saw on Reddit](https://www.reddit.com/r/StableDiffusion/comments/xd1ze4/increases_attention_to_enclosed_words_decreases/): wrapping terms you want to emphasize with `()` increases their "weight" in the generation, while `[]` decreases the weight. Modifying the prompt to also include deemphasis on Ugly Sonic and emphasis on the medium of `painting, oil on canvas` gives better results.

{{< figure src="e04ddaa8da5edbf5.png" caption="`a beautiful portrait of [[[<ugly-sonic>]]] by Leonardo Da Vinci, (((painting, oil on canvas)))`, via Stable Diffusion" >}}

Close enough!

There is a lot of trial and error, but fortunately Stable Diffusion generation is fast enough and cheap enough that you can brute force it. And this is just the beginning.

## Mad Latent Space

Now that we have a working Ugly Sonic inversion, let's get dangerous. The standard modifiers added to AI-generate image prompts work here to increase realism.

{{< figure src="eae2c80e866d45b5.png" caption="`hyperrealistic <ugly-sonic>, unreal engine, 4k`, via Stable Diffusion" >}}

Ugly Sonic is better rendered here than in the movie trailer.

It's noticeable here, but in some cases the generated figure is closer to Modern Sonic than Ugly Sonic. It's possible the trained concept and the encoded `Sonic the Hedgehog` text are similarly embedded in the latent space. Hence we need to curate the generated images so we try not to include the _boring_ Modern Sonic that no one likes.

Ugly Sonic must be hungry, let's get him his favorite food: a chili dog.

{{< figure src="d8bc24adb9f679fe.png" caption="`<ugly-sonic> sitting and eating a ((chili dog)), stock photo`, via Stable Diffusion" >}}

Now that he's had lunch, Ugly Sonic can now spend time with the former president of the United States, Barack Obama!

{{< figure src="59aec00fb3f1e797.png" caption="`hyperrealistic <ugly-sonic> shakes hands with Barack Obama`, via Stable Diffusion" >}}

Let's go full circle and put Ugly Sonic back into a video game!

{{< figure src="d2dbb4ada2fc87cc.png" caption="`[[[[<ugly-sonic>]]]] as a character in a ((Genesis)) video game, ((((16-bit pixel art))))`, via Stable Diffusion" >}}

It's indeed possible to use more than one textual inversion at a time in a prompt, and the [Concepts gallery](https://huggingface.co/sd-concepts-library) is a good repository of trained concepts. What about giving Ugly Sonic a psychedelic aspect by combining a [liquid light style concept](https://huggingface.co/sd-concepts-library/liquid-light) and a [nebula style concept](https://huggingface.co/sd-concepts-library/nebula)?

{{< figure src="d8bf6343c03dde31.png" caption="`a ((((hyperrealistic portrait)))) of [<ugly-sonic>] in the style of <lls> and the style of <nebula>, trending on artstation`, via Stable Diffusion" >}}

Lastly, Stable Diffusion experts on [/r/StableDiffusion](https://www.reddit.com/r/StableDiffusion/) have gotten prompt engineering down to a science, with massive prompts even longer than the ones above. Let's just YOLO Ugly Sonic into one.

{{< figure src="7762adbe6895884c.png" caption="`<ugly-sonic> dynamic comic hero pose, detailed city at night background, aesthetic, captivating, (((concept art, anime, hyper-detailed and intricate, realistic shaded, fine detail, realistic proportions, symmetrical, sharp focus, 8K resolution, with lineart flat ink, trending on pixiv fanbox)))`, via Stable Diffusion. Prompt adapted [from here](https://www.reddit.com/r/StableDiffusion/comments/xemaq3/making_someone_dreams_comes_true_but_in_waifu/)." >}}

The funny thing about textual inversion is that each of these concepts are only 4KB on disk. Although a given textual inversion concept may not work with future versions of Stable Diffusions or other diffusion models using the CLIP encoder, it's a good demo of how well trained concepts can be used to get more specific outputs, even if the concept isn't in the original dataset the model was trained upon.

Again, you can use the [Ugly Sonic concept](https://huggingface.co/sd-concepts-library/ugly-sonic) yourself with a [textual inversion inference notebook](https://colab.research.google.com/drive/1-Go3l9HpSIkjvDfR0gm8kWLPRnsaUIYd?usp=sharing) or [another Stable Diffusion user interface](https://github.com/AUTOMATIC1111/stable-diffusion-webui) that supports textual inversion to generate your own Ugly Sonics with Stable Diffusion!

There were a few AI-generated images of Ugly Sonic with his human teeth, but I opted not to include them because I have _standards_, believe it or not.

---

_Disclosure: I am neither an artist nor an expert in art theory. All my comments on what are "good" AI art generations are my own (likely bad) opinions._

_Also, I am not a furry. Even though my name is Max Woolf._