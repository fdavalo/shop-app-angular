import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { AppConfigService } from '../providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  backendUrl: string; // = environment.orderUrl;

  constructor(private http: HttpClient, private config: AppConfigService) {
    this.backendUrl = this.config.getConfig()['orderUrl'];
  }

  getOrders(session) {
    const url = this.backendUrl + '/orders';
    var options = {"headers":{"ApiSession":session}};    
    return this.http.get(url, options);
  }

  getOrder(id, session) {
    const url = this.backendUrl + '/orders/' + id;
    var options = {"headers":{"ApiSession":session}};    
    return this.http.get(url, options);
  }

  setOrder(data, session) {
    const url = this.backendUrl + '/orders';
    var options = {"headers":{"ApiSession":session}};    
    return this.http.post(url, data, options);
  }

}
