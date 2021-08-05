import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly appService: AppServiceService
  ) {}
  userNameError = '';
  successMessage: string = '';
  passwordError: string='';
  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    LastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd].{8,}'),
      ],
    ],
  });
  ngOnInit(): void {}
  checkUserName(): void {
    this.appService
      .checkUserName(this.signUpForm.controls.userName.value)
      .subscribe((isAvailable) => {
        if (!isAvailable) {
          this.userNameError = 'User name is not available.';
        } else {
          this.userNameError = '';
        }
      });
  }
  signUp(): void {
    if (this.signUpForm.valid) {
      this.successMessage = 'Sign up successfull...';
      this.signUpForm.reset();
    } else {
      this.successMessage = '';
    }
  }
  checkPassword(): void {
    if(this.signUpForm.controls.password.errors){
      this.passwordError="Invalid Password"
    }
    else{
      this.passwordError=""
    }
  }
}
