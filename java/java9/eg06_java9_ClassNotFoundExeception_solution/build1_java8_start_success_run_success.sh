#!/usr/bin/env bash
mvn clean install

echo ============ Java 8 Start success, run success ============

# This start fine and is fully functional because all the dependencies are available.
java -cp \
com.sc.module-a/target/com.sc.module-a-1.0-SNAPSHOT.jar:\
com.sc.module-b/target/com.sc.module-b-1.0-SNAPSHOT.jar \
com.sc.a.MyAClass
