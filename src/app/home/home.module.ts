import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent } from '../share/article/article.component';
import { ShareModule } from '../share/share.module';
import { ListArticleComponent } from './list-article/list-article.component';
import { RouterModule, Routes } from '@angular/router';
import { ToEditGuard } from '../guards/to-edit.guard';


const routes:Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: 'yourfeed',
        canActivate: [ToEditGuard],
        component: ListArticleComponent,
      },
      {
        path: 'global',
        component: ListArticleComponent,
      },
      {
        path: ':tag',
        component: ListArticleComponent,
      }
    ]
  }

]
@NgModule({
  declarations: [
    HomeComponent,
    ListArticleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers: [NgbNavConfig],
  bootstrap:[HomeComponent]
})
export class HomeModule { }
