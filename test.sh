#!/bin/bash

# Exit on error
set -e

# Compile
STORYBOOK_TESTING=true yarn build-sb > /dev/null

# Start muted local server and get PID
yarn http-server dist --silent --port 6006 &
SERVER_PID=$!

# Run testing
yarn wait-on tcp:6006

# Need to allow error but get the status for later
set +e
yarn test-storybook --coverage --no-cache
STATUS_CODE=$?
set -e

# Finishing up
kill -9 $SERVER_PID

# Compile coverage to an overview
yarn nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/storybook

exit $STATUS_CODE
