export class User {
    id: string;
    name: string;
    email: string;
    salle: string;
    password:string;

    constructor(
        id: string,
        name: string,
        email:string,
        salle:string,
        password:string){
            this.id=id;
            this.name=name;
            this.email=email;
            this.salle=salle;
            this.password=password;
        }
}
