import { IsArray, ArrayMaxSize, IsDefined, MaxLength, IsOptional, IsBase64, IsNumber, IsString } from 'class-validator';
import { AccountNodeSchema,  } from './AccountNodeSchema';
import { LogNodeSchema } from './LogNodeSchema';

export class DocumentNodeSchema {

    @IsDefined()
    public issuer: AccountNodeSchema;

    @MaxLength(100)
    public tag: string;

    @IsDefined()
    @IsBase64()
    public data: string;

    @IsOptional()
    public detachedSignatures?: any;

    @IsOptional()
    public logs?: LogNodeSchema[];

}

export class JWTHeader {
    typ: string;
    alg: string;
}
export class JWTDocument {
    header: JWTHeader;
    payload: JWTPayload;
    signature: string;
    data: string;
}
export class JWTPayload  {
    @IsNumber()
    @IsDefined()
    iat: number;

    @IsNumber()
    @IsDefined()
    nbf: number;

    @IsString()
    @IsDefined()
    iss: string;

    @IsString()
    @IsDefined()
    sub: string;

    @IsString()
    @IsDefined()
    aud: string[] | string;

}