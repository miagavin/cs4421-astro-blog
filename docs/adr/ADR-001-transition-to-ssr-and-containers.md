# ADR-001: Transition from a Static Site to a Containerised SSR Runtime

## Status

Accepted (2026-10-25)

## Context

The Truth-Poly blog is currently a static Astro site. It is built to plain HTML, uploaded to a private S3 bucket and served through CloudFront. The infrastructure is defined with AWS CDK and deployed by a GitHub Actions workflow on every merge to `main`.

This works well for blog content, but static hosting cannot execute server-side code. The project now needs:

- A `/api/health` endpoint so a container orchestrator can check that the application is alive and ready.
- Structured JSON logs so request behaviour can be queried and alarmed on in CloudWatch.
- The ability to add further dynamic API routes later.

S3 and CloudFront only serve files, so none of these can run there.

## Decision

We will run the application as a Node.js server:

- Configure Astro with `output: 'server'` and the `@astrojs/node` adapter in `standalone` mode.
- Keep the existing content pages prerendered so they stay fast and cacheable.
- Add `/api/health` and emit structured JSON request logs.
- Package the server as a Docker image (multi-stage build) and run it on AWS ECS Fargate, with the image stored in ECR. Both are defined in CDK.
- Pause the automatic static S3 deploy workflow, because an SSR build is no longer a folder of static files. The existing static site stays live at its last good version until the container deployment replaces it.

## Alternatives considered

- **Stay static and add AWS Lambda functions for the API.** Cheap and scalable, but adds a second runtime and deployment path, and cold starts affect health checks.
- **Use a managed container service such as AWS App Runner.** Simpler to operate, but gives less visibility into networking and scaling, which the course wants us to practise.
- **Keep the static site and skip dynamic features.** Lowest cost and complexity, but cannot provide health probes or structured request logging.

## Consequences

**Positive**

- Enables live API routes, dynamic rendering and operational health checks.
- Container images are portable and the same artefact runs locally and in AWS.
- Structured logs can be filtered and alarmed on in CloudWatch.

**Negative**

- Higher operational complexity: a container runtime, an image registry and a load balancer to manage.
- Higher running cost than S3 and CloudFront; the compute must be torn down when not in use.
- The deployment pipeline changes, so the static deploy workflow is paused and a container deploy workflow replaces it.