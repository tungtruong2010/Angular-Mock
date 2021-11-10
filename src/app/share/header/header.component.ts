import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/implement-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggin:boolean = false;
  public src:string = 'https://picsum.photos/id/237/200/300';
  public account_name:string = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token!=null){
      this.isLoggin = true;
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
      console.log('init header regis');

      this.isLoggin = this.authService.isLoggedIn();
      this.account_name = data.username;
    });
  }

}
