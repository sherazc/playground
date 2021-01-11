# clean android
cd android
rm -rf .idea
./gradlew clean
rm -rf build
cd ..

# clean node
rm yarn.lock
rm -rf node_modules

# download dependencies
yarn install
