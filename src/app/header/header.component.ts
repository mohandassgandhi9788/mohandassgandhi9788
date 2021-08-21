import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../Products/products.service';
import { userDetails } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartCount: number = 0;

  constructor(public ud: userDetails, public myRouter: Router, public pdtSer: ProductsService) { }

  ngOnInit(): void {

   /* this.pdtSer.getMyCartCount().subscribe((data: any) => {
      this.cartCount = data;
    }) */

    this.getCartCount();

    this.pdtSer.updatecart.subscribe((data: any) => {

      console.log(data);
      // this.cartCount++;

     /* this.pdtSer.getMyCartCount().subscribe((data: any) => {
        this.cartCount = data;
      }); */

      this.getCartCount();

    });

  }

  getCartCount(){
    this.pdtSer.getMyCartCount().subscribe((data: number) => {
      console.log(data);
      this.cartCount = data;
    });
  }

  doLogout() {

    this.cartCount = 0;

    localStorage.clear();

    this.myRouter.navigateByUrl("/login");
  }

}
