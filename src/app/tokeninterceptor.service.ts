import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userDetails } from './users.service';

@Injectable()

export class TokeninterceptorService implements HttpInterceptor {

  constructor(public ud : userDetails) { }

  intercept(req : HttpRequest<any>, next : HttpHandler){
    // console.log(req);
    console.log("Your Req On it's way");

    var tokenizedReq = req.clone({
      setHeaders : {
        myauthtoken : (this.ud.getMyToken())?this.ud.getMyToken() : ''
      }
    });

    return next.handle(tokenizedReq);
  }

}
