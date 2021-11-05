import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { FormsModule } from '@angular/forms';
import { EditorArticleService } from '../service/implement-services/editor-article.service';



@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[
    EditorArticleService
  ]
})
export class EditorArticleModule { }
