#!/usr/bin/env bash
# This is not a real script. It just list of commands that will help us setup aws ec2 machine
# For detail commands look at this document
# https://docs.google.com/document/d/1KXnAUAc2ZkylDPBInMyK7NBovZ6-eJmaeUPcOTAc0Ps/edit#heading=h.7krpvip38c93


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
ssh -i /Users/sheraz/.ssh/id_rsa ubuntu@192.168.64.8


# Swap file
sudo swapon --show
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo nano /etc/fstab
# Enter this line in it /etc/fstab.
/swapfile swap swap defaults 0 0
# Start swap for current session
sudo swapon -a


# Directory structure
mkdir -p /home/ubuntu/cdb/app
mkdir -p /home/ubuntu/cdb/data/mongodb
mkdir -p /home/ubuntu/cdb/logs/cdb
mkdir -p /home/ubuntu/cdb/logs/mongodb


# Install Mongo DB
sudo apt-get install gnupg curl

curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org

echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

# Configure MongoDB
sudo nano /lib/systemd/system/mongod.service
# Fix these values
# User=ubuntu
# Group=ubuntu

sudo systemctl daemon-reload

sudo nano /etc/mongod.conf
# Fix below values
# dbPath: /home/ubuntu/cdb/data/mongodb
# path: /home/ubuntu/cdb/logs/mongodb/mongod.log

sudo systemctl start mongod.service
sudo systemctl enable mongod.service

# install JDK
mkdir -p ~/dev/jdk
cd ~/dev/jdk
wget https://download.java.net/java/GA/jdk21/fd2272bbf8e04c3dbaee13770090416c/35/GPL/openjdk-21_linux-aarch64_bin.tar.gz
tar -xvzf openjdk-21_linux-aarch64_bin.tar.gz
sudo mv jdk-21 /usr/local
rm -rf ~/dev/jdk
sudo nano /etc/profile
# Add below lines at the end of /etc/profile file
# export JAVA_HOME=/usr/local/jdk-21
# export MY_PATH="$JAVA_HOME/bin"
# export PATH=$MY_PATH:$PATH