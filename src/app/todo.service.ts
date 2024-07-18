import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl ='http://localhost:3000/todoItems'
  
  constructor(private http: HttpClient) {}

  getTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  addTodoItem(item: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, item);
  }

  deleteTodoItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateTodoItem(item: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/${item.id}`, item);
  }
  
}