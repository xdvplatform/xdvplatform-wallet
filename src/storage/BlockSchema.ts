import { IsNumber, IsString, IsHexadecimal } from 'class-validator';

export class BlockSchema {

    did: {
        [index: string]: string,
    };

    document: {
        [index: string]: string
    };

    logs: {
        [index: number]: string[];
    };

    @IsNumber()
    $block?: number;

    @IsString()
    $ref?: string;

    @IsHexadecimal()
    $signature: string;
}