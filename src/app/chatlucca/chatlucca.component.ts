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
  @Input() utilisateur: string;

  messages: Messages[] = [];
  textInput = '';

  constructor(private chatluccaService: ChatluccaService) {
    this.utilisateur='';
  }

  ngOnInit(): void {
    this.chatluccaService.observable.subscribe(
      (message) => {
        this.messages.push(message);
      }
    );
  }

  clickSendButton(content: string): void {
    if (content !== '') {
      this.chatluccaService.pushText(this.utilisateur, content);
      this.textInput = '';
    }
  }
  sendWithEnter(event: { ctrlKey: any; keyCode: number; preventDefault: () => void; }, content: string): void {
    if (event.keyCode === 13&&content !== '') {
      this.chatluccaService.pushText(this.utilisateur, content);
      event.preventDefault();
      this.textInput = '';
    }
  }




}

