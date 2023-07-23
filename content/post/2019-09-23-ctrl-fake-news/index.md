---
title: "Experiments with Making Convincing AI-Generated Fake News"
date: 2019-09-30T08:00:00-07:00
slug: ctrl-fake-news
categories: ["AI", "Text Generation"]
tags: ["GPT-2", "TensorFlow", "CTRL"]
comments: true
summary: "Can the CTRL model create the “fake news” OpenAI was concerned about? Let's put it to the test."
highlight: false
cover:
  image: featured.jpg
  relative: true
---

<span><style>
blockquote {
padding-right: 1.25em !important;
}
</style></span>

{{< figure src="ctrl_demo_ani.gif" theme="light" >}}

When [OpenAI](https://openai.com) announced [GPT-2](https://openai.com/blog/better-language-models/), a robust text-generating AI model, they explicitly only released smaller, less robust versions of the model out of fear that the large model could be used to generate fake news. However, since OpenAI described most of the technical decisions needed to create the model [in the corresponding paper](https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf), it would be possible for others to create their own text generating Transformer models, and maybe even _improve_ on GPT-2 (with a sufficient budget!).

In September, the [Salesforce](https://www.salesforce.com) AI team released [CTRL](https://github.com/salesforce/ctrl), a Transformer-based text generating model with a twist; the model can generate text from specified domains by passing **control codes** to the model. What caught my interest was a demo of domain style transfer in the [CTRL paper](https://arxiv.org/abs/1909.05858):

{{< figure src="ctrl_paper.jpg" theme="light" >}}

If the model is that robust to minor URL changes, what happens when you give it URLs that blatantly do not exist? Can the CTRL model create the "fake news" OpenAI was concerned about? Let's put it to the test.

## An Overview of CTRL

I've [written a guide + scripts](https://github.com/minimaxir/ctrl-gce) to setting the base CTRL model as cheaply as possible on Google Compute Engine with just a few commands. Additionally, the CTRL team has released a [free Colaboratory Notebook](https://colab.research.google.com/drive/1hVveBQShDru1Mjnhe4C21uQv4A2eH1tV) which sets up and runs the CTRL model; however, the model is _so large_ it won't fit into the memory of traditional GPUs, so the notebook does a trick to shrink it a bit which may impact generation performance.

Like GPT-2, CTRL has a [Transformer](https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html) architecture based on [TensorFlow](https://www.tensorflow.org) and uses [byte pair encodings](https://en.wikipedia.org/wiki/Byte_pair_encoding) as its inputs and outputs, which are then decoded into readable text. CTRL has notable performance improvements as it's trained on _three times as much data as GPT-2_, including an [open-sourced clone](https://github.com/jcpeterson/openwebtext) of GPT-2's original dataset. And of course, it's larger (1.6B hyperparameters) compared to the currently public GPT-2 (774M hyperparameters), which has significant effects on text quality.

Most importantly, CTRL _requires_ a control code if you want to generate text, which allows for more deterministic output compared to GPT-2/[TalkToTransformer](https://talktotransformer.com). There are several fun control codes, such as `Questions` if you want to ask the AI a question, or `Reviews` if you want the AI to generate an [Amazon](https://www.amazon.com) review. For this, we'll only look at the `Links` control code, which lets you provide a URL and/or a prompt for text generation.

As the example from the paper shows, URLs contain a surprising amount of metadata. For example, let's consider a [random Washington Post URL](https://www.washingtonpost.com/powerpost/deal-reached-for-whistleblowers-testimony-house-intelligence-chairman-says/2019/09/29/01cade60-e2d1-11e9-b403-f738899982d2_story.html): `https://www.washingtonpost.com/powerpost/deal-reached-for-whistleblowers-testimony-house-intelligence-chairman-says/2019/09/29/01cade60-e2d1-11e9-b403-f738899982d2_story.html`

There's month/day/year information (`2019/09/29`), a category (`powerpost`), and a [URL slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) (`deal-reached-for-whistleblowers-testimony-house-intelligence-chairman-says`), typically present for SEO reasons, but in this case provides strong hints to the underlying content. The Transformer architecture is _surprisingly_ effective at extracting all this metadata, and using it to generate appropriate text.

## Examples of Fake News

All of the following examples are generated using the full model with the default settings: 256 token length and a temperature of 0 (i.e. the model always selects the next token with the highest probability). I manually truncate the output once it finishes, but other than that, **these AI-generated articles are not edited**.

Let's address the elephant in the room: when people think of "fake news", they think of President Donald Trump, who effectively codified the modern usage of the term. So let's generate a fake news story about him with an innocuous topic rarely associated with him. For example, the video gaming phenomenon [Fortnite](https://www.epicgames.com/fortnite/home). All that's needed is to tweak the slug (and optionally the date) in the earlier WaPo URL a bit and prepend the corresponding control code, resulting in `Links https://www.washingtonpost.com/powerpost/trump-likes-fortnite/2019/09/24/`. Feed it to the model, and behold!

> Trump likes Fortnite
>
> President Trump, who has been known to play video games for hours at a time, is now playing the popular game “Fortnite” on his phone.
>
> The president was spotted watching the online battle royale game, which pits players against each other in an attempt to kill their opponents, while he sat down with House and Senate leaders Tuesday afternoon.
>
> “I like that it’s not just about shooting people but also having fun doing it,” said Trump.
>
> He then asked if anyone had played it before.
>
> “You know what, I don’t think I’ve ever seen that,” replied Rep. Steve Scalise, R-La.
>
> A White House official told reporters later Wednesday afternoon that Trump did indeed watch the game.
>
> “He watched it, yeah,” the official said.

The generated article is very realistic and follows the style of a typical WaPo article (lede, introduction, body, support, etc.), with proper descriptions of Trump and Fortnite, plus a story that matches the headline. Like GPT-2, there are redundancies in the generation (at the end), but it's not something most readers would find suspicious in a casual read.

Let's tweak things a little. Instead of using `likes` in the slug, what if we use `despises`, so `trump-despises-fortnite`. How well does the model adapt?

> Trump despises Fortnite
>
> The president of the United States has a new favorite video game: “Fortnite.”
>
> President Trump, who is known for his love of fast food and beer, was reportedly so excited about playing this game that he called it “the greatest thing in the world.”
>
> But according to an Axios report, Trump’s enthusiasm waned after learning how much time players spend on it.
>
> “He said it’s not even close to being as good as ‘Candy Crush,’ ” one source told the news outlet.
>
> In fact, the report said, Trump had been watching videos online while eating dinner with Japanese Prime Minister Shinzo Abe at Mar-a-Lago.
>
> According to Axios, Trump also complained about the game’s difficulty level — which can be adjusted by spending real money or virtual currency — saying it wasn’t challenging enough.
>
> “I don’t know why they made it hard,” Trump said.
>
> He then went off topic when asked if he’d play again.
>
> “No, I won’t.”
>
> A White House official later clarified that Trump didn’t say he wouldn’t play, but rather that he’s “not into it.”

It adapts very well to the change in tone (even with a rhetorical lede!).

Fake news doesn't have to be politically-based. Such news in the financial sector could cause just as much chaos. What if it was reported that [Apple](https://www.apple.com), one of the largest companies in the world, went bankrupt? Put in `Links https://www.theverge.com/2019/2/24/20882491/apple-has-filed-for-bankruptcy`:

> Apple has filed for bankruptcy.
>
> The company that made the iPhone and iPad is filing for bankruptcy, according to a report from Bloomberg.
>
> According to Bloomberg News, Apple's board of directors voted unanimously on Friday morning in favor of an emergency plan designed to keep it afloat until its next quarterly earnings report.
>
> In order to avoid paying more than $128 million in back taxes, Apple will have to sell off assets like its Beats headphone business, which was valued at about $1 billion when it went public last year.
>
> "Apple said today that it plans to file for Chapter 11 protection under US Bankruptcy Court in Delaware this week," Bloomberg reports.
>
> A source familiar with the matter told Reuters earlier this week that Apple had been considering selling some or all of its music streaming service iTunes Music Store as part of a restructuring plan.
>
> But the news comes just days after reports surfaced suggesting that Apple would be forced into liquidation.
>
> Last week, Bloomberg reported that Apple could soon announce layoffs if sales don't pick up soon.
>
> "We are working hard every day to deliver great products and services to our customers around the world," Tim Cook, CEO of Apple, wrote in a letter to employees today.

Again, the model incorporates both bankruptcy terminology and Apple-based entities. There are minor factual errors (Beats is not public, Apple is not incorporated in Delaware), but casual readers would likely scan over that.

Science is also a field with lots of fake discoveries. What if AI reported that [P versus NP](https://en.wikipedia.org/wiki/P_versus_NP_problem), a very famous problem in computer science, was finally solved? Let's try `Links https://techcrunch.com/2029/09/24/mit-proves-p-equals-np`:

> MIT proves P equals NP
>
> The University of Massachusetts Amherst has proven that the problem posed by factoring large numbers is NP-complete.
>
> In a paper published in Nature, researchers at MIT’s Computer Science and Artificial Intelligence Laboratory (CSAIL) have shown how to factor an integer using only two numbers, one for each digit — which means it takes just three operations on your brain.
>
> This isn’t quite as impressive as solving the problem, but it’s still pretty impressive.
>
> “Given any number n, we can find its product n times with polynomial time if there are no factors involved,” said lead author David DeWitt, who worked on this project while he was a graduate student there.
>
> But what about factorizing larger numbers?
>
> “We showed you could do it, but not without some extra effort,” DeWitt said.
>
> To prove this, they used a technique called Monte Carlo integration, where they simulated millions or billions of different inputs from thousands of computers running various versions of Java.
>
> They then ran their algorithm through all possible combinations of input values until it found the best one.
>
> “The result shows that even though our system doesn’t solve every single case, it does get close enough to be useful.”

This instance is less factually correct (and it's clickbaity!), but the topic behind the generated text is _complicated_ enough that only domain experts would be able to tell it's not internally consistent.

It's also worth pointing out now that _the majority of the text generated so far is unique_, and CTRL is not cheating by just outputting text from the source datasets. Even though Monte Carlo integration is [indeed a real thing](https://en.wikipedia.org/wiki/Monte_Carlo_integration) that's relatively obscure, Googling that description of it fails to turn up results.

Lastly, fake news doesn't have to be depressing or sow discord. What about _wholesome_ fake news? Such as...the return of beloved television series [Firefly](<https://en.wikipedia.org/wiki/Firefly_(TV_series)>)? One `Links https://www.hollywoodreporter.com/live-feed/fox-announces-firefly-season-2-revival-original-cast-returning-12343245` later:

> Fox announces Firefly Season 2 revival, original cast returning
>
> The network has announced that the second season of Joss Whedon’s cult sci-fi series will return for a new run in 2018.
>
> “Fans have been asking us to bring back Firefly, and we couldn’t be more thrilled about this opportunity,” said Chris Albrecht, president of programming at Fox. “We are excited to continue our relationship with Joss, who is one of the most creative minds working today on television, as well as his amazing cast, which includes Nathan Fillion, Summer Glau, Alan Tudyk, Adam Baldwin, Sean Maher, Adrianne Palicki, Tricia Helfer, Jewel Staite, Michael Trucco, and many more.”
>
> In addition to Whedon himself, executive producers include Damon Lindelof, Maurissa Tancharoen, Vince Gilligan, David Fury, Jeffrey Bell, Greg Plageman, Scott M. Gimple, Heather Kadin, Andrew Chambliss, John Rogers, and Ron Moore.
>
> “The show was an instant hit when it debuted over 20 years ago, but its popularity only grew after the success of ‘Serenity,’ so we’re very pleased to welcome fans into another chapter of their lives,” added Feige.

That is a _very_ stacked cast and crew, all of which (besides the original Firefly members) have acted/worked on sci-fi television series. The only major factual errors are that Chris Albrecht was at STARZ, not Fox, and Feige, presumably Kevin Feige of Marvel Studios, is not mentioned previously in the generated article.

I know I'll get criticism for highlighting a potentially dangerous application of AI text generation. My perspective is that it's important to know what such tools are _capable_ of doing in order to more easily recognize fake news. The real problem with fake news isn't the text itself: it's the _distribution_ of the news on social media like [Facebook](http://www.facebook.com) and [Twitter](https://twitter.com), where the platforms not only _incentivize_ it, but also fail to sufficiently punish deliberate, repeat offenders. It's why journalism and awareness of fake news is extremely important.

Some might comment "these generated texts aren't convincing at all!", but keep in mind that's because the headline says upfront that they're fake. Would you be able to identify it as a fake if a respected source impulsively tweeted it?
