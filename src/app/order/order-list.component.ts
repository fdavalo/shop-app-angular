import {Component, OnInit} from '@angular/core';
import {Products} from '../_models/products.model';
import {OrderService} from '../_services/order.service';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  // products: Array<Products> = products;
  orders: any;

  constructor(private userService: UserService,
              private orderService: OrderService,
              private router: Router) {
    this.orders = [];
  }

  ngOnInit(): void {
    this.orderService.getOrders(this.userService.getSession()).subscribe(data => {
      this.orders = data;
    });
  }

  goToOrder(order) {
    this.router.navigate(['/orders/', order.id], {});
  }

  selectedImage(product) {
    var selectedImage = product.image[0];
    for (var j in product.image) {
        if (product.image[j].phoneColor == product.color) selectedImage = product.image[j];
    }
    return selectedImage;
  }  

  orderDate(order) {
    return (new Date(order.id)).toLocaleString()
  }
}
