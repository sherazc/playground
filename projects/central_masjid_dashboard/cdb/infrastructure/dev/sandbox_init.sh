#!/usr/bin/env bash
# This is not a real script. It just list of commands that will help us setup aws ec2 machine
# For detail commands look at this document
# https://docs.google.com/document/d/1KXnAUAc2ZkylDPBInMyK7NBovZ6-eJmaeUPcOTAc0Ps/edit#heading=h.7krpvip38c93






sudo mv /home/ubuntu/dev/central_masjid_dashboard /opt/

sudo -i


# install JDK
mkdir -p /home/ubuntu/dev/jdk
cd /home/ubuntu/dev/jdk
wget https://download.java.net/java/GA/jdk21/fd2272bbf8e04c3dbaee13770090416c/35/GPL/openjdk-21_linux-aarch64_bin.tar.gz
tar -xvzf openjdk-21_linux-aarch64_bin.tar.gz
mv /home/ubuntu/dev/jdk/jdk-21 /opt/central_masjid_dashboard/test
# mv jdk-21 /usr/local
rm -rf /home/ubuntu/dev/jdk
nano /etc/profile
# Add below lines at the end of /etc/profile file
# export JAVA_HOME=/opt/central_masjid_dashboard/jdk-21
# export MY_PATH="$JAVA_HOME/bin"
# export PATH=$MY_PATH:$PATH
update-alternatives --install /usr/bin/java java /opt/central_masjid_dashboard/jdk-21/bin/java 100
update-alternatives --install /usr/bin/javac javac /opt/central_masjid_dashboard/jdk-21/bin/javac 100
update-alternatives --display java
update-alternatives --display javac



apt update && sudo apt upgrade

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

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org

echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

# TODO: Trying without this step
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

# TODO: Restore



# start cdb service
sudo mv /home/ubuntu/dev/central_masjid_dashboard/scripts/cdb.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable cdb
sudo systemctl start cdb
sudo systemctl status cdb
# Use journalctl to see logs
# journalctl -u cdb

# install mysql db
sudo apt install mysql-server
systemctl status mysql
sudo mysql_secure_installation
# dont install VALIDATE PASSWORD PLUGIN. Keep password validation low=0

# setup mysql user
sudo mysql
mysql> create database cdb;
mysql> create user 'cdbuser'@'localhost' identified by 'passwordcdb';
mysql> grant all privileges on cdb.* to 'cdbuser'@'localhost';
mysql> flush privileges;
mysql> exit
$ mysql -u cdbuser -D cdb -h localhost -ppasswordcdb

# install php
sudo apt install php-fpm php-mysql
$ sudo nano /etc/php/8.1/fpm/php.ini
# Above can have different version. Update these variable:
# upload_max_filesize = 20M
# post_max_size = 21M

# install wordpress
cd ~
wget https://wordpress.org/latest.zip
sudo apt install zip unzip
unzip latest.zip
sudo mv /home/ubuntu/wordpress/* /var/www/html/
sudo mv /home/ubuntu/dev/wp-config.php /var/www/html/


# install nginx
sudo apt install nginx
sudo systemctl enable nginx
sudo systemctl status nginx
# To test sandbox add below in /etc/hosts
# 127.0.0.1 scwordpress.com
# 127.0.0.1 sccdb.com
# 127.0.0.1 www.scwordpress.com
# 127.0.0.1 www.sccdb.com

# configure nginx
sudo unlink /etc/nginx/sites-enabled/default
sudo mv /home/ubuntu/nginx_cdbsites.com /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/nginx_cdbsites.com /etc/nginx/sites-enabled/
sudo chown -R www-data:www-data /var/www/html/
sudo nginx -t # test syntax
sudo systemctl reload nginx

# TODO: restart and check if wordpress and masjid dashboard comes up

# Make sure python3 is installed
python3 --version

# TODO: install certbot