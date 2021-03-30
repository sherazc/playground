#!/bin/bash
# Containers
export cdb_container_network=cdb_network
export cdb_container_app=cdb_app_container
export cdb_container_db=cdb_db_container

# App paths
export cdb_path_root=~/cdb
export cdb_path_db=$cdb_path_root/db
export cdb_path_nginx=$cdb_path_root/nginx

# Logs
export cdb_path_logs_db=$cdb_path_root/logs/db
export cdb_path_logs_nginx=$cdb_path_root/logs/nginx
export cdb_path_logs_app=$cdb_path_root/logs/app
