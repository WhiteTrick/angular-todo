import { Component, OnInit, Input } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  todo: string;
  loading = false;
  @Input() getTodos: (cb?: () => void) => void;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
  }

  submit() {
    if (this.todo) {
      this.loading = true;
      const newTodo = {
        name: this.todo,
        createdAt: new Date(),
        complete: false,
      };
      this.todosService.createTodo(newTodo as Todo)
        .subscribe(t => {
          this.getTodos(() => { this.loading = false; });
        });
    }
  }

}
