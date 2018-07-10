
export class Role{
   
    public roleId: number;
    public description: string;
    
    constructor(roleId: number, description: string){
        this.roleId = roleId;
        this.description = description;
    }  
}