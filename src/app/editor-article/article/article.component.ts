import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }
  getTag(tagValue:string){
    this.tagList.push(tagValue);
  }
  publishArticle(title:string,maincontent:string,markdown:string){
    
  }
}
