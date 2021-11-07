import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Tan
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';






//Nam









//Tùng
import { ArticleComponent } from './editor-article/article/article.component';








const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'editor',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
