#!/bin/zsh
docker rm -f $(docker ps -a -q)
docker volume rm -f $(docker volume ls -q)
docker network rm $(docker network ls -q)
# docker rmi $(docker images -q)
rm -rf mysql-data
rm -rf wordpress-wp-content
mkdir mysql-data
mkdir wordpress-wp-content
touch mysql-data/.gitkeep
touch wordpress-wp-content/.gitkeep
