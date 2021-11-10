import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

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
    this.authService.getCurrentUser().subscribe((currentUser:any)=>{
      this.bio = currentUser.user.bio;
      this.imgLink = currentUser.user.image;
      this.name = currentUser.user.username;
      this.email = currentUser.user.email;
    })


  }
  updateUser(){
    let user = {
        "user": {
            "email": this.email,
            "bio": this.bio,
            "image": this.imgLink
        }
    }
    this.authService.updateUser(user).subscribe(
      (data:any)=>{
        console.log(data);
        this.route.navigate(['/']);

      },
      (err) =>{
        console.log(err);

      }
    )


  }
  logOut(){
    localStorage.removeItem("token");
    this.authService.setToken('');
    this.authService.settingStatus.emit(false);
    this.authService.loggedIn = false;
    this.route.navigate(['/']);
  }
}
