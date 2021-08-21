import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AddproductComponent } from './Products/addproduct/addproduct.component';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';
import { MycartComponent } from './Products/mycart/mycart.component';

const routes: Routes = [
                        {path : "", component : ListproductsComponent},
                        {path : "login", component : LoginComponent},
                        {path : "categories", redirectTo : "/", pathMatch : "full"},
                        {path : "categories/:catid", component : ListproductsComponent},
                        {path : "mycart", component : MycartComponent, canActivate : [AuthGuard]},
                        {path : "addproducts", component : AddproductComponent, canActivate : [AuthGuard]},
                        {path : "**", component : PagenotfoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
