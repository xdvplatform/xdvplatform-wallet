export declare class CMSSigner {
    static sign(pemCertificate: string, signingKey: string, content: Uint8Array, detached?: boolean): {
        pem: Uint8Array;
        signed: any;
    };
    static buf2hex(buffer: any): any;
    static validatePEM(cert: Uint8Array, pvk: Uint8Array, pem: Uint8Array): boolean;
}
