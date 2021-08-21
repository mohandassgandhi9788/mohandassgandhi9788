import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MycartComponent } from './Products/mycart/mycart.component';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { AddproductComponent } from './Products/addproduct/addproduct.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    ListproductsComponent,
    FooterComponent,
    LoginComponent,
    PagenotfoundComponent,
    MycartComponent,
    AddproductComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokeninterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
