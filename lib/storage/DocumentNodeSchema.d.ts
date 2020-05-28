import { AccountNodeSchema } from './AccountNodeSchema';
import { LogNodeSchema } from './LogNodeSchema';
interface Indexable<T> {
    [index: string]: T;
}
declare class DocumentItemNodeSchema {
    document: Indexable<string>;
}
export declare class DocumentNodeSchema {
    issuer: AccountNodeSchema;
    tag: Indexable<DocumentItemNodeSchema>;
    detachedSignatures?: Indexable<any>;
    logs?: Indexable<LogNodeSchema>;
}
export {};
