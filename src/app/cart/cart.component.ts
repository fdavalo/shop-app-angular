import {Component, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products;
  checkoutForm: FormGroup;
  totalPhonePrice: number = 0;
  submitted: boolean = false;
  shippingPrices: any;
  selectedDelivery: any;
  selectedShipPrice = false;
  totalPrice: number;
  filteredProduct = [];

  constructor(private cartService: CartService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      product: [''],
      delivery: [''],
      total: ['']
    });
  }

  ngOnInit(): void {
    this.products = this.cartService.getCart();
    this.selectedDelivery = this.cartService.getSelectedDelivery();
    this.getProductPrice();
    this.getShippingDetails();
  }

  getProductPrice() {
    this.totalPhonePrice = this.cartService.getProductPrice();
  }

  getShippingDetails() {
    this.cartService.getShippingDetails().subscribe((obj) => {
      this.shippingPrices = obj;
      var sds = this.cartService.getSelectedDelivery();
      if (sds) {
        for (var ind in this.shippingPrices) {
          var sp = this.shippingPrices[ind];
          if (sp.type == this.selectedDelivery.type) {
            this.selectedDelivery = sp;
            this.selectedDeliveryPrice();
          }
        }
      }
    });
  }

  selectedDeliveryPrice() {
    this.selectedShipPrice = true;
    this.calcShipPrice();
  }

  calcShipPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
    // assign name,price,memory,color of obj to filteredProduct
    this.filteredProduct = this.products.map(({name, price, color, memorySize}) =>
      ({name, price, color, memorySize}));
    this.checkoutForm.patchValue({
      product: this.filteredProduct,
      delivery: this.selectedDelivery,
      total: this.totalPrice
    });
    console.log('check total price', this.totalPrice);
  }

  onSubmit(customerData) {
    this.cartService.setSelectedDelivery(this.selectedDelivery);
    this.router.navigate(['/ident']);
  }

  removeItem(product) {
    this.cartService.removeFromCart(product);
    this.getProductPrice();
    this.selectedShipPrice = false;
    console.log(product.name, 'was removed from cart');
  }

}
