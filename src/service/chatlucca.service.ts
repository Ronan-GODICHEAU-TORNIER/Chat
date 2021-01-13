import { Injectable } from '@angular/core';
import { ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ChatluccaService {

  private _messages = new ReplaySubject<any>();
  observable = this._messages.asObservable();

  constructor() { }

  pushText(writer: string, text: string): void {
    this._messages.next({writer, text});
  }
}
