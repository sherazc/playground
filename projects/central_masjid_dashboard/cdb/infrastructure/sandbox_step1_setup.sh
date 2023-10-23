#!/usr/bin/env bash
# This is not a real script. It just list of commands that will help us setup aws ec2 machine
# For detail commands look at this document
# https://docs.google.com/document/d/1KXnAUAc2ZkylDPBInMyK7NBovZ6-eJmaeUPcOTAc0Ps/edit#heading=h.7krpvip38c93

# Run these commands under central_masjid_dashboard folder
# Run these command on local machine

# For testing creating multipass container
brew install multipass
multipass version
multipass find
multipass launch 22.04 -n primary -c 2 -m 4G -d 50G

multipass shell
sudo apt update && sudo apt upgrade
sudo apt install ubuntu-desktop xrdp -y
sudo passwd ubuntu
ip a
# Now login using microsoft remote desktop to the ip printed above

# Copy public key in EC2's authorized_keys file

# Connect to aws
ssh -i /Users/sheraz/.ssh/id_rsa ubuntu@54.165.184.232

# Connect to multipass primary instance
ssh -i /Users/sheraz/.ssh/id_rsa ubuntu@192.168.64.11


# copy infra
scp -r -i ~/.ssh/id_rsa \
  cdb/infrastructure/dev/ \
  ubuntu@192.168.64.11:/home/ubuntu/

# copy app
scp -r -i ~/.ssh/id_rsa \
  cdb/api/webservices/target/cdb.jar \
  ubuntu@192.168.64.11:/home/ubuntu/dev/central_masjid_dashboard/web-cdb

# copy db archive
scp -i ~/.ssh/id_rsa \
  cdb/misc/data_export/db-backup-2023-08-23-03-21.tar.gz \
  ubuntu@192.168.64.11:/home/ubuntu/dev/central_masjid_dashboard/data-backup

