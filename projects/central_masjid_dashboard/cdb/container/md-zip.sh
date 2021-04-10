#!/bin/bash

. ./md-install/env.sh
md_path_target=./target

rm -rf $md_path_target
mkdir $md_path_target


rm -rf $md_install/app/$md_app_jar
cp ../$md_app_jar_source $md_install/app
tar -czvf ./$md_path_package $md_install
