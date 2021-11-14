import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/model/Article';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import { UserService } from 'src/app/service/user-services/user.service';

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
    private userService:UserService,
    private _router:Router,
    private authService:AuthService,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    //get profile accunt by url params
    this.route.paramMap.subscribe(
      params => {
        const userInfo = params.get('userName');
        this.userService.getProfileUser(userInfo).subscribe(
          res => {
            this.userAccount = res;
          },
          err => {
            this.toastr.error('User is not exits !')
            this._router.navigateByUrl('')
          }
        )
      }
    )

    // get current user
    if(!this.authService.loggedIn){
      return;
    }else {
      this.userService.getCurrentUser().subscribe(
        res => {
          this.currentUserName = res?.user?.username;
        },
        err => {
          // this._router.navigateByUrl('')
        }
      )
    }
  }

  public handleToggleFollow():void {
    // chưa loggin
    if(!this.authService.loggedIn){
      this.toastr.error('You must login first !')
      setTimeout(() => {
        this._router.navigateByUrl('/login')
      },1800);
      return;
    }
    // loggined => toggle follow button
    if(!this.isFollow){
      this.userService.followUser(this.userAccount?.profile?.username).subscribe(
        res => {
          this.isFollow = res.profile.following;
          this.toastr.success('Follow user success !')
        },
        err => {
          this.toastr.error('Follow user fail !');
        }
      )
    }else {
      this.userService.unFollowUser(this.userAccount?.profile?.username).subscribe(
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
