#!/usr/bin/env bash

echo Building com.sc.module-a.jar and com.sc.module-b.jar
mvn clean install

echo =============================

# This start fine and is fully functional because all the dependencies are available.
java --module-path=com.sc.module-a/target/com.sc.module-a-1.0-SNAPSHOT.jar:com.sc.module-b/target/com.sc.module-b-1.0-SNAPSHOT.jar com.sc.a.MyAClass

# This will start fine but at runtime if module-b classes
# are used then it will throw java.lang.ClassNotFoundException
# This is not an issue in java 9 because application will fail to start
# if the entire is not available
# java -cp module-a/target/module-a-1.0-SNAPSHOT.jar com.sc.a.MyAClass
