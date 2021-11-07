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
      null,[Validators.required, Validators.pattern('^[a-z][a-z0-9_\.]{0,32}@gmail.com')]
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
          "username": this.registerForm.value.name,
          "email": this.registerForm.value.email,
          "password": this.registerForm.value.pass
        }
    }
    console.log(user);

    this.authService.register(user).subscribe(
      (data:any)=>{
        console.log(1);
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
  routeToLogin(){
    this.route.navigate(['/login']);
  }
}
