#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { StaticSiteStack } from '../lib/static-site-stack';
import { ContainerStack } from '../lib/container-stack';

const app = new cdk.App();

const env = {
  // The account is read from the credentials in use (never hard-coded).
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: 'us-east-1',
};

new StaticSiteStack(app, 'StaticSiteStack', { env });
new ContainerStack(app, 'ContainerStack', { env });