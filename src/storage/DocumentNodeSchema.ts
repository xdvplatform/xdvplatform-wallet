import { IsArray, ArrayMaxSize, IsDefined, MaxLength, IsOptional, IsBase64 } from 'class-validator';
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

