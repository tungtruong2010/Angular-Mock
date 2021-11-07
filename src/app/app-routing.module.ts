import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Tan
import { LoginComponent } from './auth/login/login.component';








//Nam
import { ProfileModule } from './profile/profile.module';








//Tùng
import { CreateArticleComponent } from './editor-article/create-article/create-article.component';
import { ManageArticleComponent } from './editor-article/manage-article/manage-article.component';







const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'editor',
    component: CreateArticleComponent
  },
  {
    path: 'editor',
    children:[
      {
        path:':slug',
        component: ManageArticleComponent
      }
    ]
  },
  {
    path: 'api/profile/:userName',
    loadChildren: () => import('./profile/profile.module').then(
      m => m.ProfileModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
