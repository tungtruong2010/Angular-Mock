import {  Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import { UserService } from 'src/app/service/user-services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggin:boolean = false;
  public src:any = '';
  public account_name:any = '';
  constructor(private authService: AuthService, private userService:UserService) {
    this.src = localStorage.getItem('avatarImg')
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    let currentUserName = localStorage.getItem("currentUser");
    if(token!=null || currentUserName!=null){
      this.isLoggin = true;
      this.account_name = currentUserName;
    }
    this.authService.settingStatus.subscribe((status:any)=>{
      this.isLoggin = status;
      this.account_name = '';

    })
    this.authService.loginStatus.subscribe((data:any)=>{
      console.log('init header login');

      this.isLoggin = this.authService.isLoggedIn();
      this.account_name = data.username;
    });
    this.authService.regisStatus.subscribe((data:any)=>{

      this.isLoggin = this.authService.isLoggedIn();
      this.account_name = data.username;
      this.src = data.image;
    });

    this.authService.updateAvatarAdmin.subscribe(
      avatarImg => {
        this.src = avatarImg;
        localStorage.setItem('avatarImg', avatarImg);
      }
    )
  }
}
