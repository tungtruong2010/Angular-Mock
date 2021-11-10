import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile-services/profile.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css']
})
export class MyArticleComponent implements OnInit {
  public listMyArticles:Array<any> = [];
  public limitNumber:number = 5;
  public articlesCount:number = 0;
  constructor(private route:ActivatedRoute, private profileService:ProfileService, private _router:Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const userInfo = params.get('userName');
        this.profileService.userName = userInfo;
        this.profileService.getMyArticles(0, this.limitNumber).subscribe(
          res => {
            this.listMyArticles = res.articles;
            this.articlesCount = res.articlesCount;
          },
          err => {
            console.log(err)
            this._router.navigateByUrl('')
          }
        )
      }
    )
  }

  public handleSelectPage(pageNumber:number):void {
    this.profileService.getMyArticles((pageNumber - 1) * this.limitNumber, this.limitNumber).subscribe(
      res => {
        this.listMyArticles = res.articles;
      }
    )
  }

}
