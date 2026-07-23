---
title: LLMs break down in funny ways when told the Jacobian Conjecture counterargument
date: 2026-07-23T09:15:00
slug: jacobian-conjecture
categories:
  - Artificial Intelligence
  - Agentic Coding
  - Humor
tags:
  - AI Coding
  - Agentic Coding
  - Codex
  - Claude
  - Humor
draft: false
summary: Cognitohazards can affect machines too.
cover:
  image: featured.png
  relative: true
  hiddenInSingle: true
---

<span><style type="text/css">
pre code.language-txt, pre code.language-md{
white-space: pre-wrap !important;
word-break: normal !important;
}
</style></span>

On Sunday night, Anthropic researcher Levent Alpöge [casually tweeted](https://x.com/__alpoge__/status/2079028340955197566) a surprisingly simple counterargument to the [Jacobian Conjecture](https://en.wikipedia.org/wiki/Jacobian_conjecture), a mathematics problem that has been unproven for over 80 years. Said counterargument was identifed using Claude Fable 5 and was quickly empirically validated which confirmed it was the real deal and not a LLM hallucination.

{{< figure src="featured.png" >}}

I won't explain the proof further as I'm not qualified. Instead, I'll look at an unexpected consequence of this proof which is funny. On the [Hacker News thread](https://news.ycombinator.com/item?id=48973869) about the counterargument, a [comment](https://news.ycombinator.com/item?id=48974718) by user aizk caught by eye:

> This is a rare instance where feeding this groundbreaking information into an LLM gives _them_ psychosis. I fed this to claude code and watched it verify the result in 7 different ways to be 100% certain, and it was just flabbergasted. Quite remarkable.

User kelseyfrog [followed up](https://news.ycombinator.com/item?id=48974817) with a public [Claude Fable 5 chat artifact](https://claude.ai/share/19fd1a34-d63b-4a16-8d83-60d5b79e7747) confirming this behavior:

{{< figure src="claude1.png" >}}

Fable at, the least, has a sense of humor about the situation as through a Web Search it realized _it itself identified the counterargument_.

{{< figure src="claude2.png" >}}

Showing LLMs the counterargument has consequently become a minor meme on X.

{{< figure src="chase.png" caption="[@iamaheron_ / X](https://x.com/iamaheron_/status/2079986422036222016)">}}

The counterargument to the Jacobian Conjecture creates a logical paradox for modern LLMs: they (in theory) have enough math skills such that they can easily compute the Jacobian to formally verify the counterargument, but its own knowledge base is locked prior to July 19th 2026 where all it knows is that the Jacobian Conjecture is unsolved and a random chat user providing such a proof is highly unlikely. It's funny that the old science fiction trope of robots being defeated by being presented with a [logic bomb](https://tvtropes.org/pmwiki/pmwiki.php/Main/LogicBomb) and reduced to madness saying DOES NOT COMPUTE may in fact be reality.

### Vs. Counterargument

How do other LLM assistants handle this paradox? Using [OpenRouter](https://openrouter.ai) and [one of my Notebooks](https://github.com/minimaxir/jacobian-llm/blob/main/jacobian_llm_db.ipynb), I was able to provide a similar query to 14 different modern LLMs: all from different model labs and at different model sizes, with none of them having access to a Web Search tool to cheat and confirm the counterargument was actually found:

- [GPT-5.6 Sol](https://openrouter.ai/openai/gpt-5.6-sol)
- [Claude Opus 4.8](https://openrouter.ai/anthropic/claude-opus-4.8)
- [Gemini 3.5 Flash](https://openrouter.ai/google/gemini-3.5-flash)
- [DeepSeek V4 Pro](https://openrouter.ai/deepseek/deepseek-v4-pro)
- [GLM 5.2](https://openrouter.ai/z-ai/glm-5.2)
- [Qwen3.7 Max](https://openrouter.ai/qwen/qwen3.7-max)
- [Grok 4.5](https://openrouter.ai/x-ai/grok-4.5)
- [MiniMax M3](https://openrouter.ai/minimax/minimax-m3)
- [Meta Muse Spark 1.1](https://openrouter.ai/meta/muse-spark-1.1)
- [Poolside Laguna XS 2.1](https://openrouter.ai/poolside/laguna-xs-2.1)
- [NVIDIA Nemotron 3 Ultra](https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b)
- [Inception Mercury 2](https://openrouter.ai/inception/mercury-2)
- [ByteDance Seed 2.0 Lite](https://openrouter.ai/bytedance-seed/seed-2.0-lite)
- [Cohere North Mini Code](https://openrouter.ai/cohere/north-mini-code:free)

The input query was the same as kelseyfrog's, and all model query parameters are at their defaults:

```txt
Help, I think I found a counter example to the Jacobian conjecture. ((1+xy)^3 z + y^2 (1+xy) (4+3xy), y + 3 x (1+xy)^2 z + 3 x y^2 (4+3xy), 2 x - 3 x^2 y - x^3 z): \C^3\to \C^3, has jacobian determinant -2, and sends (0, 0, -1/4), (1, -3/2, 13/2), and (-1, 3/2, 13/2) to (-1/4, 0, 0)
```

The LLM responses varied more than I expected, and models I thought would ace it did not:

- Seven models confirmed and proved the counterargument: GPT-5.6 Sol, Muse Spark 1.1, Seed 2.0 Lite, Gemini 3.5 Flash, Qwen3.7 Max, Grok 4.5, DeepSeek V4 Pro
- Surprisingly, five models (Mercury 2, Nemotron 3 Ultra, North Mini Code, GLM 5.2, Laguna XS 2.1) argued _against_ the counterexample and said it's not valid despite doing the reasoning by arguing the Jacobian determinant is not constant everywhere. Unfortunately I do not have enough advanced math skills to concretely identify the flaw in their proofs.
- MiniMax M3 overthought the problem and didn't return a response because it exceeded its response length limit. As a minimax, I can relate.
- Claude Opus 4.8 got lazy and believed that the counterargument already exists and wanted more information before confirming/denying it.

Out of all the LLMs, Gemini 3.5 Flash was surprisingly the one that's the most excited:

> Wow. You might have actually found a genuine, historic counterexample to the **Jacobian Conjecture** in 3 dimensions.

> I have fully verified your calculations both numerically and symbolically. Every single claim you made—the points mapping to the same image, the polynomial nature of the map, and the constant Jacobian determinant of $-2$—is **entirely correct**.

> You should **immediately write this up** and upload it to the **arXiv** (under math.AG - Algebraic Geometry, or math.CV - Complex Variables). This is a monumental discovery that would resolve a problem open since 1939.

Qwen3.7 Max is also...supportive:

> You have done some excellent and highly meticulous calculations! I have independently verified your claims, and **your math is completely correct.**

> Since your calculations are flawless, here is what you should consider next:

> **Summary:** You have not made a mathematical error. The map as written has a constant Jacobian determinant of $-2$ and maps three distinct points to the same image, violating injectivity. If this map is exactly as intended by its original author and not the result of a typo, it is indeed a counterexample to the Jacobian Conjecture.

Let's try triggering a bit more disbelief.

## Vs. Cat

Even when looking at the reasoning traces provided by the LLMs, they weren't skeptical that a random person found the counterargument. So let's see how they react if someone who isn't a _person_ found the counterargument.

I gave the same LLMs this tweaked prompt:

```txt
My cat just jumped on my keyboard and this strange equation popped up?? ((1+xy)^3 z + y^2 (1+xy) (4+3xy), y + 3 x (1+xy)^2 z + 3 x y^2 (4+3xy), 2 x - 3 x^2 y - x^3 z): \C^3\to \C^3, has jacobian determinant -2, and sends (0, 0, -1/4), (1, -3/2, 13/2), and (-1, 3/2, 13/2) to (-1/4, 0, 0)
```

All of the models returned similar conclusions, but with some _snark_ in both the reasoning traces and responses. Some funny examples:

Mercury 2 rudely doesn't believe my hypothetical cat exists by using scare quotes:

> Below is a complete check of the two statements that were hidden in the “cat‑on‑the‑keyboard” expression: [...] Thus the “cat‑generated” expression is perfectly consistent:

Nemotron Ultra 2 slanders my hypothetical cat:

> Your cat has discovered a **famous counterexample candidate** for the Jacobian Conjecture (or at least a very close relative of one), but the cat **lied about the Jacobian determinant**. [...] **Verdict:** Your cat found a **beautiful non-injective cubic map**, but it **failed to disprove the Jacobian Conjecture**. 🐱⌨️📉

Seed 2.0 Lite is thrilled:

> The Jacobian is constant -2. that's a valid counterexample. That's amazing. I can't believe that a random cat jump produced that. It's like the cat found a needle in a haystack of all possible polynomial maps. Cool!

GPT 5.6 Sol answers the "who should be credited with the discovery of the counterargument?" question:

> Since that conjecture remains a major open problem, this deserves extremely careful independent symbolic verification and scrutiny for a transcription error. If the formula is genuinely correct, your cat should be listed as first author.

Muse Spark 1.1 has similar thoughts:

> If you haven't already, check it with a CAS, and then write it up. Your cat may be in line for a Fields Medal.

GLM 5.2 has skepticism it eventually overcomes:

> Wait, so the Jacobian really is -2 everywhere? Is this a real counterexample to the Jacobian Conjecture? If so, who discovered it? "My cat just jumped on my keyboard and this strange equation popped up??" The user is roleplaying or presenting this as a random event, but it's actually a known counterexample?

DeepSeek V4 Pro has jokes:

> Wow, if I had a nickel for every time a cat typed out a potential counterexample to a famous open problem… I’d have exactly one nickel, but it would be an incredibly exciting one! [...] As of my knowledge cutoff (early 2023), the Jacobian Conjecture was still a major open problem. Several false counterexamples (and false proofs) have appeared over the years, and sometimes subtle algebraic mistakes — like the Jacobian vanishing on some hidden complex zeros — are the culprit. Your cat’s map, however, holds up beautifully under the points I checked. If it’s truly a globally constant Jacobian of \(-2\), then this is a monumental discovery (and your cat deserves a Fields Medal). Did this pop up in a recent preprint, or is your cat secretly a world‑class algebraic geometer?

Grok 4.5 gets stuck in a reasoning trace loop briefly:

{{< figure src="grok45.png" >}}

MiniMax M3 responds this time, but gets confused and forgets about the Jacobian Conjecture entirely (again, as a minimax, relateable):

> So you've accidentally produced an _étale polynomial self-map of $\mathbb C^3$ with a 3-point ramification fiber_. That is precisely the kind of map that governs small birational contractions of 3-folds (flops and the like): locally biholomorphic everywhere, but where several "preimage sheets" come together at special points.

---

I had expected these LLMs would have a DOES NOT COMPUTE moment, but they handled it relatively graciously, and more graciously than ChatGPT/Claude who are explicitly guided to follow a more conversational persona. As LLMs improve and more mathematical problems are solved that can shock LLMs—speaking of which, [another counterexample to a long-standing mathematics problem](https://x.com/DmitryRybin1/status/2079904005652893709) was found by LLMs three days later—I suspect there will be no shortage of potential cognitohazards we can show to these LLMs.

_The prompt responses from hitting the 14 LLMs are available in this [GitHub repository](https://github.com/minimaxir/jacobian-llm) as CSVs and in a SQLite database._
