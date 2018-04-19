echo Cleaning
rm -rf target

echo building worker.jar
javac -d target/classes -sourcepath src/worker `find src/worker -name *.java`
jar -cf target/worker.jar -C target/classes .
rm -rf target/classes

echo building ui.jar
javac -cp "target/*" -d target/classes -sourcepath src/ui `find src/ui -name *.java`
jar -c -f target/ui.jar -e com.sc.cli.CalculatorCli -C target/classes .
rm -rf target/classes

# jar -tf target/worker.jar
# jar -tf target/ui.jar

echo =============================

java -cp "target/*" com.sc.cli.CalculatorCli 2 + 3
java -cp "target/*" com.sc.cli.CalculatorCli 6 - 2
# java -cp "target/*" com.sc.cli.CalculatorCli 4 \* 5