import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userName!: string;
  password!:string;
  constructor(private router: Router ){

  }

  authenticateUser(){
    if(this.userName=="rahul" && this.password=="123"){
      // this.router.navigate(['/home'] , {queryParams:{name: this.userName} });
      this.router.navigate(['/home' ,this.userName])
    }else{
      alert("Wrong Details");
      this.userName="";
      this.password="";
    }
  }
}
