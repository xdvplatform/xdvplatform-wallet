import {  
    IsPositive, Min, IsEthereumAddress, MinLength, 
    MaxLength, validateOrReject, arrayMinSize, 
    ArrayMinSize, ArrayMaxSize, Matches } from 'class-validator';


export class DId {
    @Matches('[F][E](([A|V|T|E|P|N|I]|[-]|[a-zA-Z0-9]){64})?') 
    @MinLength(64)   
    public value: string;
    
    public toXmlObject() {
        return {
            dId: this.value,
        }
    }
}
