#!/usr/bin/env bash

echo Cleaning
rm -rf target

mkdir -p target

echo building worker.jar
javac -d target/classes `find src/com.sc.worker -name *.java`
jar -cf target/worker.jar -C target/classes .
jar -f target/worker.jar -d
rm -rf target/classes

echo building ui.jar
javac -p target/* -d target/classes `find src/com.sc.ui -name *.java`
jar -c -e com.sc.cli.CalculatorCli -f target/ui.jar -C target/classes .
jar -f target/ui.jar -d
rm -rf target/classes

# jar -tf target/worker.jar
# jar -tf target/ui.jar

echo =============================

java -p target -m com.sc.ui 2 + 3
java -p target -m com.sc.ui/com.sc.cli.CalculatorCli 6 - 2
java -p target -m com.sc.ui/com.sc.cli.CalculatorCli 4 \* 2