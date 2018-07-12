

export class WorkOrder{

    public workOrderId: number;
    public description: string;
    public tentativeDate: Date;
    public detailsPrice: number;
    public laborPrice: number;
    public clientIdentification: string;
    public licenseNumber: string;
    
    constructor(workOrderId: number, description: string, tentativeDate: Date, detailsPrice: number, laborPrice: number, clientIdentification: string, licenseNumber: string){
        this.workOrderId = workOrderId;
        this.description = description;
        this.tentativeDate = tentativeDate;
        this.detailsPrice = detailsPrice;
        this.laborPrice = laborPrice;
        this.clientIdentification = clientIdentification;
        this.licenseNumber = licenseNumber;
    }
}