import {Component, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  products;
  checkoutForm: FormGroup;
  submitted: boolean = false;
  filteredProduct = [];
  email: string;
  fullName: string;
  address: any;

  constructor(private cartService: CartService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        county: ['', Validators.nullValidator],
        postalCode: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.email = this.userService.getId();
    console.log(this.cartService.getBilling());
    if (this.cartService.getBilling()) {
        this.fullName = this.cartService.getBilling().fullName;
        this.address = this.cartService.getBilling().address;
    }
    else {
        this.userService.getUser().subscribe(user => {
            if (user['fullName']) this.fullName = user['fullName'];
            if (user['addresses'] && (user['addresses'].length > 0)) this.address = user['addresses'][0];
        });
    }      
  }

  onSubmit(data) {
    this.cartService.setBilling(data);
    this.router.navigate(['/payment']);
  }
}
