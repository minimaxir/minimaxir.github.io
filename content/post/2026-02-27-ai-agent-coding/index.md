---
title: An AI agent coding skeptic tries AI agent coding, in excessive detail
date: 2026-02-27T10:00:00
slug: ai-agent-coding
categories:
  - AI
  - Agentic Coding
tags:
  - ChatGPT
  - Nano Banana
  - Codex
  - Claude
draft: false
summary: No vagueposting here, just look at the Estimated Read Time.
cover:
  image: featured.png
  relative: true
  hiddenInSingle: false
---

<span><style type="text/css">
pre code.language-txt, pre code.language-md{
white-space: pre-wrap !important;
word-break: normal !important;
}
</style></span>

You've likely seen many blog posts about AI agent coding/[vibecoding](https://en.wikipedia.org/wiki/Vibe_coding) where the author talks about all the wonderful things agents can now do supported by vague anecdata, how agents will lead to the atrophy of programming skills, how agents impugn the sovereignty of the human soul, etc etc. This is **NOT** one of those posts. You've been warned.

Last May, I wrote a blog post titled [As an Experienced LLM User, I Actually Don't Use Generative LLMs Often](https://minimaxir.com/2025/05/llm-use/) as a contrasting response to the hype around the rising popularity of agentic coding. In that post, I noted that while LLMs are most definitely not useless and they can answer simple coding questions faster than it would take for me to write it myself with sufficient accuracy, agents are a tougher sell: they are unpredictable, expensive, and the hype around it was wildly disproportionate given the results I had seen in personal usage. However, I concluded that I was open to agents if LLMs improved enough such that all my concerns were addressed and agents were more dependable.

In the months since, I continued my real-life work as a Data Scientist while keeping up-to-date on the latest LLMs popping up on [OpenRouter](https://openrouter.ai). In August, Google [announced](https://developers.googleblog.com/introducing-gemini-2-5-flash-image/) the release of their Nano Banana generative image AI with a [corresponding API](https://ai.google.dev/gemini-api/docs/image-generation) that's difficult to use, so I open-sourced the [gemimg Python package](https://github.com/minimaxir/gemimg) that serves as an API wrapper. It's not a thrilling project: there's little room or need for creative implementation and my satisfaction with it was the net present value with what it enabled rather than writing the tool itself. Therefore as an experiment, I plopped the feature-complete code into various up-and-coming LLMs on OpenRouter and prompted the models to identify and fix any issues with the Python code: if it failed, it's a good test for the current capabilities of LLMs, if it succeeded, then it's a software quality increase for potential users of the package and I have no moral objection to it. The LLMs actually were helpful: in addition to adding good function docstrings and type hints, it identified more Pythonic implementations of various code blocks.

Around this time, my coworkers were pushing [GitHub Copilot](https://github.com/features/copilot) within [Visual Studio Code](https://code.visualstudio.com) as a coding aid, particularly around then-new [Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5). For my data science work, Sonnet 4.5 in Copilot was not helpful and tended to create overly verbose Jupyter Notebooks so I was not impressed. However, in November, Google then [released](https://blog.google/innovation-and-ai/products/nano-banana-pro/) Nano Banana Pro which necessitated an immediate update to `gemimg` for compatibility with the model. After experimenting with Nano Banana Pro, I discovered that the model can [create images with arbitrary grids](https://minimaxir.com/2025/12/nano-banana-pro/#grid) (e.g. 2x2, 3x2) as an extremely practical workflow, so I quickly [wrote a spec](https://github.com/minimaxir/gemimg/issues/15) to implement support and also slice each subimage out of it to save individually. I knew this workflow is relatively simple-but-tedious to implement using [Pillow](https://pypi.org/project/pillow/) shenanigans, so I felt safe enough to ask Copilot to `Create a grid.py file that implements the Grid class as described in issue #15`, and it did just that although with some errors in areas not mentioned in the spec (e.g. mixing row/column order) but they were easily fixed with more specific prompting. Even accounting for handling errors, that's enough of a material productivity gain to be more _optimistic_ of agent capabilities, but not nearly enough to become an AI hypester.

In November, just a few days before Thanksgiving, Anthropic [released Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5) and naturally my coworkers were curious if it was a significant improvement over Sonnet 4.5. It was very suspicious that Anthropic released Opus 4.5 right before a major holiday since companies typically do that in order to bury underwhelming announcements as your prospective users will be too busy gathering with family and friends to notice. Fortunately, I had no friends and no family in San Francisco so I had plenty of bandwidth to test the new Opus.

## A Foreword on AGENTS.md

One aspect of agents I hadn't researched but knew was necessary to getting good results from agents was the concept of the [AGENTS.md](https://agents.md) file: a file which can control specific behaviors of the agents such as code formatting. If the file is present in the project root, the agent will automatically read the file and in theory obey all the rules within. This is analogous to system prompts for normal LLM calls and if you've been following my writing, I have an unhealthy addiction to highly nuanced system prompts with additional shenanigans such as ALL CAPS for increased adherence to more important rules (yes, that's still effective). I could not find a good starting point for a Python-oriented `AGENTS.md` I liked, so I asked Opus 4.5 to make one:

```md
Add an `AGENTS.md` file oriented for good Python code quality. It should be intricately details. More important rules should use caps, e.g. `MUST`
```

I then added a few more personal preferences and suggested tools from my previous failures working with agents in Python: use `uv` and `.venv` instead of the base Python installation, use `polars` instead of `pandas` for data manipulation, only store secrets/API keys/passwords in `.env` while ensuring `.env` is in `.gitignore`, etc. Most of these constraints don't tell the agent what to do, but _how_ to do it. In general, adding a rule to my `AGENTS.md` whenever I encounter a fundamental behavior I don't like has been very effective. For example, agents love using unnecessary emoji which I hate, so I added a rule:

```md
**NEVER** use emoji, or unicode that emulates emoji (e.g. ✓, ✗).
```

Agents also tend to leave a lot of redundant code comments, so I added another rule to prevent that:

```md
**MUST** avoid including redundant comments which are tautological or self-demonstating (e.g. cases where it is easily parsable what the code does at a glance or its function name giving sufficient information as to what the code does, so the comment does nothing other than waste user time)
```

My up-to-date `AGENTS.md` file for Python is available [here](https://gist.github.com/minimaxir/10b780671ee5d695b4369b987413b38f), and throughout my time working with Opus, it adheres to every rule despite the file's length, and in the instances where I accidentally query an agent without having an `AGENTS.md`, it's _very_ evident. It would not surprise me if the file is the main differentiator between those getting good and bad results with agents, although success is [often mixed](https://news.ycombinator.com/item?id=47034087).

As a side note if you are using [Claude Code](https://code.claude.com/docs/en/overview), the file must be named `CLAUDE.md` instead because Anthropic is weird; this blog post will just use `AGENTS.md` for consistency.

## Opus First Contact

With my `AGENTS.md` file set up, I did more research into proper methods of prompting agents to see if I was missing something that led to the poor performance from working with Sonnet 4.5.

{{< figure src="claude_docs.png" caption="From the [Claude Code quickstart](https://code.claude.com/docs/en/quickstart)." >}}

Anthropic's prompt suggestions are simple, but you can't give an LLM an open-ended question like that and expect the results _you_ want! You, the user, are likely subconsciously picky, and there are always functional requirements that the agent won't magically apply because it cannot read minds and behaves as a [literal genie](https://tvtropes.org/pmwiki/pmwiki.php/Main/LiteralGenie). My approach to prompting is to write the potentially-very-large individual prompt in its own Markdown file (which can be tracked in `git`), then tag the agent with that prompt and tell it to implement that Markdown file. Once the work is completed and manually reviewed, I manually commit the work to `git`, with the message referencing the specific prompt file so I have good internal tracking.

{{< figure src="implement.png" >}}

I completely ignored Anthropic's advice and wrote a more elaborate test prompt based on a use case I'm familiar with and therefore can audit the agent's code quality. In 2021, I wrote a script to [scrape YouTube video metadata](https://github.com/minimaxir/youtube-video-scraper) from videos on a given channel using [YouTube's Data API](https://developers.google.com/youtube/v3), but the API is poorly and counterintuitively documented and my Python scripts aren't great. I subscribe to the [SiIvagunner YouTube account](https://www.youtube.com/channel/UC9ecwl3FTG66jIKA9JRDtmg) which, as a part of the channel's gimmick ([musical swaps](https://www.youtube.com/watch?v=rEcOzjg7vBU) with different melodies than the ones expected), posts hundreds of videos per month with nondescript thumbnails and titles, making it nonobvious which videos are the best other than the view counts. The video metadata could be used to surface good videos I missed, so I had a fun idea to test Opus 4.5:

```md
Create a robust Python script that, given a YouTube Channel ID, can scrape the YouTube Data API and store all video metadata in a SQLite database. The YOUTUBE_API_KEY is present in `.env`.

Documentation on the channel endpoint: https://developers.google.com/youtube/v3/guides/implementation/channels

The test channel ID to scrape is: `UC9ecwl3FTG66jIKA9JRDtmg`

You MUST obey ALL the FOLLOWING rules in your implementation.

- Do not use the Google Client SDK. Use the REST API with `httpx`.
- Include sensible aggregate metrics, e.g. number of comments on the video.
- Incude `channel_id` and `retrieved_at` in the database schema.
```

The resulting script is available [here](https://github.com/minimaxir/youtube_scraper_opus/blob/main/scrape_channel.py), and it worked first try to scrape up to 20,000 videos (the max limit). The resulting Python script has very Pythonic code quality following the copious rules provided by the `AGENTS.md`, and it's more robust than my old script from 2021. It is most definitely not the type of output I encountered with Sonnet 4.5. There was a minor issue however: the logging is implemented naively such that the API key is leaked in the console. I added a rule to `AGENTS.md` but really this is the YouTube API's fault for [encouraging API keys as parameters in a GET request](https://developers.google.com/youtube/v3/getting-started#example-1).

I asked a more data-science-oriented followup prompt to test Opus 4.5's skill at data-sciencing:

```md
Create a Jupyter Notebook that, using `polars` to process the data, does a thorough exploratory data analysis of data saved in `youtube_videos.db`, for all columns.

This analysis should be able to be extended to any arbitrary input `channel_id`.
```

The [resulting Jupyter Notebook](https://github.com/minimaxir/youtube_scraper_opus/blob/main/eda_youtube.ipynb) is...indeed thorough. That's on me for specifying "for all columns", although it was able to infer the need for temporal analysis (e.g. total monthly video uploads over time) despite not explicitly being mentioned in the prompt.

The monthly analysis gave me an idea: could Opus 4.5 design a small webapp to view the top videos by month? That gives me the opportunity to try another test of how well Opus 4.5 works with less popular frameworks than React or other JavaScript component frameworks that LLMs push by default. Here, I'll try [FastAPI](https://fastapi.tiangolo.com), [Pico CSS](https://picocss.com) for the front end (because we don't need a JavaScript framework for this), and [HTMX](https://htmx.org) for lightweight client/server interactivity:

```md
Create a Hacker News-worthy FastAPI application using HTMX for interactivity and PicoCSS for styling to build a YouTube-themed application that leverages `youtube_videos.db` to create an interactive webpage that shows the top videos for each month, including embedded YouTube videos which can be clicked.
```

{{< figure src="yt_web_app.webp" >}}

The FastAPI webapp [Python code](https://github.com/minimaxir/youtube_scraper_opus/blob/main/app.py) is good with logical integration of HTMX routes and partials, but Opus 4.5 had fun with the "YouTube-themed" aspect of the prompt: the video thumbnail simulates a YouTube thumbnail with video duration that loads an embedded video player when clicked! The full code is open-source [in this GitHub repository](https://github.com/minimaxir/youtube_scraper_opus/).

All of these tests performed far better than what I expected given my prior poor experiences with agents. Did I gaslight myself by being an agent skeptic? How did a LLM sent to die finally solve my agent problems? Despite the holiday, X and Hacker News were abuzz with similar stories about the massive difference between Sonnet 4.5 and Opus 4.5, so something _did_ change.

Obviously an API scraper and data viewer alone do not justify an **OPUS 4.5 CHANGES EVERYTHING** declaration on social media, but it's enough to be less cynical and more optimistic about agentic coding. It's an invitation to continue creating more difficult tasks for Opus 4.5 to solve. From this point going forward, I will also switch to the terminal Claude Code, since my pipeline is simple enough and doesn't warrant a UI or other shenanigans.

## Getting Rusty At Coding

If you've spent enough time on programming forums such as Hacker News, you've probably seen the name "Rust", often in the context of snark. [Rust](https://rust-lang.org) is a relatively niche compiled programming language that touts two important features: speed, which is evident in [framework benchmarks](https://www.techempower.com/benchmarks/#section=data-r23) where it can perform 10x as fast as the fastest Python library, and memory safety enforced at compile time through its ownership and borrowing systems which mitigates many potential problems. For over a decade, the slogan "Rewrite it in Rust" [became a meme](https://transitiontech.ca/random/RIIR) where advocates argued that _everything_ should be rewritten in Rust due to its benefits, including extremely mature software that's infeasible to actually rewrite in a different language. Even the major LLM companies are looking to Rust to eke out as much performance as possible: OpenAI President Greg Brockman [recently tweeted](https://x.com/gdb/status/2007228511363444905) "rust is a perfect language for agents, given that if it compiles it's ~correct" which — albeit that statement is silly at a technical level since code can still be _logically_ incorrect — shows that OpenAI is very interested in Rust, and if they're interested in writing Rust code, they need their LLMs to be able to code well in Rust.

I myself am not very proficient in Rust. Rust has a famously excellent [interactive tutorial](https://rust-lang.org/learn/), but a persistent issue with Rust is that there are few resources for those with intermediate knowledge: there's little between the tutorial and "write an operating system from scratch." That was around 2020 and I decided to wait and see if the ecosystem corrected this point (in 2026 it has not), but I've kept an eye on Hacker News for all the new Rust blog posts and library crates so that one day I too will be able to write the absolutely highest performing code possible.

Historically, LLMs have been poor at generating Rust code due to its nicheness relative to Python and JavaScript. Over the years, one of my test cases for evaluating new LLMs was to ask it to write a relatively simple application such as `Create a Rust app that can create "word cloud" data visualizations given a long input text.` but even without expert Rust knowledge I could tell the outputs were too simple and half-implemented to ever be functional even with additional prompting.

However, due to modern LLM postraining paradigms, it's entirely possible that newer LLMs are specifically RLHF-trained to write better code in Rust despite its relative scarcity. I ran more experiments with Opus 4.5 and using LLMs in Rust on some fun pet projects, and my results were _far_ better than I expected. Here are four such projects:

### icon-to-image

As someone who primarily works in Python, what first caught my attention about Rust is the [PyO3](https://pyo3.rs/v0.28.2/) crate: a crate that allows accessing Rust code through Python with all the speed and memory benefits that entails while the Python end-user is none-the-wiser. My first exposure to `pyo3` was the fast tokenizers in [Hugging Face](https://huggingface.co) [tokenizers](https://github.com/huggingface/tokenizers), but many popular Python libraries now also use this pattern for speed, including [orjson](https://github.com/ijl/orjson), [pydantic](https://docs.pydantic.dev/latest/), and my favorite [polars](https://pola.rs). If agentic LLMs could now write both performant Rust code and leverage the `pyo3` bridge, that would be _extremely_ useful for myself.

I decided to start with a very simple project: a project that can take icons from an icon font file such as the ones provided by [Font Awesome](https://fontawesome.com) and render them into images at any arbitrary resolution.

{{< figure src="icons_header.webp" >}}

I made [this exact project](https://github.com/minimaxir/icon-image) in Python in 2021, and it's very hacky by pulling together several packages and cannot easily be maintained. A better version in Rust with Python bindings is a good way to test Opus 4.5.

The very first thing I did was create a `AGENTS.md` for Rust by telling Opus 4.5 to port over the Python rules to Rust semantic equivalents. This worked well enough and had the standard Rust idioms: no `.clone()` to handle lifetimes poorly, no unnecessary `.unwrap()`, no `unsafe` code, etc. Although I am not a Rust expert and cannot speak that the agent-generated code is idiomatic Rust, none of the Rust code demoed in this blog post has traces of bad Rust code smell. Most importantly, the agent is instructed to call [clippy](https://doc.rust-lang.org/stable/clippy/) after each major change, which is Rust's famous linter that helps keep the code clean, and Opus is good about implementing suggestions from its warnings. My up-to-date Rust `AGENTS.md` is available [here](https://gist.github.com/minimaxir/068ef4137a1b6c1dcefa785349c91728).

With that, I built a gigaprompt to ensure Opus 4.5 accounted for both the original Python implementation and a few new ideas I had, such as [supersampling](https://en.wikipedia.org/wiki/Supersampling) to antialias the output.

```md
Create a Rust/Python package (through `pyo3` and `maturin`) that efficiently and super-quickly takes an Icon Font and renders an image based on the specified icon. The icon fonts are present in `assets`, and the CSS file which maps the icon name to the corresponding reference in the icon font is in `fontawesome.css`.

You MUST obey ALL the FOLLOWING implementation notes:

- If the icon name has `solid` in it, it is referencing `fa-solid.otf`.
- `fa-brands.otf` and `fa-regular.otf` can be combined.
- The package MUST also support Python (via `pyo3` and `maturin`).
- The package MUST be able to output the image rendered as an optimized PNG and WEBP. with a default output resolution of 1024 x 1024.
- The image rendering MUST support supersampling for antialiased text and points (2x by default)
- The package MUST implement `fontdue` as its text rendering method.
- Allow the user to specify the color of the icon and the color of the background (both hex and RGB)
- Allow transparent backgrounds.
- Allow user to specify the icon size and canvas size separately.
- Allow user to specify the anchor positions (horizontal and vertical) for the icon relative to the canvas (default: center and center)
- Allow users to specify a horizontal and vertical pixel offset for the icon relative to the canvas.

After your base implementation is complete, you MUST:

- Write a comprehensive Python test suite using `pytest`.
- Write a Python Jupyter Notebook
- Optimize the Rust binary file size and the Python package file size.
```

It completed the assignment in one-shot, accounting for all of the many feature constraints specified. The "Python Jupyter Notebook" notebook command at the end is how I manually tested whether the `pyo3` bridge worked, and it indeed worked like a charm. There was one mistake that's my fault however: I naively chose the [fontdue](https://github.com/mooman219/fontdue) Rust crate as the renderer because I remember [seeing a benchmark](https://github.com/mooman219/fontdue?tab=readme-ov-file#performance) showing it was the fastest at text rendering. However, testing large icon generation exposed a flaw: `fontdue` achieves its speed by only partially rendering curves, which is a very big problem for icons, so I followed up:

```md
The generated icons, at a high resolution, show signs of not having curves and instead showing discrete edges (image attached). Investigate the `fontdue` font renderer to see if there's an issue there.

In the event that it's not possible to fix this in `fontdue`, investigate using `ab_glyph` instead.
```

Opus 4.5 used its Web Search tool to confirm the issue is expected with `fontdue` and implemented [ab_glyph](https://crates.io/crates/ab_glyph) instead which did fix the curves.

icon-to-image is available [open-source on GitHub](https://github.com/minimaxir/icon-to-image). There were around 10 prompts total adding tweaks and polish, but through all of them Opus 4.5 never failed the assignment as written. Of course, generating icon images in Rust-with-Python-bindings is an order of magnitude faster than my old hacky method, and thanks to the better text rendering and supersampling it also looks much better than the Python equivalent.

There's a secondary pro and con to this pipeline: since the code is compiled, it avoids having to specify as many dependencies in Python itself; in this package's case, Pillow for image manipulation in Python is optional and the Python package won't break if Pillow changes its API. The con is that compiling the Rust code into Python wheels is difficult to automate especially for multiple OS targets: fortunately, GitHub provides [runner VMs](https://docs.github.com/en/actions/concepts/runners/github-hosted-runners) for this pipeline and a little bit of back-and-forth with Opus 4.5 created [a GitHub Workflow](https://github.com/minimaxir/icon-to-image/blob/main/.github/workflows/release.yml) which runs the build for all target OSes on publish, so there's no extra effort needed on my end.

### Word Clouds In The Browser

When I used word clouds in Rust as my test case for LLM Rust knowledge, I had an ulterior motive: I _love_ word clouds. Back in 2019, I open-sourced a Python package titled [stylecloud](https://github.com/minimaxir/stylecloud): a package built on top of Python's word cloud, but with the added ability to add more color gradients and masks based on icons to easily conform it into shapes (sound familiar?)

{{< figure src="stylecloud_banner.png" >}}

However, stylecloud was hacky and fragile, and a number of features I wanted to add such as non-90-degree word rotation, transparent backgrounds, and SVG output flat-out were not possible to add due to its dependency on Python's [wordcloud](https://github.com/amueller/word_cloud)/[matplotlib](https://matplotlib.org), and also the package was really slow. The only way to add the features I wanted was to build something from scratch: Rust fit the bill.

The pipeline was very similar to `icon-to-image` above: ask Opus 4.5 to fulfill a long list of constraints with the addition of Python bindings. But there's another thing that I wanted to test that would be extremely useful if it worked: WebAssembly (WASM) output with [wasm-bindgen](https://crates.io/crates/wasm-bindgen). Rust code compiled to WASM allows it to be run in any modern web browser with the speed benefits intact: no dependencies needed, and therefore should be future-proof. However, there's a problem: I would have to design an interface and I am not a front end person, and I say without hyperbole that for me, designing even a simple HTML/CSS/JS front end for a project is more stressful than training an AI. However, Opus 4.5 is able to take general guidelines and get it into something workable: I first told it to use Pico CSS and vanilla JavaScript and that was enough, but then I had an idea to tell it to use [shadcn/ui](https://ui.shadcn.com) — a minimalistic design framework normally reserved for Web Components — along with screenshots from that website as examples. That also worked.

{{< figure src="wordcloud_rust_ui.webp" >}}

After more back-and-forth with design nitpicks and more features to add, the package is feature complete. However, it needs some more polish and a more unique design before I can release it, and I got sidetracked by _something_ more impactful...

### miditui

`Create a music player in the terminal using Rust` was another Rust stress test I gave to LLMs: command line terminals can't play audio, right? Turns out, it can with the [rodio](https://crates.io/crates/rodio) crate. Given the success so far with Opus 4.5 I decided to make the tasks more difficult: terminals can play sound, but can it _compose_ sound? So I asked Opus 4.5 to create a MIDI composer and playback DAW within a terminal, which worked. Adding features forced me to learn more about how MIDIs and [SoundFonts](https://en.wikipedia.org/wiki/SoundFont) actually work, so it was also educational!

{{< figure src="miditui.webp" >}}

miditui is available [open-sourced on GitHub](https://github.com/minimaxir/miditui), and the prompts used to build it are [here](https://github.com/minimaxir/miditui/blob/main/agent_notes/PROMPTS.md).

During development I encountered a caveat: Opus 4.5 can't test or view a terminal output, especially one with unusual functional requirements. But despite being blind, it knew enough about the [ratatui](https://ratatui.rs) terminal framework to implement whatever UI changes I asked. There were a large number of UI bugs that likely were caused by Opus's inability to create test cases, namely failures to account for scroll offsets resulting in incorrect click locations. As someone who spent 5 years as a [black box](https://en.wikipedia.org/wiki/Black_box) Software QA Engineer who was unable to review the underlying code, this situation was my specialty. I put my QA skills to work by messing around with `miditui`, told Opus any errors with occasionally a screenshot, and it was able to fix them easily. I do not believe that these bugs are inherently due to LLM agents being better or worse than humans as humans are most definitely capable of making the same mistakes. Even though I myself am adept at finding the bugs and offering solutions, I don't believe that I would inherently avoid causing similar bugs were I to code such an interactive app without AI assistance: QA brain is different from software engineering brain.

### ballin

One night — after a glass of wine — I had another idea: one modern trick with [ASCII art](https://en.wikipedia.org/wiki/ASCII_art) is the use of [Braille unicode characters](https://www.unicode.org/charts/nameslist/c_2800.html) to allow for [very high detail](https://steamcommunity.com/sharedfiles/filedetails/?id=2807089604). That reminded me of ball physics simulations, so what about building a full physics simulator also in the terminal? So I asked Opus 4.5 to create a terminal physics simulator with the [rapier](https://rapier.rs) 2D physics engine and a detailed explanation of the Braille character trick: this time Opus did better and completed it in one-shot, so I spent more time making it colorful and _fun_. I pessimistically thought the engine would only be able to handle a few hundred balls: instead, the Rust codebase can handle over 10,000 logical balls!

{{< figure src="ballin.webp" caption="I explicitly prompted Opus to make the Colors button have a different color for each letter." >}}

ballin is available [open-sourced on GitHub](https://github.com/minimaxir/ballin), and the prompts used to build it are [here](https://github.com/minimaxir/ballin/blob/main/PROMPTS.md).

The `rapier` crate also published a blog post highlighting a [major change to its underlying math engine](https://dimforge.com/blog/2026/01/09/the-year-2025-in-dimforge), in its 0.32.0 version so I asked Opus 4.5 to upgrade to that version...and it caused crashes, yet tracing the errors showed it originated with `rapier` itself. Upgrading to 0.31.0 was fine with no issues: a consequence of only using agentic coding for this workflow is that I cannot construct a minimal reproducible test case to file as a regression bug report or be able to isolate it as a side effect of a new API not well-known by Opus 4.5.

The main lesson I learnt from working on these projects is that agents work best when you have [approximate knowledge of many things](https://www.youtube.com/watch?v=W9_iQ1FSnp8) with enough domain expertise to know what should and should not work. Opus 4.5 is good enough to let me finally do side projects where I know precisely what I want but not necessarily how to implement it. These specific projects aren't the Next Big Thing™ that justifies the existence of an industry taking billions of dollars in venture capital, but they make my life better and since they are open-sourced, hopefully they make someone else's life better. However, I still wanted to push agents to do more impactful things in an area that might be more worth it.

## It's Not AI Psychosis If It Works

Before I wrote my blog post about how I use LLMs, I wrote a tongue-in-cheek blog post titled [Can LLMs write better code if you keep asking them to “write better code”?](https://minimaxir.com/2025/01/write-better-code/) which is exactly as the name suggests. It was an experiment to determine how LLMs interpret the ambiguous command "write better code": in this case, it was to prioritize making the code more convoluted with more helpful features, but if instead given commands to optimize the code, it did make the code faster successfully albeit at the cost of significant readability. In software engineering, one of the greatest sins is [premature optimization](https://stackify.com/premature-optimization-evil/), where you sacrifice code readability and thus maintainability to chase performance gains that slow down development time and may not be worth it. Buuuuuuut with agentic coding, we implicitly accept that our interpretation of the code is fuzzy: could agents iteratively applying optimizations for the sole purpose of minimizing benchmark runtime — and therefore faster code in typical use cases if said benchmarks are representative — now actually be a good idea? People complain about how AI-generated code is slow, but if AI can now reliably generate _fast_ code, that changes the debate.

{{< figure src="div255.png" caption="Multiplication and division are too slow for Opus 4.6." >}}

As a data scientist, I've been frustrated that there haven't been any impactful new Python data science tools released in the past few years other than `polars`. Unsurprisingly, research into AI and LLMs has subsumed traditional DS research, where developments such as text embeddings have had [extremely valuable gains](https://minimaxir.com/2025/02/embeddings-parquet/) for typical data science natural language processing tasks. The traditional machine learning algorithms are still valuable, but no one has invented [Gradient Boosted Decision Trees](https://developers.google.com/machine-learning/decision-forests/intro-to-gbdt) 2: Electric Boogaloo. Additionally, as a data scientist in San Francisco I am legally required to use a MacBook, but there haven't been data science utilities that actually use the GPU in an Apple Silicon MacBook as they don't support its Metal API; data science tooling is exclusively in CUDA for NVIDIA GPUs. What if agents could now port these algorithms to a) run on Rust with Python bindings for its speed benefits and b) run on GPUs without complex dependencies?

This month, OpenAI announced their [Codex app](https://openai.com/index/introducing-the-codex-app/) and my coworkers were asking questions. So I downloaded it, and as a test case for the GPT-5.2-Codex (high) model, I asked it to reimplement the [UMAP algorithm](https://umap-learn.readthedocs.io/en/latest/) in Rust. UMAP is a dimensionality reduction technique that can take in a high-dimensional matrix of data and simultaneously cluster and visualize data in lower dimensions. However, it is a very computationally-intensive algorithm and the only tool that can do it quickly is NVIDIA's [cuML](https://github.com/rapidsai/cuml) which requires CUDA dependency hell. If I can create a UMAP package in Rust that's superfast with minimal dependencies, that is an _massive_ productivity gain for the type of work I do and can enable fun applications if fast enough.

After OpenAI [released](https://openai.com/index/introducing-gpt-5-3-codex/) GPT-5.3-Codex (high) which performed substantially better and faster at these types of tasks than GPT-5.2-Codex, I asked Codex to write a UMAP implementation from scratch in Rust, which at a glance seemed to work and gave reasonable results. I also instructed it to create benchmarks that test a wide variety of representative input matrix sizes. Rust has a popular benchmarking crate in [criterion](https://crates.io/crates/criterion), which outputs the benchmark results in an easy-to-read format, which, most importantly, agents can easily parse.

{{< figure src="criterion.png" caption="Example output from `criterion`." >}}

At first glance, the benchmarks and their construction looked good (i.e. no cheating) and are much faster than working with UMAP in Python. To further test, I asked the agents to implement additional different useful machine learning algorithms such as HDBSCAN as individual projects, with each repo starting with this 8 prompt plan in sequence:

1. Implement the package with the specific functional requirements and design goals; afterwards, create benchmarks with specific matrix sizes that are representative of typical use cases
2. Do a second pass to clean up the code/comments and make further optimizations
3. Scan the crate to find areas of algorithmic weaknesses in extreme cases, and write a sentence for each describing the problem, the potential solution, and quantifying the impact of the solution
4. Leveraging the findings found, optimize the crate such that ALL benchmarks run 60% or quicker (1.4x faster). Use any techniques to do so, and repeat until benchmark performance converges, but don't game the benchmarks by overfitting on the benchmark inputs alone [^cheat]
5. Create custom tuning profiles that take advantage of the inherent quantities of the input data and CPU thread saturation/scheduling/parallelization to optimize the crate such that ALL benchmarks run 60% or quicker (1.4x faster). You can use the [flamegraph](https://crates.io/crates/flamegraph) crate to help with the profiling
6. Add Python bindings using `pyo3` 0.27.2 and `maturin`, with relevant package-specific constraints (specifying the `pyo3` version is necessary to ensure compatability with Python 3.10+)
7. Create corresponding benchmarks in Python, and write a comparison script between the Python bindings and an existing Python package
8. Accuse the agent of potentially cheating its algorithm implementation while pursuing its optimizations, so tell it to optimize for the similarity of outputs against a known good implementation (e.g. for a regression task, minimize the [mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error) in predictions between the two approaches)

[^cheat]: Two subtle ways agents can implicitly negatively affect the benchmark results but wouldn't be considered cheating/gaming it are a) implementing a form of caching so the benchmark tests are not independent and b) launching benchmarks in parallel on the same system. I eventually added `AGENTS.md` rules to ideally prevent both.

The simultaneous constraints of code quality requirements via `AGENTS.md`, speed requirements with a quantifiable target objective, and an output accuracy/quality requirement, all do succeed at finding meaningful speedups consistently (atleast 2x-3x)

{{< figure src="pca_benchmark_codex.png" caption="Codex 5.3 after optimizing a [principal component analysis](https://en.wikipedia.org/wiki/Principal_component_analysis) implementation." >}}

I'm not content with only 2-3x speedups: nowadays in order for this agentic code to be meaningful and not just another repo on GitHub, it has to be the _fastest implementation possible_. In a moment of sarcastic curiosity, I tried to see if Codex and Opus had different approaches to optimizing Rust code by chaining them:

1. Instruct Codex to optimize benchmarks to 60% of runtime
2. Instruct Opus to optimize benchmarks to 60% of runtime
3. Instruct Opus to minimize differences between agentic implementation and known good implementation without causing more than a 5% speed regression on any benchmarks

_This works_. From my tests with the algorithms, Codex can often speed up the algorithm by 1.5x-2x, then Opus somehow speeds up that optimized code _again_ to a greater degree. This has been the case of all the Rust code I've tested: I also ran the `icon-to-image` and the word cloud crates through this pipeline and gained 6x cumulative speed increases in both libraries.

Can these agent-benchmaxxed implementations actually beat the existing machine learning algorithm libraries, despite those libraries already being written in a low-level language such as C/C++/Fortran? Here are the results on my personal MacBook Pro comparing the CPU benchmarks of the Rust implementations of various computationally intensive ML algorithms to their respective popular implementations, where the agentic Rust results are within similarity tolerance with the battle-tested implementations and Python packages are compared against the Python bindings of the agent-coded Rust packages:

- UMAP: 2-10x faster than Rust's [fast-umap](https://crates.io/crates/fast-umap), 9-30x faster than Python's [umap](https://umap-learn.readthedocs.io/en/latest/)
- HDBSCAN (clustering algorithm): 23-100x faster than the [hdbscan](https://crates.io/crates/hdbscan) Rust crate, 3x-10x faster than Python's [hdbscan](https://pypi.org/project/hdbscan/)
- GBDT (tree-boosting algorithm): 1.1x-1.5x faster fit/predict than the [treeboost](https://crates.io/crates/treeboost) Rust crate[^treeboost], 24-42x faster fit/1-5x faster predict than Python's [xgboost](https://xgboost.readthedocs.io/en/stable/index.html)

[^treeboost]: The `treeboost` crate beat the agent-optimized GBT crate by 4x on my first comparison test, which naturally I took offense: I asked Opus 4.6 to "Optimize the crate such that `rust_gbt` wins in ALL benchmarks against `treeboost`." and it did just that.

I'll definitely take those results with this unoptimized prompting pipeline! In all cases, the GPU benchmarks are unsurprisingly even better and with [wgpu](https://crates.io/crates/wgpu) and added WGSL shaders the code runs on Metal without any additional dependencies, however further testing is needed so I can't report numbers just yet.

Although I could push these new libraries to GitHub now, machine learning algorithms are understandably a domain which requires extra care and testing. It would be arrogant to port Python's [scikit-learn](https://scikit-learn.org/stable/) — the gold standard of data science and machine learning libraries — to Rust with all the features that implies.

But that's unironically a good idea so I decided to try and do it anyways. With the use of agents, I am now developing `rustlearn` (extreme placeholder name), a Rust crate that implements not only the fast implementations of the standard machine learning algorithms such as [logistic regression](https://en.wikipedia.org/wiki/Logistic_regression) and [k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering), but also includes the fast implementations of the algorithms above: the same three step pipeline I describe above still works even with the more simple algorithms to beat scikit-learn's implementations. This crate can therefore receive Python bindings and even expand to the Web/JavaScript and beyond. This also gives me the oppertunity to add quality-of-life features to resolve grievances I've had to work around as a data scientist, such as model serialization and native integration with pandas/polars DataFrames. I hope this use case is considered to be more practical and complex than making a ball physics terminal app.

Many people reading this will call bullshit on the performance improvement metrics, and honestly, fair. I too thought the agents would stumble in hilarious ways trying, but they did not. To demonstrate that I am not bullshitting, I also decided to release a more simple Rust-with-Python-bindings project today: nndex, an in-memory vector "store" that is designed to retrieve the exact nearest neighbors as fast as possible (and has fast approximate NN too), and is now available [open-sourced on GitHub](https://github.com/minimaxir/nndex). This leverages the [dot product](https://en.wikipedia.org/wiki/Dot_product) which is one of the simplest matrix ops and is therefore heavily optimized by existing libraries such as Python's [numpy](https://numpy.org)...and yet after a few optimization passes, it tied `numpy` even though `numpy` leverages [BLAS](https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms) libraries for maximum mathematical performance. Naturally, I instructed Opus to also add support for BLAS with more optimization passes and it now is 1-5x numpy's speed in the single-query case and much faster with batch prediction. [^blas] It's so fast that even though I also added GPU support for testing, it's mostly ineffective below 100k rows due to the GPU dispatch overhead being greater than the actual retrieval speed.

{{< figure src="nndex.png" caption="Comparison of Python `nndex` to numpy on test workloads.`topk_overlap` measures result matches (perfect match) and `max_similarity_abs_delta` measure the largest difference between calculated cosine similarities (effectively zero)." >}}

[^blas]: Currently, only the macOS build has BLAS support as Win/Linux BLAS support is a rabbit hole that needs more time to investigate. On those platforms, numpy does win, but that won't be the case for long!

One of the criticisms about AI generated code is that it "just regurgitates everything on GitHub" but by construction, if the code is faster than what currently exists, then it can't have been stolen and must be an original approach. Even if the explicit agentic nature of `rustlearn` makes it risky to adopt downstream, the learnings from how it accomplishes its extreme speed are still valuable.

## The Implications of My Agentic Successes

Like many who have hopped onto the agent train post-Opus 4.5, I've become nihilistic over the past few months, but not for the typical reasons. I actually am not hitting burnout and I am not worried that my programming skills are decaying due to agents: on the contrary, the session limits intended to stagger server usage have unintentionally caused me to form a habit of coding for fun an hour every day incorporating and implementing new ideas. However, is there a _point_ to me writing this blog post and working on these libraries if people will likely just reply "tl;dr AI slop" and "it's vibecoded so it's automatically bad"?

The real annoying thing about Opus 4.6/Codex 5.3 is that it's impossible to publicly say "Opus 4.5 (and the models that came after it) are an order of magnitude better than coding LLMs released just months before it" without sounding like an AI hype booster clickbaiting, but it's the counterintuitive truth to my personal frustration. I have been trying to break this damn model by giving it complex tasks that would take me months to do by myself despite my coding pedigree but Opus and Codex keep doing them correctly. On Hacker News I was [accused of said clickbaiting](https://news.ycombinator.com/item?id=46979055) when making a similar statement with accusations of "I haven't had success with Opus 4.5 so you must be lying." The remedy to this skepticism is to provide more evidence in addition to greater checks and balances, but what can you do if people refuse to believe your evidence?

A year ago, I was one of those skeptics who was very suspicious of the agentic hype, but I was willing to change my priors in light of new evidence and experiences, which apparently is rare. Generative AI discourse has become too toxic and its discussions always end the same way, so I have been experimenting with touching grass instead, and it is nice. At this point, if I'm not confident that I can please anyone with my use of AI, then I'll take solace in just pleasing myself. Continue open sourcing my projects, writing blog posts, and let the pieces fall as they may. If you want to follow along or learn when `rustlearn` releases, you can follow me [on Bluesky](https://bsky.app/profile/minimaxir.bsky.social).

Moment of introspection aside, I'm not sure what the future holds for agents and generative AI. My use of agents has proven to have significant utility (for myself at the least) and I have more-than-enough high-impact projects in the pipeline to occupy me for a few months. Although certainly I will use LLMs more for coding apps which benefit from this optimization, that doesn't imply I will use LLMs more elsewhere: I still don't use LLMs for writing — in fact I have intentionally made my writing voice more sardonic to specifically fend off AI accusations.

With respect to Rust, working with agents and seeing how the agents make decisions/diffs has actually helped me break out of the intermediate Rust slog and taught me a lot about the ecosystem by taking on more ambitious projects that required me to research and identify effective tools for modern Rust development. Even though I have _technically_ released Rust packages with many stars on GitHub, I have no intention of putting Rust as a professional skill on my LinkedIn or my résumé. As an aside, how exactly do résumés work in an agentic coding world? Would "wrote many open-source libraries through the use of agentic LLMs which increased the throughput of popular data science/machine learning algorithms by an order of magnitude" be disqualifying to a prospective employer as they may think I'm cheating and faking my expertise?

My obligation as a professional coder is to do what works best, especially for open source code that other people will use. Agents are another tool in that toolbox with their own pros and cons. If you've had poor experiences with agents before last November, I strongly urge you to give modern agents another shot, especially with an `AGENTS.md` tailored to your specific coding domain and nuances (again here are my [Python](https://gist.githubusercontent.com/minimaxir/10b780671ee5d695b4369b987413b38f/raw/f06ad4f1430a8d9f268b160a755dab817384c93c/AGENTS.md) and [Rust](https://gist.githubusercontent.com/minimaxir/068ef4137a1b6c1dcefa785349c91728/raw/0fa5d1b505338b3a2c6834cc41e728cefe57511b/AGENTS.md) files, in conveient copy/paste format).

Overall, I'm very sad at the state of agentic discourse but also very excited at its promise: it's currently unclear which one is the stronger emotion.
