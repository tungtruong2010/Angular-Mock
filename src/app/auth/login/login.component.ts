import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import { EditorArticleService } from 'src/app/service/implement-services/editor-article.service';
import { ToastService } from 'src/app/service/implement-services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showSpinner = false;
  public showPass = true;
  public loginForm: FormGroup;
  constructor(private route: Router ,
    public toastService: ToastService, private  authService: AuthService) {
    this.loginForm= new FormGroup({});
    this.loginForm.addControl('email', new FormControl(
      null,[Validators.required, Validators.email]
    ));
    this.loginForm.addControl('pass', new FormControl(
      null,[Validators.required]
    ));
  }

  ngOnInit(): void {

  }
  toggleShowPass(){
    this.showPass = !this.showPass;
  }
  login(dangerTpl2:any){

    Object.keys(this.loginForm.controls).forEach((formCTName)=>{
      console.log(this.loginForm.get(formCTName));

      if(this.loginForm.get(formCTName)?.value == null){

        this.loginForm.get(formCTName)?.markAsDirty();
      }

    });

    if(this.loginForm.valid){
      let user =  {
        "user":{
          "email": this.loginForm.value.email,
          "password": this.loginForm.value.pass
        }
      }
      this.showSpinner = true;

    this.authService.login(user).subscribe(

      (data:any)=>{
        console.log(data);
        this.authService.logUserIn(data.user);
        this.route.navigate(['/']);
        this.authService.loginStatus.emit(data.user);
      },
      (err) =>{
        this.showSpinner = false;
        alert('Email or password incorrect');


      }
    )
    }

  }
  routeToRegister(){
    this.route.navigate(['register']);
  }
}
