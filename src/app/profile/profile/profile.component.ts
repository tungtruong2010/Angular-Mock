import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public src:string = 'https://picsum.photos/id/237/200/300';
  public userAccount:string = 'userAccount';
  public isFollow:boolean = false;
  public article?:Article;
  constructor() {
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
  }

  public handleToggleFollow():void {
    this.isFollow = !this.isFollow;
  }

}
