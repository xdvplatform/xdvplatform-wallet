import { IsPositive, Min, IsEthereumAddress, MinLength, MaxLength, validateOrReject, arrayMinSize, ArrayMinSize, ArrayMaxSize } from 'class-validator';


export class DVerForm {
    @MaxLength(4)    
    public value: number;

    public toXmlObject() {
        return {
            dVerForm: this.value
        }
    }
}
