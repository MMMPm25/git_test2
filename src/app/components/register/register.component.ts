import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterPostData } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    RouterLink,
    NgStyle],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private registerService = inject(AuthService);

  private router = inject(Router);
  registerForm = new FormGroup({
    fullname:new FormControl('',[Validators.required]),
    email:new FormControl('',[
      Validators.required,
      Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
    ]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
  },{
    validators:passwordMismatchValidator
  });
  onRegister(){
    //console.log(this.registerForm.value)
    const postData = {...this.registerForm.value};
    delete postData.confirmPassword;
    this.registerService.registerUser(postData as RegisterPostData).subscribe({
      next:(response) =>{
        //console.log(response);
        alert("Success");
        this.router.navigate(['login']);
        console.log(response);
      },
      error:(err)=>{
        console.log(err);
        alert("Failed");
      },
    });
  }

  get fullname(){
    return this.registerForm.controls['fullname'];
  }
  get email(){
    return this.registerForm.controls['email'];
  }
  get password(){
    return this.registerForm.controls['password'];
  }
  get confirmPassword(){
    return this.registerForm.controls['confirmPassword'];
  }
}
