import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn : 'root'
})

export class userDetails{
    users : object[];

    constructor(public http: HttpClient){}

   /* userLogin(loginFormVal: FormGroup){
        console.log(loginFormVal);
    }
    userReg(regFormVal: FormGroup){
        console.log(regFormVal);
    } */

    userRegistration(data : any){
        return this.http.post<string>("http://localhost:3000/register", data);
    }

    userLogin(loginFormVal: FormGroup){
        return this.http.post<string>("http://localhost:3000/login", loginFormVal);
    }

    isLoggedIn(){
        return !!localStorage.getItem("token");
    }

    getMyToken(){
        return localStorage.getItem("token");
    }



}