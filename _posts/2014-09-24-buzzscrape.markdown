---
layout: post
title: "The Least Effective Method For Blocking Web Scraping of a Website"
date: 2014-09-26 10:30
comments: true
categories: [Data, Comedy]
summary: "What was on Page #10 shocked me. OMG. I could not believe my eyes."
image: buzzfeed_example.png
---

As someone who typically plays around with data from public website APIs, I figured it would be worthwhile to learn how to get data from websites the old-fashioned way: through force, via web scraping. [Web scraping](http://en.wikipedia.org/wiki/Web_scraping) is a technique where the user downloads the raw HTML of a webpage, and parses the inherent structure of the webpage to extract the necessary data.

In order to understand the mechanics behind web scraping, I used a tool from new Y Combinator startup [Kimono Labs](https://www.kimonolabs.com/), which allows the user to click structured elements of any website and quickly create an API that can access all the collected data and convert it into an easy-to-access form. My first target was BuzzFeed, since their social interaction data might be useful in determining how it became so big so quickly, and maybe also determine just how effective those stupid listicles are.

# <span><i class="fa fa-terminal"></i></span> Live Free and Scrape Hard

For example, here's a pair of typical BuzzFeed articles:

{% img /img/buzzscrape/buzzfeed_example.png %}

And here's the corresponding output of [my Kimono Labs BuzzFeed scraper](https://www.kimonolabs.com/apis/1x3l57k0) for those two articles:

{% highlight html %}
{
         "title": {
          "text": "Stop Tweeting Instagram Links",
          "href": "http://www.buzzfeed.com/katienotopoulos/stop-tweeting-instagram-links"
        },
        "content": "I CANNOT REMAIN SILENT ON THIS ISSUE ANY LONGER.",
        "author": "Katie Notopoulos",
        "num_responses": "123"
      },
      {
        "title": {
          "text": "28 Things Your Gchat Availability Status Really Means",
          "href": "http://www.buzzfeed.com/katieheaney/28-things-your-gchat-availability-status-really-means"
        },
        "content": "Let’s chat.",
        "author": "Katie Heaney",
        "num_responses": "13"
      }
}
{% endhighlight %}

This data format ([JSON](http://en.wikipedia.org/wiki/JSON)) can be processed and manipulated by nearly any modern programming language.

Each BuzzFeed category page has about 22 articles, but the scraper can also access successive pages to retrieve more articles. This works by finding the URL of the next page by deriving the URL from the "Older" button if present on that page. Then the scraper can find the Older button on the page after that, and so forth, until all pages on BuzzFeed are scraped.

{% img /img/buzzscrape/buzzfeed_page.png %}

My BuzzFeed scraper, for some reason, only retrieved 10 pages maximum. So I used my QA skills and traced the exact route the scraper took, navigating through all 10 pages by clicking the Older button.

What was on Page #10 shocked me. OMG. I could not believe my eyes.

{% img /img/buzzscrape/buzzfeed_disable.png %}

# <span><i class="fa fa-times-circle-o"></i></span> No Scrape For You

The Older button is *disabled* on page 10? **WHY?**

BuzzFeed is a website created in the 21st century that [just raised $50 million](http://www.nytimes.com/2014/08/11/technology/a-move-to-go-beyond-lists-for-content-at-buzzfeed.html?_r=0). This is not a peculiar technical limitation due to bad coding or bad infrastructure; this is a deliberate functional aspect of the product.

It is my personal mantra that if a startup has a particularly unintuitive UI/UX behavior, it's a form of "growth hacking" that my feeble brain cannot comprehend. 

Could the reason that BuzzFeed disables access to pages past 10 is that they want to prevent archive browsing, thereby putting more of an emphasis on more recent and more potentially-viral articles? That wouldn't make sense; if a person is so hooked on BuzzFeed articles that they are at Page 10, why stop them? It's still free page views and ad revenue.

It's likely that BuzzFeed has statistics on how many users actually visit article pages up to Page 10. Perhaps their data analysts noted "hey, only 0.0027% of our visitors actually read up to Page 10, anyone who actually reads that far is three standard deviations away from normal, therefore they must be a web scraper!" and recommend punitive action accordingly.

I noted earlier that it definitely was not a technical limitation that kept pages greater than 10 from being accessed. If you look at the URLs of the BuzzFeed screenshots above, you'll notice a "*p=2*" parameter for Page 2 or a "*p=10*" parameter for Page 10. What happens if you just change the 10 to a 11?

You go to Page 11. And you can go all the way to page *200* in some categories.

{% img /img/buzzscrape/buzzfeed_200.png %}

Incidentally, this is easier and more reliable to implement programmatically than searching for the Older button and extracting the URL.

So the disabling of the button will only stop stupid web scrapers. Yes, that makes my BuzzFeed web scraper a stupid web scraper, *but that's not the point!* It just makes the BuzzFeed's motive behind disabling the button at Page 10  even more baffling.

What did I do now that my quick-and-dirty BuzzFeed scraper couldn't parse a statistically significant amount of BuzzFeed articles? I did the only logical thing.

I spent a weekend learning how to use [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/) in Python and parsed BuzzFeed the hard way, while changing the page number in the URL to pagenate through the pages. And I even was able to add new features to the scraper, such as simultaneously scraping the number of Facebook Shares a given BuzzFeed article generates.

{% img /img/buzzscrape/buzzfeed_listicles.png %}

Hey, there *is* a relationship between listicle size and social media engagement!