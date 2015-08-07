---
layout: post
title: "Analyzing the Patterns of Numbers in 10 Million Passwords"
date: 2015-02-24 08:00
comments: true
categories: [Data]
summary: "There are many patterns for numbers in passwords, which involve surprising yet intuitive logic."
image: two_digit_heatmap.png
---

The primary purpose of a [password](http://en.wikipedia.org/wiki/Password) is to serve as an unique verification identifier for a given user. Ideally, the password for a given website or service should be both random and unique; if the letters and/or numbers in the password follow any patterns, then they might be easier to guess by an intruder. For example, someone may put their birth year such as "1987" or "1988" in their password, which makes the passwords easier to remember, but consequently easier to break.

A few weeks ago, security researcher Mark Burnett released [a list of 10 million passwords](https://xato.net/passwords/ten-million-passwords/#.VNojhPnF98E) compiled [from various sources](http://www.reddit.com/r/10millionpasswords/comments/2w3ali/dataset_origin/conap8l) over the years. Reddit user jalgroy [posted a histogram](http://www.reddit.com/r/dataisbeautiful/comments/2vsg7h/frequency_of_years_in_passwords_oc/) of the years used in these passwords, which I've verified using my own scripts:

{% img /img/password-numbers/year_distribution.png %}

There is a clear maximum at 1987 which implies a current age of about 28. This makes sense, as internet users in their 20's are generally considered to be very attuned to internet usage. The spike at 2000 is likely not because it's a birth year, but because 2000 is a kewl number.

There are actually many similar patterns for numbers in passwords, which involve surprising yet intuitive logic.

# Digit Behavior

The distribution of the number of digits in passwords varies significantly.

{% img /img/password-numbers/digit_distribution.png %}

42% of passwords have zero numerical digits, which implies that 58% of passwords have atleast one digit. However, the local maxima in number of digits in a password all occur at *even* numbers of digits, which may imply that humans have an easier time of remembering even amounts of numbers.

If you look at a typical keyboard, you'll note that the default sequence of numbers is **1234567890**. If the user wants a number in their password that is easy to type, drawing from this sequence of numbers might be a good idea.

{% img /img/password-numbers/seq_digit_bar.png %}

Note that the length of the sequence is uncorrelated with the number of occurrences of the sequence. Many more people use 123 in a password than just 12, even though it's longer. 123, as a triplet of numbers, may be easier to remember by the average person than a pair of numbers. However, that contradicts the logic above that even numbers may be easier to remember, which suggest that another factor may be involved.

Sequences of numbers are popular, but are some sequences of numbers more popular than others? Let's look at the order and composition of 1-digit, 2-digit, and 3-digit numbers in these 10 million passwords.

# More on Digit Patterns

*Note: all number patterns are distinct number patterns, e.g. 2-digit numbers analyzed are not subsets of 3-digit or larger numbers.*

Take a look at the most used single-digit numbers:

{% img /img/password-numbers/one_digit_bar.png %}

1 is by far the most-used single-digit number, which may be due to the fact that it is the left-most number on the keyboard and therefore an easy press for services that force the inclusion of a digit in the password. Relatedly, 9 and 0 are the least-used single-digit numbers. That's intuitive enough. But does that hold for more complex patterns?

Let's look at the most-used 2-digit patterns, including numbers with 0 as a leading digit:

{% img /img/password-numbers/two_digit_bar.png %}

12 and 11, a sequential pattern and a repeating pattern respectively, are by far the most-used 2-digit numbers. Many repeating patterns such as 22 and 99 are prominent. But why is 69 in third place? (besides the obvious non-family-friendly reason)

It may be helpful to look at a heat map of all possible 2-digit numbers to see if there are any observable patterns.

{% img /img/password-numbers/two_digit_heatmap.png %}

There are a couple distinct patterns: numbers beginning with a 1 or 2 are used the most frequently, and both repeating and sequential digits are used the most frequently.

Almost all 2-digit numbers outside of those patterns are unused (the exception is 69, of course) The intersection of both of these patterns is at 11/12, which is the reason both have high usage.

Do 3-digit numbers follow similar patterns? Here's a list of the most-used 3-digit numbers in passwords:

{% img /img/password-numbers/three_digit_bar.png %}

Yes and no. Here, there appear to be more instances of special numbers, such as 321 and [007](http://en.wikipedia.org/wiki/James_Bond) which deviate from the patterns above. Of note, 3-digit numbers ending in 00 appears as a new pattern.

This can be confirmed by looking at a faceted heat map for each possible combination.

{% img /img/password-numbers/three_digit_heatmap.png %}

By far the most popular pattern for a 3-digit number is a repetition pattern, followed by a sequential pattern (the sequential pattern is always located one tile up and two tiles right from the repetition pattern). There are very few outliers which deviate from this schema aside from the ones mentioned previously. (420 is not as significant of an outlier for 3-digit numbers as 69 is for 2-digit numbers)

The patterns of numbers in passwords can offer some insight to human psychology. However, if possible, I recommend you avoid using such patterns in your passwords since it introduces a vulnerability. It's a good idea to use a password manager instead, such as [1Password](https://agilebits.com/onepassword) or [KeePass](http://keepass.info/), which offer advantages including the generation of both truly random and unique passwords.

---
*All charts were made using R and ggplot2.*

*You can download the aggregate data used to create the charts [in this Google Sheet](https://docs.google.com/spreadsheets/d/1_OHQOyLkg0d7tseHXofTBu5AWzSlmXIBjV23CojFPcY/edit?usp=sharing).*