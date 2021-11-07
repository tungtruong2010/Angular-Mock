import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyArticleComponent } from './my-article/my-article.component';
import { FavoriteArticleComponent } from './favorite-article/favorite-article.component';
import { ShareModule } from '../share/share.module';

const routes:Routes = [
  {
    path:'',
    component:ProfileComponent,
    children: [
      {
        path:'',
        component:MyArticleComponent
      },
      {
        path:'favorites',
        component: FavoriteArticleComponent
      }
    ]
  },

]
@NgModule({
  declarations: [
    ProfileComponent,
    MyArticleComponent,
    FavoriteArticleComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ShareModule,
    CommonModule
  ]
})
export class ProfileModule { }
