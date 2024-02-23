---
title: "How to Build a Twitter Text-Generating AI Bot With GPT-2"
date: 2020-01-16T08:00:00-08:00
slug: twitter-gpt2-bot
categories: ["AI", "Text Generation"]
tags: ["GPT-2", "TensorFlow"]
summary: "Here's how you too can create an AI bot to parody any Twitter user, even if you're not a coder!"
cover:
  image: featured.png
  relative: true
---

[GPT-2](https://openai.com/blog/better-language-models/), a text-generating neural network model made by [OpenAI](https://openai.com), has recently been in the headlines, from being able to play [AI-generated text adventures](https://www.aidungeon.io/start) to playing _chess_ with an [AI trained on chess move notation](https://slatestarcodex.com/2020/01/06/a-very-unlikely-chess-game/). However, I initially built [gpt-2-simple](https://github.com/minimaxir/gpt-2-simple), which can be used to finetune GPT-2 on any text dataset you choose, for a less academic purpose: comedy.

Over the past month, [Twitter](https://twitter.com/) account [@dril_gpt2](https://twitter.com/dril_gpt2), an AI parody by [@kingdomakrillic](https://twitter.com/kingdomakrillic) of the infamous Twitter user [@dril](https://twitter.com/dril), [used](https://twitter.com/dril_gpt2/status/1208597102181408771) my [Colaboratory Notebook](https://colab.research.google.com/drive/1VLG8e7YSEwypxU-noRNhsv5dW4NfTGce) for finetuning GPT-2 on dril's tweets using gpt-2-simple to generate human-curated tweets which push the limits of the [Turing Test](https://en.wikipedia.org/wiki/Turing_test):

{{< twitter user="dril_gpt2" id="1215760729095016449" >}}

{{< twitter user="dril_gpt2" id="1215834913888460800" >}}

These tweets are [definitely made by a robot](https://twitter.com/kingdomakrillic/status/1210487045338079237) and not by a [human pretending to be a robot](https://twitter.com/KeatonPatti/status/1006961202998726665); @dril_gpt2 occasionally falls into some of the famous GPT-2 traps such as [incoherent lists](https://twitter.com/dril_gpt2/status/1216162880023752705) and [extended repetition loops](https://twitter.com/dril_gpt2/status/1212662889028431872).

Here's how you too can create an AI bot to parody any Twitter user, even if you're not a coder!

## How to Get Tweets For Training An AI

Twitter's [API](https://developer.twitter.com/en.html) famously limits users to retrieving [only the latest 3,200 tweets](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline) from a given user, which is not nearly enough input data for training a good AI. Therefore, to get all tweets possible for a user, you'll need to use another approach. The Python package [twint](https://github.com/twintproject/twint) is a popular way of bypassing that API limitation.

I've [open-sourced a Python 3 script on GitHub](https://github.com/minimaxir/download-tweets-ai-text-gen) which leverages `twint` to download tweets, and then the script does common preprocessing such as removing URLs, retweets, and tweet replies to make the resulting input text cleaner.

First, in a terminal, install the Python script dependencies:

```sh
pip3 install twint==2.1.4 fire tqdm
```

Then download the [download_tweets.py script](https://raw.githubusercontent.com/minimaxir/download-tweets-ai-text-gen/master/download_tweets.py).

The script is interacted with via a command line interface. After `cd`ing into the directory where the script is stored in a terminal, run:

```sh
python3 download_tweets.py <twitter_username>
```

e.g. If you want to download all tweets (sans retweets/replies) from [@dril](https://twitter.com/dril_gpt2), run:

```sh
python3 download_tweets.py dril
```

The tweets will be downloaded to a single-column CSV titled `<username>_tweets.csv`, which is the ideal format for training with an AI.

{{< figure src="csv.png" theme="light" >}}

The more tweets the better: it's recommended that you have at least 1 MB of input data, which is tens of thousands of tweets.

## How To Train a Twitter AI And Generate Tweets

A common problem with training AI on short-form text is that the text can "leak" information; since the AI trains on about 2-3 paragraphs worth of text at a time (about 5-10 tweets), you need to explicitly state when a given tweet begins and when the tweet ends. To fix this issue, [gpt-2-simple](https://github.com/minimaxir/gpt-2-simple) has a special case for single-column CSVs, where it will automatically process the text for best training and generation. (i.e. by adding `<|startoftext|>` and `<|endoftext|>` to each tweet). This workflow will also handle multi-line tweets correctly as their own entity.

You can use [this Colaboratory notebook](https://colab.research.google.com/drive/1qxcQ2A1nNjFudAGN_mcMOnvV9sF_PkEb) to train the model on your downloaded tweets, and generate massive amounts of tweets from it. The notebook itself has more instructions on how to feed the CSV created above as input data to the model.

Note that without a lot of tweets, the model might easily overfit and output existing tweets verbatim; if that's the case, you may want to train for fewer `steps` (e.g. 200-500). Additionally, I recommend only using the 124M "small" and 355M "medium" GPT-2 models; larger GPT-2 models finetune poorly on small text documents and low amounts of input data.

Once the training is complete, you can generate tweets 1,000 at a time using this cell:

```python
gen_file = 'gpt2_gentext_{:%Y%m%d_%H%M%S}.txt'.format(datetime.utcnow())

gpt2.generate_to_file(sess,
                      destination_path=gen_file,
                      length=200,
                      temperature=1.0,
                      top_p=0.9,
                      prefix='<|startoftext|>',
                      truncate='<|endoftext|>',
                      include_prefix=False,
                      nsamples=1000,
                      batch_size=20
                      )
```

Run the cell as many times as you want for more tweets, and download them from the Files tab by right-clicking them! The notebook also has more information on how to tweak the generation parameters to make the tweets more crazy or more sane.

You can then open the generated `.txt` files on your local computer in your favorite text editor (I recommend [Visual Studio Code](https://code.visualstudio.com)), and start curating however you see fit! Each tweet is separated by a delimiter line, making it easier to visually parse and handle multiline tweets (compare/contrast with [raw @dril_gpt2](https://pastebin.com/TmRtUX2x) output, which blends together a few tweets per delimiter).

{{< figure src="vscode.png" theme="light" >}}

A warning: you are not guaranteed to get quality generated tweets all the time. In fact, quality tweets are _rare_: I estimate **less than 5%** of AI-generated tweets are good/funny. That means if you want to curate hundreds of tweets, you'll need to generate **thousands** of tweets and sort through all of them (and double-check to make sure they're not real tweets!). It's not as bad as it sounds, in my opinion it's kinda fun. But curation is its own skill, which is why human-curated tweets aren't a stain on the "credibility" of AI bots, and also why the ~1,500 tweets so far from @dril_gpt2 is very impressive.

Now, what do you do with these curated tweets?

## Automating The Twitter Bot

If you're not a programmer or just want to prototype a Twitter bot, I recommend creating a normal Twitter account and scheduling hand-curated Twitter posts through [TweetDeck](https://tweetdeck.twitter.com), which is owned by Twitter and has native scheduling capabilities. You can space out tweets at given times, although it may be a hassle to do that for hundreds of tweets.

Otherwise, it is more efficient to write a code script to make tweets at periodic intervals for a bot account. Old tutorials around the internet recommend writing a script which posts to Twitter, sleeps for X hours, post, repeat; that method does not easily scale to multiple bots and it requires that a full computer be dedicated to it, which is not an efficient use of computing resources.

I've [open-sourced an infrastructure schema on GitHub](https://github.com/minimaxir/twitter-cloud-run) that leverages [Google Cloud Platform](https://cloud.google.com) services to run hand-curated Twitter bots using a few modern technologies to minimize cost and computation; it's admittingly somewhat complicated, but it should give you an idea of how to best implement a Twitter bot. The repo also has instructions on how to set up a Twitter developer account.

## The Ethics of Twitter AI Bots

Lastly, let's address the elephant in the room: is building these bots _ethical_? Modern AI has frequently been criticized on two fronts, both in how the input training data is obtained (e.g. obtaining faces for training facial recognition software), and how AI-generated media content is used (e.g. video deepfakes).

**I am not a lawyer**, but for these AI-generated tweets, this is how I see it:

The input data is obtained from Twitter, but not through its API; it's downloaded through external web scraping via `twint`, and _never logs into the website_. This kind of workflow was ruled as not an abuse by the recent [hiQ v. LinkedIn decision](https://www.eff.org/deeplinks/2019/09/victory-ruling-hiq-v-linkedin-protects-scraping-public-data), as the data is public. It's still a gray area; I would not _redistribute/commercialize the downloaded tweet data_; just use it as input data to the model.

The actual generated tweets themself should be fine to use as you see fit. Whether AI-generated works infringe on the copyrights of its source material is an evolving area of both ethics and law, but at minimum these AI-generated tweets are both a transformative derivative work and a parody.

That said, given the massive ambiguities around AI-generated content, it's important to be completely transparent and also comply with [Twitter rules on parody accounts](https://help.twitter.com/en/rules-and-policies/parody-account-policy). For example, the Twitter bio for the bot should indicate:

- It's posting AI-generated tweets, made with GPT-2.
- It's human-curated (or not).
- The Twitter account of who maintains the bot.
- The Twitter account(s) the bot is parodying / model is finetuned upon.

Additionally, to avoid impersonation, the full name of the Twitter account should not be a verbatim match to the person being parodied (e.g. "_X_ but AI" is fine), and the profile picture should be visually distinct from the human (e.g. my bots have a black-and-white profile picture). I would also not recommend making bots of people who are more newsworthy to avoid accusations of impersonation (e.g. do not make bots of politicians, _especially_ [Donald Trump](https://twitter.com/realDonaldTrump)).

There is still a lot of work that can be done in optimizing Twitter bots, both in terms of generated tweet quality and in ironing out the ethical logistics of maintaining an AI bot account. **I do not believe that AI text-generating bot Twitter accounts will obsolete human Twitter accounts**. It's a different _flavor_ of comedy; not better, not worse. But there's still a lot that can be done to both expand and control the creativity of these Twitter bots, and I have a few active ideas in the pipeline to implement.
