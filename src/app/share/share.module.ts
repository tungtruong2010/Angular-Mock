import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    PaginationComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    ArticleComponent
  ]
})
export class ShareModule { }
