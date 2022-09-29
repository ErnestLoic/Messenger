import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/app';
import { User } from '../model/user';



// export interface Message {
//   createdAt: firebase.firestore.FieldValue;
//   id: string;
//   from: string;
//   msg: string;
//   fromName: string;
//   myMsg: boolean;
// }


@Injectable({
  providedIn: 'root'
})



export class ChatService {

  
  

  constructor(private angularFireAuth: AngularFireAuth, private afDB: AngularFireDatabase) { }


  
  createUser(value : User) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }


  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.angularFireAuth.user
  }

  // addChatMessage(msg){
  // }
}
