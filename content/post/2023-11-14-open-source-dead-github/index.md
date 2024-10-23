---
title: Please Don't Ask if an Open Source Project is Dead
date: 2023-11-14T08:45:00-08:00
slug: open-source-dead-github
categories:
  - Essay
tags:
  - Essay
  - GitHub Issues
draft: false
summary: The best-case scenario is that you annoy the maintainers.
cover:
  image: featured.webp
  relative: true
---

Over the past few months, I've had an [existential crisis](https://minimaxir.com/2023/10/ai-sturgeons-law/) about [my work](https://github.com/minimaxir) in open source AI on [GitHub](https://github.com), particularly as there has been both increasingly toxic backlash against AI and because the AI industry has been evolving so rapidly that I flat-out don't have enough bandwidth to keep up. I took a break from working on my projects during that time, which _should_ have been fine. One of my latest open source projects is [simpleaichat](https://github.com/minimaxir/simpleaichat), a Python package with 3k GitHub Stars for interfacing with [ChatGPT](https://chat.openai.com), and it was explicitly designed with limited scope and minimal dependencies so that I could take a break from development without my code...breaking.

After I was in a good place mentally to resume my open source work, I glanced at the GitHub Issues for simpleaichat and someone filed a issue simply titled "has this been abandoned?" with another GitHub user following up with "With all due respect, I am also interested in the answer."

What the hell? I panicked and checked if there was a new breaking issue or dependency and there weren't any.

Two days later, someone else filed another issue: "Is this package still in ongoing development?":

{{< figure src="github.webp" >}}

To be perfectly clear, this absolutely is applying pressure and being rude.

## The Expectations of Open Source Software Development

I've never seen any discussions or articles about whether it's appropriate to ask if an open source repository is dead. Is there an implicit contract to actively maintain any open source software you publish? Are you obligated to provide free support if you hit a certain star amount on GitHub or ask for funding through GitHub Sponsorships/Patreon? After all, most permissive open source code licenses like the [MIT License](https://en.wikipedia.org/wiki/MIT_License) contain some variant of "the software is provided 'as is', without warranty of any kind."

simpleaichat regretfully isn't my first open source project with complaints like this. The [Big List of Naughty Strings](https://github.com/minimaxir/big-list-of-naughty-strings) to track adversarial user-input text strings, which I pushed to GitHub about a decade ago, is essentially just a `txt` [file](https://github.com/minimaxir/big-list-of-naughty-strings/blob/master/blns.txt) with 45k GitHub Stars. There will never be dependency issues, and additions to the list that don't target a distinct string issue may clutter the list more than it already is so I'm hesitant to accept every pull request. But despite that, people are angry.

{{< figure src="blns.webp" caption="The duality of comment reactions.">}}

Some seem to think that there's such a thing as GitHub Issue-zero or pull request-zero, which like [inbox-zero](https://www.techtarget.com/whatis/definition/inbox-zero) is infeasible in practice due to the realities of professional life. [^1] Every nontrivial open source project will have an issue/PR queue, which necessitates a triage priority: not all issues and PRs are equal and it takes time and care to sift through the queue. That's something I've had to repeatedly learn the hard way as a maintainer since accepting a misguided PR will create [technical debt](https://en.wikipedia.org/wiki/Technical_debt) and take even more effort to address.

[^1]: Funny true story: a match on a dating app once asked to see my open source projects, and after I sent a link to one of my repos, she replied with a picture of the number of opened GitHub Issues and a 😱 emoji.

I get that it's a bummer to come across a cool GitHub project that hasn't been updated in awhile. That happens to me all the time. If the code still works, that's excellent and I'm happy. But if it doesn't, I move on, or use it as a fun new opportunity to hack it to my needs. That's the beauty of open source! If there's an inactive open source project that's absolutely critical for your own commercial project, then that's a good financial reason to offer a consulting contract or a bounty to add the appropriate functionality.

One of the great things about open source is that if an open source project with a permissive license does become inactive, it can be [forked](https://docs.github.com/en/get-started/quickstart/fork-a-repo) seamlessly. Sometimes the fork can become even better than the original project, which is great for everyone! But in my experience, it's instead used as a _threat_. And it's the maintainer's fault for creating a reason for a fork to be made and fragment the development community.

The AI industry is unique because it is indeed moving and evolving so fast that development expectations have shifted. Recent beneficiaries of the ChatGPT boon such as [LangChain](https://github.com/langchain-ai/langchain), [LlamaIndex](https://github.com/run-llama/llama_index), and [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) have created a false sense that open source AI projects have to **always be shipping** 🚀🚀🚀. The difference is that they are maintained by those who do it as their full-time job and are now managed as companies backed by significant amounts of venture capital.

The pressure to continually provide support for an open source project has become the biggest deterrent for me to continue my open source work. Personally, I've stopped pushing fun one-shot projects and AI models because I likely will not have the bandwidth to handle the inevitable "hi this is broken plz fix thx" DMs whenever a dependency on the project breaks years later. I'd gladly quit my professional job as a Data Scientist to work on my open source projects full-time if I was able to make an equivalent salary by doing so. Ultimately, the only way to make it work nowadays would be to raise venture capital like all those AI startups.

The best-case scenario for asking if an open source project is dead is that you annoy the maintainers and delay development. The _worst_-case scenario is that you give the maintainers an opportunity to reconsider if continuing to work on the open source project is worth it.
