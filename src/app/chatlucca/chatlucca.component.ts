import { Component, Input, OnInit } from '@angular/core';

import {ChatluccaService} from '../../service/chatlucca.service';

interface Messages {
  writer: string;
  text: string;
}

@Component({
  selector: 'chat-lucca',
  templateUrl: './chatlucca.component.html',
  styleUrls: ['./chatlucca.component.scss']
})
export class ChatluccaComponent implements OnInit {
  @Input() username: string;

  messages: Messages[] = [];
  textAreaInput = '';

  constructor(private chatluccaService: ChatluccaService) {
    this.username='';
  }

  ngOnInit(): void {
    this.chatluccaService.observable.subscribe(
      (message) => {
        this.messages.push(message);
      }
    );
  }

  confirmText(content: string): void {
    if (content !== '') {
      this.chatluccaService.pushText(this.username, content);
      this.textAreaInput = '';
    }
  }

  keyDownFunction(event: { ctrlKey: any; keyCode: number; preventDefault: () => void; }, content: string): void {
  if (event.ctrlKey && event.keyCode === 13) {
    this.textAreaInput = this.textAreaInput + '\n';

  } else if (event.keyCode === 13) {
    event.preventDefault();
    this.confirmText(content);
   }

  }
}

