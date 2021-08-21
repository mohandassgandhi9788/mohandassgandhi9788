import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // updatecart = new EventEmitter();
   updatecart = new Subject();
 // updatecart = new BehaviorSubject("initial Value");

  constructor(public http: HttpClient) { }

  getCategories() {
    return this.http.get<any[]>("http://localhost:3000/categories");
  }

  getProductsList() {
    return this.http.get<any[]>("http://localhost:3000/listproducts");
  }

  getProductsByCatwise(catid : string){
    return this.http.get<any[]>("http://localhost:3000/getpdtcatwise/"+catid);
  }

  getMyCartCartItems() {
    return this.http.get<any[]>("http://localhost:3000/mycart"/*, {
      headers : new HttpHeaders({
        'myauthtoken' : "dfghfdkjghfg"
      })
    }*/);
  }

  addProducts(data: any) {
    return this.http.post<string>("http://localhost:3000/addproducts", data);
  }

  addToMyCart(cartPdtId:number, cartPdtPrice:number){
    return this.http.post<string>("http://localhost:3000/addtocart", {cartPdtId:cartPdtId, cartPdtPrice:cartPdtPrice});
  }

  getMyCartCount(){
    return this.http.get<number>("http://localhost:3000/cartcount");
  }

  updateMyCartItems(cartId: number, cartQty: number, pdtPrice: number){
    return this.http.put<string>("http://localhost:3000/updatecart", {cartId:cartId, cartQty:cartQty, pdtPrice:pdtPrice})
  }

  removeMyCartItem(cartId : number){
    return this.http.delete<string>("http://localhost:3000/removecart/"+cartId);
  }

  

}
