export class Group {
    id:any;
    cours:string;
    userId:any;
    messageId:string;

    constructor(
        id: any,
        cours: string,
        userId:any,
        messageId:string,){
            this.id=id;
            this.cours=cours;
            this.userId=userId;
            this.messageId=messageId;
        }
}
