import {  Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/implement-services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggin:boolean = false;
  public src:string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  public account_name:any = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    let currentUserName = localStorage.getItem("currentUser");
    if(token!=null || currentUserName!=null){
      this.isLoggin = true;
      console.log(currentUserName);

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
      this.src = data.image;
    });
    this.authService.regisStatus.subscribe((data:any)=>{

      this.isLoggin = this.authService.isLoggedIn();
      this.account_name = data.username;
      this.src = data.image;
    });
  }
}
