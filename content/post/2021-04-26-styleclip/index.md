---
title: Easily Transform Portraits of People into AI Aberrations Using StyleCLIP
date: 2021-04-30T08:55:00-07:00
slug: styleclip
categories: ["AI", "Image Generation"]
tags: ["Image", "GAN", "AI", "Mark Zuckerberg", "Elon Musk"]
comments: true
summary: "StyleCLIP is essentially Photoshop driven by text, with all the good, bad, and chaos that entails."
subtitle: "StyleCLIP is essentially Photoshop driven by text, with all the good, bad, and chaos that entails."
featured: false
highlight: false
cover:
  image: featured.png
  relative: true
  caption: face, to troll face with large eyes
---

_**tl;dr** follow the instructions in [this Colab Notebook](https://colab.research.google.com/drive/13EJ1ATvTnE0N7I0ULLvRsta7J7HdNuBi?usp=sharing) to generate your own AI Aberration images and videos! If you want to use your own images, follow the instructions in [this Colab Notebook first](https://colab.research.google.com/drive/1St3R2qAbwwTV-amfYLeyGGswtzX4HHJP?usp=sharing)!_

GANs, [generative adversarial networks](https://en.wikipedia.org/wiki/Generative_adversarial_network), are all the rage nowadays for creating AI-based imagery. You've probably seen GANs used in tools like [thispersondoesnotexist.com](https://thispersondoesnotexist.com/), which currently uses NVIDIA's extremely powerful open-source [StyleGAN2](https://github.com/NVlabs/stylegan2).

In 2021, [OpenAI](https://openai.com/) open-sourced [CLIP](https://github.com/openai/CLIP), a model which can give textual classification predictions for a provided image. Since CLIP effectively interfaces between text data and image data, you can theoetically map that text data to StyleGAN. Enter [StyleCLIP: Text-Driven Manipulation of StyleGAN Imagery](https://arxiv.org/abs/2103.17249), a paper by Patashnik, Wu _et al_ (with code [open-sourced on GitHub](https://github.com/orpatashnik/StyleCLIP)) which allows CLIP vectors to be used to guide StyleGAN generations through user-provided text.

{{< figure src="teaser.png" caption="From the paper: the left-most image is the input; the other images are the result of the prompt at the top." >}}

The authors have also provided easy-to-use Colab Notebooks to help set up these models and run them on a GPU for free. The most interesting one is the [Global Directions notebook](https://colab.research.google.com/github/orpatashnik/StyleCLIP/blob/main/notebooks/StyleCLIP_global.ipynb), which allows the end user to do what is listed in the image above, and I've [made my own variant](https://colab.research.google.com/drive/13EJ1ATvTnE0N7I0ULLvRsta7J7HdNuBi?usp=sharing) which streamlines the workflow a bit.

After a large amount of experimention, I've found that StyleCLIP is essentially Photoshop driven by text, with all the good, bad, and chaos that entails.

## Getting an Image Into StyleCLIP

GANs in general work by interpreting random "noise" as data and generate an image from that noise. This noise is typically known as a latent vector. The paper [Designing an Encoder for StyleGAN Image Manipulation](https://arxiv.org/abs/2102.02766) by Tov _et al_ (with code [open-sourced on GitHub](https://github.com/omertov/encoder4editing) plus a [Colab Notebook too](https://colab.research.google.com/github/omertov/encoder4editing/blob/main/notebooks/inference_playground.ipynb)) uses an encoder to invert a given image into to the latent vectors which StyleGAN can use to reconstruct the image. These vectors can then be tweaked to get a specified target image from StyleGAN. However, the inversion will only work if you invert a human-like portrait, otherwise you'll get garbage. And even then it may not be a perfect 1:1 map.

I created a [streamlined notebook](https://colab.research.google.com/drive/1St3R2qAbwwTV-amfYLeyGGswtzX4HHJP?usp=sharing) to isolate out the creation of the latent vectors for better interoprability with StyleCLIP.

To demo StyleCLIP, I decided to use Facebook CEO [Mark Zuckerberg](https://www.facebook.com/zuck), who's essentially a meme in himself. I found a [photo of Mark Zuckerberg](https://commons.wikimedia.org/wiki/File:Medvedev_and_Zuckerberg_October_2012-1.jpeg) facing the camera, cropped it, ran it through the Notebook, and behold, we have our base Zuck for hacking!

{{< figure src="zuck_base.png" >}}

## Human Transmutation

_All StyleCLIP generation examples here use the [streamlined notebook](https://colab.research.google.com/drive/13EJ1ATvTnE0N7I0ULLvRsta7J7HdNuBi?usp=sharing) and [Mark Zuckerberg latents](http://minimaxir.com/media/latents.pt), with the captions indicating how to reproduce the image so you can hack them yourself!_

Let's start simple and reproduce the examples in the paper. A tanned Zuck should do the trick (in the event he [forgets his sunscreen](https://www.buzzfeednews.com/article/katienotopoulos/mark-zuckerberg-sunscreen-surfing)).

{{< figure src="zuck_tanned.png" caption="`face -> tanned face`, beta = 0.15, alpha = 6.6" >}}

What about giving Zuck a cool new hairdo?

{{< figure src="zuck_fade.png" caption="`face with hair -> face with Hi-top fade hair`, beta = 0.17, alpha = 8.6" >}}

Like all AI, it [can cheat](https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vRPiprOaC3HsCf5Tuum8bRfzYUiKLRqJmbOoC-32JorNdfyTiRRsR7Ea5eWtvsWzuxo8bjOxCG84dAg/pubhtml) if you give it an impossible task. What happens if you try to use StyleCLIP to increase the size of Zuck's nostrils, which are barely visible at all in the base photo?

{{< figure src="zuck_nose.png" caption="`face with nose -> face with flared nostrils`, beta = 0.09, alpha = 6.3" >}}

The AI transforms his _entire facial structure_ just to get his nostrils exposed and make the AI happy.

CLIP has seen images of everything on the internet, including public figures. Even though the StyleCLIP paper doesn't discuss it, why not try to transform people into other people?

Many AI practioners use Tesla Technoking [Elon Musk](https://twitter.com/elonmusk) as a test case for anything AI because ~~he generates massive SEO~~ of his contributions to AI and modern nerd culture, which is why I opted to use Zuck as a contrast.

Given that, I bring you, Elon Zuck.

{{< figure src="zuck_elon_musk.png" caption="`face -> Elon Musk face`, beta = 0.12, alpha = 4.3" >}}

What if you see Zuck as a literal Jesus Christ?

{{< figure src="zuck_jc.png" caption="`face -> Jesus Christ face`, beta = 0.13, alpha = 9.1" >}}

Due to being generated by StyleGAN, the transformations have to resemble something somewhat like a real-life human, but there's nothing stopping CLIP from _trying_ to gravitate toward faces that aren't human. What if you tell StyleCLIP to transform Zuck into an anime character, such as Dragon Ball Z's [Goku](https://dragonball.fandom.com/wiki/Goku)?

{{< figure src="zuck_goku.png" caption="`face -> Dragon Ball Z Goku face`, beta = 0.09, alpha = 5.4" >}}

Zuck gets the hair, at least.

People accuse Zuck of being a robot. What if we make him _more_ of a robot (as guided by a robot)?

{{< figure src="zuck_robot.png" caption="`face -> robot face`, beta = 0.08, alpha = 10" >}}

These are all pretty tame so far. StyleCLIP surprisingly has the ability to have more complex prompts while still maintaining expected results.

Can Mark Zuckerberg do a troll face? yes, he can!

{{< figure src="zuck_troll_face.png" caption="`face -> troll face`, beta = 0.13, alpha = 9.1" >}}

We can go deeper. What about altering other attributes at the same time?

{{< figure src="zuck_troll_face_eyes.png" caption="`face -> troll face with large eyes`, beta = 0.13, alpha = 9.1" >}}

Working with CLIP rewards good [prompt engineering](https://medium.com/swlh/openai-gpt-3-and-prompt-engineering-dcdc2c5fcd29), an incresingly relevant AI skill with the rise of GPT-3. With more specific, complex prompts you can stretch the "human" constraint of StyleGAN. 👁👄👁

{{< figure src="zuck_large.png" caption="`face with eyes -> face with very large eyes and very large mouth`, beta = 0.16, alpha = 7.8" >}}

Experimentation is half the fun of StyleCLIP!

## Antiprompts

You may have seen that all the examples above had positive alphas, which control the strength of the transformation. So let's talk about negative alphas. While positive alphas increase strength toward the target text vector, negative alphas increase strength away from the target text vector, resulting in the _complete opposite_ of the prompt. This gives rise to what I call **antiprompts**: prompts where you intentionally want the opposite of what's specified where asking a normal prompt doesn't give you quite want you want.

Let's see if Zuck can make a serious face.

{{< figure src="zuck_serious.png" caption="`face -> serious face`, beta = 0.09, alpha = 6.3" >}}

More pouty than serious. But what if he does the opposite of a laughing face?

{{< figure src="zuck_laughing.png" caption="`face -> laughing face`, beta = 0.09, alpha = -6.3" >}}

That's more like it.

It doesn't stop there. In the previous section we saw what happens when you give prompts of people and compound prompts. What, you may ask, does the AI think is the opposite of a _person_?

In the Goku example above, Zuck got larger, darker hair, more pale skin, and a chonky neck. What happens if you do the inverse?

{{< figure src="zuck_goku_inv.png" caption="`face -> Dragon Ball Z Goku face`, beta = 0.09, alpha = -5.4" >}}

His hair is smaller and blonde, his skin is more tan, and he barely has a neck at all.

What if you make Zuck the opposite of a robot? Does he become human?

{{< figure src="zuck_robot_inv.png" caption="`face -> robot face`, beta = 0.08, alpha = -10" >}}

He becomes [Pedro Pascal](https://en.wikipedia.org/wiki/Pedro_Pascal) apparently.

## Video AI Algorithms

A fun feature I added to the notebook is the ability to make videos, by generating frames from zero alpha to the target alpha and rendering them using [ffmpeg](https://www.ffmpeg.org/). Through that, we can see these wonderful transformations occur at a disturbingly smooth 60fps!

Animations are cool to fully illustrate how the AI can cheat, such as with the flared nostrils example above.

{{< video src="zuck_nose.mp4" controls="yes" >}}

Or you can opt for pure chaos and do one of the more complex transformations. 👁👄👁

{{< video src="zuck_large.mp4" controls="yes" >}}

TikTok will have a lot of fun with this!

## Ethics and Biases

Let's address the elephant in the room: is it ethical to edit photos with AI like this?

My take is that StyleCLIP is no different than what [Adobe Photoshop](https://www.adobe.com/products/photoshop.html) has done for decades. Unlike deepfakes, these by construction are constrained to human portraits and can't be used in other contexts to mislead or cause deception. Turning Mark Zuckerberg into Elon Musk would not cause a worldwide panic. [FaceApp](https://www.faceapp.com/), which does a similar tyle of image editing, was released years ago and still tops the App Store charts without causing democracy to implode. That said, I recommend only using StyleCLIP on public figures.

In my testing, there is definitely an issue of model bias, both within StyleGAN and within CLIP. A famous example of gender bias in AI is a propensity to assign [gender to gender neutral terms](https://qz.com/1141122/google-translates-gender-bias-pairs-he-with-hardworking-and-she-with-lazy-and-other-examples/), such as `He is a soldier. She is a teacher`. Let's try both for Zuck.

{{< figure src="zuck_soldier.png" caption="`face -> soldier face`, beta = 0.1, alpha = 7.2" >}}

{{< figure src="zuck_teacher.png" caption="`face -> teacher face`, beta = 0.13, alpha = 5.6" >}}

Unfortunately it still holds true.

It is surprisingly easy to get the model to perform racist/sexist/ageist transformations without much prodding. Inputting `face with white skin -> face with black skin` does what you think it would do. Making similar transformations based on race/sex/age do indeed work, and I am deliberately not demoing them. If you do experiment around these biases, I recommend careful consideration with posting the outputs.

## The Future of AI Image Editing

StyleCLIP is a fun demo on the potential of AI-based image editing. Although not the most pragmatic way to edit portraits, it's fun to see just how well (or how poorly) it can adapt to certain prompts.

Even though everything noted in this blog post is open-sourced, don't think about trying to sell StyleCLIP as a product: StyleGAN2 (which in the end is responsible for generating the image) and its variants were released under [non-commerical licenses](https://nvlabs.github.io/stylegan2/license.html). But it wouldn't surprise me if someone uses the techniques noted in the papers to create their own, more efficient StyleCLIP with a bespoke efficient GAN to create an entire new industry.
