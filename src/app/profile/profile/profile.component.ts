import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public isFollow?:boolean;

  constructor(
    private route:ActivatedRoute,
    private profileService:ProfileService,
    private _router:Router,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const userInfo = params.get('userName');
        this.profileService.getProfileUser(userInfo).subscribe(
          res => {
            this.userAccount = res;
          },
          err => {
            // this.toastr.error('User is not exits !')
            // this._router.navigateByUrl('')
          }
        )
      }
    )

    this.profileService.getCurrentUser().subscribe(
      res => {
        this.currentUserName = res?.user?.username;
      },
      err => {
        this._router.navigateByUrl('')
      }
    )
  }

  public handleToggleFollow():void {
    if(!this.isFollow){
      this.profileService.followUser(this.userAccount?.profile?.username).subscribe(
        res => {
          this.isFollow = res.profile.following;
          this.toastr.success('Follow user success !')
        },
        err => {
          this.toastr.error('Follow user fail !');
        }
      )
    }else {
      this.profileService.unFollowUser(this.userAccount?.profile?.username).subscribe(
        res => {
          this.isFollow = res.profile.following;
          this.toastr.success('Unfollow user success !')
        },
        err => {
          this.toastr.error('UnFollow user fail !')
        }
      )
    }
  }

}
