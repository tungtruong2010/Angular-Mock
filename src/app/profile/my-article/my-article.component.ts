import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/service/article-services/article.service';
import { UserService } from 'src/app/service/user-services/user.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css']
})
export class MyArticleComponent implements OnInit {
  public listMyArticles:Array<any> = [];
  public articlesCount:number = 0;
  public limitNumber:number = 0;
  constructor(
    private route:ActivatedRoute,
    private articleService:ArticleService,
    private _router:Router,
    private toastr:ToastrService
  ) {
    this.limitNumber = this.articleService.limitNumber;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const userInfo = params.get('userName');
        this.articleService.userName = userInfo;
        this.articleService.getMyArticles(0).subscribe(
          res => {
            this.listMyArticles = res.articles;
            this.articlesCount = res.articlesCount;
          },
          err => {
            this.toastr.error('User is not exits !')
            this._router.navigateByUrl('')
          }
        )
      }
    )
  }

  public handleSelectPage(pageNumber:number):void {
    this.articleService.getMyArticles((pageNumber - 1) * this.articleService.limitNumber).subscribe(
      res => {
        this.listMyArticles = res.articles;
      }
    )
  }

}
