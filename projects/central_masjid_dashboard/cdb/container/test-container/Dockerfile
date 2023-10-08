FROM mongo

RUN apt update
RUN apt install nano -y
RUN apt install openjdk-11-jdk -y
RUN apt install nginx -y

COPY app /app
COPY cdbservice /etc/init.d/
COPY init-start-cdb.sh /app
COPY default /etc/nginx/sites-available
