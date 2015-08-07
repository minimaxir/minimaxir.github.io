---
layout: post
title: "Probabilistically Generating GitHub Projects"
date: 2013-11-29 10:30
comments: true
categories: [Data]
summary: "Perl interface to Git repositories via Ruby. Brute force your OpenERP data integration with flatfiles."
image: github-wordcloud-mac.png
---

Grant Slatton made an amusing post on Hacker News yesterday titled "[Show HN: Probabilistically Generating HN Post Titles](https://news.ycombinator.com/item?id=6815282)". By using the statistical principle of [Markov chains](http://en.wikipedia.org/wiki/Markov_chain), Slatton was able to [generate eerily-realistic Hacker News headlines](http://grantslatton.com/hngen/) such as "Facebook detects if you are not a pilot" and "The No. 1 Habit of Highly Effective Mediocre Entrepreneurs."

Could Markov chains be applied to any other data sets for hilarious effect? By using Slatton's [Python implementation of Markov chains](https://gist.github.com/grantslatton/7694811) plus 300,000 descriptions of public GitHub repositories retrieved from their API, I discovered that statistical randomness can indeed create funny innovation.

{% img /img/github-wordcloud-mac.png %}

You can download a list of 1,000 Markov chain-generated projects [here](https://dl.dropboxusercontent.com/u/2017402/github_markov.txt). Here are a few interesting ones:

- MaNGOS is a free, Open Source implementation of a tag at relatively random intervals.
- A Warhammer 40k simulator to teach myself both OpenGL and Clojure
- Perl interface to Git repositories via Ruby.
- A windows live messenger network client written in Erlang
- Rails plugin which allows to talk anonymously and use tripcodes if you want.
- A Firebug extension for displaying the latest from Hacker News
- Sinatra-inspired JavaScript node.js web development framework for lua. Inspired by rspec
- Inverted Index on top of Tornado
- Android LED interface library for various wave propagation techniques.
- CatchAPI is a Java API to remove the need for boring project setup.
- Adds basic social networking capabilities to your lighting system based on the concept of the Working with Rails
- Brute force your OpenERP data integration with flatfiles
- Culerity integrates Cucumber and Celerity in order to shutdown the computer.
- Parses ANSI color codes and converts them to iphone compatible mp4s using HandBrake
- A simple OFX (Open Financial Exchange) parser built on top of WordPress. Rolopress core theme


----------

*The code used to get the project descriptions from the GitHub API is available in [this GitHub repository](https://github.com/minimaxir/get-github-repo-descriptions), and you can download the ~300k repo descriptions [here](https://dl.dropboxusercontent.com/u/2017402/github_repo_desc.zip). [5MB .zip]*