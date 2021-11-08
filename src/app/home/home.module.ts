import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent } from '../share/article/article.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ShareModule

  ],
  providers: [NgbNavConfig],
  bootstrap:[HomeComponent]
})
export class HomeModule { }
