#!/bin/bash
./db-restore.sh
service cdbservice start
service nginx start
