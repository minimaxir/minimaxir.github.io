---
title: "Run Any Scheduled Task/Cron Super-Cheap on Google Cloud Platform"
date: 2018-11-19T09:00:00-07:00
slug: cheap-cron
categories: ["DevOps", "Cost Savings"]
tags: [Google Cloud Platform]
summary: "Thanks to a few new synergies within GCP products, it's possible to get the cost of running a scheduled task down to less than a dollar a month."
cover:
  image: featured.png
  relative: true
---

Let's say you want to make a [Twitter](https://twitter.com) bot to tweet out a custom message every few hours or so, and the free-tier VMs offered by cloud services with fractional virtual CPUs and little RAM aren't sufficient. How do you host the bot? Many suggest you get a [Digital Ocean](https://www.digitalocean.com) VM for [$5/mo](https://www.digitalocean.com/pricing/), which is not a bad price. But what if you want to run _multiple_ bots? How do you easily coordinate multiple scheduled tasks?

In my case, I maintain three bots: a bot which [tweets GIFs](https://twitter.com/MTGIFening) superimposed onto Magic: The Gathering cards, a bot which [tweets AI-generated Hacker News submission titles](https://twitter.com/hackernews_nn), and a bot which makes [AI-generated Reddit submissions](https://www.reddit.com/r/subredditnn). I found a clever solution to the multiple-bots problem: leveraging [CronJobs](https://cloud.google.com/kubernetes-engine/docs/how-to/cronjobs) with [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) + a single worker node. Each bot has its own CronJob which tells when GKE should schedule a Job for each task, and then the cluster executes the Jobs whenever compute capacity is available (i.e. no resource hogging/race conditions), and can ensure completion by restarting the task if it fails.

{{< figure src="kubecron.png" theme="light" >}}

The cost of running a cluster in GKE is just the cost of the compute: using a preemptible n1-standard-1 (1 vCPU/3.75 GB RAM) worker node VM, the [cost](https://cloud.google.com/compute/pricing) is about **$7.30/mo**, a bit more than the Digital Ocean server but can theoretically handle an unlimited number of scheduled tasks. The problem is the worker node needs to be up 24/7 even though the bots run sporadically.

But thanks to a few new synergies within GCP products, it's possible to get the cost of running a scheduled task down to _less than a dollar a month_.

## GCP Shenanigans

[A couple weeks ago](https://cloud.google.com/blog/products/application-development/announcing-cloud-scheduler-a-modern-managed-cron-service-for-automated-batch-jobs), Google released [Cloud Scheduler](https://cloud.google.com/scheduler/), which is a managed cron service that can perform tasks for other Google services. With that launch, Google also released a tutorial titled [Scheduling Instances with Cloud Scheduler](https://cloud.google.com/scheduler/docs/scheduling-instances-with-cloud-scheduler), demonstrating how you can programmatically start and stop instances using Cloud Scheduler in conjunction with [Cloud Functions](https://cloud.google.com/functions/). The demo use case is to schedule VMs during business hours, which gave me an idea; could this approach be used to boot up a VM, run a script, and then shut it down to minimize uptime?

I followed the tutorial instructions, which contains code to create a Cloud Function which boots up a specified VM, code for a Cloud Function to shut down a specified VM, and how to create cron jobs in Cloud Scheduler to invoke those two Functions at a specified time. For my scheduled tasks, I only need the instance up for a couple minutes: for example we can use a Cloud Scheduler job to start an instance every 4 hours at X:00 with the cron `0 */4 * * *`, and shut it down 2 minutes later at X:02 with the cron `2 */4 * * *`.

The next step is configuring a Google Compute Engine VM to run the scheduled task on boot. There are two ways to go about it: one is to use the `startup-script` field when configuring a VM, which specifies a command to run on boot and gets the job done. Another approach (which I use) is to package the scheduled task as a [Docker Container](https://www.docker.com/resources/what-container), and use a container-optimized OS which simply runs a specified container upon boot (although you should set restart to `On Failure` and give `Privileged Access` to the container). Additionally, the VM can be configured as a preemptible instance for massive cost savings, as the "shut-down-at-anytime" constraint is irrelevant for this use case!

{{< figure src="vm.png" theme="light" >}}

After the VMs are created, I created the start/stop tasks targeting those VMs as noted in the tutorial.

{{< figure src="scheduler.png" theme="light" >}}

I can verify that this workflow indeed works for all my bots, and the crons have been running successfully at the specified time, for only a couple minutes!

{{< figure src="working.png" theme="light" >}}

## Crunching the Numbers

This approach incorporates many different Google products. Is it _actually_ cheaper than just maintaining a simple $5/month server? Let's calculate the monthly cost of all these services.

Assuming that we run a scheduled task every 4 hours, and the server is up for 2 minutes each time (i.e. 12 minutes of uptime a day):

- **Compute Engine**: A preemptible n1-standard-1 is [$0.01 an hour](https://cloud.google.com/compute/pricing). `$0.01 / 60 * 12 * 30 = $0.06`
- **VM Persistent Disk**: Each GB of storage for a VM costs [$0.04/month](https://cloud.google.com/compute/pricing#disk), and the minimum storage size is 10GB. `$0.04 * 10 = $0.40`
- **Cloud Scheduler**: Each rule is [$0.10/month](https://cloud.google.com/scheduler/pricing), and there are both a start and a stop rule. `$0.10 * 2 = $0.20`
- **Cloud Functions**: It takes about 60 seconds total to turn on and off a VM, and with the default 256MB provision, during which it costs [$.000000463/100ms](https://cloud.google.com/functions/pricing). `0.000000463 * 10 * 60 * 12 * 30 = $0.10`

$0.06 + $0.40 + $0.20 + $0.10 = **$0.76/month to run the scheduled task**! That's not even counting the free tier bonuses if you just want to create one scheduled task; in that case, the only price you pay is the $0.06/mo for the VM. And even in the case where you run the task every hour (like in the images above), the cost is $1.24/month; still not bad.

It's worth noting that these pricing economics wouldn't have worked years ago. Back then [Amazon Web Services](https://aws.amazon.com), the leader in web services, charged for a minimum of 1 hour every time a VM was booted. Google Compute Engine innovated by only requiring a minimum of 10 minutes, which is much better but still would have had unnecessary overhead (in this example, it would increase compute monthly costs by $0.24/31%). [As of September 2017](https://cloud.google.com/blog/products/gcp/extending-per-second-billing-in-google), Google Compute Engine charges a minimum of **1 minute**, which makes this workflow possible and cheap (AWS made the same change [a week earlier](https://aws.amazon.com/blogs/aws/new-per-second-billing-for-ec2-instances-and-ebs-volumes/)).

It's also possible that similar workflows exist for AWS and [Azure Cloud](https://azure.microsoft.com/en-us/), although I'm less familiar with those platforms (and it may not necessarily be better/cheaper). Sure, if you have a very simple task to practice making bots in the cloud, the free tier of any cloud service might suffice (where you run the server all the time, and schedule the cron on the server itself). If you're planning many scheduled tasks, then a centralized approach like my initial Kubernetes implementation might actually be more cost effective. But if you're somewhere _in between_, then giving each scheduled task its own VM makes more sense for both ease of use and cost-effectiveness. And there's still many further optimizations to be done too (for example, by allowing the script in the VM to ping a HTTP Cloud Function endpoint and shut _itself_ off when complete instead of using a scheduled cron rule).
