cd datamanager/nodejs
yarn build
cd ../../webclient
rm -rf node_modules/.cache
yarn upgrade opendatatool-datamanager
yarn start