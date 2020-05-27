import { IsArray, ArrayMaxSize, IsOptional, IsEthereumAddress, IsDefined } from 'class-validator';

export class AccountNodeSchema {

    @IsEthereumAddress()
    @IsOptional()
    public ethereumAddress?: string;

    @IsDefined()
    public did: string;

    @IsDefined()
    public publicKey: {
        type: string;
        key: string;

    };

}

