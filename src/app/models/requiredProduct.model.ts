
export class RequiredProduct{
   
    public requiredProductId: number;
    public material: string;
    public quantity: number;
    public price: number;
    public workDetailId: number;
    
    constructor(requiredProductId: number, material: string, quantity: number, price: number, workDetailId: number){
        this.requiredProductId = requiredProductId;
        this.material = material;
        this.quantity = quantity;
        this.price = price;
        this.workDetailId = workDetailId;
    }  
}