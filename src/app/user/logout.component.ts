import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CartService } from '../_services/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { CustomValidators } from '../custom-validators';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})

export class LogoutComponent {

    public reason: string;
    public loginForm: FormGroup;
    public registerForm: FormGroup;
    protected target: string;

    constructor(protected userService: UserService,
        protected cartService: CartService,
        protected router: Router) {

            this.userService.loggedOut();
            this.cartService.clearCart();
            this.router.navigate(['/']);

    }

}                