import { Component, OnInit } from '@angular/core';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public tag!: string;
  public title!:string;
  public maincontent!:string;
  public markdown!:string;

  public tagList:any=[];

  constructor(public service: EditorArticleService) { }

  ngOnInit(): void {
    console.log(this.service.an);
  }
  getTag(tagValue:string){
    this.tagList.push(tagValue);
  }
  publishArticle(title:string,maincontent:string,markdown:string){

  }
}
