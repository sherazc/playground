#!/usr/bin/env bash

echo Cleaning
rm -rf target

mkdir -p target/mlib

echo building worker.jar
javac -d target/classes `find src/com.sc.worker -name *.java`
jar -cf target/mlib/worker.jar -C target/classes .
rm -rf target/classes

echo building ui.jar
javac -p target/mlib/* -d target/classes `find src/com.sc.ui -name *.java`
jar -cf target/mlib/ui.jar -C target/classes .
rm -rf target/classes

