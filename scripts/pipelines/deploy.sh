#!/bin/bash
set -eo pipefail

echo "Configuring the ansible config file"
cp ./ansible.cfg /etc/ansible/ansible.cfg

echo "Ansible playbook syntax checking..."
ansible-playbook --verbose \
                --inventory=ansible/hosts \
                --limit="localhost" \
                --syntax-check \
                ansible/deployment-stack.yml


echo "Ansible deployment is processing..."
ansible-playbook --verbose \
                --inventory=ansible/hosts \
                --limit="localhost" \
                ansible/deployment-stack.yml
