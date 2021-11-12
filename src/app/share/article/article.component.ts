import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/model/Article';
import { AuthService } from 'src/app/service/implement-services/auth.service';
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
  constructor(
    private _router:Router,
    private profileService:ProfileService,
    private authService:AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.favoritesCount = this.article?.favoritesCount;
  }

  public showArticleDetail(slug:string):void {
    if(this.authService.loggedIn){
      this._router.navigateByUrl(`editor/${slug}`)
    }
    else {
      this.toastr.error('You must login first !')
      setTimeout(() => {
        this._router.navigateByUrl('/login')
      },1800)
    }
  }

  public toggleLikeArticle(like:number):void {
    if(!this.statusLikeArticle){
      // this.favoritesCount += 1;
      this.statusLikeArticle = true;
      this.profileService.likeArticle(this.article?.slug).subscribe(
        res => {
          // console.log("like article", res);
          this.favoritesCount = res?.article.favoritesCount
        },
        err => {
          this.toastr.error('You must login first !')
          setTimeout(() => {
            this._router.navigateByUrl('/login')
          },1800)
        }
      )
    } else {
      // this.favoritesCount -= 1;
      this.statusLikeArticle = false;
      this.profileService.unlikeArticle(this.article?.slug).subscribe(
        res => {
          // console.log("unlike article", res);
          this.favoritesCount = res?.article.favoritesCount
        },
        err => {
          this.toastr.error('You must login first !')
          setTimeout(() => {
            this._router.navigateByUrl('/login')
          },1800)
        }
      )
    }
  }

  public showProfileAuthor(author:string | any):void {
    if(this.authService.loggedIn){
      this._router.navigateByUrl(`profile/${author}`)
    }
    else {
      this.toastr.error('You must login first !')
      setTimeout(() => {
        this._router.navigateByUrl('/login')
      },1800)
    }
  }

}
