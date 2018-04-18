echo Cleaning
rd /s /q "target"

echo building worker.jar
mkdir target\classes
dir src\worker /s /B /A-D > target\sources.txt
javac -d target\classes -sourcepath src\worker @target\sources.txt
jar -cf target/worker.jar -C target/classes .
del target\sources.txt
rd /s /q target\classes

echo building ui.jar
mkdir target\classes
dir src\ui /s /B /A-D > target\sources.txt
javac -cp "target/*" -d target\classes -sourcepath src\ui @target\sources.txt
jar -cf target/ui.jar -C target/classes .
del target\sources.txt
rd /s /q target\classes


jar -tf target/worker.jar
jar -tf target/ui.jar

echo =============================

java -cp "target/*" com.sc.cli.CalculatorCli 2 + 3
java -cp "target/*" com.sc.cli.CalculatorCli 6 - 2
java -cp "target/*" com.sc.cli.CalculatorCli 4 % 5