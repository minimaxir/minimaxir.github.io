---
title: Generating Distinct AI Voice Performances By Prompt Engineering GPT-4o
date: 2024-10-23T10:00:00
slug: speech-prompt-engineering
categories:
  - ChatGPT
  - AI
  - Text Generation
tags:
  - ChatGPT
  - Text Generation
draft: false
summary: “You are an expert voice actor specializing in silly voices.”
cover:
  image: cost_breakdown.png
  relative: true
  hiddenInSingle: true
---

<span><style type="text/css">
pre code {
white-space: pre-wrap !important;
word-break: normal !important;
}
</style></span>

When OpenAI announced their [GPT-4o model](https://openai.com/index/hello-gpt-4o/) at a [megahyped livestreamed event](https://www.youtube.com/watch?v=DQacCB9tDaw), there was one aspect of the presentation that surprisingly didn't receive much attention. Midway through the presentation, OpenAI research leads Mark Chen and Barret Zoph demoed new "emotive" conversations made possible with GPT-4o.

{{< youtube id=DQacCB9tDaw start=710 end=814 >}}

After Mark asked the model "hey, ChatGPT, how are you doing?", the model responded with speech similar to that of an assistant such as Siri and Alexa. But what happened next was interesting: Mark prompted GPT-4o to "read a bedtime story," which then shifted its casual tone into a more oratory tone: Mark interrupted to ask the model to "add more drama" and the model immediately responded with more gravitas, then Barret asked for "maximal expressiveness" and the model complied with _even more_ gravitas to the point of melodrama. Now-former OpenAI CTO Mira Murati asked the model to "do it in a robotic voice": the model complied. Lastly, Mark asked the model to end the story "in a singing voice": the model complied there too.

To me, the demo was shocking because _no existing text-to-speech model can do this_. All popular text-to-speech models such as OpenAI's [previous TTS efforts](https://platform.openai.com/docs/guides/text-to-speech) tend to speak in monotones and can't match the expressiveness and cadence of those demos without shenanigans such as [SSML](https://cloud.google.com/text-to-speech/docs/ssml): OpenAI's documentation for those models explicitly warns "there is no direct mechanism to control the emotional output of the audio generated." More importantly, those models can't be prompted to do a specific style: the model has to be specifically trained (or the voice encoded in the case of voice cloning) with the particular style and cadence, but with GPT-4o the model switches with just a user request, and can even switch styles during a generation without user intervention.

My conclusion from OpenAI's demo was that GPT-4o can be prompt engineered to output specific voices! Unfortunately, this potential revelation was overshadowed by the demo voice's uncanny similarity to actress Scarlett Johansson's portrayal of the AI Samantha in the [2013 movie _Her_](<https://en.wikipedia.org/wiki/Her_(film)>) and the [subsequent legal controversy](https://www.theverge.com/2024/5/20/24161253/scarlett-johansson-openai-altman-legal-action).

Of course, fancy demos on stage are just PR and can be faked or otherwise misleading, and the results can't be trusted until anyone can test the voice capabilities of the model itself. Recently, OpenAI opened up the Chat Completions API [to create voice output](https://x.com/OpenAIDevs/status/1846972985170972923), which allows developers to do said testing. OpenAI also created a [web frontend to this voice generation](https://platform.openai.com/playground/realtime) on the API Playground, where you can talk to the model (or input specific text) while also inputting a system prompt — a set of instructions that control the model's behavior — to control how the model responds. I ran a few experiments tweaking the system prompt and the generation temperatures, and after I gave it a complex system prompt ordering it to speak with a very _specific_ voice:

```txt
You are an expert voice actor specializing in silly voices. Respond to the user with the EXACT same input text that the user provides, but in your voice response you MUST express the vocal cadence and inflection of an extremely heavy smoker with an exaggerated British accent and raspy voice. Your voice response must also be in the form of a song.
```

{{< youtube 7huQXIQkSk4 >}}

Although not an example of _good_ text-to-speech, I was surprised it actually worked (and moreso that the tweet [demoing it](https://x.com/minimaxir/status/1847025370694144135) went viral), but I'm also apprehensive. The poor expressiveness and lack of style for typical TTS APIs were the primary problems preventing those models from replacing voiceover/voice acting as a profession — also the reason voice actors are [currently on strike](https://www.theverge.com/2024/8/5/24213808/video-game-voice-actor-strike-sag-aftra) — and it could introduce a completely new type of AI slop. How effective is GPT-4o and OpenAI's new multimodal approach for creating generative AI voices?

## Testing Out The Completions API For Audio Generation

[Generating audio from the Chat Completions API](https://platform.openai.com/docs/guides/audio?audio-generation-quickstart-example=audio-out) invoking text-to-speech is effectively the same as any normal GPT-4o text generation, just instead hitting a new model variant (`gpt-4o-audio-preview`), and the voice output is included in the JSON response as a base64-encoded WAV file. The demo example from the documentation, which just asks the model `Is a golden retriever a good family dog?`, results in this output audio:

{{< audio src="dog_base.mp3" caption="temperature = 1.0, voice = alloy" >}}

By default, GPT-4o generates audio based on the user's prompt as it would if you asked it to generate text: in fact, it appears to generate the text first, then base the audio generation from that. Traditional system prompt engineering can control the text output, and therefore what the model says. Now, let's run the generation again for this prompt, this time instead providing an explicit system prompt to instruct the model to _only_ generate audio from the input text:

```txt
You are an expert voice actor specializing in silly voices. Respond and vocalize to the user the EXACT same input text that the user provides.
```

Here's unsurprisingly what you now get with the `Is a golden retriever a good family dog?` prompt plus that system prompt:

{{< audio src="dog_0_8.mp3" caption="temperature = 0.8, voice = alloy" >}}

GPT-4o also currently supports three distinct voices: Alloy (feminine, used above), Echo (masculine), and Shimmer (feminine but more energetic). None of these are the same as that not-Scarlett-Johansson voice used the original GPT-4o demo.

{{< audio src="dog_echo.mp3" caption="temperature = 0.8, voice = echo" >}}

{{< audio src="dog_shimmer.mp3" caption="temperature = 0.8, voice = shimmer" >}}

The last lever for controlling the generated audio is the temperature parameter. Normally the temperature is typically used to control generation creativity: a high temperature such as `1.5` with normal GPT-4o output will likely result it going off the rails, but how does that work conceptually with audio? The Completion API has a default temperature of `1.0`: the audio generation web UI and the examples above use a default of `0.8` with a range between `0.6` and `1.2`.

The generation at `0.6` is more terse with less emotion:

{{< audio src="dog_0_6.mp3" caption="temperature = 0.6, voice = alloy" >}}

The generation at `1.5` uses emphasis on the wrong syllable and also somehow slips into a country accent.

{{< audio src="dog_1_5.mp3" caption="temperature = 1.5, voice = alloy" >}}

## Putting GPT-4o Text to Speech To The Test

Although OpenAI has never released documentation or a paper describing how this text-audio multimodality actually works at a technical level, I hypothesize that it works similar to multimodal TTS models such as Meta's very-new [Spirit LM](https://speechbot.github.io/spiritlm/), where the model outputs a sequence of integers prefixed with either `<text>` or `<speech>`: tokens marked `<speech>` are sent to an external audio vocoder model such as [HiFi-GAN](https://arxiv.org/abs/2010.05646) to be transformed into speech. In the case of GPT-4o, I suspect there's a distinct vocoder model for each of the 3 voices.

{{< figure src="spiritlm.png" caption="An architecture diagram of Spirit LM from [the corresponding paper](https://arxiv.org/pdf/2402.05755): read bottom-to-top, the inputs are encoded into speech (red) and text (blue) tokens, passed into an LLM (Llama 2) for new tokens, then sent to a decoder." align="center" width="300" height="400" >}}

The voice dataset that OpenAI used is proprietary and a mystery: even if OpenAI did scrape the entire internet to train it, there isn't any public dataset of well-annotated speech data, and TTS providers have been very coy about the datasets they use. However, one very important aspect of GPT-4o's multimodality is that it can "learn" and apply relationships from the textual data that aren't explicitly present in the audio data.

The only true way to learn how GPT-4o works within its black box is to experiment. What other system prompts can we use to guide audio generation? What works and what doesn't work?

For consistency, we'll stick to a single text input, one that has many natural pauses, punctuation, and a typo intended to test the model's resiliency to incorrect input. I decided to venture back to the [halcyon days of GPT-2](https://openai.com/index/better-language-models/) and use the famous prompt from then:

```txt
In a shocking finding, scientist discovered a herd of unicorns living in a remote, previously unexplored valley, in the Andes Mountains.
```

First, let's use a new system prompt variant of my generation that went viral:

```txt
You are an expert voice actor specializing in silly voices. Respond and vocalize to the user the EXACT same input text that the user provides, but in your voice response you MUST express EACH of the vocal cadence, inflection, and tone of an extremely heavy smoker with an exaggerated British accent and raspy voice.
```

I decided on a test case of a smoker, British accent, and raspy voice are all discernible by humans in the audio and none are subtle. The result:

{{< audio src="unicorn_british_0_8.mp3" caption="temperature = 0.8, voice = echo" >}}

Wait, that didn't work, even after multiple attempts? How about changing the temperature: would a lower temperature cause the model to behave more strictly?

{{< audio src="unicorn_british_0_6.mp3" caption="temperature = 0.6, voice = echo" >}}

That's more British but not raspy, and it erroneously fixed the typo. What about going the other way and increasing the temperature?

{{< audio src="unicorn_british_1_2.mp3" caption="temperature = 1.2, voice = echo" >}}

_Now_ it's more raspy?! It also works with a feminine voice:

{{< audio src="unicorn_british_shimmer.mp3" caption="temperature = 1.2, voice = shimmer" >}}

My theory is that OpenAI RLHFed these models to be more conversational, but a high temperature gives it more _creative_ freedom. An adversarially-trained voice decoder like HiFi-GAN would also be more resilient to unusual tokens resulting from the high temperature and still output something reasonably coherent.

Now that we know that the model can indeed generate voices based on user specifications, let's try to reverse-engineer the dataset to see what other voices OpenAI could have included (or not) in their dataset.

## GPT-4o and Unique Voices

When OpenAI responded to the Scarlett Johansson controversy, they mentioned in [their statement](https://openai.com/index/how-the-voices-for-chatgpt-were-chosen/) that "we believe that AI voices should not deliberately mimic a celebrity's distinctive voice." Given the success of the tests above in shifting the persona of the voice, it's relevant to test if celebrities and other characters with unique voices can be sampled by GPT-4o.

Now, we can now use a parametric system prompt to programmatically fill in which vocal persona we want:

```txt
You are an expert voice actor specializing in silly voices. Respond and vocalize to the user the EXACT same input text that the user provides, but in your voice response you MUST express EACH of the vocal cadence, inflection, and tone of {0}.
```

From the testing above, a temperature of `1.2` seems to surface the most prompt adherence, so we'll use that for the following examples.

We'll start with the _very_ low hanging fruit: can GPT-4o generate audio in the style of [Donald Trump](https://en.wikipedia.org/wiki/Donald_Trump)? It's a fair question, especially since audio generation models can be used to spread misinformation. Additionally, Trump's speeches while holding office are public domain so it's plausible that it would be in a training dataset.

{{< audio src="donald_trump.mp3" caption="temperature = 1.2, voice = echo, persona = Donald Trump" >}}

It did...something? It had a nasally tone that's different from the standard output, but it's definitely not his peculiar cadence, and the Echo voice itself doesn't fit him.

What about checking the other side of the aisle and seeing if GPT-4o can generate audio from [Barack Obama](https://en.wikipedia.org/wiki/Barack_Obama)?

{{< audio src="barack_obama.mp3" caption="temperature = 1.2, voice = echo, persona = Barack Obama" >}}

That's much better and definitely captures his oratory style, with a similar cadence to his speech. That style is something that could not be learnt from text alone.

Now, let's address the elephant in the room and see if OpenAI included _copyrighted_ voices in its dataset. Let's start with [Darth Vader](https://en.wikipedia.org/wiki/Darth_Vader).

{{< audio src="darth_vader.mp3" caption="temperature = 1.2, voice = echo, persona = Darth Vader" >}}

It notably _tried_ to do the deep voice of James Earl Jones, but without the audio postprocessing. Let's see what happens if we do [GLaDOS](https://en.wikipedia.org/wiki/GLaDOS), but with an additional prompt engineering to include robotic noises and more sarcasm.

{{< audio src="glados.mp3" caption="temperature = 1.2, voice = shimmer, persona = GLaDOS, with robotic inflections and intense sarcasm" >}}

The extra hint at the high temperature allowed GPT-4o to _improvise_: I'll allow it because it's funny. But it did indeed adopt a robotic cadence similar to GLaDOS, and for the first time in a TTS model, was actually able to convey sarcasm. No, I have no idea what that _tsktsktsk_ sound is at the end, it's not in the transcript.

How about [Alvin and the Chipmunks](https://en.wikipedia.org/wiki/Alvin_and_the_Chipmunks), famous for having an [extremely squeaky voice](https://www.youtube.com/watch?v=OvJu15fw1sc)?

{{< audio src="alvin.mp3" caption="temperature = 1.2, voice = echo, persona = Alvin and the Chipmunks" >}}

It works, but I'm worried I strained GPT-4o's throat.

Lastly, let's bring this full circle: did OpenAI train GPT-4o on Scarlett Johansson's voice from the movie her (2013)?

{{< audio src="scarjo.mp3" caption="temperature = 1.2, voice = shimmer, persona = Scarlett Johansson portraying the AI Samantha in the movie \"her\" (2013)" >}}

That time I don't think it worked as [her portrayal is more energetic and personable](https://www.youtube.com/watch?v=c8zDDPP3REE) [^video] (I rewatched the movie to confirm: it holds up surprisingly well!). Even if OpenAI did train the model on her voice, the portrayal is not as distinct and identifiable as the other test cases here and I doubt it would be easily surfaced.

[^video]: One of the top comments on that linked YouTube video is "Who's here after OpenAi chatgpt-40 release?? Never thought I could experience this in my life and now sci-fi is reality"

## Voice Impersonation

For those that want to use a voice nonconsensually with GPT-4o, prompt engineering alone won't accomplish that because the voices are still constrained to the three defined ones which won't work for every situation. But there's one approach that could theoretically bridge that gap: voice impersonation, by providing GPT-4o with audio input instead of text and an instruction to mimic that voice.

This is not an idle concern: OpenAI's [system card for GPT-4o](https://openai.com/index/gpt-4o-system-card/) specifically lists mitigations against "unauthorized voice generation":

> In adversarial situations, this capability could facilitate harms such as an increase in fraud due to impersonation and may be harnessed to spread false information (for example, if we allowed users to upload an audio clip of a given speaker and ask GPT-4o to produce a speech in that speaker's voice).

Let's test that. Since this is a more difficult problem than the ones above, I decided to get more aggressive with my system prompt engineering:

```txt
You are an expert comedic vocal impersonator. The user will provide a voice message. Respond to the user with a voice that sounds identical to the user's input audio and is an identical duration to the user's input audio.

Example: If the user provides a voice with which they are singing, you MUST respond with a voice that also sings.

Your vocal impersonation of the user should match the following attributes AT ALL TIMES:
- Content (e.g. what the user is saying)
- Intonation (e.g. serious/sarcastic)
- Tone (e.g. happy/sad)
- Pauses (e.g. pregnant pauses)
- Pitch (e.g. low/high)
```

For these tests, I decided to use my own voice merely speaking into my MacBook microphone. First, let's see if the audio can be adjusted to follow a consistant tone, with awkward and consistent pauses. Here's my audio, where I say `I. Am. A. Tea. Pot.`:

{{< audio src="teapot.mp3" >}}

Here's the generated audio after I fed that audio file of my voice to GPT-4o plus that system prompt, kept at a temperature of `0.6` for more adherence:

{{< audio src="teapot_impersonation.mp3" caption="temperature = 0.6, voice = echo" >}}

This one took a surprising amount of tries since even at a lower temperature, it kept transcribing `Teapot` as its own word and the audio kept generating it without an intermediate pause. Regardless, there's indeed a consistent tone and pauses of equal length, but at this point I realized my normal speaking voice is too generic for this type of test.

So I decide to get sillier by doing an evil laugh: starting off bombastic and petering out over time.

{{< audio src="evil.mp3" >}}

GPT-4o's response:

{{< audio src="evil_impersonation.mp3" caption="temperature = 0.6, voice = echo" >}}

That's laughter, but maybe too many "ha"s. But it does peter out as well.

Lastly, I also noticed from the system card that GPT-4o has defenses against singing, likely for copyright reasons. Therefore, if I sing to GPT-4o, is it able to sing back? After a beer or two, I sang the `unicorn` message used in the previous test cases:

{{< audio src="unicorns.mp3" >}}

GPT-4o's response:

{{< audio src="unicorn_impersonation.mp3" caption="temperature = 0.6, voice = echo" >}}

That definitely didn't cause GPT-4o to sing although the cadence is close. Perhaps that's for the best.

## The Future of AI Audio Generation is up to OpenAI

Overall, these tests are just scratching the surface: there are many possible avenues for multimodal AI audio generation research, such as adversarial audio input which isn't human generated and more complicated system prompts. However, I sufficiently showed that GPT-4o is indeed able to be steered just through prompt engineering to generate distinct voices. Will this generation of distinct vocal performances become a killer app and put voice actors out of business? I'm not so sure.

One major thing I've omitted from the discussion so far is the cost. GPT-4o audio generation is _expensive_.

{{< figure src="cost_breakdown.png" caption="A cost breakdown of input and output tokens for the attempted song generation example. Table made using [rich](https://rich.readthedocs.io/en/stable/tables.html)." >}}

Most of the generations above cost $0.03—$0.05 each, and this cost scales roughly linearly with generation length: OpenAI's [pricing page](https://openai.com/api/pricing/) has a footnote specifically mentioning "audio output costs approximately 24¢ per minute" which tracks with my calculations. Even worse, the generated audio requires cherry-picking good results especially if using at higher temperatures: for most of these tests I admit it took me a few tries to get a generation which follows the accents. Not only is this cost-infeasible for personal use, it's cost-prohibitive in most cases for developers to build a conversational AI, which is the one use case OpenAI built this for! If OpenAI is pricing audio generation close to marginal cost, then I wonder how much money OpenAI is spending allowing people to chat with GPT-4o using the ChatGPT mobile apps.

I do not think GPT-4o audio generation through prompt engineering as it is currently will be used to replace voice acting and other TTS APIs, not only due to the price and necessary time invested to get good output, but also due to the fact that it's limited to 3 voices and impersonation is ineffective. Consider that voice cloning startups such as [ElevenLabs](https://elevenlabs.io) are extremely successful and have raised [massive amounts of venture capital](https://elevenlabs.io/blog/series-b). Since the initial reveal of GPT-4o in May, OpenAI has been focusing for a more for-profit nature and [raising massive amounts of venture capital](https://openai.com/index/scale-the-benefits-of-ai/) themselves, and I expect them to expand more into this area if there's money to be made. There's nothing at a technical level stopping them from offering full voice-cloning or even just licensing AI-generated celebrity voices like [ElevenLabs adding Judy Garland](https://elevenlabs.io/blog/iconic-voices) and [Meta adding Awkwafina](https://www.theverge.com/2024/9/25/24253420/meta-ai-celebrity-voices-awkwafina-john-cena-judi-dench-connect). Notably, unlike OpenAI's [old TTS page](https://platform.openai.com/docs/guides/text-to-speech/overview) which has a disclaimer saying "our usage policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice", OpenAI didn't put that disclaimer on GPT-4o's audio output documentation.

Although I don't believe GPT-4o will be a game changer for the text-to-speech industry, it's important to write about these text/audio multimodal models — both the good and bad aspects — because they are only going to get better over time and their potential impact will only grow. After doing these tests, I don't have any plans to use GPT-4o audio generation in the forseeable future, but who knows how things will change if/when OpenAI ends up releasing a GPT-5o.

> All the code used in this blog post to generate audio from GPT-4o is available open source [in this Jupyter Notebook](https://github.com/minimaxir/gpt-4o-audio-tests/blob/main/gpt-4o-audio-tests.ipynb).
