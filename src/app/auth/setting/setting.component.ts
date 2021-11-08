import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/implement-services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  public imgLink!:string;
  public name!:string;
  public bio!:string;
  public email!:string;
  public newPass!:string;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    let currentUser = this.authService.user;
    this.name = currentUser.username;
    this.email = currentUser.email;

  }
  updateUser(){

  }
  logOut(){
    localStorage.removeItem("token");
    this.authService.setToken('');
    this.authService.settingStatus.emit(false);
    this.authService.loggedIn = false;
    this.route.navigate(['/']);
  }
}
