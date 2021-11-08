import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from './share/share.module';
import { FormsModule } from '@angular/forms';

import { EditorArticleModule } from './editor-article/editor-article.module';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';



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









    //Nam
    ShareModule,
    HttpClientModule,







    //Tung
    EditorArticleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
