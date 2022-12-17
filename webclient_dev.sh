cd datamanager/nodejs
yarn install
yarn build
cd ../../webclient
rm -rf node_modules/.cache
yarn install
yarn upgrade opendatatool-datamanager
yarn start
