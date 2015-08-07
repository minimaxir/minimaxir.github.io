---
layout: post
title: "Why Every New Website Will Use Bootstrap"
date: 2012-03-24 21:10
comments: true
categories: [Technology]
summary: "I can say that within the next few years, every startup will be using Bootstrap."
image: Responsive2.png
---

So, I decided to spruce up the blog a little bit. The old WordPress theme I had used, [Graphene][1], had a lot of useful functionality, such as a featured post slider and a topbar for placing social media buttons, but the theme itself didn't make the blog look *unique*. Even with a few CSS tweaks to add custom styling, such as forcing the titles of blog posts to be in all-capital letters, (which makes users more likely to click them!), it still [looked very generic][2]. When building a personal brand, generic is never good.

Therefore, I resolved to develop and design a unique WordPress blog theme effectively *from scratch*, in order to ensure that my blog had a truly distinctive look and functionality. Although modifying the blogging backend was simple (it's WordPress; there are *tons* of well-written documentation for that platform), modifying the CSS frontend, which my blog readers would actually *see*, was just as important. For that task, I chose to use the Twitter Bootstrap CSS framework, which many recent startups have utilized to great effect due to its focus on minimalism and efficiency.

After completing my implementation and having hands-on experience, I can say that within the next few years, every startup will be using Bootstrap to design a website frontend both because it's incredibly easy to implement and because it allows for functionality that would take months to develop otherwise: both of which are useful properties for a startup which does not have the luxuries of time and money.

<!-- more -->

## About Bootstrap

[Twitter Bootstrap][3] is primarily developed by Twitter employees [Mark Otto][4] and [Jacob Thorton][5] (you can tell they work for Twitter because they are one of the lucky few with a 3-character Twitter handle), developed primarily to speed up the development of new websites, and is open-sourced on GitHub for anyone to contribute changes to the project. At its core, Bootstrap provides typical CSS styling, such as text headings and large form inputs (like Twitter's).

However, Bootstrap's strength lies in the **additional** CSS styles that are included for free, including animated buttons, icons, static navigation bars, and image thumbnails, all of which are staples of the design of modern startups (because they're classy!). Additionally, Bootstrap offers custom Javascript plugins which integrate into the aforementioned CSS, such as dropdown menus, tooltips, popovers, and interactive alerts. The aforementioned button styles, for example, would traditionally be implemented as jQuery buttons; CSS buttons are easier to implement (*one* line of code!) and load faster, which is better for both the user, and the startup who wants to maximize the happiness of the user. The aforementioned Javascript plugins are just as easy to implement (also *one* line of code!), and help preserve a website's minimalistic design by hiding content on default, and only presenting it when requested. Both of these features would require an extensive amount of testing to ensure that they worked 100% of the time, so developing using the framework is a useful time-saver.

The most interesting feature, however, is the implementation of a responsive layout, also included for free. Responsive layouts, which allow websites to change their CSS in response to the width of the user's internet browser, are a very new trend in web development due to the fact that we now visit websites on so many different types of devices, from iPhones to iPads. If you use Bootstrap's 12 column grid system to format your website, it will automatically be able to conform to the display width of an iPhone, iPad, small desktop, and even a large desktop layout without any additional code. No longer do websites need to spend weeks creating and maintaining a separate mobile-friendly website!

Bootstrap has received a surprising amount of third-party support as well, and interestingly has become a platform in itself. [StyleBootstrap.info][6] allows users to create their own Bootstrap design using an interactive GUI that makes adjustments in real-time, and [Bootswatch][7] distributes some these custom themes for free. Switching between these themes is simply a trivial matter of changing the CSS. [WrapBootstrap][8] is an *entire marketplace* dedicated to selling custom webpage templates based around Bootstrap!

## Bootstrap on Minimaxir

Minimaxir implements many of these features. The most notable of these is the responsive functionality: if you're on a desktop, try and resize the browser window in which you're reading this article. You'll notice the content resizing as well, and if you shrink it far enough, the top navigation bar collapsing into a small, compact form. On tablets, which have both portrait and landscape modes depending on their orientation, the responsive effect is very noticeable:

{% img /img/Responsive2.png %}

Other UI elements are scattered around logical areas of the website. The traditional "read more" at the end of each post excerpt is now a Bootstrap button. The hand-implemented  featured posts grouping at the top of index pages, and the bottom of article pages, uses Bootstrap's thumbnail grid, to group images in a clean and logical manner. There's a navigation menu at the top of every page with contains a dropdown, and on individual posts there's a sub-navigation menu which contains the share buttons (I **loathe **the "distracting-share-buttons-on-the-left-of-posts-that-scroll-with-you approach that other blogs implement.) Lastly, all article images have a popover on mouseover, which allows for...creative captioning those images.

## Limitations on Responsive Layouts

Since Bootstrap is based on a custom 12 column grid system, websites must be built from the ground up to accommodate such a layout, especially if they want to take advantage of the responsive features. It's very difficult for an established website or blog to justify the costs of development to implement such a rebuilding since they will likely outweigh the potential benefits, but a new website would not be subject to that issue. (note to startups: if you can develop a way for existing websites to go responsive for cheap, you'll make millions).

Another unforeseen issue that was particularly annoying when implementing Bootstrap for Minimaxir was the lack of third-party plugin support. The Facebook Comments plugin and the YouTube embedded videos allow only a fixed width: if the user ever changes their browser width, then there will be a size discrepancy and that could cause aesthetic problems. After a little research, it turns out that the solution to these problems is to hack the plugin themselves. (a CSS hack for Facebook, a [jQuery plugin][10] for YouTube). That's not intuitive, and given the rise of responsive layouts, I hope these vendors make changes to accommodate these use cases.

One last concern with responsive layouts, which is not Bootstrap's fault, is that some elements, such as social buttons, can dramatically slow down the loading of a website on mobile clients with less processing power than a desktop. Bootstrap contains mechanisms to hide content on mobile/tablets, but that doesn't prevent the content from *loading*, so it's moot for social buttons. To get around this problem, I had implemented a function that determines server-side whether or not the user is on a mobile client by parsing the user-agent property (which is how websites know if you're using Chrome, Firefox, etc.), and then displaying the social buttons if and only if they are on a desktop. (Otherwise, they see image-based social buttons which load easier). Honestly, in the future I expect to see a native function implemented in server-side languages for native mobile detection given the rise of responsive layouts.

{% img /img/mobilecode.png %}

Twitter Bootstrap is the best and easiest way for your new website to be future-proof, and if you're creating a startup, I strongly urge you to consider using that framework. The amount of time saved for a bootstrapped startup is invaluable, especially for startups ran by coders instead of designers.

*If you want to see more use-cases for Bootstrap, check out the [BuiltWithBootstrap][12] Tumblr. If you're looking for a WordPress Theme built on Bootstrap (which I wish I knew before attempting to build my own theme), you can use the [WPBS theme by 320press][13], which even allows you to use the Bootswatch themes variations as well!*

 [1]: http://wordpress.org/extend/themes/graphene
 [2]: http://i.imgur.com/LQVNK.png
 [3]: http://twitter.github.com/bootstrap/
 [4]: https://twitter.com/#!/mdo
 [5]: https://twitter.com/#!/fat
 [6]: http://stylebootstrap.info/
 [7]: http://bootswatch.com/
 [8]: http://wrapbootstrap.com/

 [10]: https://github.com/davatron5000/FitVids.js

 [12]: http://builtwithbootstrap.com/
 [13]: http://320press.com/wpbs/  