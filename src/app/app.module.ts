import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderListComponent } from './order/order-list.component';
import { OrderDetailsComponent } from './order/order-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { IdentComponent } from './cart/ident.component';
import { BillingComponent } from './cart/billing.component';
import { PaymentComponent } from './cart/payment.component';
import { LoginComponent } from './user/login.component'; 
import { LogoutComponent } from './user/logout.component'; 
import { ProfileComponent } from './user/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HighlightDirective } from './_directives/highlight.directive';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigService } from './providers/app-config.service';
export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OrderListComponent,
    OrderDetailsComponent,    
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    IdentComponent,
    BillingComponent,
    PaymentComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    HighlightDirective,
    AdminComponent,
    ProductsComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initConfig,
    deps: [AppConfigService],
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


