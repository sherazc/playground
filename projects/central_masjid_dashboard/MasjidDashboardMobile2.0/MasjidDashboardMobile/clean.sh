# clean node
rm yarn.lock
# rm -rf node_modules

# download dependencies
npm install

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


# pod install
cd ios

# intel
# npx pod-install


# 
# M Chip
# https://stackoverflow.com/questions/68044863/react-native-error-bug-in-ruby-interpreter-failed-to-install-cocoapods-depend
# https://github.com/CocoaPods/CocoaPods/issues/10349#issuecomment-849468291

# First time
# brew install cocoapods
# sudo arch -x86_64 gem install ffi

# Every Clean
arch -x86_64 pod install
cd ..
