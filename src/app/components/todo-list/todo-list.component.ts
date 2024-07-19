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
    newPriority: string = 'low';
    selectedFilter: string = 'today'
    filteredItems: any[] = [];
    totalTasks: number = 0;
  completedTasks: number = 0;
  pendingTasks: number = 0;

    constructor(private todoService: TodoService) {}
  
    ngOnInit(): void {
      
      this.loadTodoItems();
      this.updateStatistics();

    }
  
    loadTodoItems(): void {
      this.todoService.getTodoItems().subscribe(items => {
          this.todoItems = items.map(item => ({
              ...item,
              id: item.id.toString()
          }));
      });
    }


  updateStatistics() {
    this.totalTasks = this.todoItems.length;
    this.completedTasks = this.todoItems.filter(item => item.completed).length;
    this.pendingTasks = this.todoItems.filter(item => !item.completed).length;
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
          editing: true,
          priority: this.newPriority

      };
  
      this.todoService.addTodoItem(newItem).subscribe(item => {
          item.id = item.id.toString();
          this.todoItems.push(item);
          this.newItem = '';
          this.newDueDate = '';
      });
      this.updateStatistics();

    }
  
    deleteTodoItem(id: string): void {
      this.todoService.deleteTodoItem(id).subscribe(() => {
          this.todoItems = this.todoItems.filter(item => item.id !== id);
      });
      this.updateStatistics();

    }
  
    toggleTodoItemCompletion(item: TodoItem): void {
      item.completed = !item.completed;
      item.lastUpdatedDate = new Date();
      this.todoService.updateTodoItem(item).subscribe();
      this.updateStatistics();

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

    filterTasks() {
      console.log(this.selectedFilter);
      const today = new Date();
      this.filteredItems = this.todoItems.filter(item => {
          const dueDate = item.dueDate ? new Date(item.dueDate) : undefined;
      
          switch (this.selectedFilter) {
              case 'today':
                  return dueDate?.toDateString() === today.toDateString();
  
              case 'week':
                  const weekStart = new Date(today);
                  weekStart.setDate(today.getDate() - today.getDay());
                  const weekEnd = new Date(today);
                  weekEnd.setDate(today.getDate() + (6 - today.getDay()));
                  return dueDate && !item.completed && dueDate >= weekStart && dueDate <= weekEnd;
  
              case 'month':
                  return dueDate && !item.completed && dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear();
  
              case 'all':
                  return true;

               default:
                    return false; 
          }
      });
      this.updateStatistics();

  }
  
}
