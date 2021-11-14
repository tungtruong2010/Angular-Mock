import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';


import { EditorArticleModule } from './editor-article/editor-article.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HomeModule } from './home/home.module';
import { ToEditGuard } from './guards/to-edit.guard';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { TagInputModule } from 'ngx-chips';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './share/footer/footer.component';
import { HeaderComponent } from './share/header/header.component';
import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    //Tan
    AuthModule,
    HomeModule,




    //Nam
    ShareModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut:1500,
        progressBar:true,
        progressAnimation:'increasing',
        preventDuplicates:true
      }
    ),





    //Tung
    EditorArticleModule,
    TagInputModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [
    ToEditGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    NgbModal,

  ],
  bootstrap: [AppComponent]


})
export class AppModule { }
