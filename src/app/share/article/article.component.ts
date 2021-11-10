import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ProfileService } from 'src/app/service/profile-services/profile.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article?:Article ;
  public favoritesCount:number | any = 0;
  public statusLikeArticle:boolean = false;
  constructor(private _router:Router, private profileService:ProfileService) {
  }

  ngOnInit(): void {
    this.favoritesCount = this.article?.favoritesCount;
  }

  public showArticleDetail(slug:string):void {
    this._router.navigateByUrl(`article/${slug}`)
  }

  public toggleLikeArticle(like:number):void {
    // this.handleToggleLikeArticle.emit(like);
    if(!this.statusLikeArticle){
      // this.favoritesCount += 1;
      this.statusLikeArticle = true;
      this.profileService.likeArticle(this.article?.slug).subscribe(
        res => {
          // console.log("like article", res);
          this.favoritesCount = res?.article.favoritesCount
        }
      )
    } else {
      // this.favoritesCount -= 1;
      this.statusLikeArticle = false;
      this.profileService.unlikeArticle(this.article?.slug).subscribe(
        res => {
          // console.log("unlike article", res);
          this.favoritesCount = res?.article.favoritesCount
        }
      )
    }


  }

}
