#!/bin/bash
# Start android emulator on mac without starting android studio
# $ANDROID_HOME/tools/emulator @Pixel_2_API_27

# Manually start metro on linux
# gnome-terminal -e "bash -c \"react-native start ; exec bash\""

npx react-native run-android --verbose
