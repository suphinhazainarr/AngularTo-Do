import { Component } from '@angular/core';
import { TodoListComponent } from "../todo-list/todo-list.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TodoListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
