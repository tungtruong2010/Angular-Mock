import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ProfileService } from 'src/app/service/profile-services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userAccount:any;
  public isFollow:boolean = false;
  public article?:Article;
  constructor(private route:ActivatedRoute, private profileService:ProfileService) {
    this.article = {
      "slug": "how-to-train-your-dragon",
      "title": "How to train your dragon",
      "description": "Ever wonder how?",
      "body": "It takes a Jacobian",
      "tagList": ["dragons", "training"],
      "createdAt": "2016-02-18T03:22:56.637Z",
      "updatedAt": "2016-02-18T03:48:35.824Z",
      "favorited": false,
      "favoritesCount": 0,
      "author": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
        "following": false
        }
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let userInfo = params['userName'];
      this.profileService.getProfileUser(userInfo).subscribe(
        res => this.userAccount = res,
        err => console.log(err)
      )

    })
  }

  public handleToggleFollow():void {
    this.isFollow = !this.isFollow;
  }

}
