#!/usr/bin/env bash

echo Cleaning, Building worker.jar, Building ui.jar
mvn clean install

echo =============================

java -p com.sc.ui/target/com.sc.ui-1.0-SNAPSHOT.jar:com.sc.worker/target/com.sc.worker-1.0-SNAPSHOT.jar -m com.sc.ui/com.sc.cli.CalculatorCli 2 + 3
java -p com.sc.ui/target/com.sc.ui-1.0-SNAPSHOT.jar:com.sc.worker/target/com.sc.worker-1.0-SNAPSHOT.jar -m com.sc.ui/com.sc.cli.CalculatorCli 6 - 2
java -p com.sc.ui/target/com.sc.ui-1.0-SNAPSHOT.jar:com.sc.worker/target/com.sc.worker-1.0-SNAPSHOT.jar -m com.sc.ui/com.sc.cli.CalculatorCli 4 \* 2

# java -p com.sc.ui/target/com.sc.ui-1.0-SNAPSHOT.jar:com.sc.worker/target/com.sc.worker-1.0-SNAPSHOT.jar -m com.sc.ui/com.sc.cli.CalculatorCli 6 - 2