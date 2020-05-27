import { JWTPayload } from './JWTPayload';
import { JWTHeader } from "./JWTHeader";
export class JWTDocument {
    header: JWTHeader;
    payload: JWTPayload;
    signature: string;
    data: string;
}
