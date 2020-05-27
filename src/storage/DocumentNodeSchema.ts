import { IsArray, ArrayMaxSize, IsDefined, MaxLength, IsOptional, IsBase64, IsNumber, IsString } from 'class-validator';
import { AccountNodeSchema,  } from './AccountNodeSchema';
import { LogNodeSchema } from './LogNodeSchema';

interface Indexable<T> {
    [index: string]: T;
}
class DocumentItemNodeSchema{

    @IsDefined()
    @IsBase64()
    public document: Indexable<string>;

}
export class DocumentNodeSchema {

    @IsDefined()
    public issuer: AccountNodeSchema;

    @MaxLength(100)
    public tag: Indexable<DocumentItemNodeSchema>;

    @IsOptional()
    public detachedSignatures?: Indexable<any>;

    @IsOptional()
    public logs?: Indexable<LogNodeSchema>;

}
// <DocumentNodeSchema>{
//     issuer: new AccountNodeSchema(),
//     tag:{
//         ['a']:{
//             document: {
//                '111111': 'asssaa'
//             }
//         }
//     }
// }

// cid/tag/invoices/document/11111/data


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