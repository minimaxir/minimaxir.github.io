---
title: "Advantages of Using R Notebooks For Data Analysis Instead of Jupyter Notebooks"
date: 2017-06-06T08:30:00-07:00
slug: r-notebooks
categories: [Data Science]
tags: [R, ggplot2, Python]
comments: true
summary: "The relatively new R Notebooks improve the workflows of common data analysis in ways Jupyter Notebooks can't."
cover:
  image: featured.png
  relative: true
  hidden: true
---

[Jupyter Notebooks](http://jupyter.org), formerly known as [IPython Notebooks](https://ipython.org/notebook.html), are ubiquitous in modern data analysis. The Notebook format allows statistical code and its output to be viewed on any computer in a logical and _reproducible_ manner, avoiding both the confusion caused by unclear code and the inevitable "it only works on my system" curse.

{{< figure src="jupyterdemo.png" theme="light" >}}

In Jupyter Notebooks, each block of Python input code executes in its own cell, and the output of the block appears inline; this allows the user to iterate on the results, both to make the data transformations explicit and to and make sure the results are as expected.

{{< figure src="jupyter.png" theme="light" >}}

In addition to code blocks, Jupyter Notebooks support [Markdown](https://en.wikipedia.org/wiki/Markdown) cells, allowing for more detailed write-ups with easy formatting. The final Notebook can be exported as a HTML file displayable in a browser, or the raw Notebook file can be shared and [rendered](https://github.com/blog/1995-github-jupyter-notebooks-3) on sites like [GitHub](https://github.com). Although Jupyter is a Python application, it can run kernels of [non-Python languages](https://irkernel.github.io), such as [R](https://www.r-project.org).

Over the years, there have a been a few new competitors in the reproducible data analysis field, such as [Beaker Notebook](http://beakernotebook.com/features) and, for heavy-duty business problems, [Apache Zeppelin](https://zeppelin.apache.org). However, today we'll look at the relatively new [R Notebooks](http://rmarkdown.rstudio.com/r_notebooks.html), and how they help improve the workflows of common data analysis in ways Jupyter Notebooks can't without third-party extensions.

## About R Notebooks

R Notebooks are a format maintained by [RStudio](https://www.rstudio.com), which develops and maintains a large number of open source R packages and tools, most notably the free-for-consumer RStudio R IDE. More specifically, R Notebooks are an extension of the earlier [R Markdown](http://rmarkdown.rstudio.com) `.Rmd` format, useful for rendering analyses into HTML/PDFs, or other cool formats like [Tufte handouts](http://rmarkdown.rstudio.com/tufte_handout_format.html) or even [books](https://bookdown.org). The default output of an R Notebook file is a `.nb.html` file, which can be viewed as a webpage on any system. ([RPubs](https://rpubs.com) has many examples of R Notebooks, although I recommend using [GitHub Pages](https://pages.github.com) to host notebooks publicly).

{{< figure src="RNotebookAnimation.gif" theme="light" >}}

Instead of having separate cells for code and text, a R Markdown file is all plain text. The cells are indicated by three backticks and a gray background in RStudio, which makes it easy to enter a code block, easy to identify code blocks at a glance, and easy to execute a notebook block-by-block. Each cell also has a green indicator bar which shows which code is running and which code is queued, line-by-line.

For Notebook files, a HTML webpage is automatically generated whenever the file is saved, which can immediately be viewed in any browser (the generated webpage stores the cell output and any necessary dependencies).

{{< figure src="notebooktest.png" theme="light" >}}

R Notebooks can only be created and edited in RStudio, but this is a case where tight vertical integration of open-source software is a good thing. Among many other features, RStudio includes a file manager, a function help, a variable explorer, and a project manager; all of which make analysis much easier and faster as opposed to the browser-only Jupyter.

{{< figure src="rstudio.png" theme="light" >}}

I've made many, many Jupyter Notebooks and R Notebooks [over the years](http://minimaxir.com/data-portfolio), which has given me insight into the strengths and weaknesses of both formats. Here are a few native features of R Notebooks which present an objective advantage over Jupyter Notebooks, particularly those not highlighted in the documentation:

## Version Control

Version control of files with tools such as [git](https://en.wikipedia.org/wiki/Git) is important as it both maintains an explorable database of changes to the code files and also improves collaboration by using a centralized server (e.g. GitHub) where anyone with access to the repository can pull and push changes to the code. In the data science world, large startups such as [Stripe](https://stripe.com/blog/reproducible-research) and [Airbnb](https://medium.com/airbnb-engineering/scaling-knowledge-at-airbnb-875d73eff091) have seen a lot of success with this approach.

RStudio incidentally has a native git client for tracking and committing changes to a `.Rmd` file, which is easy since `.Rmd` files are effectively plain text files where you can see differences between versions at a per-line level. (You may not want to store the changes to the generated `.nb.html` Notebook since they will be large and redundant to the changes made in the corresponding `.Rmd`; I recommend adding a `*.nb.html` rule to a `.gitignore` file during analysis).

{{< figure src="git.png" theme="light" >}}

The `.ipynb` Jupyter Notebook files are blobs of JSON that also store cell output, which will result in large diffs if you keep them in version control and make any changes which result in different output. This can cause the git database to balloon and makes reading per-line diffs hard if not impossible.

On Hacker News, the version control issues in Jupyter are [a common complaint](https://news.ycombinator.com/item?id=14034341), however a Jupyter developer noted of a possibility of [working with RStudio](https://news.ycombinator.com/item?id=14035158) on solving this issue.

## Inline Code Rendering

A common practice in Jupyter Notebooks is to print common values as a part of a write-up or testing statistical code. In Jupyter Notebooks, if you want to verify the number of rows in a dataset for exploratory data analysis, you have to add an appropriate print statement to the cell to get the number `n` rows, and then add a Markdown cell to redundantly describe what you just print in the output.

In R Notebooks, you can skip a step by calling such print statements in-line in the Markdown text, which will then be rendered with the Notebook. This also avoids hard-coding such numbers in the Markdown text if you change the data beforehand (e.g. parameter tuning) or if the values are nontrivial to calculate by hand.

For example, these lines of R Markdown from my [Reddit First Comment Notebook](http://minimaxir.com/notebooks/first-comment/):

{{< figure src="inline.png" theme="light" >}}

translate into:

{{< figure src="reddit.png" theme="light" >}}

## Metadata

R Notebooks are configured with a [YAML](http://yaml.org) header, which can include common attributes such as title, author, date published, and other relevant options. These fields will then be configured correctly in the metadata for HTML/PDF/Handouts output. Here's an example from [one of my notebooks](http://minimaxir.com/notebooks/amazon-spark/):

```yaml
---
title: "Playing with 80 Million Amazon Product Review Ratings Using Apache Spark"
author: "Max Woolf (@minimaxir)"
date: "January 2nd, 2017"
output:
  html_notebook:
    highlight: tango
    mathjax: null
    number_sections: yes
    theme: spacelab
    toc: yes
    toc_float: yes
---
```

Said metadata features are [often requested but unimplemented](https://github.com/ipython/ipython/issues/6073) in Jupyter.

## Notebook Theming

As noted in the example metadata above, R Notebooks allow extensive theming. Jupyter Notebooks do [support themes](https://github.com/dunovank/jupyter-themes), but with a third-party Python package, or placing custom CSS in an [odd location](https://stackoverflow.com/a/32158550).

Like Jupyter Notebooks, the front-end of browser-based R Notebooks is based off of the [Bootstrap](http://getbootstrap.com) HTML framework. R Notebooks, however, allow you to natively select the style of code syntax highlighting via `highlight` (similar options as [pygments](https://help.farbox.com/pygments.html)) and also the entire Bootstrap theme via `theme` (with a selection from the excellent [Bootswatch](https://bootswatch.com) themes by [Thomas Park](https://twitter.com/thomashpark)), giving your Notebook a unique look without adding dependencies.

## Data Tables

When you print a data frame in a Jupyter Notebook, the output appears as a standard _boring_ HTML table:

{{< figure src="htmltable.png" theme="light" >}}

No cell block output is ever truncated. Accidentally printing an entire 100,000+ row table to a Jupyter Notebook is a mistake you only make _once_.

R Notebook tables are pretty tables with pagination for both rows and columns, and can support large amounts of data if necessary.

{{< figure src="rtable.png" theme="light" >}}

The R Notebook output table also includes the data type of the column, which is helpful for debugging unexpected issues where a column has an unintended data type (e.g. a numeric `<dbl>` column or a datetime `<S3: POSIXct>` column is parsed as a text-based `<chr>` column).

## Table of Contents

A Table of Contents always helps navigating, particularly in a PDF export. Jupyter Notebooks [requires an extension](https://github.com/minrk/ipython_extensions) for a ToC, while R Notebooks will natively create one from section headers (controllable via `toc` and `number_sections`). An optional `toc_float` parameter causes the Table of Contents to float on the left in the browser, making it always accessible.

{{< figure src="notebookheader.png" theme="light" >}}

In conclusion, R Notebooks haven't received much publicity since the benefits aren't immediately obvious, but for the purpose of reproducible analyses, the breadth of native features allows for excellent utility while avoiding dependency hell. Running R in an R Notebook is a significantly better experience than running R in a Jupyter Notebook. The advantages present in R Notebooks can also provide guidance for feature development in other Notebook software, which improves the data analysis ecosystem as a whole.

However, there's an elephant in the room...

## What About Python?

So you might be thinking "an R Notebook forces you to use R, but _serious_ data science work is done using Python!" Plot twist: you can use Python in an R Notebook!

{{< figure src="python.png" theme="light" >}}

Well, sort of. The Python session ends after the cell executes, making it unhelpful for tasks other than _ad hoc_ scripts.

The topic on whether R or Python is better for data analysis is a [common](https://news.ycombinator.com/item?id=14056098) [religious](https://news.ycombinator.com/item?id=13239530) [flamewar](https://news.ycombinator.com/item?id=12301996) topic which is best saved for a separate blog post (tl;dr: I disagree with the paraphrased quote above in that both languages have their advantages and you'll benefit significantly from knowing both ecosystems).

And I wouldn't count R out of "serious data science". You can use R [seamlessly](http://spark.rstudio.com) with big data tools like [Apache Spark](https://spark.apache.org), and R can [now](https://rstudio.github.io/keras/) use [Keras](https://keras.io)/[TensorFlow](https://www.tensorflow.org) for deep learning with near-API-parity to the Python version. _Hmm_.
