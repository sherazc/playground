#!/bin/sh

###############################
# MAKE SURE
#
# in ~/.gradle/gradle.properties these properties exist
#
# MYAPP_RELEASE_STORE_FILE=sheraz.dev.jks
# MYAPP_RELEASE_KEY_ALIAS=Sheraz Development
# MYAPP_RELEASE_STORE_PASSWORD=****
# MYAPP_RELEASE_KEY_PASSWORD=****
#
# java keystore file android/app/sheraz.dev.jks should also exist
#
###############################

./clean_cache.sh

cd android

./gradlew clean
./gradlew assembleRelease

echo "##################"
echo "# Built release apk in app/build/outputs/apk/release"
echo "##################"
