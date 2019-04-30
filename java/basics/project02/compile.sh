#!/bin/bash
echo ==============
echo Cleaning target
rm -rf target

echo ==============
echo Compiling servies
javac -d target/classes \
    ./services/src/Employee.java \
    ./services/src/EmployeeService.java

echo ==============
echo Packaging services
jar -cvf target/services.jar -C target/classes .
rm -rf target/classes

echo ==============
echo Compiling app
javac -cp target/services.jar -d target/classes ./app/src/App.java

echo ==============
echo Packaging app
jar -cvfe target/app.jar App -C target/classes .
rm -rf target/classes

echo ==============
echo Running app.jar
java -cp target/app.jar:target/services.jar App
