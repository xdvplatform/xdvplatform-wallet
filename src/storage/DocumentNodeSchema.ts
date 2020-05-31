import { IsArray, ArrayMaxSize, IsDefined, MaxLength, IsOptional, IsBase64 } from 'class-validator';
import { LogNodeSchema } from './LogNodeSchema';
import { type } from 'os';

export type NodeType = 'child' | 'document';


export class DocumentNodeSchema {


    public static create(did: string, document: any, tag: string) {
        return Object.assign(new DocumentNodeSchema(), {
            ...document,
            '$did': did,
            tag
        });
    }

    tag: string;
    
    '$did': string;
}

