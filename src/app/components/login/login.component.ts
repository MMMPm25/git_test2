import { Component, inject } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    RouterLink,
    NgStyle,
    FormsModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = {
    email:'',
    password:'',
  };
  private router = inject(Router);
  private authService = inject(AuthService);

  onLogin(){
    //console.log(this.login);
    const {email,password}=this.login;
    this.authService.getUserDetails(email,password).subscribe({
      next: (response) =>{
        if(response.length>=1){
          alert("Login Success.");
          sessionStorage.setItem('email',email);

          this.router.navigate(['crud']);
        }else{
          alert("Something went wrong.");
        }
      },
      error:()=>{
        alert("Something went wrong.");
      }
    })
  }
}
