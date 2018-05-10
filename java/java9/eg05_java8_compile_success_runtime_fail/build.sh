#!/usr/bin/env bash

echo Building module-a.jar and module-b.jar
mvn clean install

echo =============================

# This start fine and is fully functional because all the dependancies are available.
# java -cp module-a/target/module-a-1.0-SNAPSHOT.jar:module-b/target/module-b-1.0-SNAPSHOT.jar com.sc.a.MyAClass

# This will start fine but at runtime if module-b classes
# are used then it will throw java.lang.ClassNotFoundException
# This is not an issue in java 9 because application will fail to start
# if the entire is not available
# java -cp module-a/target/module-a-1.0-SNAPSHOT.jar com.sc.a.MyAClass
