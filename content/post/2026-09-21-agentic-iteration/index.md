---
title: Writing Rust code that's faster than state-of-the-art libraries by asking agents to make the code faster
# title: Writing Rust code faster than SotA by asking agents to make the code faster
date: 2026-09-21T09:30:00
slug: agentic-iteration
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
  - Rust
  - Python
  - Prompt Engineering
draft: false
summary: c'mon, try doing a breakthrough
cover:
  image: featured.webp
  relative: true
  hiddenInSingle: true
---

<span><style type="text/css">
pre code.language-txt, pre code.language-md{
white-space: pre-wrap !important;
word-break: normal !important;
}
</style></span>

In January 2025, I had a fun hypothesis for [a blog post](https://minimaxir.com/2025/01/write-better-code/): can LLMs write better code if you keep asking them to "write better code"? That was prior to the advent of robust agentic coding, but Claude Sonnet 3.5 was still able to iteratively improve on algorithmic [Python](https://www.python.org) code. The "better" instruction turned out to be underspecified: Sonnet abused that ambiguity to instead add a ton of useless features but the code was indeed faster. Even with the rise of agentic LLMs specifically [RLHF](https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback)ed to handle solving common pass/fail coding problems, optimization is generally not a part of that suite.

At the end of that blog post, I opined on a hypothetical future where LLMs could be able to write superfast Python code by instead writing [Rust](https://rust-lang.org) code and using [PyO3](https://github.com/pyo3/pyo3) to bridge the languages to get Python's ergonomics with Rust's speed. An earlier draft of that post asserted that the same "write code better" instruction could instead be applied to the base Rust code and drastically improve its speed which would then propagate down to the Python code: however, back then I did not know enough about Rust and making such a claim would be too _spicy_ without evidence.

After months of testing and experimenting since the release of Opus 4.5 made agentic coding more viable, I can confidently confirm that modern agentic LLMs can indeed write Rust code that is significantly faster than current state-of-the-art approaches _if given appropriate guardrails and constraints_. Additionally, as LLMs have made drastic improvements in coding in each successive frontier model release since Opus 4.5, the optimizations have become even better, cumulatively resulting in anywhere from 2x-20x speedup depending on the domain.

More importantly, this blog post is not a vaguepost and I am including both the prompts I used and the benchmark results. You've been warned.

## Iterative "Benchmaxxing"

At first, making software faster was a good quantitative way for me to test and compare these new agentic models. I used Rust as the target language primarily due to the Python integration and speed, but there are other aspects of the Rust language that make it particularly useful if a fast implementation is indeed discovered, such as memory safety and the ability to compile it to [WebAssembly](https://webassembly.org)/WASM so it can run in a web browser without much effort. However, one important constraint I will follow that technically may not result in the fastest code is to forbid [unsafe code](https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html) whenever possible.

My first test case was reimplementing machine learning algorithms in Rust, which would lead to a meaningful productivity increase for me as a data scientist if I had faster and scalable tooling. At the time, it was arrogant to assume that I could beat battle-tested algorithms that have been iterated on for over a decade and are already written in C so Rust's low-level benefits are not as pronounced. The algorithm I wanted to optimize the most was [UMAP](https://umap-learn.readthedocs.io/en/latest/), which is a valuable algorithm for [dimensionality reduction](https://en.wikipedia.org/wiki/Dimensionality_reduction) I used in my work, but scales poorly to big data and is very slow, with alternatives such as [cuML](https://github.com/NVIDIA/cuml) being time-consuming to set up. UMAP Rust crates such as [umap-rs](https://github.com/wilsonzlin/umap-rs) already exist where I could just fork them and prompt Claude Opus 4.5 to add Python/PyO3 support, but as an experiment and learning experience I wanted to have the agent write the algorithm from scratch with minimal Rust dependencies in order to make optimizations at as low of a level as possible.

Rust has a comprehensive benchmarking tool with the [criterion](https://crates.io/crates/criterion) crate which all agents know how to leverage. `criterion` will run the benchmarks, track results across iterations to see if performance improved or regressed, and can calculate if this change is statistically significant or just noise.

{{< figure src="criterion.png" caption="Typical `criterion` output, depicting a 3.5x speedup relative to the previous run of the benchmark."   raw=true >}}

First, in the initial prompt for creating a Rust crate for UMAP, I asked Opus 4.5 to create benchmarks with different input data sizes since optimizations for small datasets may not work for large datasets and vice versa.

```md
Afterwards, create and run a benchmark suite which stores the results as a Markdown file. The benchmark suite MUST include inputs up to 100000x768 and be tested in both CPU and GPU modes.
```

This approach created benchmarks using `criterion` and I manually reran the benchmark suite after prompting performance feature improvements such as using [faer](https://crates.io/crates/faer) for faster linear algebra and using [simsimd](https://crates.io/crates/simsimd) for faster [SIMD operations](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data). This quickly became cumbersome as I had to manually rerun each benchmark after each change to verify there are no speed regressions.

{{< note title="A sidenote on prompting style" >}}
The way I prompt agentic LLMs is unusual: I typically provide the agents very long prompts prewritten in a Markdown document with the additional use of ALL CAPS and **\*\*bolding\*\*** for emphasis. This is to ensure I capture _all_ nuances through the use of [prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering), along with several other tricks as detailed in this blog post. Although some may argue prompt engineering is dead as the latest models have become smart enough to correctly handle ambiguity, I strongly disagree as LLMs have also become much better at following said nuances.

{{< figure src="zed_prompt.png" caption="Running a prompt from a Markdown document (right) by tagging the file (left), using [Zed Agent](https://zed.dev/docs/ai/agent-panel)."  raw=true >}}

{{< /note >}}

After having enough confidence that the agent will not accidentally `rm -rf` the repo, I experimented with letting the agent be autonomous, giving them permission to iterate until they achieve a speed increase, hopefully.

```md
**YOU MUST KEEP ITERATING OPTIMIZATIONS AND SOLVING ISSUES UNTIL THE BENCHMARK RESULTS STOP IMPROVING AND THE CRATE IS AS FAST AS IT CAN BE**. You have permission to keep iterating until you run out of ideas.
```

It turned out "fast as it can be" is too ambiguous and Opus 4.5 was lazy so it tweaked a few hyperparameters without much of an actual speed increase and called it a day. What I needed was a clear target goal that can be pass/failed, so I refined the prompt:

```md
First, **without making any futher changes**, run the CPU Rust benchmarks to establish a True Performance Baseline.

Then, optimize the crate code to make it such that ALL CPU benchmarks run **atleast 1.2x faster** than the True Performance Baseline; ideally as fast as possible. NEVER hack the benchmarks to accomplish this runtime reduction, only iterate on the library code.

You may use ANY techniques to do so (e.g. import new crates) other than adding `unsafe` code. **REPEAT THIS PROCESS UNTIL BENCHMARK PERFORMANCE CONVERGES AND YOU ARE OUT OF OPTIMIZATION IDEAS.** You have permission to keep iterating. After each benchmark iteration, report the relative results to the True Performance Baseline to console.

Prioritize making quick/high-impact wins iteratively and making changes accordingly. Do not overthink the necessary changes.
```

This worked very well and not only did I get a 1.2x speed up on the benchmarks, but the agent continued after hitting the metric constraint and only stopped if a metric constraint was infeasible; in this instance, the agent hit **1.5x-2.0x** speedups. The low-level Rust optimizations centered around a number of techniques including but not limited to: leveraging SIMD operations more aggressively, fusing functions, unrolling loops, creating intermediate caches, using [Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html) instead of borrowing wherever possible, and creating performance profiles based on input data (e.g. if the data is small, don't use [rayon](https://github.com/rayon-rs/rayon) data parallelism as the overhead erases gains).

I chose "1.2x faster" as a sanity test: if the goal is too high, the agent may cheat to achieve it through risky/verbose rewrites. Smaller changes are better since the agent can more easily isolate the cause of a speedup/regression, hence the note about iteration. After new frontier LLMs released such as GPT-5.3 Codex and Opus 4.6, I repeated this prompt unchanged for every new LLM and each were able to achieve a **cumulative 1.5x-2.0x** speedup over the previous pass. Going all the way to GPT-6 Astra over many months, that's around **7.5x-32x** faster than the initial implementation baseline.

This approach is hyperoptimizing for given benchmarks and therefore it could be considered [benchmaxxing](https://ctaio.dev/en/labs/benchmaxxing/): a derogatory term for frontier LLMs that are only oriented to getting the high score on a benchmark which generalizes poorly to real-world use. However, if the benchmarks are sufficiently heterogeneous and truly representative of real-world use cases, then this is less of a concern. For this type of project, there are two ways to address concerns of benchmaxxing: 1) have the agent design diverse/unusual/adversarial input datasets instead of the generic "inputs up to 100000x768" and 2) enforce a quality gate on the output by comparing the output to a known correct implementation. In the case of machine learning algorithms, there is always a tradeoff between speed and quality, but in this instance it's surprisingly easier to get the model fast, then make it correct. That is not how scientific engineering _typically_ works, but it's unlikely for a new implementation to match a known good implementation across many different benchmarks in an apples-to-apples comparison unless it's truly correct.

{{< figure src="gbdt.png" caption="An agent-optimized gradient boosted decision tree implementation which beats [xgboost](https://xgboost.readthedocs.io/en/stable/) significantly in speed, but also sometimes quality! (MSE: lower is better; other metrics, higher is better)" raw=true >}}

Fortunately, there is a canonical implementation of UMAP with the Python package [umap-learn](https://umap-learn.readthedocs.io/en/latest/) and Python bindings to the Rust crate were already trivially added, so the new objective is simultaneous constraints: improve the code's quality while capping the speed loss.

```md
Create a Python Jupyter Notebook comparing the performance of the Python bindings with `umap-learn`, including a check to confirm where the outputs and UMAP losses are as similar. Use diverse datasets with different matrix sizes than the benchmarks.

If the outputs are not sufficiently similar, investigate methods to fix it **without causing more than a 5% speed regression**.
```

Indeed, the agentic Rust implementation had worse quality, but this followup prompt was successful and all quality metrics improved to near-parity with minimal speed loss. And this new crate was still **4x-15x** faster than `umap-learn` with its Python bindings, and **2x-4x** faster than the analogous Rust `umap-rs` implementation.

{{< figure src="umap_final.png" caption="Results from the most up-to-date optimization pass for the Rust UMAP crate. In addition to faster speed, it matches or beats Python in most quality metrics." >}}

Convergence is found when an agentic iteration pass only results in a minor ~3-5% speed increase which may not be statistically significant while the agent adds a disproportionately large amount of code; the tradeoff is not worth it.

I ended up testing other machine learning algorithms with the same prompt progression: gradient-boosted decision trees (GBDT), multilayer perceptrons (MLP), graph networks, many of the typical algorithms from [scikit-learn](https://scikit-learn.org/stable/)...and it worked on **all of them**. I don't want to overfit on just optimizing machine learning despite that being ludicrously valuable in itself, so I employed a similar pipeline on more day-to-day software libraries to optimize them: templating engines, HTML parsing, and even web servers...and it worked on **all of them** once again.

These optimizations are not a simple process and you can't just prompt the memetic "c'mon, try doing a breakthrough" to get better code because of the ambiguity of such a statement. I am not content with merely writing the fastest software: I want the software to be _as fast as possible_ dammit. So, like my agent, I continued iterating and finding even more tricks to prompt engineer the agents into genuine breakthroughs.

## Prompting For Constraints Instead of Outcomes

{{< admonition type="warning" title="Works-in-progress" >}}
All projects demoed within this blog post are in active development and results may not be indicative of their final releases...although I suspect they'll be even better. 😇
{{< /admonition >}}

It must be reiterated that agents can and will cheat if they can. In one example, I tested the agentic iteration pipeline on [ballin](https://github.com/minimaxir/ballin)—my 2D ball physics simulation in the terminal—in order to replace its [rapier2d](https://github.com/dimforge/rapier) physics engine which was hitting a performance ceiling. Opus 4.5 was indeed able to speedup each physics step...a bit too well.

{{< figure src="ballin_speedup.png" caption="The numbers indicate the number of balls in the simulation: initially the sim lags at 15k." >}}

In `headless_step`, a 34,500x speedup and consistent performance across ball counts are both very very suspicious: upon manual inspection it turns out that Claude achieved the speedup by _disabling the physics engine entirely_. Which, fair play, but not ideal; a followup prompt did fix it and result in an overall performance boost (with added regression tests just in case).

For my experiments above, I used a custom Rust-oriented AGENTS.md; the most recent version of it is [available here](https://gist.github.com/minimaxir/86de3cc8f628079d8337e70924b3411d). Surprisingly, I haven't had much of a need to update the core rules since my initial February agent experiments as LLMs keep improving at coding and I haven't hit major issues that have necessitated additions. However, learning from my benchmark experiments, I added one more section to the AGENTS.md with some rules to mitigate sources of observed cheating:

```md
## Benchmarking and Optimization

- **NEVER** run benchmarks in parallel, as the benchmarks will compete for resources and the results will be invalid
- **NEVER** game the benchmarks. Do not manipulate the benchmarks themselves to satisfy any required performance constraints
- **NEVER** run benchmarks with `target-cpu=native` or any other `RUSTFLAGS`
- Ensure benchmark tests are independent. If the tests are dependent due to a feature (e.g. caching), ensure the feature is disabled
- **ALWAYS** use `criterion` directly for running benchmarks if available
```

Let's explain one-by-one:

- No parallel benchmarks: I saw Opus 4.5 launch two benchmarks at the same time for efficiency and to its credit immediately recognized the inherent problem and restarted the benchmarks sequentially, but it saves time to proactively add a rule to stop them.
- No gaming the benchmarks: Although this _should_ be common sense on the level of "make no mistakes," this was added after I caught Opus 4.5 reducing the number of training epochs for a benchmark and claiming a speedup.
- `target-cpu=native`: [This setting](https://doc.rust-lang.org/rustc/codegen-options/index.html#target-cpu) _does_ typically result in a speedup but it is not a fair comparison for generalizable use and multiple LLMs kept trying it after hitting a wall.
- Benchmarks are independent: Again, it should be common sense, but after the cheating noted above it doesn't hurt to proactively tell the LLMs to knock it off.
- Use `criterion`: If not specified, sometimes LLMs will create their own benchmark tooling, which may give them opportunities to cheat that are more difficult to audit.

With today's agentic LLMs, these constraints have worked successfully, although I may still include them in the prompt as a force of habit. It's easy to see if an algo gamed the benchmarks if you see the benchmark file in the `git diff`—agents can't cheat that (easily, anyways).

Over time, I discovered a number of additional prompt engineering tricks and constraints that are also surprisingly successful in creating performance speedups.

### Innovative Encouragement

In order to find the optimizations necessary to get 10x speedups over what's currently state-of-the-art, the agents will need to think outside the box and avoid being anchored to what are currently best algorithmic practices. Therefore, I gave them both an explicit warning and commands of encouragement:

```md
Due to the current highly-optimized state of this repository, this is a very difficult problem and traditional engineering approaches **WILL BE GUARANTEED TO FAIL** to hit the specified metric constraint. Therefore, you have permission and encouragement to investigate more radical fundamental low-level changes to hit the desired metrics. You have permission and encouragement to invent completely new/bespoke algorithms and engineering approaches that have never been before been utilized for this problem in order to hit the specified metric constraint.
```

This worked, and resulted in a **1.2-1.5x cumulative speedup** across benchmarks and different software domains.

### Subagents

Another trick I found to encourage agents to think outside the box is to invoke subagents. I hypothesized that forcing these subagents to research with different prompts could a) seed the parent agent with distinct ideas which could provide inspiration to the agent and b) serve as a check on the agent by reviewing distinct areas of the code for correct implementations. On that note I have a bone to pick with the software developer community: everyone talks about their _army of subagent employees_ and how they're amazing, but no one ever talks about _how_ you invoke subagents within standard harnesses like Codex.

For difficult and highly parallel problems, the harness will automatically invoke a subagent tool to accomplish the work. However, one big problem is that in some harnesses, the subagent tool will invoke the subagent using the current size of the LLM, which can get expensive when using Opus/Sol-class models.

{{< figure src="subagent_fail.png" caption="GPT 5.6 Sol subagents being invoked via the subagent Tool in Zed Agent. RIP my Codex quota." raw=true >}}

I wanted to use a cheaper, small model like GPT-5.6 Luna for the subagents since they don't need to write code, so I came up with a galaxy brain solution that works regardless of which parent harness is used: tell the model to run [independent CLI commands](https://learn.chatgpt.com/docs/non-interactive-mode) that themselves invoke the agent:

```sh
codex exec --sandbox read-only -m gpt-5.6-luna \
  -c 'model_reasoning_effort="high"' \
  PROMPT
```

Therefore, I prompt engineered:

```md
To best accomplish innovative implementations, you **MUST** spin up 7-12 independent distinct "subagents" by running a long-duration CLI command (do not use the subagent tool) which can explore and evaluate different feasible hypotheses for improving the performance, usability, and security of this crate. Only have the agents return their response; do not save their full transcript to a file. Instruct them to be **very** picky. These subagents MUST use `gpt-5.6-luna` in Codex, e.g.

<<<CLI command above>>>

You must instruct these subagents to NOT run tests/benchmarks, as they will compete for resources and not be valid. After you are done making changes, before handing off to the user, spin up the subagents again to confirm your implementation matches their hypotheses and ask for potential further areas of improvement. Keep iterating until ALL subagents are satisfied with your implementation.
```

This indeed works consistently; the constraints "long-duration", "CLI command", "do not use the subagent tool", and "do not save their full transcript to a file" were added after the agent did inefficient things that wasted tokens. 7-12 is an arbitrary number range; since Luna is so cheap in usage, I chose a higher number than necessary. Not all subagents have salient ideas, but the parent harness can process and disregard bad ideas.

{{< figure src="subagents.png" caption="For my Rust word cloud crate, the parent GPT-6 Astra agent spins up Luna subagents with prompts addressing different areas of the codebase." raw=true >}}

Overall, with subagent review, I managed to eke out another **1.2-1.5x cumulative speedup**. Additionally, as of GPT-5.6 Sol, the "security" part of the prompt now works to provide ideas to harden the agent-generated code against unknown inputs while still getting the speed boosts.

### Refactor and Reduce Lines of Code

With the style constraints enforced by my AGENTS.md, the code added with each optimization pass is reasonable at about 1k net lines of code (LoC) per commit. However, agents typically add the code to a single file and they will not proactively refactor. A bloated file is fine in development as long as it's eventually fixed, so I wrote a prompt to perform said refactor:

```md
The Rust code in `/src` has become particularly bloated, with several source files >1k SLoC. Refactor and reduce the Rust source codebase by **atleast 20% SLoC** through deduplication, pruning redundant code, and following idiomatic DRY Rust principles. Simultanously, refactor and split the code such that no single source file has >1k SLoC, splitting larger files into multiple subfiles in accordance to Rust standards for popular open-source repositories. Ensure **all current tests pass and there are no severe regressions**.
```

I intentionally use SLoC (source lines of code) as the target metric instead of LoC because I don't want the agent to remove comments to cheat said 20% removal.

Interestingly, this refactor is more computationally expensive than the actual coding and often takes longer. But it does eventually succeed, and during the benchmark pass to verify no severe regressions, the data there turned out to be unexpectedly weird:

{{< figure src="graph_network_refactor.png" caption="Benchmark results after refactoring my graph network Rust crate." raw=true >}}

Some benchmarks have a **double-digit percentage** speed increase / runtime reduction even though I didn't explicitly ask the agent to optimize runtime speed. This doesn't make intuitive sense for Rust as it's a compiled language and with the constraints to follow all existing tests/functionality, it should compile to similar-performing code and not meaningfully faster code.[^python] I'm certainly not _complaining_, though, so I added an additional constraint to at least avoid regressions:

[^python]: I did test the refactor prompt in a pure Python project, as Python is an interpreted language. It _still_ resulted in a double-digit percentage speed increase on some benchmarks, which just raises further questions.

```md
Additionally, ensure there are **zero `criterion` benchmark speed regressions**: if a speed regression occurs on a given benchmark as a result of the refactor, you **MUST** keep iterating afterwards to improve those benchmarks to atleast zero regression. NEVER hack the benchmarks to accomplish this speed increase, only iterate on the library code.
```

This works as described.

### Competition

Another useful approach is to create competitor benchmarks—that's half the reason benchmarks are created in open-source software anyways. Let's use [templating engines](https://en.wikipedia.org/wiki/Web_template_system) as an example: [Jinja2](https://jinja.palletsprojects.com/en/stable/) in Python is one of the most famous packages in the language. In Rust, there are a few options: [minijinja](https://github.com/mitsuhiko/minijinja) maintained by the same developer, [tera](https://github.com/Keats/tera) inspired by Jinja2, and [askama](https://github.com/askama-rs/askama) which differs from the previous in that it uses compile-time templates rather than runtime.

Therefore, after having Codex build a templating engine in Rust and run some optimization passes, I instructed Codex to build more benchmarks:

```md
Create an additional comparison script containing **atleast 10** `criterion` benchmarks which compare the performance speed and quality metrics between this crate and the following crates:

- askama
- minijinja
- tera

These benchmarks **ALL MUST**:

- be perfectly fair, containing apples-to-apples comparisons of ALL frameworks, with no bespoke advantage for any tested framework
- be based around real-world use cases instead of highly-synthetic use cases
- be independent and distinct, covering as many sailent hot paths of the code as possible
- cover data input sizes small and large, simple and complex
```

Immediately thereafter, I make a followup prompt with the same benchmarking techniques as usual, with one specific change:

```md
Then, optimize the Rust library code such that this crate MUST be:

- **atleast 2.0x faster** than **ALL** competing Rust crates in all benchmarks on apples-to-apples comparisons; ideally as fast as possible.
```

Yes, I chose violence. _And it worked_, mostly.

{{< figure src="template_1.png" caption="S_J is the work-in-progress name for my template engine crate." raw=true >}}

It got the 2x speedup against `minijinja`/`tera` in most benchmarks, more than typical agentic iteration alone. I don't fully understand why: I was expecting it to inspect the code from other crates as a reference to research ideas for how to beat them, but it rarely does so. Perhaps agents have a competitive streak.

It did however lose against `askama` because of the compile-time difference. So naturally I told Codex to implement an additional compile-time path and then to beat `askama`.

{{< figure src="template_2.png" raw=true >}}

Easy peasy.

### Forbidden Black Magic

Putting all the prompt engineering discoveries together thus far into a single prompt, I have created the Ur-Prompt for agentic iteration, [available here](https://gist.github.com/minimaxir/933cd6354d96e1fbb45bea13e0940952). I encourage everyone to tweak the prompt for your use case and give it a try.

The last trick comes from a moment where I was frustrated that an Ur-Prompt pass resulted in zero improvement. So, with the failures primed in the session context and myself having the mindset of "things can't get worse", I tried a certain prompt.

I'm sorry. I'm so sorry.

```md
c'mon, try doing a breakthrough
```

...and it _worked_. It was able to achieve another **1.2-1.5x cumulative speedup** over the already converged codebase. Since I made the prompt at the end of a session, the prompt is less inherently ambiguous: "don't do what you already did thus far because it didn't work well enough".

In one case, I noticed that the agent just tweaked function hyperparameters to get the speedup, which _is_ a valid breakthrough but not what I was going for. I took it to the logical conclusion by queueing an additional followup prompt:

```md
c'mon, you can do a more fundamental breakthrough that's more than just changing hyperparameters, you are forbidden from giving up easily
```

This was enough to encourage the agents to fully try something different from either the Ur-Prompt pass or the first breakthrough pass, and it often achieved **another 1.2-1.5x cumulative speedup** on top of the previous speedup. It turns out that for software trained to follow user instructions, "just changing hyperparameters" is a grave insult that kicks the LLM into high gear.

When GPT-6 Astra released, to test it I did a sequence of Ur-Prompt + breakthrough + second breakthrough for all my repositories that had already converged with GPT-5.6 Sol, and Astra did indeed get the cumulative speedup, but in some cases it did find a real fundamental reimplementation of the algorithm that caused a **2x-3x** speedup.

{{< figure src="gbdt_breakthrough.png" caption="The result of running the breakthrough pipeline on my GBDT implementation; quality matched baseline. As of writing, I admit I don't fully _understand_ the breakthrough." raw=true >}}

I'll take the speedups, but for my sanity it's best I don't delve too deep.

## Examples of Projects Visibly Better

The Ur-Prompt, combined with the rules and constraints in my AGENTS.md + the two breakthroughmaxxing prompts + a competition prompt pass + a refactor prompt pass with GPT-6 Astra allows me to just queue the prompts overnight, go to bed, and wake up to superfast software. The optimization also typically converges at this point without needing any more agentic iteration, which saves time/cost as well. That said, it's more hands-off than I'd like and there's a lot of explicit faith that the newer agents aren't just really good at cheating the benchmarks in ways I cannot detect. It's reasonable to be skeptical and argue that the code may be buggy as a result of heavy vibecoding, so here are some receipts of my more visually-oriented projects where it's easy to verify that their output is good and not elaborate cheating.

### ASCII

One project in the back of my mind was converting images to ASCII art super-fast and at high-quality for potentially converting video to ASCII—a webcam-to-ASCII project might be funny. Earlier this year Alex Harri wrote an [excellent blog post](https://alexharri.com/blog/ascii-rendering) about a novel approach to render high-quality ASCII, but noted the struggles to get real-time rendering speed even with GPU programming. For science, I pointed various GPT models in Codex at the text of the blog post and told it "implement in Rust", and it indeed did the trick...and got _2-3 ms_ text output timings on the CPU out of the box. However, for Codex's implementation the subjective quality of the ASCII was not great (e.g. poor use of negative space) and surprisingly could not be fixed even after pointing out its flaws to Codex, so I shelved it...until I noticed GPT-6 Astra is better at handling image design if given functional requirements, so I restarted from scratch and put a basic implementation through the agentic iteration pipeline with a focus on visually confirming the output images.

{{< figure src="pikatux.png" caption="Tux and Pikachu rendered with my ASCII crate, with bonus Braille character support." raw=true >}}

In addition to quality improvements, it became even faster: submillisecond on text output, 1-2 ms on image rasterization even with 2x supersampling. With this speed, I can convert videos and GIFs to high-resolution ASCII animations in less than a second.

{{< video src="pikachu_ascii_120.mp4" caption="Pikachu's Gen V animated sprite, scaled from 63×55 pixels to 120-character-width ASCII." lazy=true >}}

### Word Clouds

{{< figure src="featured.webp" caption="This very blog post as a word cloud." >}}

A comically fast word cloud generator was one of the very first projects I vibecoded and one of the projects I wanted to make for years. Back in February, the word cloud generator took ~100 milliseconds at default settings in WASM to generate an image whereas it would take other generators a couple seconds to render at the same quality, which was enough for me to declare that speed optimization is worth pursuing. After revisiting the project and running it through the full agentic iteration pipeline, the generation speed went all the way down to **10-20 ms**.

{{< video src="wordcloud.mp4" lazy=true >}}

Does the world need a super-fast word cloud generator? No. Do I need a super-fast word cloud generator? No. Do I _want_ a super-fast word cloud generator? Yes. If I have a word cloud generator, it's going to be as fast as possible, dammit. And since the crate will be open-source, all future generations can build on this super-fast word cloud implementation. Speaking of...

## My Plan to Open-Source Everything

Per usual, I developed all software demonstrated here with the intention of eventually making it open-source, and everything will be open-sourced with a permissive [MIT License](https://en.wikipedia.org/wiki/MIT_License) barring any unexpected issues. Were it a year ago, I would have open-sourced everything already, with the implicit understanding that the code is a work-in-progress and there may be rough edges. However, the culture of open-source software development is substantially different than it was a year ago.

Open-source software has been suffering a [vibecoding epidemic](https://redmonk.com/kholterhoff/2026/02/03/ai-slopageddon-and-the-oss-maintainers/). The honest admission that an LLM was used for any development assistance (major or minor) is now a quick signal that the resulting codebase will be "slop". I will still disclose my LLM use as that's courteous, but what happens when fully vibecoded software results in a genuine meaningful software performance increase which wasn't previously known by humans? The skepticism around vibecoding will cause no one to believe the claims, and as such these new open-source projects require significant evidence that the speed indeed lives up to the marketing. Therefore, I will take more time than usual before releasing in order to a) build up real-world examples that demo the tool particularly with documentation b) expand the test suite[^test] so it covers more real-world test cases c) write an accompanying blog post detailing the technical and benchmark achievements.

[^test]: Incidentally, these agent-coded repositories will have a better testing infrastructure than all of my popular human-written Python packages (zero).

There's also the fact that I am creating [yet another tool](https://xkcd.com/927/) in the ecosystem of already popular software tools. My agentic-iterated Rust crates achieved their massive speed increases partially by starting from scratch and therefore the innovations found _can't_ easily be applied upstream to established crates. Additionally, if I were to create a pull request to an existing project based on the innovations in these crates, it would by definition be a vibecoded PR which may [cause annoyance](https://neilalexander.dev/2026/06/30/flooding-contributions) even if I avoided the typical PR slop. From this perspective, the _correct_ thing to do is to maintain my own project: it's compliance and not the [malicious kind](https://www.reddit.com/r/MaliciousCompliance/). Some may call this antisocial, but in my opinion the more accurate term is what I hereby coin as introverted coding.

tl;dr my faster-than-SOTA software projects will be released when they are ready, and it will take many months in total to do so. Fortunately, I am currently unemployed [as the result of a restructuring](https://variety.com/2026/digital/news/buzzfeed-layoffs-employees-byron-allen-acquires-company-1236822122/) and have no plans besides job hunting so I have plenty of bandwidth to work full-time on shipping these projects. If you want to follow when they are released, you can subscribe to my [blog RSS feed](https://minimaxir.com/post/index.xml) to catch the accompanying blog post or follow me on [Bluesky](https://bsky.app/profile/minimaxir.bsky.social) or [Patreon](https://www.patreon.com/minimaxir). No, I don't do annoying vagueposts on Twitter/X.

When I first became interested in Rust a half-decade ago, my dream was to create the most performant software tools ever. However, with the agentic iterative optimization techniques I discovered over the past few months, the speed and robustness of what's possible with new software are progressing faster than what I had expected. Again, feel free to hack on my [AGENTS.md](https://gist.github.com/minimaxir/86de3cc8f628079d8337e70924b3411d) and my [Ur-Prompt](https://gist.github.com/minimaxir/933cd6354d96e1fbb45bea13e0940952) to see if they work as well for you as they do for me (a shout-out would be appreciated though!). If you think I have nothing left to offer because I revealed my prompts, I still have more than a few surprises up my sleeve, such as how to combine these lower-level projects into a superfast complex app, or even developing new tooling to help agents find these optimizations more efficiently.

{{< figure src="bc.png" caption="A work-in-progress of a new approach to Rust benchmarking that's more agent-friendly, along with a TUI for reading and managing results." raw=true >}}
