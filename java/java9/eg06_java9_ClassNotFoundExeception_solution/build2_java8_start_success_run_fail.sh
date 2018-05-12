#!/usr/bin/env bash
mvn clean install

echo ============ Java 8 Start success, run fail ============

# This will start fine but at runtime if com.sc.module-b classes
# are used then it will throw java.lang.ClassNotFoundException
java -cp \
com.sc.module-a/target/com.sc.module-a-1.0-SNAPSHOT.jar \
com.sc.a.MyAClass
