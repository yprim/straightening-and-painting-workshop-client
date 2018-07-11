
export class Vehicle{

    public licenseNumber: string;
    public color: string;
    public brand: string;
    public style: string;
    public year: number;
    public capacity: number;
    public weight: number;
    public chassis_number: string;
    
    constructor(licenseNumber: string, color: string, brand: string, style: string, year: number, capacity: number, weight: number, chassis_number: string){
        this.licenseNumber = licenseNumber;
        this.color = color;
        this.brand = brand;
        this.style = style;
        this.year = year;
        this.capacity = capacity;
        this.weight = weight;
        this.chassis_number = chassis_number;
    }  
}