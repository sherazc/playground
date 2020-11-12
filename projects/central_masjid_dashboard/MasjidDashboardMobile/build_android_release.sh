cd android
# This command builds app-release.aab
# ./gradlew bundleRelease

# This command builds app-release.apk
./gradlew assembleRelease

cd ..

echo "If successful app is build under android/app/build/outputs"
