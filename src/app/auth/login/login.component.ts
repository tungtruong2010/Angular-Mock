import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(private route: Router , private  authService: AuthService) {
    this.loginForm= new FormGroup({});
    this.loginForm.addControl('email', new FormControl(
      null,[Validators.required, Validators.pattern('^[a-z][a-z0-9_\.]{0,32}@gmail.com')]
    ));
    this.loginForm.addControl('pass', new FormControl(
      null,[Validators.required]
    ));
  }

  ngOnInit(): void {

  }
  login(){
    let user =  {
      "user":{
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.pass
      }
  }

  this.authService.login(user).subscribe(
    (data:any)=>{
      console.log(data);
      this.authService.logUserIn(data.user);
      this.route.navigate(['/home']);
    },
    (err) =>{
      console.log('err');

      alert('tk mk sai')
    }
  )

  }
  routeToRegister(){
    this.route.navigate(['/register']);
  }
}
