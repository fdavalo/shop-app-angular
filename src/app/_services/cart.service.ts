import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { AppConfigService } from '../providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  backendUrl: string; //environment.productUrl;
  cache = {'selectedDelivery':null,'products':[],'billing':null};

  constructor(private http: HttpClient, private config: AppConfigService) {
    this.load();
    this.backendUrl = this.config.getConfig()['productUrl'];
  }

  load() {
    if (localStorage.getItem('CartService')) this.cache = JSON.parse(localStorage.getItem('CartService'));
  }

  save() {
    localStorage.setItem('CartService', JSON.stringify(this.cache));       
  }

  setSelectedDelivery(delivery) {
    this.cache.selectedDelivery = delivery;
    this.save();
  }

  getSelectedDelivery() {
    return this.cache.selectedDelivery;
  }

  getBilling() {
    return this.cache.billing;
  }

  setBilling(data) {
    this.cache.billing = data;
    this.save();
  }

  addToCart(product) {
    this.cache.products.push(product);
    this.save();
  }

  getCart() {
    return this.cache.products;
  }

  getProducts() {
    const url = this.backendUrl + '/products';
    return this.http.get(url)
  }

  getProduct(id) {
    const url = this.backendUrl + '/products/' + id;
    return this.http.get(url);
  }

  updateProduct(data, id) {
    const url = this.backendUrl + '/products/' + id;
    return this.http.put(url, data);
  }

  getShippingDetails() {
    return this.http.get('/assets/shipping.json');
  }

  getMemorySize() {
    return this.http.get('/assets/memorySize.json');
  }

  getProductPrice() {
    return this.getCart().map(key => {
        return key.price;
    }).reduce((a, b) => a + b, 0);
  }

  getTotalPrice() {
    if (this.getSelectedDelivery()) return this.getProductPrice() + this.getSelectedDelivery().price;
    return this.getProductPrice();
  }

  removeFromCart(product) {
    const index = this.cache.products.indexOf(product);
    this.cache.products.splice(index, 1);
    this.save();
  }

  clearCart() {
    this.cache.products = [];
    this.cache.billing = null;
    this.cache.selectedDelivery = null;
    this.save();
    return this.cache.products;
  }
}
