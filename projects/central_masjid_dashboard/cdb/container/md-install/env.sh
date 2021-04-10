#!/bin/bash
# Containers
export md_container_network=md_network
export md_container_app=md_app_container
export md_container_db=md_db_container

# App paths
export md_app_jar=cdb.jar
export md_install=md-install
export md_path_root=~/masjid-dashboard
export md_path_install_root=$md_path_root/$md-install
export md_path_db=$md_path_root/db
export md_path_nginx=$md_path_root/nginx

# Logs
export md_path_logs_db=$md_path_root/logs/db
export md_path_logs_nginx=$md_path_root/logs/nginx
export md_path_logs_app=$md_path_root/logs/app
