import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';
import { MOCK_TODOS } from './mock-todos';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = MOCK_TODOS;
    return {todos};
  }
  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
