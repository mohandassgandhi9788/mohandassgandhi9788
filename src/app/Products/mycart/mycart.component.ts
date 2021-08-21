import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  myCartItems : any[] = [];
  mycartFinalPrice : number;

  msg : string;

  constructor(public pdtSer : ProductsService, public myRouter : Router) { }

  ngOnInit(): void {

    this.pdtSer.getMyCartCartItems().subscribe((data:any[])=>{
      
      console.log(data);
      this.myCartItems = data;

      this.mycartFinalPrice = 0;
      for(let x in this.myCartItems){
        this.mycartFinalPrice += this.myCartItems[x].cartPdtPrice;
      }

    }, (error:any)=>{
      console.log(error);

      if(error.status == 401){
        localStorage.clear();
        this.myRouter.navigateByUrl("/login");
      }

    });
  }

  updateCart(cartId: number, cartQty: number, pdtPrice: number){
    if(cartQty >0){
      this.pdtSer.updateMyCartItems(cartId, cartQty, pdtPrice).subscribe((data:string)=>{
        
        console.log(data);
        this.msg = data;

        var index = this.myCartItems.findIndex((obj)=>{
          return obj._id == cartId;
        });

        this.myCartItems[index].cartQty = cartQty;
        this.myCartItems[index].cartPdtPrice = cartQty*pdtPrice;

        this.mycartFinalPrice = 0;

        for(let x in this.myCartItems){
          this.mycartFinalPrice += this.myCartItems[x].cartPdtPrice;
        }

      }, (error:any)=>{
        console.log(error);

        if(error.status == 401){
          localStorage.clear();
          this.myRouter.navigateByUrl("/login");
        }

      });
    }
  }

  removeCart(cartId : number){
    this.pdtSer.removeMyCartItem(cartId).subscribe((data:string)=>{
      
      console.log(data);
      this.msg = data;

      this.myCartItems = this.myCartItems.filter((obj)=>{
        return obj._id != cartId;
      });

      this.pdtSer.updatecart.next();

      this.mycartFinalPrice = 0;

      for(let x in this.myCartItems){
        this.mycartFinalPrice += this.myCartItems[x].cartPdtPrice;
      }

    }, (error:any)=>{
      console.log(error);

      if(error.status == 401){
        localStorage.clear();
        this.myRouter.navigateByUrl("/login");
      }

    });
  }

}
