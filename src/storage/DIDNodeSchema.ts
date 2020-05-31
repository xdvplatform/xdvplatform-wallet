import { IsArray, ArrayMaxSize, IsOptional, IsEthereumAddress, IsDefined, ValidateNested } from 'class-validator';
import { DIDDocument } from '../did';
import { LogNodeSchema } from './LogNodeSchema';
import { DocumentNodeSchema } from './DocumentNodeSchema';

export class DIDNodeSchema extends DIDDocument {
    tag: string;

    static create(did: DIDDocument, tag: string) {
        return {
            ...did,
            tag
        };
    }
}

