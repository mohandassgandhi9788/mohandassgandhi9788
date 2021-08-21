import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../Products/products.service';
import { userDetails } from '../users.service';


declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 /* providers: [
    userDetails
  ] */
})
export class LoginComponent implements OnInit {

  msg : string;
  loginForm : FormGroup;
  regForm : FormGroup;

  constructor(public ud : userDetails, public myRouter : Router, public pdtSer: ProductsService) { }

  ngOnInit(): void {
    $('.toggle').click(() => {
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
      }, "slow");
    });

    this.loginForm = new FormGroup({
      'Username' : new FormControl(null, Validators.required),
      'Password' : new FormControl(null, Validators.required)
    })
  /*  this.regForm = new FormGroup({
      'nuname': new FormControl(null, Validators.required),
      'npword' : new FormControl(null, Validators.required),
      'nemail' : new FormControl(null, Validators.required),
      'npnum' : new FormControl(null, Validators.required)
    }) */

  }

  doLogin(){
    
    this.ud.userLogin(this.loginForm.value).subscribe((data:string)=>{

      console.log(data);

      if(data.length == 0){
        this.msg = "Invalid Login";
      }
      else{
        localStorage.setItem("token", data);
        this.myRouter.navigateByUrl("/");
        this.pdtSer.updatecart.next();
       // this.pdtSer.updatecart.subscribe((data: any)=>{
       //  this.pdtSer.getMyCartCount();
       // })
      }

        //  this.msg = data;

    }, (error: any) => {

      console.log(error);

      this.msg = "Something went wrong!!";

    });
      
  }

 /* doRegister(regFVal : NgForm){
    this.ud.userReg(regFVal.value);
  } */
  
  doRegister(form : NgForm){

    this.ud.userRegistration(form.value).subscribe((data:string)=>{

      console.log(data);
      this.msg = data;

      form.reset();

    }, (error:any)=>{
      
      console.log(error);
      this.msg = "something went wrong";

    } );

  }

}
