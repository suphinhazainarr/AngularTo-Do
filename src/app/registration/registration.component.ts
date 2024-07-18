import { Component } from '@angular/core';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
    username: '',
    password: ''
  };

  constructor(private userService: RegistrationService, private router: Router) {}

  register() {


    this.userService.authenticate(this.user.username ,this.user.password).subscribe(result =>{
      if(result.length){
     alert("user already exist!");
      }else{
        this.userService.register(this.user).subscribe(() => {
          alert('Registration Successful');
          this.router.navigate(['/login']);
        });
      }
    })


   
  }



  authenticateUser(){
    
  }




  gotoLoginPage(){
    this.router.navigate(['/login']);
  }
}
