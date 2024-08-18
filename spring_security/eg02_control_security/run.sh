#!/bin/bash

./mvnw clean install
# ./mvnw spring-boot:run
# In IntelliJ add --add-opens java.base/java.lang=ALL-UNNAMED in VM Options
java --add-opens java.base/java.lang=ALL-UNNAMED -jar ./target/eg02_control_security-0.0.1-SNAPSHOT.jar