#!/bin/zsh
echo "======================"
echo "changing to java 11"
jenv local 11
java src/main/java/com/sc/java18a/eg01charset/DefaultUtf8Charset.java

echo "======================"
echo "changing to java 18"
jenv local 18
java src/main/java/com/sc/java18a/eg01charset/DefaultUtf8Charset.java
