import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { MOCK_TODOS } from './mock-todos';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosUrl = 'api/todos';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  todos: Todo[] = [...MOCK_TODOS];

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(catchError(this.handleError<Todo[]>('getTodos', [])));
  }

  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    return this.http.delete<Todo>(`${this.todosUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted Todo id=${id}`)),
        catchError(this.handleError<Todo>(`deleteTodo id=${id}`)));
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated Todo id=${todo.id}`)),
        catchError(this.handleError<any>(`updateTodo id=${todo.id}`)));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions)
      .pipe(
        tap(newTodo => this.log(`created Todo id=${newTodo.id}`)),
        catchError(this.handleError<Todo>(`createTodo`)));
  }
}
