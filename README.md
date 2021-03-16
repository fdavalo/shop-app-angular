# ShopAppAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploy

oc new-app nodejs-14~https://github.com/fdavalo/shop-app-angular.git  --name=shop-app-angular
oc expose service/shop-app-angular

## Backend servers (products, users, orders)

By default, the backend servers will be served by mock json-server, if server started with `node serverAndapi.js`.
On dev `(ng serve)` 

You need to set a configmap to replace assets/config/config.json with your backend urls

## Mock backends

Run `node api.js`
