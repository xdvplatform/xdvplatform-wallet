export declare enum AlgorithmType {
    RSA = 0,
    ES256K = 1,
    P256 = 2,
    ED25519 = 3,
    BLS = 4,
    P256_JWK_PUBLIC = 5,
    ED25519_JWK_PUBLIC = 6,
    ES256K_JWK_PUBLIC = 7,
    RSA_JWK_PUBLIC = 8,
    RSA_PEM_PUBLIC = 9
}
export declare type AlgorithmTypeString = keyof typeof AlgorithmType;
