import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
      RouterOutlet,
      HeaderComponent,
      TodoListComponent,
      RegistrationComponent,
      LoginComponent,
      CommonModule,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class AppComponent {
  title = 'ToDo-app';
}
