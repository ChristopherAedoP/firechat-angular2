import { Injectable } from '@angular/core';
import { Mensaje } from '../../interfaces/mensaje';

import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {
  chats: FirebaseListObservable<any[]>;
  public usuario: any = null;

  constructor(
    private af: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    // this.chats = af.list('/chats');

    if (localStorage.getItem('usuario'))
    // tslint:disable-next-line:one-line
    {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }
  cargarMensajes() {
    this.chats = this.af.list('/chats', {
      query: { limitToLast: 20, orderByKey: true }
    });
    return this.chats;
  }
  agregarMensaje(texto: string) {
    // tslint:disable-next-line:prefer-const
    let mensaje: Mensaje = {
      nombre: this.usuario.displayName,
      mensaje: texto,
      fecha: Date.now().toString(),
      uid: this.usuario.uid,
      photoURL: this.usuario.photoURL
    };

    return this.chats.push(mensaje);
  }

  login(proveedor: string) {
    let provider: any;

    if (proveedor === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (proveedor === 'face')  {
      provider = new firebase.auth.FacebookAuthProvider();
    } else  {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    this.afAuth.auth.signInWithPopup( provider ).then(respuesta => {
      console.log(respuesta);
      this.usuario = respuesta.user;
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
    });

  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.afAuth.auth.signOut();

  }
}
