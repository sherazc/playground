echo Cleaning
rm -rf target

mkdir target/module_lib


echo building worker.jar
javac -d target/classes -sourcepath src/com.sc.worker `find src/com.sc.worker -name *.java`
jar -cf target/module_lib/worker.jar -C target/classes .
rm -rf target/classes
