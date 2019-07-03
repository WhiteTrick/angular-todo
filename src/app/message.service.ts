import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message$: Subject<string> = new Subject();

  constructor() { }

  add(message: string) {
    this.message$.next(message);
  }
}
