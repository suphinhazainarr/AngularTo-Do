import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { RegistrationComponent } from "./registration/registration.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, TodoListComponent, RegistrationComponent]
})
export class AppComponent {
  title = 'ToDo-app';
}
