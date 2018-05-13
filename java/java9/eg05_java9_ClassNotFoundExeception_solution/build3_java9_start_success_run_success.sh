#!/usr/bin/env bash

mvn clean install

echo ============ Java 9 Start success, run success ============

# This start fine and is fully functional because all the dependencies are available.
java --module-path=\
com.sc.module-a/target/com.sc.module-a-1.0-SNAPSHOT.jar:\
com.sc.module-b/target/com.sc.module-b-1.0-SNAPSHOT.jar \
--module=com.sc.module.a/com.sc.a.MyAClass
