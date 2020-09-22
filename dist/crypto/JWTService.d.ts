import { JWTPayload } from './JWTPayload';
export declare class JWTService {
    static decodeWithSignature(jwt: string): any;
    static sign(key: any, payload: any, options: JWTPayload): Promise<string>;
    static verify(key: any, signature: any): Promise<string | object>;
}
