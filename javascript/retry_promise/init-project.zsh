#!/bin/zsh

npm init -y
npm install typescript -g
npm install typescript --save-dev
npm install momentjs
npm install -g ts-node
tsc --init
mkdir src
touch src/.gitkeep
mkdir dist
touch dist/.gitkeep
echo "#############"
echo "## set tsconfig"
echo "'rootDir': './src',"
echo "'outDir': './dist',"
echo "#############"

echo "Add below in package.json script"
echo "ts-node src/helloWorld.ts"
