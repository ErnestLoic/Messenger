import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ChatService } from '../services/chat.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Group } from '../model/group';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {


  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  group:  Group;
  userGroup: string;
  


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
  

  constructor(   private router: Router,
    private ionicAuthService: ChatService,
    private fb: FormBuilder,
    public afDB : AngularFireDatabase,
    private activated: ActivatedRoute,
    public loadingCtrl: LoadingController) { 

      this.group = new Group('','','','');
    }

  ngOnInit() {
    this.ionViewDidEnter();
   
  }
  ionViewDidEnter(){
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }


  autoHideShow() {
    this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'please wait...',
      duration:2000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((res) => {
        this.ionicAuthService.userDetails().subscribe(response=>{  
          this.Cours.forEach(element => {
            this.group.id = element.id;
            this.group.cours=element.titre;
            this.ionicAuthService.userDetails().subscribe(response=>{
              this.group.userId = response.uid;
              this.userGroup = response.uid;
              console.log(this.group.userId + '       premier');
              
            })
            
            console.log(response.uid);
            this.afDB.list('Groups/').push({
              Id: this.group.id,
              Cours : this.group.cours,
              UserId:response.uid
            })
          });
          })
        console.log('Loader closed', res);
      });
    });

  
  } 



  signIn(value) {
    this.ionicAuthService.signinUser(value)
      .then((response) => {
        console.log(response)
        this.errorMsg = "";
        this.router.navigateByUrl('accueil');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.router.navigateByUrl('inscription');
  }



  Cours=[
    {
      id:1,
      titre:"Architecture des Systèmes d'information",
      description:"A short description of the course should be displayed there",
      msg:"100 messages",
      nonlus:"42 non lus"
    },
    {
      id:2,
      titre:"Analyse des données",
      description:"A short description of the course should be displayed there",
      msg:"120 messages",
      nonlus:"0 non lus"
    },
    {
      id:3,
      titre:"Algorithmique avancée",
      description:"A short description of the course should be displayed there",
      msg:"1200 messages",
      nonlus:"4 non lus"
    },
    {
      id:4,
      titre:"Intégration Continue",
      description:"A short description of the course should be displayed there",
      msg:"10 messages",
      nonlus:"10 non lus"
    },
    {
      id:5,
      titre:"Recherche operationnelle",
      description:"A short description of the course should be displayed there",
      msg:"3 messages",
      nonlus:"1 non lus"
    },
    {
      id:6,
      titre:"Développement mobile",
      description:"A short description of the course should be displayed there",
      msg:"130 messages",
      nonlus:"4 non lus"
    },
    {
      id:7,
      titre:"Gestion de projets",
      description:"A short description of the course should be displayed there",
      msg:"10 messages",
      nonlus:"9 non lus"
    },
    {
      id:8,
      titre:"JavaScript",
      description:"A short description of the course should be displayed there",
      msg:"23 messages",
      nonlus:"20 non lus"
    }

  ]
}

