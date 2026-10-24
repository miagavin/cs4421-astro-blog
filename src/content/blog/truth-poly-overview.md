---
title: "Truth-Poly: an automated pipeline that trades Trump's Truth Social posts"
description: 'How a pipeline watches Truth Social and trades Polymarket within 2-3 seconds.'
author: 'Mia Gavin'
pubDate: 'Oct 24 2026'
---

Truth-Poly is an automated trading pipeline I built. It monitors Donald Trump's Truth Social account in real time and places trades on Polymarket prediction markets within 2-3 seconds of a post that matters.

## How it works

1. **Poll.** The pipeline polls Trump's Truth Social account every 1000ms using the Truthbrush library from GitHub.
2. **Filter.** Each post goes through a keyword detector.
3. **Classify.** If a keyword is found, the whole post is sent to Claude through its API. Claude decides whether Trump has nominated someone in the post, and answers with the candidate as "Firstname Lastname" or with "No nomination".
4. **Route.** Each nomination name is mapped to Polymarket market IDs, and the pipeline buys the relevant asset.

## The result

Using this on the Fed Chair announcement market, I made a return of about 5% when Kevin Warsh was announced. The full trade is in [My Trades](/trades), and I wrote the story up in a separate post.

The code is on [GitHub](https://github.com/miagavin/truth-poly-ise). The next posts take the pipeline apart one piece at a time.

This is not financial advice.