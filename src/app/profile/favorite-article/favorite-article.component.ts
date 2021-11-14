import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/article-services/article.service';

@Component({
  selector: 'app-favorite-article',
  templateUrl: './favorite-article.component.html',
  styleUrls: ['./favorite-article.component.css']
})
export class FavoriteArticleComponent implements OnInit {
  public listFavoritedArticles:Array<any> = [];
  public articlesCount:number = 0;
  public limitNumber:number = 0;
  constructor(
    private route:ActivatedRoute,
    private articleService:ArticleService
  ) {
    this.limitNumber = this.articleService.limitNumber;
  }

  ngOnInit(): void {
    this.route?.parent?.params.subscribe(
      params => {
        const userInfo = params.userName;
        this.articleService.userName = userInfo;
        this.articleService.getFavoritedArticles(0).subscribe(
          res => {
            this.listFavoritedArticles = res.articles;

            this.articlesCount = res.articlesCount;
          },
          err => console.log(err)
        )
      }
    )

  }

  public handleSelectPage(pageNumber:number):void {
    this.articleService.getFavoritedArticles((pageNumber - 1) * this.articleService.limitNumber).subscribe(
      res => {
        this.listFavoritedArticles = res.articles;
      }
    )
  }

}
