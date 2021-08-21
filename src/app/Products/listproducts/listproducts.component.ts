import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit {

  productsLists : any[] = [];
  isLoading = true;

  constructor(public pdtSer : ProductsService, public activeRoute : ActivatedRoute) { }

  ngOnInit(): void {

    console.log("List products instance created");

    this.activeRoute.params.subscribe((param : Params)=>{
      
      console.log(param);

      if(param.catid){

        this.isLoading = true;
        
        this.pdtSer.getProductsByCatwise(param.catid).subscribe((data:any[])=>{
      
          console.log(data);
          this.isLoading = false;

          this.productsLists = data;
    
        },(error:any)=>{
          
          console.log(error);
    
        }, ()=>{
          
          console.log("HTTP Call completed");
    
        });
      }
      else{
        this.pdtSer.getProductsList().subscribe((data:any[])=>{
      
          console.log(data);

          this.isLoading = false;

          this.productsLists = data;
    
        },(error:any)=>{
          
          console.log(error);
    
        }, ()=>{
          
          console.log("HTTP Call completed");
    
        });
      }

    });
    
  }
  addToCart(cartPdtId:number, cartPdtPrice:number){
   // this.pdtSer.updatecart.emit("event emitted");
   // this.pdtSer.updatecart.next("event emitted");
   console.log(cartPdtId, cartPdtPrice);
    this.pdtSer.addToMyCart(cartPdtId, cartPdtPrice).subscribe((data:string)=>{
      
      console.log(data);
      this.pdtSer.updatecart.next("event emitted");

    }, (error:any)=>{
      console.log(error);
    } );
  }

}