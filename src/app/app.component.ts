import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todos';

  constructor(
    private snackbar: MatSnackBar,
    public messageService: MessageService
  ) {
    this.messageService.message$.subscribe(message => {
      this.snackbar.open(message, 'Close');
    });
  }
}
