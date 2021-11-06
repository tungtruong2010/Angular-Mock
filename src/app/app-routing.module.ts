import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Tan
import { LoginComponent } from './auth/login/login.component';








//Nam









//Tùng









const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
