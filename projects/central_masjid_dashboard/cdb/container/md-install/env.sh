#!/bin/bash

# Package
md_app_jar=cdb.jar
md_install=md-install
md_app_jar_source=api/webservices/target/$md_app_jar
md_path_package=target/$md_install.tar.gz

# Remote machine
md_remote_root=~/masjid-dashboard

# Containers
md_container_network=md_network
md_container_app=md_app_container
md_container_db=md_db_container

# App paths
md_path_root=~/masjid-dashboard
md_path_install_root=$md_path_root/$md-install
md_path_db=$md_path_root/db
md_path_nginx=$md_path_root/nginx

# Logs
md_path_logs_db=$md_path_root/logs/db
md_path_logs_nginx=$md_path_root/logs/nginx
md_path_logs_app=$md_path_root/logs/app
