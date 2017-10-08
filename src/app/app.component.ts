import { ChatService } from './services/chat/chat.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public _cs: ChatService) {

  }
  salir() {
    this._cs.logout();
  }
}
