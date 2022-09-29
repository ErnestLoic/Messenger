import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ChatService } from '../services/chat.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Group } from '../model/group';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})


export class AccueilPage implements OnInit {
  userGroup: string;
  group:  Group;


  constructor( private router: Router,
    private ionicAuthService: ChatService,
    public afDB : AngularFireDatabase,
    private activate: ActivatedRoute) {
      this.group = new Group('','','','');      


    
    }

  ngOnInit() {
    this.ionViewDidEnter();
   
  }
  ionViewDidEnter(){
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
         console.log(response.email);
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    });
    
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

  


  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
        this.afDB.list('Groups/').remove();
        console.log('utilisateur déconnecté');
        this.afDB.list('Images/').remove();
        console.log("Plus d'images");
      })
      .catch(error => {
        console.log(error);
      })
  }

  gotoChat(c){
    localStorage.setItem('cours',JSON.stringify(c));
    this.router.navigate(['cours']);
    console.log(c);
  }



  // getGroups(){
    

  //   this.ionicAuthService.userDetails().subscribe(response=>{  
  //     this.Cours.forEach(element => {
  //       this.group.id = element.id;
  //       this.group.cours=element.titre;
  //       this.ionicAuthService.userDetails().subscribe(response=>{
  //         this.group.userId = response.uid;
  //         this.userGroup = response.uid;
  //         console.log(this.group.userId + '       premier');
          
  //       })
        
  //       console.log(response.uid);
  //       this.afDB.list('Groups/').push({
  //         Id: this.group.id,
  //         Cours : this.group.cours,
  //         UserId:response.uid
  //       })
  //     });
  //     })
     
  // }
}
