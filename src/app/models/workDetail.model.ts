import { RequiredProduct } from "./requiredProduct.model";

export class WorkDetail{
   
    public workDetailId: number;
    public productsPrice: number;
    public description: string;
    public workOrderId: number;
    public products: Array<RequiredProduct>;
    
    constructor(workDetailId: number, productsPrice: number, description: string, workOrderId: number, products: Array<RequiredProduct>){
        this.workDetailId = workDetailId;
        this.productsPrice = productsPrice;
        this.description = description;
        this.workOrderId = workOrderId;
        this.products = products;
    }  
}