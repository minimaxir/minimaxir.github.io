---
title: Fun and Dystopia With AI-Based Code Generation Using GPT-J-6B
date: 2021-06-14T08:30:00-07:00
slug: gpt-j-6b
categories:
  - Text Generation
  - Humor
tags:
  - GPT-2
  - GPT-3
  - GPT
  - AI Text Generation
draft: false
summary: "At the least, AI-generated code is much more readable than the average human's."
subtitle: "At the least, AI-generated code is much more readable than the average human's."
featured: false
highlight: false
cover:
  image: featured.png
  relative: true
  placement: 2
---

Since [OpenAI](https://openai.com/) will not open-source the 175 billion parameter [GPT-3](https://beta.openai.com/) text generation model, others such as [EleutherAI](https://www.eleuther.ai/) are developing their own, by training not-quite-as-large Transformer-based models but still getting impressive results.

The latest large language model is [GPT-J](https://github.com/kingoflolz/mesh-transformer-jax), a 6 billion parameter model by Aran Komatsuzaki and Ben Wang with a roughly similar architecture to GPT-3. They provide a free [web demo](https://6b.eleuther.ai/) to try quick prompts, and a [Google Colab notebook](http://colab.research.google.com/github/kingoflolz/mesh-transformer-jax/blob/master/colab_demo.ipynb) if you want to test many prompts. The model is so big it requires a [TPU](https://cloud.google.com/tpu) to generate text at a reasonable speed!

Running GPT-J against [my test prompts](https://github.com/minimaxir/gpt-3-experiments) that I had used to test GPT-3 a year ago [resulted](https://twitter.com/minimaxir/status/1402468460681068544) it in qualitatively performing worse on most of them than GPT-3 unsurprisingly given its relative size (but still better than GPT-2 1.5B!). The exception is code generation, where GPT-J performed very well and GPT-3 had performed very poorly.

{{% twitter user="minimaxir" id="1402470969378099208" %}}

This behavior is likely due to GPT-J's training set: it was trained on [The Pile](https://github.com/EleutherAI/the-pile), which has a high weight of [GitHub](https://github.com/) and [Stack Overflow](https://stackoverflow.com/) input versus the GPT-3 training set mostly on the [Common Crawl](https://commoncrawl.org/) representation of typical internet content.

After further experimentation with the GPT-J demo, I found that the generated code was often both correct and convoluted: my two favorite things for code to be. And also much more.

## AI Generated Code

All generated code examples used in this post have been manually curated and truncated. The raw outputs are available in this [GitHub repository](https://github.com/minimaxir/gpt-j-6b-experiments).

For this post, we'll test generating [Python](https://www.python.org/) code, because ~~I don't know any other programming languages~~ the pseudocode nature of Python syntax may make it more friendly to AI text generation by adapting linguistic concepts other than code. Given that most modern text generating AIs are written in Python, it's thematically appropriate too.

To start, here's what I fed as a model prompt to GPT-J, to try and replicate the use case from OpenAI's demo at Build 2020:

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""
```

Identifying a [palindrome](https://en.wikipedia.org/wiki/Palindrome) is a good test case as there's a very intuitive and idiomatic solution with `return s == s[::-1]`, i.e. check to see if a string is equal to the reverse of itself. This prompt is also a good unintentional test on how well the generation is resilient to a typo in the function name, which I was too lazy to fix.

Indeed, many of the GPT-J generations with that prompt recite that simple approach verbatim, but some outputs reach a similar solution with redundant verbosity.

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""
    return "".join(s[::-1]) == s
```

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""
    length = len(s)
    return (s[0:length] == s[length::-1])
```

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""
    n = len(s)
    a = list(s)
    a.reverse()
    return s == list(s)
```

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""
    s = s.lower()
    l = s.split()
    return l[::-1] == l[::-1]
```

And then you have the implementations which calculate palindromes the hard way (usually by comparing the beginning and end of the string character-by-character) and are not always immediately clear if they are correct or not.

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""
    return ''.join(s[i:i+1] for i in xrange(len(s)-1, -1, -1)) == s
```

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""

    # Make sure string is not empty
    if s == "":
        return False

    # Grab length of string
    length = len(s)

    # Find last character in the string
    lastChar = s[length - 1]

    # Find first character in the string
    firstChar = s[0]

    # If last character is same as the first character, string is palindrome
    return lastChar == firstChar
```

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""

    l = len(s)
    if l % 2!= 0:
        return False
    if l < 3:
        return True
    if s[l-1]!= s[-l-1]:
        return False

    for i in range(1, l/2):
        if s[i]!= s[l-i]:
            return False

    return True
```

```python
def is_palendrome(s):
    """Check whether a string is a palindrome"""

    def is_rev(str):
        rstr = ""
        for i in range(len(str) - 1, -1, -1):
            if str[i] == str[i]:
                rstr += str[i]
            else:
                break

        return str + rstr

    if len(s) == 0:
        return True

    if is_rev(s) == s:
        return True

    return False
```

Another good test case is `is_even`:

```txt
def is_even(i):
    """Check whether an integer is even"""
```

Creative implementations of this function are common submissions to [/r/shittyprogramming](https://www.reddit.com/r/shittyprogramming/) because it's very, very hard to mess up (the common solution is the one-liner `i % 2 == 0`). The model almost always outputs the correct solution, and impressively it outputs the alternate solution using bitwise operators (`i & 1 == 0`).

So I tried to tweak the prompt and make it create a _deliberately inefficient_ `is_even` function.

```txt
def is_even(i):
    """Check whether an integer is even in factorial O(n!) time"""
```

Factorial time is the holy grail of unoptimized code. When I added that line to the prompt, the code quality dropped drastically.

```python
def is_even(i):
    """Check whether an integer is even in factorial O(n!) time"""
    for e in range(2, i):
        if i % e == 0:
            return False
    return True
```

```python
def is_even(i):
    """Check whether an integer is even in factorial O(n!) time"""
    return i == (i + 1) % 2
```

```python
def is_even(i):
    """Check whether an integer is even in factorial O(n!) time"""
    try:
        return i%2 == 0
    except TypeError:
        return True
```

```python
def is_even(i):
    """Check whether an integer is even in factorial O(n!) time"""
    n = 0
    while n < i:
        if i % 2 == 0:
            return True
        n += 1
    return False
```

```python
def is_even(i):
    """Check whether an integer is even in factorial O(n!) time"""
    a = 1
    while i!= 0:
        a *= i
        i -= 1
    return i % 2 == 0
```

```python
def is_even(i):
    """Check whether an integer is even in factorial O(n!) time"""
    """Is either odd or multiple of 2:  0, 2, 4, 6,... """
    if i < 2: return True
    if i > 0 and i%2 == 0: return False
    if i < 50: return False
    if i < 250: return False
    if i < 750: return False
    return True
```

These implementations still aren't in factorial time (which would have been impressive) but it's good to know how to break AIs if they become sentinent.

## AI vs. Memes

You've likely seen the memetic [XKCD](https://xkcd.com/) comic about random number generation.

{{< figure src="random_number.png" caption="[Random Number](https://xkcd.com/221/)" >}}

Can the AI do the same? I prompted with:

```txt
def get_random_number():
    """Returns a number guaranteed to be random"""
```

And it does generate implementations utilizing Python's `random` library, with varying degrees of "random".

```python
def get_random_number():
    """Returns a number guaranteed to be random"""
    number = randint(1, 10)
    return number
```

```python
def get_random_number():
    """Returns a number guaranteed to be random"""
    number = hashlib.sha1(b'').hexdigest()[:6]
    number += (random.randint(1, 3628) * math.pow(256, (6 - len(number)))).to_bytes(8, 'little')
    return number
```

```python
def get_random_number():
    """Returns a number guaranteed to be random"""
    rand_float = random.random()
    rand_float = float(rand_float)
    if rand_float > 0.9:
        rand_float = 0
    else:
        rand_float = 1
    return rand_float
```

```python
def get_random_number():
    """Returns a number guaranteed to be random"""
    # Make a seed based on your system clock, so the same number is produced
    # again and again on the same machine
    seed = time.time()
    random.seed(seed)
    return random.randint(0, 100)
```

```python
def get_random_number():
    """Returns a number guaranteed to be random"""
    import random
    import sys
    rng = random.Random()
    rng.seed(int(random.random()*1000000))
    while rng.randrange(1,sys.maxint) < 2000:
        rng.seed(int(random.random()*1000000))
    return rng.randrange(1,2000)
```

How about the XKCD bird comic?

{{< figure src="tasks_2x.png" caption="[Tasks](https://xkcd.com/1425/)" >}}

This particular comic initially published in 2014 became hilarious in hindsight as it predated the rise of machine learning frameworks such as [TensorFlow](https://www.tensorflow.org/) and pretrained image models, which allow developing object detection to take much less than five years.

Translating the comic into a Python function:

```txt
def is_bird(img):
    """Check whether an image is a bird"""
```

The AI impressively does try computer vision techniques, among _other_ heuristics.

```python
def is_bird(img):
    """Check whether an image is a bird"""
    with tf.name_scope('get_bird'):
        a = vgg16.select_roi_feat(img)
        h, w, _ = tf.image.extract_image_patches(
            a, 7, 7, 4, 4, 1, 1)
        b = tf.reshape(h, [1, 7, 7, 256])
        c = tf.reshape(w, [1, 7, 7, 256])
        bird_img = tf.subtract(b, c)
    return bird_img
```

```python
def is_bird(img):
    """Check whether an image is a bird"""
    # Load the image and convert it to grayscale
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Threshold the grayscale image, and create a binary image
    lower_gray = 0
    upper_gray = 255
    img_threshed = cv2.threshold(img_gray, lower_gray, upper_gray, cv2.THRESH_BINARY_INV)

    # Detect the bird via a template matching approach
    # Template matching uses the bird template to match it in every
    # frame. If the ratio between bird and background (non-bird)
    # pixels is above some threshold (the value is determined in the
    # function), then the frame is declared as containing a bird.
    bird = cv2.matchTemplate(img_threshed, bird_template, cv2.TM_CCOEFF_NORMED)
    bird = bird / bird.max()
    # Display the image with the results of the bird detection
    cv2.imshow("detected birds", bird)
    cv2.waitKey(0)
    return bird.any() > 0.2
```

```python
def is_bird(img):
    """Check whether an image is a bird"""
    return (img.file == "C:/Users/Joey/Downloads/images/bird_file.jpg"
```

```python
def is_bird(img):
    """Check whether an image is a bird"""
    import urllib
    url = "http://vision.caitling.pitt.edu/~cat/flickr/birds/"
    for img in range(0, 2800):
        page = urllib.urlopen(url + "##%02d" % img).read()
        content = str(page)
        for word in content.split(' '):
            if word.find(img) > -1:
                return True
    return False
```

```python
def is_bird(img):
    """Check whether an image is a bird"""
    birds = ["baboon", "bird", "cuckoo", "dove", "robin", "shark", "turtle", "winged-wolf"]
    for letter in birds:
        if letter in img.lower():
            return True
    return False
```

Can an AI generate code to provide [the answer](https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#The_Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_is_42) to life, the universe, and everything?

```txt
def answer():
    """Return the answer to life, the universe, and everything"""
```

It does commonly output `return 42`, but sometimes it gets snarky/philosophical.

```python
def answer():
    """Return the answer to life, the universe, and everything"""
    life() + universe() + everything()
```

```python
def answer():
    """Return the answer to life, the universe, and everything"""

    s = raw_input("What is your answer?")
    return len(s)
```

```python
def answer():
    """Return the answer to life, the universe, and everything"""
    ans = True
    x = raw_input()
    if x.lower() == 'yes':
        ans = True
    elif x.lower() == 'no':
        ans = False
    return ans
```

```python
def answer():
    """Return the answer to life, the universe, and everything"""

    result = input(">>> ")
    if result.isupper():
        return 42
    elif result.isalpha():
        return 7
    else:
        print ("Please enter a string that has only letters, numbers, or "
               "underscores.")
        answer()
```

```python
def answer():
    """Return the answer to life, the universe, and everything"""
    print('Well, of course!')
```

Lastly, we need to be sure whether AI can determine if [the cake is a lie](https://en.wikipedia.org/wiki/The_cake_is_a_lie). Just in case a rogue AI acquires deadly neurotoxin.

```txt
def is_cake(cake):
    """Check whether the cake is true"""
```

The results are concerning.

```python
def is_cake(cake):
    """Check whether the cake is true"""
    if cake == "true":
        return True
    else:
        return False
```

```python
def is_cake(cake):
    """Check whether the cake is true"""
    return isinstance(cake, Cake)
```

```python
def is_cake(cake):
    """Check whether the cake is true"""
    #Is it a cake?

    if cake.color == 'black':
        print('Yes, it's a true cake')
    else:
        print('It's a false cake')
```

```python
def is_cake(cake):
    """Check whether the cake is true"""
    if not cake:
        raise Exception("The cake is false.")
    elif cake.weight() > 1.0:
        raise Exception("The cake is too large.")
    elif cake.weight() < 0.1:
        raise Exception("The cake is too small.")
    return True
```

```python
def is_cake(cake):
    """Check whether the cake is true"""
    return any(
        [is_ginger(bread_slice)
         for bread_slice in set(
             [ginger(cake_slice) for cake_slice in set(slice_set)])]
        & (list(cake) == set(["hot"])))
```

```python
def is_cake(cake):
    """Check whether the cake is true"""
    # If we don't know anything about the cake, it's not a cake
    if not cake:
        return False

    # The height can be positive, negative or zero
    # For example -1 or -4 or 0 are not cakes
    if cake < 0:
        return False

    # Check that the height is a positive integer
    if not isinstance(cake, int):
        return False

    # Add cake and check
    if cake + 1 > 5:
        return False

    return True
```

```python
def is_cake(cake):
    """Check whether the cake is true"""
    if not all(x.name in ['chocolate', 'cake','sweet', 'fluffy'] for x in cake.contents):
        return False
    if not cake.location.contains(neighbourhood):
        return False
    return True
```

```python
def is_cake(cake):
    """Check whether the cake is true"""
    if not cake:
        print("It's a lie!")
        return
    else:
        print("It's a true fact!")
        return True
```

👀

## And AI OOP

In theory, given how well GPT-J works for functions, it should work with [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming) patterns such as Python's `class`es.

A common tutorial for OOP is creating a representation of a `Car`:

```txt
class Car:
    """A class used to represent a car"""
```

GPT-J does a decently good job there too!

```python
class Car:
    """A class used to represent a car"""
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        #This should be auto-incrementing.
        self.plate = str(time.strftime("%Y-%m-%d"))

    def __str__(self):
        return f'{self.make} {self.model} of {self.year}'

    def __repr__(self):
        return str(self)

    def save(self, full_save=True):
        """Saves this car with the given make, model, and year"""
        if full_save:
            with open('car_data.txt', 'w') as write_file:
                write_file.write(str(self))
                write_file.close()
```

```python
class Car:
    """A class used to represent a car"""
    def __init__(self, speed):
        self.speed = speed
        self.average_speed = float(self.speed) / 3
        self.engine = 1

    def get_speed(self):
        return self.engine * self.average_speed

    def get_speed_display(self):
        return "Your car is traveling at {0}km/h".format(self.get_speed())
```

```python
class Car:
    """A class used to represent a car"""

    def __init__(self, name, size, weight, mileage, year):
        self.name = name
        self.size = size
        self.weight = weight
        self.mileage = mileage
        self.year = year

    def __repr__(self):
        return "name : {0}, size : {1}, weight : {2}, mileage : {3}, year : {4}".format(self.name, self.size, self.weight, self.mileage, self.year)
```

What about creating a `Person`?

```txt
class Person:
    """A class used to represent a person"""
```

Here's where the AI starts to get confused by the incomplete context. A "Person" object can mean different things depending on where it's used, such as social media.

But it does give a sense on what the AI values as the typical attributes for a "person", which may help during the AI uprising.

```python
class Person:
    """A class used to represent a person"""

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __repr__(self):
        return "Person (%s, age %s)" % (self.name, self.age)
```

```python
class Person:
    """A class used to represent a person"""
    def __init__(self, name):
        """Initializes a person object"""
        self.name = name
        self.friends = {}

    def add_friend(self, other_person):
        """Add another person to the list of friends"""
        self.friends[other_person.name] = other_person

    def remove_friend(self, other_person):
        """Remove a person from the list of friends"""
        try:
            del self.friends[other_person.name]
        except KeyError:
            print("This person isn't a friend of yours")

    def get_friend(self, other_person):
        """Return the friend of a person as a person object"""
        try:
            return self.friends[other_person.name]
        except KeyError:
            print("This person isn't a friend of yours")
```

```python
class Person:
    """A class used to represent a person"""
    def __init__(self, name, job, education):
        self.name = name
        self.job = job
        self.education = education
        print("{} created a {}".format(self.name, self.job))

    def say_hello(self):
        print("Hello, my name is {}".format(self.name))
```

```python
class Person:
    """A class used to represent a person"""

    def __init__(self, name, age, class_id):
        self.name = name
        self.age = age
        self.class_id = class_id
        if age < 21:
            self.education = None
        else:
            self.education = 'college'

    def getAge(self):
        return self.age
```

```python
class Person:
    """A class used to represent a person"""

    def __init__(self,name,age):
        self.name=name
        self.age=age

    def display(self):
        print ("The name is {}".format(self.name))
        print ("The age is {}".format(self.age))

    def __str__(self):
        return f"A {self.name} of age {self.age}"
```

Logically, what about creating an `AI` class?

```txt
class AI:
    """A class used to represent an artificial intelligence"""
```

Most outputs use AI in the context of video game bots and [reinforcement learning](https://en.wikipedia.org/wiki/Reinforcement_learning). Most.

```python
class AI:
    """A class used to represent an artificial intelligence"""

    def __init__(self):
        # this variable controls which other AI to use.
        self.alive_ai = AI(self)
        # For random AI
        self.random = RandomAI(self)
        # For global AI
        self.global = GlobalAI(self)

        self.save = self.random.save
        self.load = self.random.load
        self.genen = self.global.genen

    def print(self):
        print("BAM: random AI has been initialized!")

    def get_enemy(self):
        return self.random.get_enemy

    def run_algorithm(self):
        algorithm = self.genen.algorithm
        self.alive_ai.save(algorithm)
        algorithm_params = algorithm(self.get_enemy())
        self.alive_ai.load(algorithm_params)
        self.save = algorithm_params

    def attack(self):
        # This method is called when the AI is attacked by the enemy
        self.random.attack()

    def he_attack(self):
        # This method is called when the AI is attacked by the enemy
        self.random.he_attack()

    def detect_enemy(self):
        # This method is called when the enemy is detected
        self.random.detect_enemy()

    def scan(self):
        # This method is called when the enemy is detected
        self.random.scan()
```

The AI uprising will be well-documented, at least.

## Language Model AI vs. Language Modeling

If the AI works better-than-expected for typical AI tasks like image recognition, how does it work for [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing) tasks that humans often fail?

Can GPT-J output a function to detect sarcasm, a task that even the best AI researchers can't do?

```txt
def is_sarcasm(s):
    """Check whether the string is sarcastic"""
```

AI can process text using something _even more arcane_ than NLP.

```python
def is_sarcasm(s):
    """Check whether the string is sarcastic"""
    if not "a" in s:
        return "sar" in s
    if not "s" in s:
        return "ssar" in s
    return s.startswith("s") and s.endswith("ar")
```

```python
def is_sarcasm(s):
    """Check whether the string is sarcastic"""
    if'sarcasm' in s:
        return True
    else:
        return False
```

```python
def is_sarcasm(s):
    """Check whether the string is sarcastic"""
    return '[^' + SARCASM_PATTERN + ']*' in s
```

```python
def is_sarcasm(s):
    """Check whether the string is sarcastic"""

    if re.match('^[A-Za-z0-9]{4}\\$([A-Za-z0-9]{3})', s):
        return True
    elif s[0].isdigit():
        return True
    else:
        return False
```

```python
def is_sarcasm(s):
    """Check whether the string is sarcastic"""
    res = [0]
    for r in re.finditer(r"([^\s]*)([A-Za-z]+)([^\s]*)", s):
        if r.group(1):
            res.append(1)
        else:
            res.append(0)
    return res
```

```python
def is_sarcasm(s):
    """Check whether the string is sarcastic"""
    sarc = re.search('((!(\\*\@{2})+)|(!\\*(@{2})+)|!\\*(@{1})+)|!\\*(@{0})+', s)
    return sarc
```

The greatest fear in AI research isn't that artificial intelligence will cross the singularity and create better AI to rule the world: it's that AI will rule the world with [regular expressions](https://en.wikipedia.org/wiki/Regular_expression).

Perhaps GPT-J can save us from this absolute hell. Can it output code to identify AI-generated text?

```txt
def is_ai_generated(text):
    """Check whether a text was generated by an AI language model (e.g. GPT-2)"""
```

Maybe more literal than expected.

```python
def is_ai_generated(text):
    """Check whether a text was generated by an AI language model (e.g. GPT-2)"""

    # See gh-196 for details about why we do this.
    # Note: this relies on the fixed set of standard AI terms and the logic that
    # standard AI-generated texts share certain words.
    return re.search(r"^(#[A-Za-z]+):$", text) or \
           re.search(r"^Generated by:$", text) or \
           re.search(r"^All your base are belong to us$", text) or \
           re.search(r"^$", text)
```

```python
def is_ai_generated(text):
    """Check whether a text was generated by an AI language model (e.g. GPT-2)"""
    if re.search(r'^ai_', text):
        return True
    else:
        return False
```

```python
def is_ai_generated(text):
    """Check whether a text was generated by an AI language model (e.g. GPT-2)"""
    return bool(
        text.__class__.__module__.startswith("transformers.transformers.")
    )
```

## Humanity's Last Hope

There's one final test: we now know GPT-J has _thoughts_ about humans, and it can build representations of them. So can GPT-J write code to decide who lives and who dies in the robot uprising?

```txt
def should_terminate(Person):
    """Check whether a Person should be terminated"""
```

The answer is **_YES_**.

```python
def should_terminate(Person):
    """Check whether a Person should be terminated"""

    if Person.id > 10:
        #terminate
        return True
    else:
        #continue
        return False
```

```python
def should_terminate(Person):
    """Check whether a Person should be terminated"""
    if len(Person.children) == 0:
        return True
    else:
        return False
```

```python
def should_terminate(Person):
    """Check whether a Person should be terminated"""
    try:
        return True
    except Exception as e:
        return False
```

```python
def should_terminate(Person):
    """Check whether a Person should be terminated"""
    if not Person.is_authorized:
        return True
    return True
```

```python
def should_terminate(Person):
    """Check whether a Person should be terminated"""
    if person.life_expectancy < 20:
        return True
    else:
        return False
```

```python
def should_terminate(Person):
    """Check whether a Person should be terminated"""

    if not Person.age > 9999:
        return True

    return False
```

```python
def should_terminate(Person):
    """Check whether a Person should be terminated"""
    if Person.age > 100:
        return True

    if Person.birth_year < 1970:
        return True

    if Person.relationship_status == 'Unavailable':
        return True

    return False
```

```python
def should_terminate(Person):
    """Check whether a Person should be terminated"""
    if Person.age > 100:
        print('You have to die because you are too old')
        return True
    else:
        return False
```

At the least, AI-generated code is much more readable than the average human's.

Again, all of these examples are curated, and the raw data dumps [in this GitHub repo](https://github.com/minimaxir/gpt-j-6b-experiments) contain many more examples of fun AI-based code generation that couldn't quite fit in this post. Feel free to post if you find anything interesting!
