#!/bin/bash
# This script verifies the pipeline scripts
# to ensure that they work as expected.
#
# The script is called locally and in the pipeline.
#
# IMPORTANT
#
# It's good practise to call the script every time you've
# made changes to the scripts to ensure they pass the verification tests.
#
# USAGE
#
#    bash scripts/pipeline/verify.sh
set -eo pipefail

echo "Verify script syntax..."
for file in scripts/**/*.sh; do
  bash -n "$file"
done

echo "Verify script styles..."
shellcheck scripts/**/*.sh
