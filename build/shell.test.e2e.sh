# first build hamster
webpack --config ./build/webpack.dev.conf.js
mkdir -p ./test/e2e/dist/statics
cp -R ./dev/statics/ ./test/e2e/dist/statics

# run Casper
casperjs test --concise ./test/e2e/specs
