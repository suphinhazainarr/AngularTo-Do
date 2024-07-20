import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TodoItem } from '../../todo-item';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../todo.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../shared.service';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
    imports: [CommonModule, FormsModule]
})
export class TodoListComponent implements OnInit,OnDestroy {
  private updateStatisticsSubscription: Subscription | undefined;

    todoItems: TodoItem[] = [];
    newItem: string = '';
    newDueDate: Date | string = new Date();
    newPriority: string = 'low';
    selectedFilter: string = 'today'
    filteredItems: any[] = [];
    totalTasks: number = 0;
    completedTasks: number = 0;
    pendingTasks: number = 0;

    constructor(private todoService: TodoService,private sharedService: SharedService, private cdr: ChangeDetectorRef) {}
  
    ngOnInit(): void {
      
      this.loadTodoItems();
      this.updateStatistics();
      this.updateStatisticsSubscription = this.sharedService.updateStatistics$.subscribe(() => {
        this.updateStatistics();
      });

    }

    ngOnDestroy() {
      if (this.updateStatisticsSubscription) {
        this.updateStatisticsSubscription.unsubscribe();
      }
    }
  
    loadTodoItems(): void {
      this.todoService.getTodoItems().subscribe(items => {
          this.todoItems = items.map(item => ({
              ...item,
              id: item.id.toString()
          }));
      });
      this.filterTasks();

    }

      // Method to format the due date
  formatDueDate(): void {
    if (this.newDueDate) {
      const date = new Date(this.newDueDate);
      this.newDueDate = date.toDateString();
    }
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
          dueDate: new Date(this.newDueDate),
          lastUpdatedDate: new Date(),
          editing: false,
          priority: this.newPriority

      };
  
      this.todoService.addTodoItem(newItem).subscribe(item => {
          item.id = item.id.toString();
          this.todoItems.push(item);
          this.newItem = '';
          this.newDueDate = '';
          this.updateStatistics();
          this.filterTasks();
    
      });


    }
  
    deleteTodoItem(id: string): void {
      this.todoService.deleteTodoItem(id).subscribe(() => {
          this.todoItems = this.todoItems.filter(item => item.id !== id);
          this.loadTodoItems();

      });
      this.updateStatistics();

    }
  
    toggleTodoItemCompletion(item: TodoItem): void {
      item.completed = !item.completed;
      item.lastUpdatedDate = new Date();
      this.todoService.updateTodoItem(item).subscribe();
      this.updateStatistics();
      this.loadTodoItems();

    }
    
    // editTodoItem(item: TodoItem): void {
    //   if (item.editing) {
    //     this.newItem = item.title;
    //     this.newDueDate = item.dueDate ? item.dueDate.toISOString().split('T')[0] : '';
    //     item.editing = false;
    //     this.todoService.updateTodoItem(item).subscribe(() => {
        
    //     });

    //   } else {
    //     item.title = this.newItem || item.title;
    //     item.dueDate = this.newDueDate ? new Date(this.newDueDate) : undefined;
    //     item.lastUpdatedDate = new Date();
    //     item.editing =true;
    //     this.todoService.updateTodoItem(item).subscribe(() => {
    //       item.editing = true;
    //       this.newItem = '';
    //       this.newDueDate = '';
    //     });

    //   }
    //   this.loadTodoItems();

    // }
    editTodoItem(item: TodoItem): void {
      if (item.editing) {
        // Save the updates
        item.title = this.newItem || item.title;
        item.dueDate = this.newDueDate ? new Date(this.newDueDate) : undefined;
        item.lastUpdatedDate = new Date();
        item.editing = false;

        this.todoService.updateTodoItem(item).subscribe(() => {
          // Reset the temporary variables and toggle editing mode
          this.newItem = '';
          // this.newDueDate = '';
          // item.editing = false;
          this.loadTodoItems();
        });
        this.filterTasks();

      } else {
        // Enter edit mode
        this.newItem = item.title;
        // alert("changed to save button");

        // this.newDueDate = item.dueDate ? item.dueDate.toISOString().split('T')[0] : '';

        item.editing = true;
        this.filterTasks();
        this.cdr.detectChanges(); // Force change detection to update the view

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

  cloneTodoItem(item : TodoItem){
    const clonedItem: TodoItem ={
     ...item,
     id: Date.now().toString(),
     title: `${item.title} (clone)`,
     creationDate: new Date(),
     lastUpdatedDate:new Date()
    };
    this.todoService.addTodoItem(clonedItem).subscribe(item => {
      item.id = item.id.toString();
      this.todoItems.push(item);
      this.filterTasks();

  });
  // this.filterTasks();
  // this.updateStatistics();  
}
  
}
