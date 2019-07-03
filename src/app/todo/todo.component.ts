import { Component, OnInit, Input, Inject } from '@angular/core';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const ACTIONS = ['toggleComplete', 'delete', 'edit'] as const;
type Action = typeof ACTIONS[number];

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
})
export class EditTodoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) { }

    onNoClick() {
      this.dialogRef.close();
    }
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @Input() getTodos: (cb?: () => void) => void;
  isFetching: Record<Action, boolean> = {
    toggleComplete: false,
    delete: false,
    edit: false,
  };

  constructor(private todosService: TodosService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: {...this.todo},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isFetching.edit = true;
      this.update(result, false, () => { this.isFetching.edit = false; } );
    });
  }

  disableAction(action: Action) {
    return Object.keys(this.isFetching).filter(a => a !== action).reduce((a, c) => a || this.isFetching[c], false);
  }

  toggleComplete() {
    this.isFetching.toggleComplete = true;
    this.update({
      complete: !this.todo.complete,
      completedAt: !this.todo.complete ? new Date() : undefined
    },
    this.todo.complete,
    () => { this.isFetching.toggleComplete = false; });
  }

  update(todo: Partial<Todo>, deleteCompletedAt: boolean, cb?: () => void) {
    const updatedTodo = {
      ...this.todo,
      ...todo
    };
    if (deleteCompletedAt) {
      delete updatedTodo.completedAt;
    }
    this.todosService.updateTodo(updatedTodo)
      .subscribe(t => {
        this.getTodos(cb);
      });
  }

  delete() {
    this.isFetching.delete = true;
    this.todosService.deleteTodo(this.todo)
      .subscribe(t => {
        this.getTodos(() => { this.isFetching.delete = false; });
      });
  }

}
