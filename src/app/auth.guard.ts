import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userDetails } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public ud : userDetails, public myRouter : Router){}
  
  canActivate() : boolean {

    if(!this.ud.isLoggedIn()){
      this.myRouter.navigateByUrl("/login");
    }

    return this.ud.isLoggedIn();

  }
  
}
