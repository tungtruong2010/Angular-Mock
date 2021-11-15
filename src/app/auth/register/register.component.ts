import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import { ToastService } from 'src/app/service/implement-services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public confirmPass = false;
  public showPass = true;
  public showCPass = true;
  public showSpinner = false;

  constructor(private route: Router,
    public toastService: ToastService,
    private authService: AuthService) {
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
    this.registerForm.addControl('cpass', new FormControl(
      null,[Validators.required]
    ));
  }

  ngOnInit(): void {
  }
  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(dangerTpl:any) {
  }
  toggleShowPass(){
    this.showPass = !this.showPass;
  }
  toggleShowCPass(){
    this.showCPass = !this.showCPass;
  }
  checkConfirmPass(){
    let password = this.registerForm.get('pass')?.value;
    let cPassword = this.registerForm.get('cpass')?.value;

    if(password != cPassword){

    }else{
      this.confirmPass = false;

    }

    if(cPassword.length < 0){
      this.confirmPass = true;
    }

  }

  register(dangerTpl:any){


    let password = this.registerForm.get('pass')?.value;
    let cPassword = this.registerForm.get('cpass')?.value;
    let name = this.registerForm.controls['name'];

    Object.keys( this.registerForm.controls).forEach((formCTName)=>{
      if(this.registerForm.get(formCTName)?.value== null){
        this.registerForm.get(formCTName)?.markAsDirty();
      }

    });
    if(password != cPassword){

      this.confirmPass = true;
    }else{
      this.confirmPass = false;

    }
    if(cPassword == null){
      this.confirmPass = false;
    }
    if(this.registerForm.valid&&this.confirmPass==false){
      let user =  {
        "user":{
          "username": (this.registerForm.value.name).toString(),
          "email": (this.registerForm.value.email).toString(),
          "password": (this.registerForm.value.pass).toString(),
        }
    }
    this.showSpinner = true;
    this.authService.register(user).subscribe(
      (data:any)=>{
        console.log(data.user);

        this.authService.logUserIn(data.user);
        this.route.navigate(['/']);
        this.authService.regisStatus.emit(data.user);
      },
      (err) =>{
        this.showSpinner = false;

        this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 8000 });

      }
    )
    }

  }
  routeToLogin(){
    this.route.navigate(['/login']);
  }
}
