import {Component, DoCheck, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {UserService} from '../_services/user.service';
import {ColorService} from '../_services/color.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  products;
  backgroundColor = '#343A40';
  loginLabel: string;
  link: string;
  title: string;
  user: string;

  constructor(private cartService: CartService,
              private userService: UserService,
              private colorService: ColorService) {
  }

  ngOnInit(): void {
    this.colorService.data$.subscribe((data) => {
        this.backgroundColor = data.color;
      }
    );
  }

  ngDoCheck(): void {
    this.products = this.cartService.getCart();
    this.loginLabel = this.userService.getId();
    this.link = "/logout";
    this.title = "Sign Out";
    this.user = this.userService.getId();
    if (!this.loginLabel) {
      this.loginLabel = "Sign In";
      this.link = "/login";
      this.title = "Sign In";
      this.user = "";
    }
  }
}
