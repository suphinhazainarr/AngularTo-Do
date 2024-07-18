import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../todo-item';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../todo.service';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
    imports: [CommonModule, FormsModule]
})
export class TodoListComponent implements OnInit {
    todoItems: TodoItem[] = [];
    newItem: string = '';
    newDueDate: string = '';
  
    constructor(private todoService: TodoService) {}
  
    ngOnInit(): void {
      
      this.loadTodoItems();
    }
  
    loadTodoItems(): void {
      this.todoService.getTodoItems().subscribe(items => {
          this.todoItems = items.map(item => ({
              ...item,
              id: item.id.toString()
          }));
      });
    }
  
    addTodoItem(): void {
      if (this.newItem.trim().length === 0) return;
  
      const newItem: TodoItem = {
          id: new Date().toString(),
          title: this.newItem,
          completed: false,
          creationDate: new Date(),
          dueDate: new Date(this.newDueDate || Date.now()),
          lastUpdatedDate: new Date(),
          editing: true

      };
  
      this.todoService.addTodoItem(newItem).subscribe(item => {
          item.id = item.id.toString();
          this.todoItems.push(item);
          this.newItem = '';
          this.newDueDate = '';
      });
    }
  
    deleteTodoItem(id: string): void {
      this.todoService.deleteTodoItem(id).subscribe(() => {
          this.todoItems = this.todoItems.filter(item => item.id !== id);
      });
    }
  
    toggleTodoItemCompletion(item: TodoItem): void {
      item.completed = !item.completed;
      item.lastUpdatedDate = new Date();
      this.todoService.updateTodoItem(item).subscribe();
    }
    
    editTodoItem(item: TodoItem): void {
      if (item.editing) {
        this.newItem = item.title;
        this.newDueDate = item.dueDate ? item.dueDate.toISOString().split('T')[0] : '';
        item.editing = false;

      } else {
        item.title = this.newItem || item.title;
        item.dueDate = this.newDueDate ? new Date(this.newDueDate) : undefined;
        item.lastUpdatedDate = new Date();
        this.todoService.updateTodoItem(item).subscribe(() => {
          item.editing = true;
          this.newItem = '';
          this.newDueDate = '';
        });
       
      }
    }
    
}
