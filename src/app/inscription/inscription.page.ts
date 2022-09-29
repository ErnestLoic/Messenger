import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ChatService } from '../services/chat.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  user : User;


  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Provide email.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Password is required.' 
      },
      { 
        type: 'minlength', 
        message: 'Password length should be 6 characters long.' 
      }
    ]
  };

  constructor(public afDB : AngularFireDatabase,
    private router: Router,
    private ionicAuthService: ChatService,
    private fb: FormBuilder,
    private angularFireAuth: AngularFireAuth) {
      this.user = new User('','','','','');

      
     }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      salle: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

 

  signUp(value : User) {
    this.ionicAuthService.createUser(value)
      .then((response) => {
        this.errorMsg = "";
        this.successMsg = "New user created.";
        this.angularFireAuth.authState.subscribe(response => {
          this.afDB.object(`Users/${value.id=response.uid}`).set({
            email: value.email,
            password: value.password,
            name: value.name,
            salle: value.salle,
          })
           console.log(response.uid);
        
      })
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
     
     
      
  }

  goToLogin() {
    this.router.navigateByUrl('connexion');
  }
}
