import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShareModule } from './share/share.module';
import { FormsModule } from '@angular/forms';


import { EditorArticleModule } from './editor-article/editor-article.module';




import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HomeModule } from './home/home.module';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { ToEditGuard } from './guards/to-edit.guard';

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








    //Tung
    EditorArticleModule
  ],
  providers: [
    ToEditGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]


})
export class AppModule { }
