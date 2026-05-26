---
title: The mysterious Hy3 LLM is topping OpenRouter Model Rankings by a large margin
date: 2026-05-26T08:30:00
slug: openrouter-hy3
categories:
  - Artificial Intelligence
  - Agentic Coding
  - Programming
  - Open Source
tags:
  - AI Coding
  - Agentic Coding
  - Codex
  - Claude
  - LLMs
  - OpenRouter
  - DeepSeek
draft: false
summary: Why Hy3?
cover:
  image: featured.png
  relative: true
  hiddenInSingle: true
---

[OpenRouter](https://openrouter.ai) is a service that provides access to most LLMs with a singular API, which has become exceedingly useful as of late given the rapid cadence of new LLM releases. Due to the company's role as an intermediary between users and the LLM APIs, OpenRouter has robust, representative data on how users interact with LLMs and it publishes this data on the [AI Model Rankings](https://openrouter.ai/rankings) page: a welcome deviation from the labs themselves which generally keep this data secret for competitive reasons. Recently, I checked the OpenRouter rankings and noticed something peculiar.

{{< figure src="rankings_052526.png" caption="Retrieved May 25, 2026." >}}

Two new models are now beating LLM darling Claude in terms of token usage and by more than 50%? I've heard of [DeepSeek Flash V4](https://api-docs.deepseek.com/news/news260424): it's an [open-source release](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) from [DeepSeek](https://www.deepseek.com/en/) that is not only fast/cheap, but also performs closer to the leading LLM models at a very low cost so it's no surprise that it's incredibly popular. But what the heck is Hy3 preview? I've _never_ heard of Hy3 or anyone talking about it. Googling it [returns an announcement](https://hy.tencent.com/research/hy3) from Chinese megacorp [Tencent](https://www.tencent.com/en-us/) about Hy3's open-source release: the [model page itself](https://huggingface.co/tencent/Hy3-preview) on Hugging Face is sparse and includes oddly honest benchmark results that are not favorable for the model compared to other Chinese open-source models.

{{< figure src="bench_agent_overview_v3.jpg" caption="Coding-oriented benchmark results for Hy3 from Tencent's Hugging Face repo." >}}

A [Hacker News search](https://hn.algolia.com/?q=hy3) for Hy3 only returned a single submission that [isn't about Hy3](https://www.reuters.com/world/china/chinese-companies-used-claude-improve-own-models-anthropic-says-2026-02-23/), and Reddit discussion is more [about the open-weights release](https://www.reddit.com/r/LocalLLaMA/comments/1steddy/hy3_preview/). One Reddit thread also [noted the rise of Hy3](https://www.reddit.com/r/ArtificialInteligence/comments/1t5gbju/298_growth_366t_tokens_tencents_hy3_is_crushing/) but from May 6, when Hy3 was offered by OpenRouter for free; that free endpoint is no longer available, and therefore Hy3's usage in the weekly rankings above is from paying users.

Hy3 preview is apparently popular in domains outside of agentic coding as well.

{{< figure src="badges.png" caption="Retrieved May 25, 2026." >}}

Did I miss something? After some nonscientific testing, the model quality is indeed on par with the other Chinese models indicated and not close to models such as Claude Opus 4.7 and GPT 5.5. It's not a magic overlooked diamond-in-the-rough, so there has to be something else at play. Fortunately, OpenRouter has the data to narrow down possible explanations, but after checking the data I became **more** confused.

[Hy3 preview](https://openrouter.ai/tencent/hy3-preview) is available from the OpenRouter API at a stated price of $0.066/1M tokens input which is indeed cheaper than the current top-ranked model [DeepSeek V4 Flash](https://openrouter.ai/deepseek/deepseek-v4-flash) with a stated price of $0.10/1M tokens input. Given the drastically rising cost of LLMs and coding agents, it makes sense that a cheaper model would prevail, but only if it offered similar quality and that doesn't appear to be the case.

Here's the chart of Hy3 preview model usage over time on OpenRouter from the model page:

{{< figure src="tokens_per_day.png" >}}

Hy3 preview has no usage data before May 8, which implies that is the time the model switched from the free SKU to the paid SKU. Usage is also steady over time since then with the initial rankings shown in this post being several weeks after launch, showing that the usage is at least organic (or _very_ expensive to fake) and not a one-off outlier. Of note, if you do the math on the numbers presented here, the input-token-to-output-token breakdown on LLM API calls is now **98% input**, 2% output in aggregate.

For the OpenRouter AI Model Rankings, there have historically been spikes by specific apps switching their default to a particular LLM, such as when [Kilo Code offered Grok Code Fast 1 for free](https://kilo.ai/landing/grok-code-fast-1-optimized) in September 2025, which [rocketed it up in popularity](https://www.reddit.com/r/ChatGPTCoding/comments/1n4k30e/grok_code_fast_1_seems_to_be_very_popular_in/). That does not appear to be the case here because apps only constitute a very small part of Hy3 preview's activity.

{{< figure src="top_apps.png" caption="The top 5 apps accout for <1% of all activity to Hy3 preview." >}}

OpenRouter's value proposition is the ability to automatically route a given API request to different providers: for open-weight models such as DeepSeek V4 Flash, OpenRouter lists _13_ providers, but Hy3 preview only has one provider despite its open weights[^license]: the Singapore-based [SiliconFlow](https://www.siliconflow.com). Their [usage page on OpenRouter](https://openrouter.ai/provider/siliconflow) shows that SiliconFlow had relatively little usage...until Hy3.

[^license]: The license for Hy3 is [very restrictive](https://x.com/xeophon/status/2047250337371681075) in a way that could potentially prevent providers from adopting the model.

{{< figure src="siliconflow.png" caption="The green area corresponds to free Hy3 usage while the blue area corresponds to paid Hy3 usage: OpenRouter does not differentiate them on mouseover which I suspect is a bug." >}}

Coincidentially that data visualization shows that usage didn't drop drastically when Hy3 preview moved from free to paid, which in itself is interesting: if users were not getting value from the free model, they likely would have stopped using it once the costs hit their wallet.

What am I missing? Am I overthinking it and the answer is really because "it's the cheapest" and it received sufficient [loss leader](https://en.wikipedia.org/wiki/Loss_leader) traction from the free period?

...but is Hy3 preview _actually_ the cheapest LLM backed by a major company on OpenRouter? While I was double-checking some assumptions, I found that OpenRouter has data that shows Hy3 preview is _not_ the cheapest well-performing LLM available: it's actually DeepSeek V4 Flash, but with interesting caveats.

## LLM Economics in 2026

So here are a few more notes about how LLM APIs work that aren't often discussed. LLM calls are still stateless, which means that after every turn (including user messages to the LLM asking questions), **all** of the tokens in the current conversation thread are reprocessed, meaning that in the case of agents, the count of input tokens increases cumulatively with each successive message and is one reason why starting new threads frequently as context fills up is encouraged for effective agent use.

{{< figure src="activity_logs.png" caption="Reverse-chronological OpenRouter logs from one minute of [Zed Agent](https://zed.dev/docs/ai/agent-panel) use with DeepSeek V4 Flash selected." >}}

But even before agentic workflows, large inputs such as full PDFs bloated context similarly. As a result, most LLM providers implemented [prompt caching](https://www.ibm.com/think/topics/prompt-caching), which reuses input tokens processed earlier in the conversation: this is a win-win that saves time/compute for the LLM provider and the savings are passed to the customer. Most LLM providers cache inputs automatically, including when accessed through OpenRouter: the disk-lightning-bolt symbol next to the cost indicates tokens were cached and the cache may not always be hit, especially if OpenRouter switches providers mid-thread. The odd API provider out is the Anthropic (Claude) API which requires [paying for a cache write first](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing) for some reason.

Typically, cache read costs are 10% of the input costs: this is the case for the latest models from [OpenAI API](https://openai.com/api/pricing/), [Anthropic API](https://platform.claude.com/docs/en/about-claude/pricing), and [Google Gemini API](https://ai.google.dev/gemini-api/docs/pricing). For the 13 providers that serve DeepSeek V4 Flash, cache read costs are between 20% and 50% of input cost, which makes sense as they may not have the same economies of scale. There's one DeepSeek V4 Flash provider that's an exception, though:

{{< figure src="deepseek.png" >}}

That's a 2% cache read cost! (multiply by 2, move decimal left 2 places) How are DeepSeek's cache read prices so low? DeepSeek has implemented [a new approach to KV caching](https://huggingface.co/blog/deepseekv4) starting with V4 and as the model's creator it is positioned to best leverage its own innovations, which as mentioned the benefits are passed to the customer. The [DeepSeek V4 Pro](https://openrouter.ai/deepseek/deepseek-v4-pro) variant model, when served by DeepSeek, has a cache read cost of _0.83%_! (use a calculator for that one)

Remember how I showed that 98% of LLM API costs are now input tokens, which are aggressively cached? That means the "stated" prices of LLMs are now misleading, but unusually in a pro-customer way because the effective price will be _much_ cheaper! To counter this ambiguity, OpenRouter now has a table for effective prices on the model page, which accounts for the cost savings from cache hits. Here's the effective pricing for DeepSeek V4 Flash via OpenRouter by provider, which is different for each provider as they have different cache read costs and cache hit rates:

{{< figure src="effective_pricing.png" caption="Retrieved May 25, 2026; these values update every hour." >}}

The prices are all over the place, but notice the second row where DeepSeek itself is the provider, which is priced at a whopping $0.018/1M input tokens! That 2% cache read really pays off. Comparing apples to apples with Hy3 preview, the effective pricing for Hy3 preview as noted on its model page from SiliconFlow (a whopping _44%_ cache read cost) is $0.034/1M: nearly _double_ DeepSeek V4 Flash from DeepSeek! Of course, this is only applicable if DeepSeek is explicitly used as the provider, which some downstream OpenRouter clients/agents may not support: the OpenRouter prices [match the prices directly](https://api-docs.deepseek.com/quick_start/pricing) from DeepSeek, so using a direct DeepSeek API key will work the same.

There is also an elephant in the room: DeepSeek is a China-based company and some may not want—or may not legally be able—to give their payment processing information or LLM input data to a Chinese company who has set prompt training = `true` on their OpenRouter data policy information, which is a legitimate concern.

Yes, subscription-based LLM services such as [Claude Code](https://code.claude.com/docs/en/overview) and [Codex](https://openai.com/codex/) are still the best bang for your buck if you're able to consistently exhaust the usage limits. But the super-cheap DeepSeek V4 Flash via the API doesn't lock you into a subscription, and if you need a bit more agentic compute to finish a project, it's cheaper than paying for extra usage from the subscription services.[^agent] At the least, it's a microeconomic check against additional pricing shenanigans that will likely continue through 2026 as competition in agentic AI heats up.

[^agent]: DeepSeek has also just announced its [own coding agent platform](https://esengine.github.io/DeepSeek-Reasonix/) with V4 Flash that claims to leverage their strong caching, however it's at 50% input cost but at a significantly more expensive 20% cache read cost so its unclear if the economics are actually cheaper than just using an DeepSeek API key with another agent.

Overall, I still don't understand the popularity of Hy3 preview on OpenRouter. Given the available data and analysis above, my guess is that a single large app not affiliated with Tencent is indeed using Hy3 as its data-processing backbone, and this app isn't solely an agentic coding app. But one of the advantages of OpenRouter is that it's low-lift to switch models and providers: it wouldn't surprise me if DeepSeek V4 Flash gets a spike in a few weeks once people catch on to its pricing.
