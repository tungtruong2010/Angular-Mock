import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article/create-article.component';
import { FormsModule } from '@angular/forms';
import { EditorArticleService } from '../service/implement-services/editor-article.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { AuthInterceptor } from '../auth.interceptor';



@NgModule({
  declarations: [
    CreateArticleComponent,
    ManageArticleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
    EditorArticleService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ]
})
export class EditorArticleModule { }
