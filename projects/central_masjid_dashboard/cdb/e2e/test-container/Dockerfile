FROM mongo

RUN apt update
RUN apt install nano -y
RUN apt install openjdk-11-jdk -y
COPY ./app /app
# CMD mongod --dbpath $MONGO_HOME/data  --directoryperdb --rest --logpath $MONGO_HOME/logs/mongo.log --logappend

