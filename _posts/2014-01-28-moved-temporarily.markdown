---
layout: post
title: "Imgur is Covertly Redirecting Image Links on Facebook and Twitter"
date: 2014-02-06 08:00
comments: true
categories: [Startups]
summary: "When clicking a direct image link for the first time on Facebook, Twitter, and Google+, Imgur will redirect you to the main image page instead."
image: imgur_direct.png
---

I'm a fan of [Imgur](http://imgur.com/). Image links without gimmicks. But recently, I noticed that whenever I clicked an Imgur link on Facebook or Twitter, it  navigated me to the main image page, with loads of blank empty space and links to other Imgur images instead of just showing me only the image. I double-check the URL, and it indeed begins with the "i" subdomain that indicates a direct link to the image, such as "http://i.imgur.com/p9lG2ss.png", so what's happening?

{% img /img/imgur_direct.png %}

As it turns out, when clicking a direct image link for the first time on Facebook, Twitter, and Google+, Imgur will **redirect** you to the main image page instead. Try clicking the link in [any i.imgur.com URL on Twitter](https://twitter.com/search?q=i.imgur.com&src=typd). The main image page has a "follow us on Facebook/Twitter!" button on desktops, or an advertisement on mobile devices.

{% img /img/imgur_link.gif %}

This behavior isn't particularly honest and upfront.

But is Imgur redirecting links from only these social media sites? Are these redirects an accident or are they deliberate? 

A quick and dirty way to check is to use the command line. The *curl* command loads the data from a specified website. An optional parameter is *referrer*, which "spoofs" the URL of the website where the user is navigating from.

Let's say I wanted to "access" an image direct link coming from a website I know Imgur is not redirecting, such as Reddit. I run this command in the Windows Command Prompt or the Mac Terminal:

`curl http://i.imgur.com/p9lG2ss.png --referer http://reddit.com -I`

That gives me a Status Code 200, "OK", meaning that the image was accessed successfully.

`HTTP/1.1 200 OK
Server: cloudflare-nginx
Date: Wed, 05 Feb 2014 01:41:40 GMT Content-Type: image/png [...]`

Now what happens if the user accesses the link from Facebook or Twitter?

`curl http://i.imgur.com/p9lG2ss.png --referer http://facebook.com -I`

That returns something different.

`HTTP/1.1 302 Moved Temporarily
Server: cloudflare-nginx
Date: Wed, 05 Feb 2014 01:44:03 GMT
Content-Type: text/html
[...]
Set-Cookie: __cfduid=dc2e0ae5ee57ff598e079d75fa628f0321391564643058; expires=Mon, 23-Dec-2019 23:50:00 GMT; path=/; domain=.imgur.com; HttpOnly
Location: http://imgur.com/p9lG2ss`

[Status Code 302](http://en.wikipedia.org/wiki/HTTP_302), "Moved Temporarily," is the error code for a redirect, and shows that Imgur implemented this behavior intentionally. It also provides the Location of the link to redirect to, in this case the default image page with Imgur's branding.

After checking all popular social media sites (and their respective URL shortners) as referrers against Imgur's direct image links, I determined that the only referrer domains that Imgur redirects are:

- http://facebook.com
- http://twitter.com
- http://t.co
- http://plus.google.com

If you want to share your cat photos and .gifs directly to friends, I guess you can still share them on LinkedIn.

I won't say that what Imgur is doing is unethical; many startups use redirects to trap users and spam them with popups saying JOIN MY WEBSITE. At the least, your friends still get to see the image you linked. It's understandable why Imgur would use the redirects; direct image links cause them to lose money through bandwidth expense and earn none, while links to normal image pages make it apparent that the image is from Imgur, and the company could get new users from the branding. Many, many more direct links are made than indirect links, as shown in the image at the beginning of the article, and that can account for a lot of lost revenue.

The problem is that redirecting users without disclosure is the start of a slippery slope. When I post a direct image link by copying the "Direct Link" URL, I *expect* that others who use the link will also see the direct image. But that's not the case if the link is posted on Facebook or Twitter. Additionally, the redirects make the images take *much* longer to load on mobile, since loading the scripts and ads slow the entire page down. Making it so that the redirect is only seen the first time an image is viewed doesn't offer much solace.

If the redirects are successful at converting new users for Imgur, what's stopping them from redirecting other sites? I strongly hope that Imgur won't turn into the next Photobucket or Imageshack, but whenever a startup does something weird and not transparent, it's *never* a good sign.