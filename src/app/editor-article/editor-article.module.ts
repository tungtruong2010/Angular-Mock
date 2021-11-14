import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorArticleService } from '../service/implement-services/editor-article.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '../auth.interceptor';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { LMarkdownEditorModule, MarkdownEditorComponent } from 'ngx-markdown-editor';
import { NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    CreateArticleComponent,
    ManageArticleComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LMarkdownEditorModule,
    NgbModule,
    BrowserAnimationsModule,
    TagInputModule,
    NgxSpinnerModule,
    
  ],
  providers:[
    EditorArticleService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditorArticleModule { }
