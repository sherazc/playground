#!/bin/zsh
# https://unix.stackexchange.com/questions/76505/unix-portable-way-to-get-scripts-absolute-path-in-zsh
currentAbsoluteDirectory=${0:a:h}
java -m jdk.httpserver -h
java -m jdk.httpserver --port 4000 --directory $currentAbsoluteDirectory
