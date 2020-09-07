import { JWTPayload } from './JWTPayload';
import jsonwebtoken from 'jsonwebtoken';

export class JWTService {
    
    public static decodeWithSignature(jwt: string) {
        const jwtDecoded: any = jsonwebtoken.decode(jwt, { 'complete': true });
        const decoded = {
            ...jwtDecoded,
            data: `${jwt.split('.')[0]}.${jwt.split('.')[1]}`,
        };

        return decoded;
    }

    
    /**
     * Signs a payload
     * @param key PEM format key
     * @param payload JSON payload
     * @param options JWT payload config
     */
    public static async sign(key: any, payload: any, options: JWTPayload) {
        // const keys = await JWK.asKey(pem, 'pem');
        // const key = typeof pem === 'string' ? keys.toJSON(true) : pem;
        return jsonwebtoken.sign(payload, key, {
            audience: options.aud,
            issuer: options.iss,
            // iat: !!options.iat,
            // notBefore: options.nbf,
            subject: options.sub,
        });
    }
    
    /**
     * Verifies a signed message
     * @param key buffer
     * @param signature Signature
     * @param options JWT payload config
     */
    public static async verify(key: any, signature: any) {
        return jsonwebtoken.verify(signature,key, { algorithms: ['HS256']})
    }


}