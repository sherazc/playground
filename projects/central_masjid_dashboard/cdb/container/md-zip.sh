#!/bin/bash
export md_path_install=./md-install
export md_path_target=./target

rm -rf $md_path_target
mkdir $md_path_target

rm -rf $md_path_install/app/cdb.jar
cp ../api/webservices/target/cdb.jar $md_path_install/app
tar -czvf ./target/md-install.tar.gz $md_path_install

# Remove this once testing is complete
cd $md_path_target
tar -xzvf md-install.tar.gz
cd ..
