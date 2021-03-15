import {Component, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {OrderService} from '../_services/order.service';
import {UserService} from '../_services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
    paymentDetails = {'name':null,'cardNumber':'1111-2222-3333-4444','validFrom':'01/20','expiresEnd':'01/23','cvv':546};
    totalPrice: number;
    checkoutForm: FormGroup;

  constructor(private userService: UserService,
              private orderService: OrderService,
              private cartService: CartService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      paymentDetails: this.formBuilder.group({
        name: ['', Validators.required],
        cardNumber: ['', Validators.required],
        validFrom: ['', Validators.required],
        expiresEnd: ['', Validators.required],
        cvv: ['', Validators.required],
      }),
    });
    this.paymentDetails.name = this.cartService.getBilling().fullName;
    this.totalPrice = this.cartService.getTotalPrice();
  }

  onSubmit(customerData) {
    Swal.fire({
      title: 'Are you sure you want to finish the order?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((item) => {
      if (item.value) {
        Swal.fire(
          'Payment successful!',
          '',
          'success'
        );
        var order = {'delivery':this.cartService.getSelectedDelivery(),
                    'billing':this.cartService.getBilling(),
                    'products':this.cartService.getCart(),
                    'totalPrice':this.totalPrice,
                    'userId':this.userService.getId(),
                    'id':(new Date()).getTime()
        };
        this.orderService.setOrder(order, this.userService.getSession()).subscribe(result => {
            this.cartService.clearCart();
            this.router.navigate(['/orders']);
        });
      } 
      else if (item.dismiss) {
      }
    });
    console.warn('Your order has been submitted', customerData);
  }

}
