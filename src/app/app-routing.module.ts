import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Tan
import { LoginComponent } from './auth/login/login.component';








//Nam
import { ProfileModule } from './profile/profile.module';








//Tùng
import { ArticleComponent } from './editor-article/article/article.component';








const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'editor',
    component: ArticleComponent
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
