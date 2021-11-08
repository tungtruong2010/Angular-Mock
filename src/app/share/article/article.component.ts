import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article?:Article ;
  @Output() handleToggleLikeArticle = new EventEmitter<number>()
  constructor(private _router:Router) {
  }

  ngOnInit(): void {
  }

  public showArticleDetail(slug:string):void {
    this._router.navigateByUrl(`editor/${slug}`)
  }

  public toggleLikeArticle(like:number):void {
    this.handleToggleLikeArticle.emit(like)
  }

}
