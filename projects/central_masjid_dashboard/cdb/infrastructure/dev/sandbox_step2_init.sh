#!/usr/bin/env bash
# This is not a real script. It just list of commands that will help us setup aws ec2 machine
# For detail commands look at this document
# https://docs.google.com/document/d/1KXnAUAc2ZkylDPBInMyK7NBovZ6-eJmaeUPcOTAc0Ps/edit#heading=h.7krpvip38c93

# Run these commands in remote ubuntu machine (ec2 or multipass)

sudo -i

mv /home/ubuntu/dev/central_masjid_dashboard /opt/

# install JDK
mkdir -p /home/ubuntu/dev/jdk
cd /home/ubuntu/dev/jdk
# To get the latest Open JDK download link go to this site:
# https://jdk.java.net

# ARM64
wget https://download.java.net/java/GA/jdk22/830ec9fcccef480bb3e73fb7ecafe059/36/GPL/openjdk-22_linux-aarch64_bin.tar.gz
tar -xvzf openjdk-22_linux-aarch64_bin.tar.gz

# X86_64
wget https://download.java.net/java/GA/jdk22/830ec9fcccef480bb3e73fb7ecafe059/36/GPL/openjdk-22_linux-x64_bin.tar.gz
tar -xvzf openjdk-22_linux-x64_bin.tar.gz
mv jdk-22 jdk-22

mv /home/ubuntu/dev/jdk/jdk-22 /opt/central_masjid_dashboard/
cd ..
rm -rf /home/ubuntu/dev/jdk
nano /etc/profile
# Add below lines at the end of /etc/profile file
# export JAVA_HOME=/opt/central_masjid_dashboard/jdk-22
# export MY_PATH="$JAVA_HOME/bin"
# export PATH=$MY_PATH:$PATH
update-alternatives --install /usr/bin/java java /opt/central_masjid_dashboard/jdk-22/bin/java 100
update-alternatives --install /usr/bin/javac javac /opt/central_masjid_dashboard/jdk-22/bin/javac 100
update-alternatives --display java
update-alternatives --display javac

# restart, re-login and check java, javac, jshell and $JAVA_HOME
# ctrl+d to exit jshell

sudo -i

apt update && apt upgrade

# Swap file
swapon --show
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
nano /etc/fstab
# Enter this line in it /etc/fstab.
/swapfile swap swap defaults 0 0
# Start swap for current session
swapon -a

# Install Mongo DB
sudo apt-get install gnupg curl

curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# this works for both x86_64 and arm64
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

apt-get update

apt-get install -y mongodb-org

echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections


systemctl daemon-reload

nano /etc/mongod.conf
# Fix below values
# dbPath: /opt/central_masjid_dashboard/data/mongodb
# path: /opt/central_masjid_dashboard/data/mongodb_logs/mongod.log

chown -R mongodb:mongodb /opt/central_masjid_dashboard/data/mongodb*

systemctl start mongod.service
systemctl enable mongod.service
systemctl status mongod.service

# Restore
cd /opt/central_masjid_dashboard/data-backup
nano db-restore.sh
# update backup .tar.gz file name in db-restore.sh e.g.
# backupDir="db-backup-2023-08-23-03-21"
./db-restore.sh
# try Studio 3T to connect using ssh

# start cdb service
nano /opt/central_masjid_dashboard/web-cdb/cdb-dev.sh
# change google API key --google.geocode.api.key=<API KEY>
mv /opt/central_masjid_dashboard/scripts/cdb.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable cdb
systemctl start cdb
systemctl status cdb
# Use journalctl to see logs
# journalctl -u cdb

# install mysql db
apt install mysql-server
systemctl status mysql
# to change mysql data directory do it in this file
nano /etc/mysql/mysql.conf.d/mysqld.cnf
# I am not going to change it, because there are many files
# There are data, socket, logs, process, change owner and client files
# By default mysql.service is enabled and started
mysql_secure_installation
# dont install "VALIDATE PASSWORD COMPONENT". Keep password validation low=0

# setup mysql user
sudo mysql
mysql> create database cdb;
mysql> create user 'cdbuser'@'localhost' identified by 'passwordcdb';
mysql> grant all privileges on cdb.* to 'cdbuser'@'localhost';
mysql> flush privileges;
mysql> exit
$ mysql -u cdbuser -D cdb -h localhost -ppasswordcdb
# Look into ssh remote connection. Maybe try this https://linuxize.com/post/mysql-remote-access/

# install php
apt install php-fpm php-mysql
nano /etc/php/8.1/fpm/php.ini
# Above can have different version. Update these variable:
# upload_max_filesize = 20M
# post_max_size = 21M

# restart machine to take above php change to take effect

# install wordpress
cd /opt/central_masjid_dashboard
wget https://wordpress.org/latest.zip
apt install zip unzip
unzip latest.zip
rm latest.zip

# install nginx
apt install nginx
systemctl enable nginx
systemctl status nginx
# To test sandbox add below in /etc/hosts and /etc/cloud/templates/hosts.debian.tmpl
# 127.0.0.1 scwordpress.com
# 127.0.0.1 sccdb.com
# 127.0.0.1 www.scwordpress.com
# 127.0.0.1 www.sccdb.com

# configure nginx
unlink /etc/nginx/sites-enabled/default
cp /opt/central_masjid_dashboard/scripts/nginx_cdbsites.com /etc/nginx/sites-available
ln -s /etc/nginx/sites-available/nginx_cdbsites.com /etc/nginx/sites-enabled/
chown -R www-data:www-data /opt/central_masjid_dashboard/wordpress
nginx -t # test syntax
systemctl reload nginx

# Install Certbot
# https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal&tab=standard
# Logs /var/log/letsencrypt/letsencrypt.log
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
certbot --nginx
certbot renew --dry-run
