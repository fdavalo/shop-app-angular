# ShopAppAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Development server

Run `npm run local` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Prod server

Run `npm run build` first.
Then run `npm run start` for a prod server. Navigate to `http://localhost:8080/

## Deploy

`oc new-app nodejs-14~https://github.com/fdavalo/shop-app-angular.git  --name=shop-app-angular`

`oc expose service/shop-app-angular`

Then get your url from `oc get routes`

## Backend servers (products, users, orders)

By default, the backend servers will be served by mock json-server.

You need to set a configmap to replace assets/config/config.json with your backend urls, or in dev, modify environment.ts file

