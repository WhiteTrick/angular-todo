import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private todosService: TodosService) { }
  todos: Todo[];
  isFetching = true;
  ngOnInit() {
    this.getTodos();
  }

  getTodos = (cb?: () => void) => {
    this.todosService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.isFetching = false;
      if (cb) {
        cb();
      }
    });
  }

}
