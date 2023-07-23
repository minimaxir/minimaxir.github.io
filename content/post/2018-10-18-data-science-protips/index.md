---
title: "Things About Real-World Data Science Not Discussed In MOOCs and Thought Pieces"
date: 2018-10-22T09:15:00-07:00
slug: data-science-protips
categories: ["Thought Piece"]
comments: true
summary: "MOOCs and thought pieces overfit to a certain style of data science that is not robust to the vast uncertainties of the real world."
cover:
  image: featured.png
  relative: true
  hidden: true
---

[Data science](https://en.wikipedia.org/wiki/Data_science) has been sweeping the tech world. With a large variety of powerful free open-sourced tools and now the computing power to utilize them to their full potential, data science is more accessible than ever and has become [America's hottest job](https://www.bloomberg.com/news/articles/2018-05-18/-sexiest-job-ignites-talent-wars-as-demand-for-data-geeks-soars). One problem: there's no consensus on [what data scientists _really_ do](https://hbr.org/2018/08/what-data-scientists-really-do-according-to-35-data-scientists) in a professional setting.

There has been a rise in _romantic_ thought pieces lately (especially on [Medium](https://medium.com)) about how data scientists are wizards and can solve any problem (with bonus points if it cites AI). If you follow publications like [Towards Data Science](https://towardsdatascience.com), you'll notice persistent tropes in the more code-oriented posts: Python is the king programming language for data science, use [scikit-learn](http://scikit-learn.org/stable/)/[XGBoost](https://xgboost.readthedocs.io/en/latest/) and logistic regression for predicting categorical variable(s), use [pandas](https://pandas.pydata.org) for processing tabular data, use [NLTK](https://www.nltk.org)/[word2vec](https://en.wikipedia.org/wiki/Word2vec) for processing text data, use [TensorFlow](https://www.tensorflow.org)/[Keras](https://keras.io)/convolutional neural networks for processing image data, use [_k_-means](https://en.wikipedia.org/wiki/K-means_clustering) for clustering data, split the processed dataset into training and test datasets for model training, tweak hyperparameters/model features [until results on the test dataset are good](https://xkcd.com/1838/), etc.

{{< figure src="thought.png" theme="light" >}}

These tropes aren't inappropriate or misleading, but the analysis often doesn't quantify the insight/value of the results. Modeling is just one small part (and often the _easiest_ part) of a very complex system.

Data-oriented MOOCs ([Massive Online Open Courses](https://en.wikipedia.org/wiki/Massive_open_online_course)) like Andrew Ng's [Coursera course on Machine Learning](https://www.coursera.org/learn/machine-learning) and [fast.ai's course on Deep Learning](http://course.fast.ai) are good academic introductions to the theory and terminology behind data science and other related fields. Although MOOCs have many practice problems for prospective data scientists to solve, they don't make you an expert in the field capable of handling messier real-world problems, nor claim to do so.

Modern data science isn't about burying your head in a [Jupyter Notebook](http://jupyter.org) and staring at the screen watching training loss numbers trickle down (although it's definitely fun!). There's a lot more to it, some of which I've learned firsthand working as a Data Scientist at [BuzzFeed](https://www.buzzfeed.com) for over a year. To borrow a statistical term, MOOCs and thought pieces _overfit_ to a certain style of data science that is not robust to the vast uncertainties of the real world.

## The Cost/Benefit Tradeoffs of Data Science

Data science often follows the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle): 80% of the work takes 20% of the effort. Thought pieces demonstrate that you can just toss data indiscriminately into scikit-learn or a deep learning framework and get neat-looking results. The value of a data scientist, however, is when and _if_ to further development on a model.

[Kaggle competitions](https://www.kaggle.com/competitions) are a popular and often-recommended way to get exposure to real-world data science problems. Many teams of statisticians compete to create the best model for a given dataset (where "best" usually means minimizing the predictive loss/error of the model), with prizes for the highest-performing models. Kaggle also encourages clever modeling techniques such as [grid search](http://scikit-learn.org/stable/modules/grid_search.html) of thousands of model hyperparameter combinations and ensembling disparate models to create a megamodel which results in _slightly_ better predictive performance, but just might give the edge to win.

However, there are a few important differences between modeling in a Kaggle competition and modeling in a data science team. Kaggle competitions last for _weeks_ when a professional data scientist may need to spend time on other things. Ensembling gigantic machine learning models makes predictions very slow and the models themselves very large; both of which may cause difficulty deploying them into production (e.g. the [Netflix Prize](https://www.wired.com/2012/04/netflix-prize-costs/) movie recommendation models famously "did not seem to justify the engineering effort needed to bring them into a production environment"). And most importantly, there may not be a significant _practical_ performance difference between a 1st place Kaggle model that takes days/weeks to optimize and a simple scikit-learn/XGBoost baseline that can be built in a few hours.

Counterintuitively, it may be better to trade performance for speed/memory with a weaker-but-faster model; in business cases, speed and scalability are important implementation constraints. But even with scikit-learn, the model is still a [black box](https://en.wikipedia.org/wiki/Black_box) with little idea to the data scientist how the model makes its decisions. One final option is to go back to basics altogether with a "boring" linear/logistic regression model, where the predictive performance may be even weaker and the model [must follow several statistical assumptions](http://statisticsbyjim.com/regression/ols-linear-regression-assumptions/), but the model feature coefficients and statistical significance [are easily interpretable](http://blog.minitab.com/blog/adventures-in-statistics-2/how-to-interpret-regression-analysis-results-p-values-and-coefficients) to explain the importance of each input feature (if any) and make actionable, informed decisions for the business. Being a data scientist requires making educated judgments about these tradeoffs.

## Data Scientists Still Use Business Intelligence Tools

A hobbyist data scientist without a budget may opt to build their own workflows and data pipelines using free tools. However, professional data scientists have a finite amount of free time (as do all engineers), so there's a massive opportunity cost when reinventing the wheel unnecessarily. Enterprise BI tools such as [Tableau](https://www.tableau.com), [Looker](https://looker.com), and [Mode Analytics](https://modeanalytics.com) help retrieve and present data with easy-to-digest dashboards for anyone in the company. They're never cheap, but they're much cheaper to the company than having a data scientist spend valuable time to develop and maintain similar tooling over time.

If a stakeholder wants a data report ASAP, there's no problem falling back to using [SQL](https://en.wikipedia.org/wiki/SQL) to query a data warehouse and output results into an Excel spreadsheet (plus pretty data visualizations!) to quickly transport in an email. Part of being a data scientist is working out which tools are best appropriate at what time.

Some might argue that using BI tools and SQL are not responsibilities for data scientists, but instead for Business Analysts or Data Analysts. That's a [No True Scotsman](https://en.wikipedia.org/wiki/No_true_Scotsman) way of looking at it; there's a lot of overlap in data science with other analytical fields, and there's nothing wrong with that.

## Data Scientists Are Software Engineers Too

Although MOOCs encourage _self_-study, data science is a collaborative process. And not just with other data scientists on a team, but with other software engineers in the company. Version control tools like [Git](https://git-scm.com) are often used for data scientists to upload their portfolio projects publicly to [GitHub](https://github.com), but there are many other important features for use in a company-wide collaborative environment such as branching a repository, making pull requests, and merging conflicts. Beyond that are modern development QA practices, such as test environments, consistent code style, and code reviews. The full process varies strongly by company: Airbnb has a [good thought piece](https://medium.com/airbnb-engineering/scaling-knowledge-at-airbnb-875d73eff091) about how they utilize their Knowledge Base for data science collaboration using Git.

One of the very hard and surprisingly underdiscussed aspects of data science is [DevOps](https://en.wikipedia.org/wiki/DevOps), and how to actually get a statistical model into production. [Docker containers](https://www.docker.com/resources/what-container), for example, are newer technology that's hard to learn, but have many data science and DevOps benefits by mitigating Python dependency hell and ensuring a consistent environment for model deployment and execution. And once the model is in production, data scientists, data engineers, and dedicated DevOps personnel need to work together to figure out if the model has the expected output, if the model is performing with expected speed/memory overhead, how often to retrain the model on fresh data (plus the scheduling/data pipelining necessary to do so), and how to efficiently route predictions out of the system to the user.

## Data Science Can't Solve Everything

Data science experiments (even those utilizing magical AI) are allowed to fail, and not just in the fail-to-reject-the-null-hypothesis sense. Thought pieces typically discuss successful projects, which leads to a survivorship bias. Even with massive amounts of input data, it's _likely_ for a model to fail to converge and offer zero insight, or an experiment fail to offer statistically significant results (common with [A/B testing](https://vwo.com/ab-testing/)).

<span><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">real world data science is an R<sup>2</sup> of 0.10 <a href="https://twitter.com/hashtag/GoogleNext18?src=hash&amp;ref_src=twsrc%5Etfw">#GoogleNext18</a> <a href="https://t.co/qNsno2dscR">pic.twitter.com/qNsno2dscR</a></p>&mdash; Max Woolf (@minimaxir) <a href="https://twitter.com/minimaxir/status/1021885939361042432?ref_src=twsrc%5Etfw">July 24, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</span>

The difficulty of real-world data science is recognizing if a given problem _can_ be solved, how much of your valuable time to spend iterating to _maybe_ solve it, how to report to stakeholders if it _can't_ be solved, and what are the next steps if that's the case.

Don't [_p_-hack](https://www.buzzfeednews.com/article/stephaniemlee/brian-wansink-cornell-p-hacking)!

## Data Science and Ethics

During the rise of the "data science/AI is magic!" era, massive algorithmic and statistical failures suggest that data science might not always make the world a better place. Amazon built a resume-reading model which [accidentally learned to be sexist](https://www.reuters.com/article/us-amazon-com-jobs-automation-insight/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK08G). Facebook overestimated [performance metrics on their videos](https://www.theverge.com/2018/10/17/17989712/facebook-inaccurate-video-metrics-inflation-lawsuit), causing complete business pivots for media organizations in vain, indirectly [leading to hundreds of layoffs](https://www.theatlantic.com/technology/archive/2018/10/facebook-driven-video-push-may-have-cost-483-journalists-their-jobs/573403/). YouTube's recommended video algorithms [drove children towards shocking and disturbing content](https://medium.com/@jamesbridle/something-is-wrong-on-the-internet-c39c471271d2). And these companies have some of the best data talent _in the entire world_.

The _qualitative_ output of a model or data analysis is just as important as the quantitative performance, if not more. Allowing dangerous model output to hit production and impact _millions_ of consumers is a failure of QA at all levels. In fairness these companies usually fix these issues, but only _after_ journalists [point them out](https://www.nytimes.com/2018/10/19/opinion/facebook-twitter-journalism-misinformation.html). The problem with blindly chasing a performance metric (like Kaggle) is that it ignores collateral, unexpected effects.

<span><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Don’t be data-driven. Be data-informed. Metrics should never be in charge because they have no moral compass.</p>&mdash; Kim Goodwin (@kimgoodwin) <a href="https://twitter.com/kimgoodwin/status/1051849805280948224?ref_src=twsrc%5Etfw">October 15, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </span>

Maybe recommending shocking videos is what maximizes clickthrough rate or ad revenue per the models according to a business dashboard. Unfortunately, if the data justifies it and the business stakeholders encourage it, the company may _accept the consequences_ of a flawed algorithm if they don't outweigh the benefits. It's important for data scientists to be aware that they may be party to that.

## Conclusion

I realize the irony of using a data science thought piece to argue against data science thought pieces. In fairness, some Medium thought pieces do apply data science in very _unique_ ways or touch on very obscure-but-impactful aspects of frameworks, and I enjoy reading those. The field is still very broadly defined, and your experiences may differ from this post, especially if you're working for a more research-based institution. Unfortunately, I don’t have any new advice for _getting_ a data science job, which is [still very difficult](https://twitter.com/minimaxir/status/951117788835278848).

The popular idea that being a data scientist is a 40-hours-a-week Kaggle competition is **incorrect**. There's a lot more to it that's not as sexy which, in my opinion, is the more interesting aspect of the data science field as a whole.
