---
title: 'How the Truth-Poly deployment pipeline works'
description: 'From a GitHub issue to a running container on AWS, with tests, rollbacks and logs along the way.'
author: mia-gavin
tags: ['devops', 'aws', 'ci-cd']
pubDate: 'Oct 26 2026'
---

Truth-Poly only matters if the site and tooling around it stay up, so I treated the blog like a small production service. This post walks through how a change gets from an idea to a running container on AWS.

## From issue to pull request

Every change starts as a GitHub issue with acceptance criteria. I branch from `main` using the issue number, such as `76-pipeline-blog-post`, make small commits in the Conventional Commits style, and open a pull request that says `Fixes #76`. The `main` branch is protected: nothing merges unless a pull request passes the `validate` check.

## Continuous integration

On every pull request, GitHub Actions installs dependencies, runs ESLint, type checks the Astro project, runs the unit tests and builds the site. Dependabot opens pull requests for outdated packages, so the same checks cover updates too.

## Continuous delivery to AWS

When a pull request merges, a second workflow takes over:

1. Run the unit tests again as a quality gate.
2. Build a multi-stage Docker image and tag it with the commit SHA.
3. Push the image to Amazon ECR.
4. Deploy the new tag to an ECS Fargate service with AWS CDK.

ECS replaces the running task gradually, and the load balancer only sends traffic to a container once `/api/health` returns 200. If a deployment keeps failing, the circuit breaker rolls it back automatically.

## Seeing what happens in production

The app writes one JSON log line per request, with the route, method, status code and latency. Those lines go to CloudWatch, where I can filter for errors, for example every request with a status of 500 or above.

## When it goes wrong

Because each image is tagged with its commit, rolling back means redeploying an older tag. I practised this with a deliberately broken health endpoint and recovered by redeploying the last good image.

The lesson: small changes, automatic checks, and an easy way back.