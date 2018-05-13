#!/usr/bin/env bash
mvn clean install

echo ============ Java 9 Start fail ============

# This will fail to start since all dependencies are not satisfied. 
java --module-path=\
com.sc.module-a/target/com.sc.module-a-1.0-SNAPSHOT.jar \
--module=com.sc.module.a/com.sc.a.MyAClass