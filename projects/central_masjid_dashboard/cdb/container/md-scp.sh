#!/bin/bash
. ./md-install/env.sh

scp -r  $md_path_package sheraz@192.168.1.212:masjid-dashboard/md-install.tar.gz

