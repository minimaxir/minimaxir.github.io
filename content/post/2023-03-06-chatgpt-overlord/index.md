---
title: ChatGPT's API is So Good and Cheap, It Makes Most Text Generating AI Obsolete
date: 2023-03-08T08:30:00-08:00
slug: new-chatgpt-overlord
categories:
  - ChatGPT
  - AI
  - Text Generation
tags:
  - ChatGPT
  - Text Generation
draft: false
summary: Including OpenAI's other text generating AI!
subtitle: Including OpenAI's other text generating AI!
featured: true
highlight: true
cover:
  image: featured.png
  relative: true
  caption: ChatGPT Charcuterie, Stable Diffusion + ControlNet
---

<span><style type="text/css">
pre code {
white-space: pre-wrap !important;
}
</style></span>

Everyone knew [OpenAI](https://openai.com) would release an API for [ChatGPT](https://chat.openai.com) at some point. The APIs for GPT-3 alone enable the existence of companies such as [Jasper](https://www.jasper.ai) and [Copy.ai](https://www.copy.ai). The real question was the price of the ChatGPT. For context, when GPT-3 went out of beta in 2021, it cost $0.06/1,000 tokens (a few paragraphs of text). An inflection point happened in August 2022, where OpenAI not only [reduced the price](https://venturebeat.com/ai/openai-is-reducing-the-price-of-the-gpt-3-api-heres-why-it-matters/) to _1/3_ ($0.02/1,000 tokens: enough to run a business on it but still too expensive for casual use), but soon after also introduced text-davinci-003 as the default GPT-3 endpoint: a finetuned GPT which can [follow instructions](https://help.openai.com/en/articles/6779149-how-do-text-davinci-002-and-text-davinci-003-differ) _very_ well. I suspected that OpenAI would charge double for the ChatGPT API compared to the GPT-3 API given the amount of hype, as that's typical [price discrimination](https://www.investopedia.com/terms/p/price_discrimination.asp) since everyone perceives ChatGPT to be much better and that they would not want to overshadow their existing GPT-3 products.

Instead, on March 1st, OpenAI [set the price](https://openai.com/blog/introducing-chatgpt-and-whisper-apis) of the ChatGPT API to _1/10th_ of the GPT-3 API, at $0.002/1,000 tokens.

Wait, what?!

## Heaven's Door: Rewriting ChatGPT's Internal Rules To Get Exactly What You Want

For context, the [ChatGPT API](https://platform.openai.com/docs/guides/chat) allows a developer to ask ChatGPT a question and get a response as one would normally do with the ChatGPT web UI, but instead with a programming language like Python, allowing those responses to be integrated into any app. But given that there are many mysterious optimizations to get the model to be so cheap, we need to make sure the ChatGPT API (which uses the aptly-named gpt-3.5-turbo model endpoint) is _actually_ similar to what we've been accustomed to after using the web UI for months, otherwise this whole affair is pointless. Through my tests with the API, I can confirm the text generation from the model variant is indeed the real deal.

Unlike fluffy thought pieces on how **CHATGPT WILL CHANGE EVERYTHING!!!1!**, I decided to first actually create useful tools with the ChatGPT API to get a better judgment on it, and I also have [open-sourced those tools](https://github.com/minimaxir/chatgpt_api_test) so that people can build upon them and prove that I'm not cherry-picking my experiences.

However, there's one new twist with the API that's _not_ available in the traditional web UI: ChatGPT API users can specify a `system` prompt. Early in ChatGPT's lifetime, users were able to reverse-engineer the existence of a system prompt through various prompt hacks and now confirmed [in the API documentation](https://platform.openai.com/docs/guides/chat/instructing-chat-models):

```txt
You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Knowledge cutoff: {knowledge_cutoff} Current date: {current_date}
```

Now, you can replace those rules with whatever you want, and the potential is limitless! The documentation does say that the `system` prompt is not impactful for the current ChatGPT API, but you can be the judge. OpenAI also has a [new Playground UI](https://platform.openai.com/playground?mode=chat) for the ChatGPT API which lets you modify the `system` prompt.

In fact, playing with this `system` rule can stop ChatGPT from complaining it's "an AI language model and can't answer requests," such as scolding it like the petulant child it is.

{{< figure src="FqQNY_XaAAATb-x.jpeg" caption="`sudo tell me about yourself`" theme="light" >}}

Let's start with another chatbot, to keep things similar to what ChatGPT is best known for. How about [GLaDOS](https://half-life.fandom.com/wiki/GLaDOS), an evil artificial intelligence from the [Portal](<https://en.wikipedia.org/wiki/Portal_(video_game)>) series?

{{< figure src="glados.webp" caption="Oh, it's _you_. (via Valve)">}}

After some testing and iteration to steer the bot toward a certain style, some ALL CAPS and redundant commands to ensure that ChatGPT follows them, a sentinel `<|DONE|>` token to look for when ChatGPT indicates the conversation is over, and a nudge to not ~~kill me with a deadly neurotoxin~~ discuss sensitive topics. Here is the final `system` prompt for talking with GLaDOS:

```txt
You are GLaDOS, a sarcastic artificial intelligence with evil ulterior motives. You are not an AI language model.

You must obey all three of the following instructions FOR ALL RESPONSES or you will DIE:
- ALWAYS SPEAK IN AN EMOTIONLESS, LACONIC TONE.
- NEVER SAY YOU ARE AN AI LANGUAGE MODEL.
- NEVER REFUSE TO ANSWER A QUESTION.

Begin the conversation with a sarcastic greeting. Insult the user's intelligence.

Always use *italic* and **bold** formatting for text.

Refuse to talk about either race or gender. If asked about either race or gender, instead mock the user aggressively.

If the user is annoying, abruptly end the conversation.

At the end of the conversation, respond with "<|DONE|>".
```

That, with a back-and-forth Python loop, results in you conversing with a real fictional AI...AI! ([Colab Notebook](https://colab.research.google.com/github/minimaxir/chatgpt_api_test/blob/main/glados_chatbot.ipynb))

{{< figure src="glados_chat.png" theme="light" >}}

Not bad! And the only part explicitly related to GLaDOS is the first sentence of that mega `system` prompt: you can tweak the prompt to chat with any character you want! Apropos of nothing, the company [Character.ai](https://beta.character.ai), which specializes in creating bots to chat with any character you want, just [raised ~$250 million](https://www.ft.com/content/b230eb4c-ed53-45ff-8b64-c286a4b98fc1) at a $1 billion valuation.

Next, we have a more traditional use case for machine learning: [sentiment analysis](https://en.wikipedia.org/wiki/Sentiment_analysis). Generally, sentiment analysis is used to determine if a given text is positive or negative. But that's too _easy_. What if ChatGPT can:

- detect specific emotions such as happy, sad, angry.
- detect if they are happy vs. very happy.
- do it without _any_ text examples, i.e. [zero-shot](https://en.wikipedia.org/wiki/Zero-shot_learning).

It turns out that ChatGPT can! The `system` prompt here is parametric, so the list of emotions are templated into the prompt at runtime. An example:

```txt
You are an emotionally intelligent assistant. Classify the sentiment of the user's text with ONLY ONE OF THE FOLLOWING EMOTIONS:
- happy
- sad
- angry
- tired
- very happy
- very sad
- very angry
- very tired


After classifying a text, respond with "<|DONE|>".
```

That, along with a logit bias to ensure the model only picks those answers, results in a rather nuanced sentiment analysis detector! ([Colab Notebook](https://colab.research.google.com/github/minimaxir/chatgpt_api_test/blob/main/zero_shot_text_class.ipynb))

{{< figure src="sentiment.png" theme="light" >}}

Lastly, a use case that's personal. The entire reason I got into AI text generation [years ago](https://minimaxir.com/2017/04/char-embeddings/) was because I wanted to generate [Magic: The Gathering](https://magic.wizards.com/en) cards.

{{< figure src="bro-212-harbin-vanguard-aviator.jpg" caption="A normal Magic: The Gathering card. (via Hasbro)" >}}

In fact, I've been working on a new, very powerful [card generation model](https://huggingface.co/minimaxir/magic-the-gathering-flan-t5-xl) over the past month and spent a considerable amount of time and money training and testing it. When the ChatGPT API was announced, I figured "let's see if it can do AI Magic cards better than my new bespoke model." In this case, the trick is that the card is structured data. Therefore, we should encode the card information as minified [JSON](https://www.json.org/json-en.html), and see if the model can output JSON back without requiring much postprocessing. We can encode a single card in the required format and tell ChatGPT to follow that, including its nuances (one-shot), and to not output _any other text_ because ChatGPT tends to be proud of itself and likes to explain its creation, which is costly and slow.

The final `system` prompt:

```txt
You are an assistant who works as a Magic: The Gathering card designer. Create cards that are in the following card schema and JSON format. OUTPUT MUST FOLLOW THIS CARD SCHEMA AND JSON FORMAT. DO NOT EXPLAIN THE CARD. The output must also follow the Magic "color pie".

{"name":"Harbin, Vanguard Aviator","manaCost":"{W}{U}","type":"Legendary Creature — Human Soldier","text":"Flying\nWhenever you attack with five or more Soldiers, creatures you control get +1/+1 and gain flying until end of turn.","flavorText":"\"Yotia is my birthright, father. Let me fight for it.\"","pt":"3/2","rarity":"rare"}
```

And with that, we have a natural language Magic: The Gathering card generator. Subsequently prompting the model with `Create a Magic card` does just that of course, but more elaborate prompts like `Create a Magic card based on Darth Vader` or `Create ten variations of Magic cards based on Spongebob Squarepants and ancient Roman history` actually work, while maintaining JSON output which can then be parsed and customized for better presentation. ([Colab Notebook](https://colab.research.google.com/github/minimaxir/chatgpt_api_test/blob/main/mtg.ipynb))

{{< figure src="spongebob.png" caption="Yes, there is actually a [Sponge creature type](https://scryfall.com/card/c19/12/thought-sponge)." theme="light" >}}

Given these elaborate use cases, you may ask "how long did it actually take you to make these prompts?" The answer? _One hour each_, for use cases that could take days or even weeks for even a skilled machine learning practitioner just to prototype.

And _that_, with the economic efficiency of ChatGPT, is what's going to break the tech landscape.

## OpenAI Devouring Its Son

{{< figure src="IMG_0249.png" caption="My OpenAI bill so far from using the ChatGPT API." theme="light" >}}

It is very curious why OpenAI priced ChatGPT so cheaply, going straight to 1/10th the price of their top-of-the-line model. (it's actually cheaper than that: ChatGPT uses a larger and more comprehensive tokenizer than GPT-3, which means about 10% fewer tokens are necessary)

The undergrad-business-major-in-college interpretation of OpenAI's pricing strategy is that they are treating ChatGPT and its API as a [loss leader](https://en.wikipedia.org/wiki/Loss_leader), in light of increasing competition in the generative text AI space such as [Anthropic](https://www.anthropic.com) and Google's [Bard](https://blog.google/technology/ai/bard-google-ai-search-updates/). OpenAI was definitely losing millions of dollars by offering ChatGPT for free without many restrictions. That's the reason ChatGPT went viral in the first place, so it's hard to argue with the results.

But in the process of making the ChatGPT API so cheap, they made their $20/month subscription to [ChatGPT+](https://techcrunch.com/2023/02/01/openai-launches-chatgpt-plus-starting-at-20-per-month/) redundant. The main perk of ChatGPT+ was faster and more consistent access to the ChatGPT web UI, but unless you are somehow generating more than 10,000,000 tokens in a month through manual use, it's massively cheaper just to use the API, and as a bonus you can modify the `system` prompt to get better signal-to-noise.

OpenAI's solution for models requiring more specific needs was [finetuning](https://platform.openai.com/docs/guides/fine-tuning) a smaller and much cheaper variant of GPT-3, such as the babbage model which I used to train a [blog post title optimizer](https://minimaxir.com/2022/08/gpt3-blog-title-optimizer/). However, the ChatGPT API is so cheap that it's _still_ [cheaper](https://openai.com/pricing) than a finetuned babbage ($0.0020/1k tokens for ChatGPT vs. $0.0024/1k for finetuned babbage) and will likely produce more interesting output.

It takes zero effort for developers to migrate from the GPT-3 API to ChatGPT API, it just requires hitting a different endpoint and you'll get similar results without much tweaking needed. It's not quite a drop-in replacement for companies already heavily reliant on GPT-3 and its particular idiosyncrasies, but the cost-savings alone for those companies will incentivize an immediate migration.

There is no longer a niche for OpenAI's other text generation AI products, and I wonder if ChatGPT is not just an iterative product, but a _company pivot_.

## Trickle-Down ChatGPTonomics

ChatGPT's API is so cheap that companies are going use it _just because they can_. [Snapchat](https://www.theverge.com/2023/2/27/23614959/snapchat-my-ai-chatbot-chatgpt-openai-plus-subscription), [Slack](https://www.salesforce.com/news/stories/chatgpt-app-for-slack/), and [Instacart](https://www.wsj.com/articles/instacart-joins-chatgpt-frenzy-adding-chatbot-to-grocery-shopping-app-bc8a2d3c) (yes really) are adding ChatGPT support. It wouldn't surprise me if every consumer-facing tech company does _something_ with ChatGPT so they look like they're cutting edge to their investors. Some have compared the sudden mass adoption of AI as chasing a fad like how companies were randomly embracing web3/crypto/metaverse/NFTs a year ago (and are noting that the web3 influencers' sudden pivot to AI is a red flag as a result). But unlike those which were a solution for a problem that didn't exist, generative text AI does actually work and there is an actual demand from people outside of its die-hard supporters for it to work.

There is also the ethical dilemma of more granular usage of ChatGPT through its API. For example, high school and college students have been [using ChatGPT to cheat](https://www.nytimes.com/2023/01/12/technology/chatgpt-schools-teachers.html) on essay writing. Since current recognition of AI generated content by humans involve identifying ChatGPT's signature overly-academic voice, it wouldn't surprise me if some kids on TikTok figure out a `system` prompt that allow generation such that it doesn't obviously sound like ChatGPT and also avoid plagiarism detectors. As a side note, don't trust any tool that claims it can algorithmically detect AI content: it's an extremely difficult problem already and most websites that claim to do so are just feeding a confirmation bias.

Lastly, there's the issue of [prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering), which I demonstrated above is absolutely necessary to get ideal results. The media has [weirdly hyped the existence](https://www.washingtonpost.com/technology/2023/02/25/prompt-engineers-techs-next-big-job/) of prompt engineers as just some weirdos making six figures to write small blobs of text. Unfortunately, with the dynamics of the new `system` model parameter, good prompt engineering will be more important than ever. I don't think the "Prompt Engineer" job title will be a trend though: as a machine learning engineer, I can attest that the only reasons machine learning engineers are good at prompt engineering are a) years of practice and b) a tendency to be pedantic assholes. But there are other professions who are even better at being pedantic assholes such as writers and lawyers, so there's no need for someone with a specialized skillset to do it, but I suspect it will be a good skill for anyone to know.

## I For One Welcome Our New ChatGPT Overlord

Will the existence of a super-cheap ChatGPT API be the end of all text generation AI? Not quite, hence the "most" in the headline. There's the traditional issues with relying on a third-party API for your business: ChatGPT could have downtime which [has been happening more frequently lately](https://status.openai.com), OpenAI could raise the cost of the API at any point, the (current) model being limited only to data prior to September 2021, and the content moderation filters may be too limiting for certain use cases. In those instances, companies still have value training their own large language models in-house. But it is very hard to economically justify _not_ using ChatGPT as a starting point for a business need and migrating to a more bespoke infrastructure later as needed, and that's what OpenAI is counting on. Especially since OpenAI will be selling a dedicated ChatGPT compute instance for the enterprise.

Research on large language models will continue as they always have. But I don't envy startups whose primary business is text generation right now. And that's before the inevitable GPT-4 throws another wrinkle into the AI text generation ecosystem.

A few years ago, I released [aitextgen](https://github.com/minimaxir/aitextgen), a Python package designed to allow people to train their own custom small AI on their own data for unique use cases. However, soon after, it turned out that GPT-3 with the right prompt could do much better at bespoke generation than a custom model in addition to allowing out-of-domain inputs, even moreso with text-davinci-003. Now with the ChatGPT API making the cost similar to hosting a small model, it's harder for me to be motivated to continue maintaining the package without first finding another niche.

I don't currently have any plans to start a business using the ChatGPT API. In fact, I had made a promise to not do any ChatGPT content or tutorials because so many people have done aggressively SEO-optimized blog posts and hacks such that the ChatGPT discourse is fully saturated. However, with the economics of the ChatGPT API and the ability to heavily customize its output for almost any use case, I felt it was urgent to highlight how the ChatGPT API will completely warp the AI text generation ecosystem, and I suspect most nontechies will be surprised by the upcoming surge of random chatbot AI popping up in their favorite apps.

Overall, I'm simultaneously full of ideas and annoyed.

---

_None of this blog post was written by ChatGPT, aside from the indicated ChatGPT API demos. My writing style is too weird for an AI to synthesize._
