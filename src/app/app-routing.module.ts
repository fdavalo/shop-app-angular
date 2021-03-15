import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrderListComponent} from './order/order-list.component';
import {OrderDetailsComponent} from './order/order-details.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartComponent} from './cart/cart.component';
import {IdentComponent} from './cart/ident.component';
import {BillingComponent} from './cart/billing.component';
import {PaymentComponent} from './cart/payment.component';
import {LoginComponent} from './user/login.component';
import {LogoutComponent} from './user/logout.component';
import { ProfileComponent } from './user/profile.component';
import {AdminComponent} from './admin/admin.component';
import {ProductsComponent} from './admin/products/products.component';
import {EditProductComponent} from './admin/edit-product/edit-product.component';


const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'orders', component: OrderListComponent},
  {path: 'orders/:id', component: OrderDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'ident', component: IdentComponent},
  {path: 'billing', component: BillingComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/products', component: ProductsComponent},
  {path: 'admin/products/edit/:id', component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
