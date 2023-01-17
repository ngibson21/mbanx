#!/bin/bash
# shellcheck disable=SC2002

echo "Cfn nag scan and output report..."
cfn_nag_scan --fail-on-warnings --input-path ansible/roles/www/templates/cfn.yml -o json >reports/cfn_nag.out.json && echo OK || echo FAILED
count_fail=$(cat reports/cfn_nag.out.json | jq -r .[].file_results.failure_count)

if [[ $count_fail -gt 0 ]]; then
    echo "$count_fail" are failed!! please check in reports/cfn_nag.out.json
    exit
fi
