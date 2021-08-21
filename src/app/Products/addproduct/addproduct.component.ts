import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  categories : any[] = [];
  msg : string = '';

  selectedImg : any;

  constructor(public pdtSer:ProductsService) { }

  ngOnInit(): void {

    this.pdtSer.getCategories().subscribe((data:any[])=>{

      this.categories = data;
      
    }, (error:any)=>{
      console.log(error);
    });

  }

  selectImg(event : any){
    // console.log(event);
    this.selectedImg = event.target.files[0];
  }

  createProducts(form : NgForm){
    
    var fd = new FormData();

    console.log(form.value);

    fd.append("pdtCatId", form.value.catId);
    fd.append("pdtName", form.value.pdtName);
    fd.append("pdtPrice", form.value.pdtPrice);
    fd.append("pdtDesc", form.value.pdtDesc);

    fd.append("pdtImg", this.selectedImg, "productImage");

    this.pdtSer.addProducts(fd).subscribe((data : string)=>{
      console.log(data);
      this.msg = data;

    }, (error : any)=>{
      this.msg = "Something went wrong"
    });

  }
}
