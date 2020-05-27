import { IsArray, ArrayMaxSize, IsDefined, ValidateNested } from 'class-validator';
import { DocumentNodeSchema } from './DocumentNodeSchema';
import { AccountNodeSchema } from './AccountNodeSchema';

export class StorageNodeSchema {

    @ArrayMaxSize(1000)
    @IsArray()
    @ValidateNested()
    public documents: DocumentNodeSchema[];

    @IsDefined()
    @ValidateNested()
    public account: AccountNodeSchema;

    
}