#!/usr/bin/env node
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib/core';
import { StaticSiteStack } from '../lib/static-site-stack';
import { ContainerStack } from '../lib/container-stack';

const app = new cdk.App();

const env = {
  // The account is read from the credentials in use (never hard-coded).
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: 'us-east-1',
};

// The static stack uploads the built site from ../dist. The static deploy is paused
// (see docs/adr/ADR-001), so only create it when a build output exists. This keeps
// container deploys working on a clean CI checkout.
const distDir = path.resolve(process.cwd(), '..', 'dist');
if (fs.existsSync(distDir)) {
  new StaticSiteStack(app, 'StaticSiteStack', { env });
}

new ContainerStack(app, 'ContainerStack', { env });