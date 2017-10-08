import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  mensaje = '';
  elemento: any;
  elemento_0: any;
  fecha: Date;

  constructor(public _cs: ChatService) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

    this._cs.cargarMensajes()
            .subscribe( () => {
              console.log('mensajes cargados... ');

              setTimeout(() => this.elemento.scrollTop = this.elemento.scrollHeight, 50);
              setTimeout(() => this.elemento_0.scrollTop = this.elemento_0.scrollHeight, 50);
            });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    this.elemento_0 = document.getElementById('app-mensajes_0');
  }

  enviar() {
    if (this.mensaje.length === 0) {
      return;
    }

    this._cs
      .agregarMensaje(this.mensaje)
      .then(() => console.log('Hecho!'))
      .catch(() => console.error('Error!'));

    this.mensaje = '';
  }
  salir() {
    this._cs.logout();
  }
}
