import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Tan
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { SettingComponent } from './auth/setting/setting.component';
import { ToEditGuard } from './guards/to-edit.guard';


//Nam
import { ProfileModule } from './profile/profile.module';








//Tùng
import { ManageArticleComponent } from './editor-article/manage-article/manage-article.component';
import { CreateArticleComponent } from './editor-article/create-article/create-article.component';








const routes: Routes = [
  {path: '', redirectTo: 'global', pathMatch: 'full'},

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile/setting',
    canActivate: [ToEditGuard],
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
    canActivate: [ToEditGuard],
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
    path: 'profile/:userName',
    loadChildren: () => import('./profile/profile.module').then(
      m => m.ProfileModule
    ),

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
