import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/service/profile-services/profile.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css']
})
export class MyArticleComponent implements OnInit {
  public listMyArticles:Array<any> = [];
  constructor(private route:ActivatedRoute, private profileService:ProfileService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const userInfo = params.get('userName');
        console.log(userInfo)
        this.profileService.getMyArticles(userInfo).subscribe(
          res => {
            console.log(userInfo)
            this.listMyArticles = res.articles;
            console.log(res)
          },
          err => console.log(err)
        )
      }
    )
  }

}
