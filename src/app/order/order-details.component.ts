import {Component, OnInit} from '@angular/core';
import {OrderService} from '../_services/order.service';
import {UserService} from '../_services/user.service';
import {ActivatedRoute} from '@angular/router';
import {products} from '../_mock-data/products';
import {Products} from '../_models/products.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order;
  showProducts;

  constructor(private userService: UserService,
              private orderService: OrderService,
              private route: ActivatedRoute) {
                  this.order = {'products':[], 'delivery':{}, 'billing':{}};
                  this.showProducts = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.orderService.getOrder(params['id'], this.userService.getSession()).subscribe(data => {
            this.order = data;
        });
    });
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

  showProduct(product) {
    this.showProducts = [product];
  }
}
