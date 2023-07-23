---
title: "Benchmarking TensorFlow on Cloud CPUs: Cheaper Deep Learning than Cloud GPUs"
date: 2017-07-05T09:00:00-07:00
slug: cpu-or-gpu
category: [AI, Cost Savings]
tags: [TensorFlow]
summary: "Using CPUs instead of GPUs for deep learning training in the cloud is cheaper because of the massive cost differential afforded by preemptible instances."
cover:
  image: featured.png
  relative: true
  hidden: true
---

I've been working on a few personal deep learning projects with [Keras](https://github.com/fchollet/keras) and [TensorFlow](https://www.tensorflow.org). However, training models for deep learning with cloud services such as [Amazon EC2](https://aws.amazon.com/ec2/) and [Google Compute Engine](https://cloud.google.com/compute/) isn't free, and as someone who is currently unemployed, I have to keep an eye on extraneous spending and be as cost-efficient as possible (please support my work on [Patreon](https://www.patreon.com/minimaxir)!). I tried deep learning on the cheaper CPU instances instead of GPU instances to save money, and to my surprise, my model training was only slightly slower. As a result, I took a deeper look at the pricing mechanisms of these two types of instances to see if CPUs are more useful for my needs.

The [pricing of GPU instances](https://cloud.google.com/compute/pricing#gpus) on Google Compute Engine starts at **$0.745/hr** (by attaching a $0.700/hr GPU die to a $0.045/hr n1-standard-1 instance). A couple months ago, Google [announced](https://cloudplatform.googleblog.com/2017/05/Compute-Engine-machine-types-with-up-to-64-vCPUs-now-ready-for-your-production-workloads.html) CPU instances with up to 64 vCPUs on the modern Intel [Skylake](<https://en.wikipedia.org/wiki/Skylake_(microarchitecture)>) CPU architecture. More importantly, they can also be used in [preemptible CPU instances](https://cloud.google.com/compute/docs/instances/preemptible), which live at most for 24 hours on GCE and can be terminated at any time (very rarely), but cost about _20%_ of the price of a standard instance. A preemptible n1-highcpu-64 instance with 64 vCPUs and 57.6GB RAM plus the premium for using Skylake CPUs is **$0.509/hr**, about 2/3rds of the cost of the GPU instance.

If the model training speed of 64 vCPUs is comparable to that of a GPU (or even slightly slower), it would be more cost-effective to use the CPUs instead. But that's assuming the deep learning software and the GCE platform hardware operate at 100% efficiency; if they don't (and they likely don't), there may be _even more savings_ by scaling down the number of vCPUs and cost accordingly (a 32 vCPU instance with same parameters is half the price at **$0.254/hr**, 16 vCPU at **$0.127/hr**, etc).

There aren't any benchmarks for deep learning libraries with tons and tons of CPUs since there's no demand, as GPUs are the [Occam's razor](https://en.wikipedia.org/wiki/Occam%27s_razor) solution to deep learning hardware. But what might make counterintuitive but economical sense is to use CPUs instead of GPUs for deep learning training because of the massive cost differential afforded by preemptible instances, thanks to Google's [economies of scale](https://en.wikipedia.org/wiki/Economies_of_scale).

## Setup

I already have [benchmarking scripts](https://github.com/minimaxir/deep-learning-cpu-gpu-benchmark) of real-world deep learning use cases, [Docker container environments](https://github.com/minimaxir/keras-cntk-docker), and results logging from my [TensorFlow vs. CNTK article](http://minimaxir.com/2017/06/keras-cntk/). A few minor tweaks allow the scripts to be utilized for both CPU and GPU instances by setting CLI arguments. I also rebuilt [the Docker container](https://github.com/minimaxir/keras-cntk-docker/blob/master/Dockerfile) to support the latest version of TensorFlow (1.2.1), and created a [CPU version](https://github.com/minimaxir/keras-cntk-docker/blob/master/Dockerfile-cpu) of the container which installs the CPU-appropriate TensorFlow library instead.

There is a notable CPU-specific TensorFlow behavior; if you install from `pip` (as the[ official instructions](https://www.tensorflow.org/install/) and tutorials recommend) and begin training a model in TensorFlow, you'll see these warnings in the console:

{{< figure src="tensorflow-console.png" theme="light" >}}

In order to fix the warnings and benefit from these [SSE4.2](https://en.wikipedia.org/wiki/SSE4#SSE4.2)/[AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions)/[FMA](https://en.wikipedia.org/wiki/FMA_instruction_set) optimizations, we [compile TensorFlow from source](https://stackoverflow.com/questions/41293077/how-to-compile-tensorflow-with-sse4-2-and-avx-instructions), and I created a [third Docker container](https://github.com/minimaxir/keras-cntk-docker/blob/master/Dockerfile-cpu-compiled) to do just that. When training models in the new container, [most](https://github.com/tensorflow/tensorflow/issues/10689) of the warnings no longer show, and (spoiler alert) there is indeed a speed boost in training time.

Therefore, we can test three major cases with Google Compute Engine:

- A Tesla K80 GPU instance.
- A 64 Skylake vCPU instance where TensorFlow is installed via `pip` (along with testings at 8/16/32 vCPUs).
- A 64 Skylake vCPU instance where TensorFlow is compiled (`cmp`) with CPU instructions (+ 8/16/32 vCPUs).

## Results

For each model architecture and software/hardware configuration, I calculate the **total training time relative to the GPU instance training** for running the model training for the provided test script. In all cases, the GPU _should_ be the fastest training configuration, and systems with more processors should train faster than those with fewer processors.

Let's start using the [MNIST dataset](http://yann.lecun.com/exdb/mnist/) of handwritten digits plus the common multilayer perceptron (MLP) architecture, with dense fully-connected layers. Lower training time is better. All configurations below the horizontal dotted line are better than GPUs; all configurations above the dotted line are worse than GPUs.

{{< figure src="dl-cpu-gpu-5.png" theme="light" >}}

Here, the GPU is the fastest out of all the platform configurations, but there are other curious trends: the performance between 32 vCPUs and 64 vCPUs is similar, and the compiled TensorFlow library is indeed a significant improvement in training speed _but only for 8 and 16 vCPUs_. Perhaps there are overheads negotiating information between vCPUs that eliminate the performance advantages of more vCPUs, and perhaps these overheads are _different_ with the CPU instructions of the compiled TensorFlow. In the end, it's a [black box](https://en.wikipedia.org/wiki/Black_box), which is why I prefer black box benchmarking all configurations of hardware instead of theorycrafting.

Since the difference between training speeds of different vCPU counts is minimal, there is definitely an advantage by scaling down. For each model architecture and configuration, I calculate a **normalized training cost relative to the cost of GPU instance training**. Because GCE instance costs are prorated (unlike Amazon EC2), we can simply calculate experiment cost by multiplying the total number of seconds the experiment runs by the cost of the instance (per second). Ideally, we want to _minimize_ cost.

{{< figure src="dl-cpu-gpu-6.png" theme="light" >}}

Lower CPU counts are _much_ more cost-effective for this problem, when going as low as possible is better.

Now, let's look at the same dataset with a convolutional neural network (CNN) approach for digit classification:

{{< figure src="dl-cpu-gpu-7.png" theme="light" >}}

{{< figure src="dl-cpu-gpu-8.png" theme="light" >}}

GPUs are unsurprisingly more than twice as fast as any CPU approach at CNNs, but cost structures are still the same, except that 64 vCPUs are _worse_ than GPUs cost-wise, with 32 vCPUs training even faster than with 64 vCPUs.

Let's go deeper with CNNs and look at the [CIFAR-10](https://www.cs.toronto.edu/%7Ekriz/cifar.html) image classification dataset, and a model which utilizes a deep covnet + a multilayer perceptron and ideal for image classification (similar to the [VGG-16](https://gist.github.com/baraldilorenzo/07d7802847aaad0a35d3) architecture).

{{< figure src="dl-cpu-gpu-9.png" theme="light" >}}

{{< figure src="dl-cpu-gpu-10.png" theme="light" >}}

Similar behaviors as in the simple CNN case, although in this instance all CPUs perform better with the compiled TensorFlow library.

The fasttext algorithm, used here on the [IMDb reviews dataset](http://ai.stanford.edu/%7Eamaas/data/sentiment/) to determine whether a review is positive or negative, classifies text extremely quickly relative to other methods.

{{< figure src="dl-cpu-gpu-3.png" theme="light" >}}

{{< figure src="dl-cpu-gpu-4.png" theme="light" >}}

In this case, GPUs are much, much faster than CPUs. The benefit of lower numbers of CPU isn't as dramatic; although as an aside, the [official fasttext implementation](https://github.com/facebookresearch/fastText) is _designed_ for large amounts of CPUs and handles parallelization much better.

The Bidirectional long-short-term memory (LSTM) architecture is great for working with text data like IMDb reviews, but after my previous benchmark article, [commenters on Hacker News](https://news.ycombinator.com/item?id=14538086) noted that TensorFlow uses an inefficient implementation of the LSTM on the GPU, so perhaps the difference will be more notable.

{{< figure src="dl-cpu-gpu-1.png" theme="light" >}}

{{< figure src="dl-cpu-gpu-2.png" theme="light" >}}

Wait, what? GPU training of Bidirectional LSTMs is _twice as slow_ as any CPU configuration? Wow. (In fairness, the benchmark uses the Keras LSTM default of `implementation=0` which is better on CPUs while `implementation=2` is better on GPUs, but it shouldn't result in that much of a differential)

Lastly, LSTM text generation of [Nietzsche's](https://en.wikipedia.org/wiki/Friedrich_Nietzsche) [writings](https://s3.amazonaws.com/text-datasets/nietzsche.txt) follows similar patterns to the other architectures, but without the drastic hit to the GPU.

{{< figure src="dl-cpu-gpu-11.png" theme="light" >}}

{{< figure src="dl-cpu-gpu-12.png" theme="light" >}}

## Conclusion

As it turns out, using 64 vCPUs is _bad_ for deep learning as current software/hardware architectures can't fully utilize all of them, and it often results in the exact same performance (or _worse_) than with 32 vCPUs. In terms balancing both training speed and cost, training models with **16 vCPUs + compiled TensorFlow** seems like the winner. The 30%-40% speed boost of the compiled TensorFlow library was an unexpected surprise, and I'm shocked Google doesn't offer a precompiled version of TensorFlow with these CPU speedups since the gains are nontrivial.

It's worth nothing that the cost advantages shown here are _only_ possible with preemptible instances; regular high-CPU instances on Google Compute Engine are about 5x as expensive, and as a result eliminate the cost benefits completely. Hooray for economies of scale!

A major implicit assumption with the cloud CPU training approach is that you don't need a trained model ASAP. In professional use cases, time may be too valuable to waste, but in personal use cases where someone can just leave a model training overnight, it's a very, very good and cost-effective option, and one that I'll now utilize.

---

_All scripts for running the benchmark are available in [this GitHub repo](https://github.com/minimaxir/deep-learning-cpu-gpu-benchmark). You can view the R/ggplot2 code used to process the logs and create the visualizations in [this R Notebook](http://minimaxir.com/notebooks/deep-learning-cpu-gpu/)._
