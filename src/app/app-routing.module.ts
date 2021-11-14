import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Tan
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { SettingComponent } from './auth/setting/setting.component';




//Nam
import { ProfileModule } from './profile/profile.module';








//Tùng
import { ManageArticleComponent } from './editor-article/manage-article/manage-article.component';
import { CreateArticleComponent } from './editor-article/create-article/create-article.component';








const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent,
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
