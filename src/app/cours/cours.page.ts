import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Group } from '../model/group';
import { User } from '../model/user';
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {
  cours: any;
  messageText: any;
  messageImage:any;
  public messages: any = [];

  public image:any=[];

  group: Group;
  i : number;

  public groupe : any=[];

  user:any;

  public UserId : any ;

  currentUser : User;


  constructor(private activate: ActivatedRoute,
    private ionicAuthService: ChatService,
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage,
    public loadingCtrl: LoadingController) {

      
     this.user = this.ionicAuthService.userDetails();
      


            //recuperer les groupes en bd
            // this.afDB.list('Users/',ref => ref.orderByChild('email')).snapshotChanges(['child_added'])
            // .subscribe(actions => {
            //   this.User = [];
            //   actions.forEach(action => {
            //     console.log
                
            //     this.User.push({
            //       id:action.key, 
            //       email: action.payload.exportVal().email,
            //       name: action.payload.exportVal().name,
            //       password: action.payload.exportVal().password,
            //       salle: action.payload.exportVal().salle
            //     });
            //   });
            // })

            this.ionicAuthService.userDetails().subscribe(actions=>{
              this.UserId = actions.uid;
            })

        //recuperer les groupes en bd
     this.afDB.list('Groups/',ref => ref.orderByChild('Id')).snapshotChanges(['child_added'])
     .subscribe(actions => {
       this.groupe = [];
       actions.forEach(action => {
         this.groupe.push({
           Cours: action.payload.exportVal().Cours,
           Id: action.payload.exportVal().Id,
           UserId: action.payload.exportVal().UserId
         });
       });
     })

     


      //recuperer les messages en BD
    this.afDB.list('Messages/', ref => ref.orderByChild('date')).snapshotChanges(['child_added'])
      .subscribe(actions => {
        this.messages = [];
        actions.forEach(action => {
          this.messages.push({
            userId: action.payload.exportVal().userId,
            text: action.payload.exportVal().text,
            date: action.payload.exportVal().date,
            igGroupe: action.payload.exportVal().messageGroup
          });
        });
      })

      //recuperer les images en BD
      this.afDB.list('Images',ref=>ref.orderByChild('date')).snapshotChanges(['child_added'])
      .subscribe(actions=>{
        this.image=[];
        actions.forEach(action=>{
          this.getImageBD(action);
          this.image.push({
            userId:action.payload.exportVal().userId,
            imageUrl:action.payload.exportVal().imageUrl,
            date:action.payload.exportVal().date,
            idGroupe: action.payload.exportVal().imageGroup
          })
        })
      })
      
    
  }

  ngOnInit() {
    this.ionViewDidEnter();
    
  }
  ionViewDidEnter() {
    //recuperer le cours ou groupe
    let cours = localStorage.getItem('cours');
    this.cours = JSON.parse(cours);
    

  }

  


  //Envoyer un message d'un utilisateur qui est connecté
  sendImage() {
    
    
      this.loadingCtrl.create({
        message: 'Verifying...',
        duration:3000,
        
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((res) => {
          console.log('Loader closed', res); });
           //envoyer les images en BD
           this.ionicAuthService.userDetails().subscribe(response => {
  
        
            console.log('Image' + this.messageImage + ' de ' + response.email + '')
            this.user = response.uid;
            this.afDB.list('Images/').push({
              imageGroup: this.cours.titre,
              userId: response.uid,
              imageUrl: this.messageText,
              date: new Date().toISOString(),
            });
            this.messageText = '';
          })
    
      
    })
    
   

  }

  //recuper l'url de l'image dans la bd
  getImageBD(image : any){
    const imageUrl = image.payload.exportVal().imageUrl;
    this.afSG.ref(imageUrl).getDownloadURL().subscribe(imageUrl=>{
      console.log(imageUrl);
      this.image.push({
        url : imageUrl,
        userId: image.payload.exportVal().userId
      })
    })
  }
  

  //recuperer les messages en BD
  getMessages() {


  }
  
  Images=[
    {
      imageUrl:"assets/coverCounterAttackMankind.jpg"
    },
    {
      imageUrl:"assets/coverLostCanvas.jpg"
    },
    {
      imageUrl:"assets/coverHotaruNoHikari.jpg"
    },
    {
      imageUrl:"assets/coverHanaNoKusari.jpg"
    },
    {
      imageUrl:"assets/coverTheRealmAthena.jpg"
    },
    {
      imageUrl:"assets/coverSNK.jpg"
    }
  ]



  groupes = [
    {
      id: 1,
      titre: "Architecture des Systèmes d'information"
    },
    {
      id: 2,
      titre: "Analyse des données"
    },
    {
      id: 3,
      titre: "Algorithmique avancée"
    },
    {
      id: 4,
      titre: "Intégration Continue"
    },
    {
      id: 5,
      titre: "Recherche operationnelle"
    },
    {
      id: 6,
      titre: "Développement mobile"
    },
    {
      id: 7,
      titre: "Gestion de projets"
    },
    {
      id: 8,
      titre: "JavaScript"
    }

  ]

  sendMessage(){
    this.ionicAuthService.userDetails().subscribe(response => {

      
      console.log('Message' + this.messageText + ' de ' + response.email + '')
      this.user = response.uid;
      this.afDB.list('Messages/').push({
        messageGroup: this.cours.titre,
        userId: response.uid,
        text: this.messageText,
        date: new Date().toISOString()
        
      });
      this.messageText = '';
    })
  }


}
