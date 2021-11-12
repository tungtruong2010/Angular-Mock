import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private route:ActivatedRoute,
    private profileService:ProfileService,
    private _router:Router,
    private toastr:ToastrService
  ) {
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
            this.toastr.error()
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
