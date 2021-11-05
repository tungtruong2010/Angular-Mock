import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EditorArticleModule { }
