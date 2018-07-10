
export class User{
   
    public email: string;
    public completeName: string;
    public password: string;
    public roleId: number;
    
    constructor(email: string, completeName: string, password: string, roleId: number){
        this.email = email;
        this.completeName = completeName;
        this.password = password;
        this.roleId = roleId;
    }  
}