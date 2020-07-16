#!/bin/bash
CURRENT_VERSION=$(node -p "require('./package.json').version")
docker build --compress --tag vtuanjs/outsource:validate-email-$CURRENT_VERSION .
docker image push vtuanjs/outsource:validate-email-$CURRENT_VERSION
