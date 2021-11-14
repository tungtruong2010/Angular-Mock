import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/model/Article';
import { ArticleService } from 'src/app/service/article-services/article.service';
import { AuthService } from 'src/app/service/implement-services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article?:Article ;
  public favoritesCount:number | any = 0;
  public statusLikeArticle:boolean = false;
  public statusFavorited?:boolean;
  constructor(
    private _router:Router,
    private articleService:ArticleService,
    private authService:AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.favoritesCount = this.article?.favoritesCount;
    this.statusFavorited = this.article?.favorited;
  }

  public showArticleDetail(slug:string):void {
    this._router.navigateByUrl(`editor/${slug}`)
  }

  public toggleLikeArticle(like:number):void {
    if(!this.authService.loggedIn) {
      this.toastr.error('You must login first !')
      setTimeout(() => {
        this._router.navigateByUrl('/login')
      },1800)
      return;
    }

    if(!this.statusLikeArticle){
      // this.favoritesCount += 1;
      this.statusLikeArticle = true;
      this.articleService.likeArticle(this.article?.slug).subscribe(
        res => {
          // console.log("like article", res);
          this.statusFavorited = true;
          this.favoritesCount = res?.article.favoritesCount
        },
        err => {
          this.toastr.error('Like article fail!')
        }
      )
    } else {
      // this.favoritesCount -= 1;
      this.statusLikeArticle = false;
      this.articleService.unlikeArticle(this.article?.slug).subscribe(
        res => {
          // console.log("unlike article", res);
          this.statusFavorited = false;
          this.favoritesCount = res?.article.favoritesCount
        },
        err => {
          this.toastr.error('Unlike article fail !')
        }
      )
    }
  }

  public showProfileAuthor(author:string | any):void {
    this._router.navigateByUrl(`profile/${author}`)
  }

}
