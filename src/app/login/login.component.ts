import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { RegistrationService } from '../registration.service';
import { PriorityTasksPopupComponent } from "../priority-tasks-popup/priority-tasks-popup.component";
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RegistrationComponent, PriorityTasksPopupComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  userName!: string;
  password!:string;
  showPopup = false;
  priorityTasks: any[] = [];


  constructor(private router: Router , private loginService: RegistrationService ,private taskService: TodoService){

  }

  authenticateUser(){
    this.loginService.authenticate(this.userName ,this.password).subscribe(result =>{
      if(result.length){
        alert("login successfull !");
        // this.router.navigate(['/app']);

        this.fetchPriorityTasks();
        this.showPopup = true;

      }
    })
  }

  gotoRegisterPage(){
    this.router.navigate(['/register']);
  }

  closePopup() {
    this.showPopup =false;
    this.router.navigate(['/app']);
  }

  fetchPriorityTasks(){
    this.taskService.getPriorityTasks().subscribe(tasks => {
      console.log("the task is", tasks);
      this.priorityTasks = tasks
    })
  }
}
