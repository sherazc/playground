#!/bin/bash
echo ==============
echo Cleaning target
rm -rf target

echo ==============
echo Compiling app
javac -d target/classes ./app/src/App.java

echo ==============
echo Packaging app
jar -cvfe target/app.jar App -C target/classes .
rm -rf target/classes

echo ==============
echo Running app.jar
java -jar target/app.jar
