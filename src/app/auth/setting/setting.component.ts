import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/implement-services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  public changePass = true;
  public showSpinner = false;
  public confirmPass = false;
  public showPass = true;
  public showCPass = true;
  public settingForm: FormGroup;
  public inputValue!: string;
  public closeResult = 'https://i.stack.imgur.com/xHWG8.jpg';

  constructor(private authService: AuthService,
    private modalService: NgbModal,
    private route: Router) {
    this.settingForm= new FormGroup({});
    this.settingForm.addControl('imgLink', new FormControl(
      null
    ));
    this.settingForm.addControl('name', new FormControl(
      null,[Validators.required]
    ));
    this.settingForm.addControl('bio', new FormControl(
      null,[Validators.required]
    ));
    this.settingForm.addControl('email', new FormControl(
      null,[Validators.required, Validators.email]
    ));
    this.settingForm.addControl('pass', new FormControl(
      null,[Validators.required]
    ));
    this.settingForm.addControl('cpass', new FormControl(
      null,[Validators.required]
    ));
  }

  ngOnInit(): void {
    this.settingForm.get('pass')?.disable();
    this.settingForm.get('cpass')?.disable();

    this.authService.getCurrentUser().subscribe((data:any)=>{
      console.log(data.user);
      this.closeResult = data.user?.image;
      this.settingForm.get('name')?.patchValue(data.user.username);
      this.settingForm.get('email')?.patchValue(data.user.email);
      this.settingForm.get('bio')?.patchValue(data.user.bio);

    })


  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = result;
      this.settingForm.get('imgLink')?.patchValue(result);
    }, (reason) => {
    });
  }

  toggleShowPass(){
    this.showPass = !this.showPass;
  }
  toggleShowCPass(){
    this.showCPass = !this.showCPass;
  }
  checkConfirmPass(){
    let password = this.settingForm.get('pass')?.value;
    let cPassword = this.settingForm.get('cpass')?.value;

    if(password != cPassword){

    }else{
      this.confirmPass = false;

    }
  }
  wantChangePass(){
    this.changePass = !this.changePass;
    if(this.changePass){
      this.settingForm.get('pass')?.patchValue('');
      this.settingForm.get('cpass')?.patchValue('');
      this.settingForm.get('pass')?.disable();
      this.settingForm.get('cpass')?.disable();

    }else{
      this.settingForm.get('pass')?.enable();
      this.settingForm.get('cpass')?.enable();
    }

  }
  updateUser(){
    console.log(this.settingForm.value);

    let user = {
        "user": {
            "email": this.settingForm.get('email')?.value,
            "bio": this.settingForm.get('bio')?.value,
            "image": this.settingForm.get('imgLink')?.value
        }
    }
    console.log(user);
    this.authService.updateAvatarAdmin.emit(user?.user.image)
    this.showSpinner = true;
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
    this.showSpinner = true;
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.authService.setToken('');
    this.authService.settingStatus.emit(false);
    this.authService.loggedIn = false;
    this.route.navigate(['/']);
  }
}
