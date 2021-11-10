import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/implement-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(private route: Router, private authService: AuthService) {
    this.registerForm= new FormGroup({});
    this.registerForm.addControl('name', new FormControl(
      null,[Validators.required]
    ));
    this.registerForm.addControl('email', new FormControl(
      null,[Validators.required, Validators.email]
    ));
    this.registerForm.addControl('pass', new FormControl(
      null,[Validators.required]
    ));
  }

  ngOnInit(): void {
  }
  register(){
    let user =  {
        "user":{
          "username": (this.registerForm.value.name).toString(),
          "email": (this.registerForm.value.email).toString(),
          "password": (this.registerForm.value.pass).toString(),
        }
    }
    console.log(user);

    this.authService.register(user).subscribe(
      (data:any)=>{
        console.log(data.user);

        this.authService.logUserIn(data.user);
        this.route.navigate(['/']);
        this.authService.regisStatus.emit(data.user);
      },
      (err) =>{
        console.log('err');

        alert('tk mk sai')
      }
    )
  }
  routeToLogin(){
    this.route.navigate(['/login']);
  }
}
