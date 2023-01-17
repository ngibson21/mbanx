#!/bin/bash

echo "Cfn-guard is checking ruleset..."
cfn-guard check -r web-banking.ruleset -t ansible/roles/www/templates/cfn.yml -s >reports/cfn_guard.out.json && echo OK || echo FAILED
cfn_guard_output=$(cat reports/cfn_guard.out.json)

if [ "$cfn_guard_output" != "" ]; then
    echo please check in reports/cfn_guard.out.json
    exit
fi
