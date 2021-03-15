import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { LoginComponent } from '../user/login.component';

@Component({
    selector: 'app-ident',
    templateUrl: '../user/login.component.html',
    styleUrls: ['../user/login.component.scss']    
})
export class IdentComponent extends LoginComponent {

    constructor(protected userService: UserService, 
                protected formBuilder: FormBuilder,
                protected router: Router) {
        super(userService,formBuilder,router);
        this.target = '/billing';
        if (userService.getId()) this.router.navigate([this.target], {});
    }

}