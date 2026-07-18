---
title: What's the deal with all the random weekly quota resets for agents lately?
date: 2026-07-18T12:00:00
slug: agent-quota-reset
categories:
  - Artificial Intelligence
  - Agentic Coding
  - Programming
tags:
  - AI Coding
  - Agentic Coding
  - Codex
  - Claude
  - LLMs
draft: false
summary: I'm going to be the weirdo who complains about literally getting free stuff.
cover:
  image: featured.png
  relative: true
  hiddenInSingle: false
  caption: The image that makes me say "yay" less often than "god damn it".
---

Subscription-based coding agents such as [Claude Code](https://claude.com/product/claude-code) and [Codex](https://openai.com/codex/) famously have 5-hour and weekly quotas on their LLM usage. Both of these are understandable: 5-hour quotas help stagger usage so the servers don't get overloaded, and weekly resets prevent users from dumping an entire month's worth of usage into a single day which a) also prevents overload and b) stops the user from just unsubscribing after they do so. Both Anthropic and OpenAI have played around with quota limits, from doubling them for a limited time to even removing the 5-hour quota.

These model providers can reset the weekly quota for all users, often gifted as compensation in the event of technical glitches on their end. If, for example, you have a $100/mo Codex plan, then a weekly reset is worth $25 to you assuming you fully consume your quota—nowadays with the cost of top-tier LLMs like [Fable 5](https://www.anthropic.com/news/redeploying-fable-5) and [GPT-5.6 Sol](https://openai.com/index/gpt-5-6/), that's easier to do. However, these quota resets are not telegraphed and are generally not announced through company-owned channels: unless you follow specific people such as [Thibault Sottiaux (Tibo)](https://x.com/thsottiaux), the engineering lead for Codex, you just look at your weekly quota and see it's at 100%. You can even get a quota reset hours before your actual reset and not benefit from it all.

Recently, in the wake of the release of Fable 5/GPT-5.6, Anthropic and OpenAI have been doing weekly quota resets for their harnesses far more frequently. In the past two weeks, OpenAI has directly reset the Codex weekly quota **six times**: [July 9](https://x.com/thsottiaux/status/2075330198887940337), [July 10](https://x.com/thsottiaux/status/2075641131002700120), [July 10 (again)](https://x.com/thsottiaux/status/2075820987833274448), [July 14](https://x.com/thsottiaux/status/2077114635308986427), [July 15](https://x.com/thsottiaux/status/2077607697487188198), and [July 17](https://x.com/thsottiaux/status/2078320950488297917). That's not even getting into the rarely discussed banked reset system for Codex, where OpenAI gave quota resets [July 12](https://x.com/thsottiaux/status/2076418567143408112) and [July 13](https://x.com/thsottiaux/status/2076735790567338203) which can be manually used at any time but expire within 30 days.

{{< figure src="tracker.png" caption="https://codex-resets.com tracks Codex resets." >}}

No one wants to be the weirdo who complains about literally getting free stuff because if the quota resets stop, they will be the one blamed for it. Despite that, I'm going to be the weirdo who complains about literally getting free stuff.

As a person who doesn't like wasting money if I can easily avoid it, I try to use as much of my weekly quota as I can. I was on the $20/mo Codex plan but with the promise of GPT-5.6 on the horizon and with the frequency I kept hitting the 5-hour limits, I upgraded to the $100/mo plan. By using GPT-5.5, I used the 5x prompt capacity to build and test a number of _ambitious_ projects, but that's a topic for another blog post. I was able to consistently exhaust my weekly quota over the full week, although I had to have a browser window open with my Codex usage to constantly monitor it. I've set reminders on my phone for the exact time a 5-hour or weekly quota resets so I can keep running more prompts—as an aside, I wish there was a canonical platform endpoint to programmatically check Codex usage amount and the quota reset times so I could just vibecode an app to manage for me. Before the release of GPT-5.6, I thought "should I deliberately exhaust my quota all on the weaker GPT-5.5 and gamble that OpenAI does a quota reset to greet GPT-5.6?" (I did not exhaust my quota and OpenAI did indeed do a quota reset)

GPT-5.6 Sol is indeed a great model that does live up to the hype, and I've had to create new projects just to have an excuse to test its limits. The rate of quota usage is about the same as GPT-5.5 even with a prompt running at all times. Despite that, almost every time a reset has happened after the GPT-5.6 release, it has been when my weekly quota has been at 50+%, which makes me feel like I "wasted" $12. There's also the factor that when the quota resets occur, the weekly reset time is unset, so I have to input _some_ prompt just to trigger it again even if I'm doing something else.

{{< figure src="emollick.png" caption="[@emollick / X](https://x.com/emollick/status/2077629800508801471)" >}}

After the flurry of quota resets over the past two weeks, the intended excitement has instead become annoyance as I now have to urgently create new ideas to spin down the quota before it inevitably resets _again_. Random rewards are supposed to give a dopamine hit but I end up with a net dopamine deficit from both the sense of wasted quota and having to abruptly change my plans. I admit that this may just be a sign I'm burnt out and need to take a break.

{{< figure src="thsottiaux.png" caption="Tibo polls [if there are too many resets](https://x.com/thsottiaux/status/2077271889626706300), with a few thousand responses." >}}

Resets of the weekly quota for all users must be ludicrously expensive for these companies, although when you already spend [billions of dollars in CapEx per year](https://www.ft.com/content/e15b0d7e-ff6b-4f16-ba7a-4068feddb828?syn-25a6b1a6=1) it's likely a rounding error. The recent surge of quota resets is likely not a coincidence: July has been an insane month in LLM releases, with not just Fable 5 and GPT-5.6 Sol pushing frontier models even further, but also [Grok 4.5](https://x.ai/news/grok-4-5), [Muse Spark 1.1](https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/), and [Kimi K3](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart) offering more options across the cost/utility curve. The cynical take is that weekly quota resets are not intended to be fun serendipity, but instead intended to prevent power users from experimenting with sufficiently competitive competitors once the quota naturally runs out.

I don't expect weekly quota resets to last forever even if competition intensifies, because if quotas keep resetting this frequently they won't matter at all. It would instead give me an incentive to downgrade from the $100/mo plan back to the $20/mo plan to avoid wasting quota, which I don't think is OpenAI's intended goal.
