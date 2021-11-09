import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Article } from 'src/app/model/Article';
import { ProfileService } from 'src/app/service/profile-services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userAccount:any;
  public currentUserName:string = ''
  public isFollow:boolean = false;

  constructor(private route:ActivatedRoute, private profileService:ProfileService, private _router:Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const userInfo = params.get('userName');
        this.profileService.getProfileUser(userInfo).subscribe(
          profile => {
            this.userAccount = profile;
            this.isFollow = profile.following;
          },
          err => {
            this._router.navigateByUrl('')
          }
        )

      }
    )

    this.profileService.getCurrentUser().subscribe(
      res => {
        this.currentUserName = res?.user?.username;
      },
      err => {
        console.log(err);
        this._router.navigateByUrl('')
      }
    )



  }

  public handleToggleFollow():void {
    if(!this.isFollow){
      this.isFollow = !this.isFollow;
      this.profileService.followUser(this.userAccount?.profile?.username).subscribe(
        m => console.log("follow user", m)
      )
    }else {
      this.isFollow = !this.isFollow;
      this.profileService.unFollowUser(this.userAccount?.profile?.username).subscribe(
        m => console.log("unfollow user", m)
      )
    }
  }

}
