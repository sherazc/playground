#!/usr/bin/env bash
mvn clean install

echo ============ Java 9 Start fail ============

java --module-path=\
com.sc.module-a/target/com.sc.module-a-1.0-SNAPSHOT.jar \
--module=com.sc.module.a/com.sc.a.MyAClass