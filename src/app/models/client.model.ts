
export class Client{
   
    public clientIdentification: string;
    public name: string;
    public lastname: string;
    public telephone: string;
    public address: string;
    
    constructor(clientIdentification: string, name: string, lastname: string, telephone: string, address: string){
        this.clientIdentification = clientIdentification;
        this.name = name;
        this.lastname = lastname;
        this.telephone = telephone;
        this.address = address;
    }  
}