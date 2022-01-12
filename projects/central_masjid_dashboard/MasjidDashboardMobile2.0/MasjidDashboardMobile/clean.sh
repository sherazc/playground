# clean android
cd android
rm -rf .idea
./gradlew clean
rm -rf build
cd ..

# clean ios
cd ios
rm Podfile.lock
rm -rf Pods
cd ..

# clean node
rm yarn.lock
rm -rf node_modules


# download dependencies
yarn install
cd ios
npx pod-install
cd ..
