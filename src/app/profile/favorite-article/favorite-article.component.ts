import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/service/profile-services/profile.service';

@Component({
  selector: 'app-favorite-article',
  templateUrl: './favorite-article.component.html',
  styleUrls: ['./favorite-article.component.css']
})
export class FavoriteArticleComponent implements OnInit {
  public listFavoritedArticles:Array<any> = [];
  public limitNumber:number = 5;
  public articlesCount:number = 0;
  constructor(private route:ActivatedRoute, private profileService:ProfileService) {
  }

  ngOnInit(): void {
    this.route?.parent?.params.subscribe(
      params => {
        const userInfo = params.userName;
        this.profileService.userName = userInfo;
        this.profileService.getFavoritedArticles(0, this.limitNumber).subscribe(
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
    this.profileService.getFavoritedArticles((pageNumber - 1) * this.limitNumber, this.limitNumber).subscribe(
      res => {
        this.listFavoritedArticles = res.articles;
      }
    )
  }

}
